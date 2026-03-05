import { Request, Response, NextFunction } from 'express';
import { callGemini, parseJSON } from '../services/gemini.service';
import { extractTextFromFile } from '../services/parser.service';
import { AppError } from '../middleware/errorHandler';

interface CoverLetterBody {
    jobDescription: string;
    companyName?: string;
    tone?: 'professional' | 'conversational' | 'enthusiastic';
}

interface CoverLetterResult {
    coverLetter: string;
    wordCount: number;
}

export async function generateCoverLetter(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const file = req.file;
        const { jobDescription, companyName = 'the company', tone = 'professional' } =
            req.body as CoverLetterBody;

        if (!file) throw new AppError('No file uploaded.', 'FileError', 400);
        if (!jobDescription) throw new AppError('jobDescription is required.', 'ValidationError', 400);

        let resumeText: string;
        try {
            resumeText = await extractTextFromFile(file);
        } catch (e) {
            throw new AppError((e as Error).message, 'FileError', 422);
        }

        const prompt = `You are an expert cover letter writer.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

COMPANY: ${companyName}
TONE: ${tone}

Write a tailored cover letter. Rules:
- Maximum 400 words
- Opening: hook that connects the applicant's background to the role
- Middle: 2 specific examples of relevant achievement
- Closing: confident, not needy
- No filler phrases ("I am excited to apply...")
- Sound human â€” no AI-generated patterns

Return ONLY valid JSON:
{
  "coverLetter": "<the full cover letter as plain text>",
  "wordCount": <number>
}`;

        const raw = await callGemini(prompt, 1024);

        let result: CoverLetterResult;
        try {
            result = parseJSON<CoverLetterResult>(raw);
        } catch {
            throw new AppError('Claude returned invalid JSON.', 'ClaudeError', 502);
        }

        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

