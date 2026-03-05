import { Request, Response, NextFunction } from 'express';
import { callGemini, parseJSON } from '../services/gemini.service';
import { extractTextFromFile } from '../services/parser.service';
import { buildATSScorePrompt, buildTailorResumePrompt } from '../services/prompt.service';
import { AppError } from '../middleware/errorHandler';

// â”€â”€ Existing: Analyze resume against a JD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface ATSResult {
    score: number;
    missingKeywords: string[];
    presentKeywords: string[];
    suggestions: string[];
    sectionFeedback: Record<string, string>;
}

export async function analyzeATS(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const file = req.file;
        const { jobDescription } = req.body as { jobDescription: string };

        if (!file) throw new AppError('No file uploaded.', 'FileError', 400);
        if (!jobDescription) throw new AppError('jobDescription is required.', 'ValidationError', 400);

        let resumeText: string;
        try {
            resumeText = await extractTextFromFile(file);
        } catch (e) {
            throw new AppError((e as Error).message, 'FileError', 422);
        }

        const prompt = `You are an ATS (Applicant Tracking System) expert.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Analyze how well this resume passes ATS for this job. Be direct and critical.

Return ONLY valid JSON:
{
  "score": <0-100 ATS compatibility score>,
  "missingKeywords": ["<keyword missing from resume>"],
  "presentKeywords": ["<keyword already in resume>"],
  "suggestions": ["<actionable fix 1>", "<actionable fix 2>"],
  "sectionFeedback": {
    "summary": "<feedback or null>",
    "experience": "<feedback>",
    "skills": "<feedback>",
    "education": "<feedback>"
  }
}`;

        const raw = await callGemini(prompt, 1024);

        let result: ATSResult;
        try {
            result = parseJSON<ATSResult>(raw);
        } catch {
            throw new AppError('Claude returned invalid JSON.', 'ClaudeError', 502);
        }

        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

// â”€â”€ New: Detailed ATS score with breakdown â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface ATSScoreResult {
    overallScore: number;
    grade: string;
    breakdown: {
        keywordMatch: { score: number; matched: string[]; missing: string[]; comment: string };
        formatting: { score: number; issues: string[]; comment: string };
        contentQuality: { score: number; issues: string[]; comment: string };
        lengthAndStructure: { score: number; comment: string };
        actionVerbs: { score: number; weak: string[]; suggestions: string[]; comment: string };
    };
    topRecommendations: string[];
}

export async function scoreResume(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const file = req.file;
        const { jobDescription } = req.body as { jobDescription?: string };

        if (!file) throw new AppError('No resume file uploaded.', 'FileError', 400);

        let resumeText: string;
        try {
            resumeText = await extractTextFromFile(file);
        } catch (e) {
            throw new AppError((e as Error).message, 'FileError', 422);
        }

        const prompt = buildATSScorePrompt(resumeText, jobDescription);
        const raw = await callGemini(prompt, 1500);

        let result: ATSScoreResult;
        try {
            result = parseJSON<ATSScoreResult>(raw);
        } catch {
            throw new AppError('Claude returned invalid JSON.', 'ClaudeError', 502);
        }

        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

// â”€â”€ New: Tailor resume to match a specific JD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface TailorResult {
    tailoredResume: {
        summary: string;
        experience: { title: string; company: string; dates: string; bullets: string[] }[];
        skills: string[];
    };
    changeLog: { section: string; change: string }[];
    predictedAtsScore: number;
}

export async function tailorResume(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const file = req.file;
        const { jobDescription, tone } = req.body as { jobDescription: string; tone?: string };

        if (!file) throw new AppError('No resume file uploaded.', 'FileError', 400);
        if (!jobDescription) throw new AppError('jobDescription is required.', 'ValidationError', 400);

        let resumeText: string;
        try {
            resumeText = await extractTextFromFile(file);
        } catch (e) {
            throw new AppError((e as Error).message, 'FileError', 422);
        }

        const prompt = buildTailorResumePrompt(resumeText, jobDescription, tone ?? 'professional');
        const raw = await callGemini(prompt, 2048);

        let result: TailorResult;
        try {
            result = parseJSON<TailorResult>(raw);
        } catch {
            throw new AppError('Claude returned invalid JSON.', 'ClaudeError', 502);
        }

        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

