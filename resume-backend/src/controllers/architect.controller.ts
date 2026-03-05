import { Request, Response, NextFunction } from 'express';
import { callGemini, parseJSON } from '../services/gemini.service';
import { buildResumeArchitectPrompt, buildJDMatchPrompt } from '../services/prompt.service';
import { AppError } from '../middleware/errorHandler';
import {
    ResumeArchitectRequest,
    JDMatchRequest,
    ModernTwoColumnResult,
    ATSSingleColumnResult,
    JDMatchResult,
} from '../types';

// â”€â”€ POST /api/resume/architect â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function buildResume(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { templateChoice, userData } = req.body as ResumeArchitectRequest;

        const prompt = buildResumeArchitectPrompt(templateChoice, userData);

        let raw: string;
        try {
            raw = await callGemini(prompt, 8192);
        } catch (e) {
            throw new AppError(
                `AI service unavailable: ${(e as Error).message}`,
                'ClaudeError',
                502
            );
        }

        let result: ModernTwoColumnResult | ATSSingleColumnResult;
        try {
            result = parseJSON<ModernTwoColumnResult | ATSSingleColumnResult>(raw);
        } catch {
            console.error('[architect] RAW GEMINI OUTPUT:', raw?.slice(0, 500));
            throw new AppError(
                'AI returned malformed JSON. Please try again.',
                'ClaudeError',
                502
            );
        }

        res.json({ success: true, templateChoice, data: result });
    } catch (err) {
        next(err);
    }
}

// â”€â”€ POST /api/resume/match â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function matchJD(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { resumeText, jobDescription } = req.body as JDMatchRequest;

        const prompt = buildJDMatchPrompt(resumeText, jobDescription);

        let raw: string;
        try {
            raw = await callGemini(prompt, 8192);
        } catch (e) {
            throw new AppError(
                `AI service unavailable: ${(e as Error).message}`,
                'ClaudeError',
                502
            );
        }

        let result: JDMatchResult;
        try {
            result = parseJSON<JDMatchResult>(raw);
        } catch {
            console.error('[match] RAW GEMINI OUTPUT:', raw?.slice(0, 500));
            throw new AppError(
                'AI returned malformed JSON. Please try again.',
                'ClaudeError',
                502
            );
        }

        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

