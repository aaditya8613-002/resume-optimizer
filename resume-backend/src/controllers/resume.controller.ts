import { Request, Response, NextFunction } from 'express';
import { callGemini, parseJSON } from '../services/gemini.service';
import { extractTextFromFile } from '../services/parser.service';
import { buildGeneratePrompt, buildCoverLetterPrompt } from '../services/prompt.service';
import { AppError } from '../middleware/errorHandler';
import { ResumeInput, GeneratedResumeResponse } from '../types';

// â”€â”€ Existing: Optimize uploaded resume â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface OptimizeBody {
    jobDescription: string;
}

interface OptimizeResult {
    optimizedResume: string;
    changes: string[];
    keywordsAdded: string[];
    score: number;
}

export async function optimizeResume(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const file = req.file;
        const { jobDescription } = req.body as OptimizeBody;

        if (!file) throw new AppError('No file uploaded.', 'FileError', 400);
        if (!jobDescription) throw new AppError('jobDescription is required.', 'ValidationError', 400);

        let resumeText: string;
        try {
            resumeText = await extractTextFromFile(file);
        } catch (e) {
            throw new AppError((e as Error).message, 'FileError', 422);
        }

        const prompt = `You are an expert ATS resume optimizer.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Rewrite the resume to be highly ATS-optimized for this job. Rules:
- Never fabricate experience or skills
- Use ATS-safe formatting (no tables, columns, or graphics)
- Mirror exact keywords from the JD where truthful
- Use strong action verbs + quantified impact where possible
- Keep sections: Summary, Experience, Skills, Education

Return ONLY valid JSON with this exact shape:
{
  "optimizedResume": "<full rewritten resume as plain text>",
  "changes": ["<change 1>", "<change 2>"],
  "keywordsAdded": ["<keyword 1>", "<keyword 2>"],
  "score": <estimated ATS match score 0-100>
}`;

        const raw = await callGemini(prompt, 2048);

        let result: OptimizeResult;
        try {
            result = parseJSON<OptimizeResult>(raw);
        } catch {
            throw new AppError('Claude returned invalid JSON.', 'ClaudeError', 502);
        }

        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

// â”€â”€ New: Parse uploaded resume to text â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function parseResume(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const file = req.file;
        if (!file) throw new AppError('No file uploaded.', 'FileError', 400);

        let resumeText: string;
        try {
            resumeText = await extractTextFromFile(file);
        } catch (e) {
            throw new AppError((e as Error).message, 'FileError', 422);
        }

        res.json({ success: true, data: { text: resumeText } });
    } catch (err) {
        next(err);
    }
}

// â”€â”€ New: Generate resume from structured input â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function generateResume(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const input = req.body as ResumeInput;

        const prompt = buildGeneratePrompt(input);
        const raw = await callGemini(prompt, 2048);

        let result: GeneratedResumeResponse;
        try {
            result = parseJSON<GeneratedResumeResponse>(raw);
        } catch {
            throw new AppError('Claude returned invalid JSON.', 'ClaudeError', 502);
        }

        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

// â”€â”€ New: Cover letter from structured context â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface CoverLetterBody {
    resumeContext: string;
    jobDescription: string;
    companyName: string;
    tone: string;
}

interface CoverLetterResult {
    coverLetter: string;
    subject: string;
}

export async function generateCoverLetter(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { resumeContext, jobDescription, companyName, tone } =
            req.body as CoverLetterBody;

        if (!resumeContext) throw new AppError('resumeContext is required.', 'ValidationError', 400);
        if (!jobDescription) throw new AppError('jobDescription is required.', 'ValidationError', 400);
        if (!companyName) throw new AppError('companyName is required.', 'ValidationError', 400);
        if (!tone) throw new AppError('tone is required.', 'ValidationError', 400);

        const prompt = buildCoverLetterPrompt(resumeContext, jobDescription, companyName, tone);
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

