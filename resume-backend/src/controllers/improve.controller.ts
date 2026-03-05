import { Request, Response, NextFunction } from 'express';
import { callGemini, parseJSON } from '../services/gemini.service';
import { extractTextFromFile } from '../services/parser.service';
import { buildImproveSuggestionsPrompt, buildRewriteSectionPrompt } from '../services/prompt.service';
import { AppError } from '../middleware/errorHandler';

// â”€â”€ Typed shapes for Claude responses â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface BulletImprovement {
    original: string;
    improved: string;
    principle: string;
}

interface SkillsSuggestion {
    current: string[];
    suggested_additions: string[];
    suggested_removals: string[];
    reasoning: string;
}

interface Gap {
    area: string;
    issue: string;
    fix: string;
}

interface SectionsResult {
    summary: { current: string | null; rewritten: string; reasoning: string };
    bullets: BulletImprovement[];
    skills: SkillsSuggestion;
    gaps: Gap[];
}

interface SuggestionsResult {
    executiveSummary: string;
    sections: SectionsResult;
    prioritizedActionList: { priority: number; action: string; impact: string }[];
}

interface RewriteResult {
    original: string;
    rewritten: string;
    alternatives: string[];
    explanation: string;
}

// â”€â”€ POST /api/improve/suggestions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function improveSuggestions(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const file = req.file;
        const { jobDescription, focusAreas } = req.body as {
            jobDescription?: string;
            focusAreas?: string | string[];
        };

        if (!file) throw new AppError('No resume file uploaded.', 'FileError', 400);

        let resumeText: string;
        try {
            resumeText = await extractTextFromFile(file);
        } catch (e) {
            throw new AppError((e as Error).message, 'FileError', 422);
        }

        // focusAreas may arrive as comma-separated string or array from form-data
        const focusArray: string[] | undefined =
            typeof focusAreas === 'string'
                ? focusAreas.split(',').map((s) => s.trim()).filter(Boolean)
                : focusAreas;

        const prompt = buildImproveSuggestionsPrompt(resumeText, jobDescription, focusArray);
        const raw = await callGemini(prompt, 2048);

        let result: SuggestionsResult;
        try {
            result = parseJSON<SuggestionsResult>(raw);
        } catch {
            throw new AppError('Claude returned invalid JSON.', 'ClaudeError', 502);
        }

        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

// â”€â”€ POST /api/improve/rewrite-section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface RewriteBody {
    section: string;
    content: string;
    tone: string;
    context?: string;
}

export async function rewriteSection(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { section, content, tone, context } = req.body as RewriteBody;

        const prompt = buildRewriteSectionPrompt(section, content, tone, context);
        const raw = await callGemini(prompt, 1024);

        let result: RewriteResult;
        try {
            result = parseJSON<RewriteResult>(raw);
        } catch {
            throw new AppError('Claude returned invalid JSON.', 'ClaudeError', 502);
        }

        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

