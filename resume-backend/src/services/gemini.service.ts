import { GoogleGenerativeAI } from '@google/generative-ai';

// Fallback chain: tries each model in order until one succeeds
const MODEL_CHAIN = [
    'gemini-2.5-flash',
    'gemini-2.0-flash-001',
    'gemini-2.0-flash',
];

function getGenAI(): GoogleGenerativeAI {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is missing from environment variables.');
    }
    return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

/**
 * Strips any markdown code fences that Gemini sometimes wraps around JSON output.
 * Handles: ```json ... ```, ``` ... ```, and stray backtick blocks.
 */
function stripMarkdownFences(raw: string): string {
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) return fenceMatch[1].trim();
    return raw.replace(/^```(?:json)?[\r\n]?/, '').replace(/```\s*$/, '').trim();
}

async function attemptWithModel(model: string, prompt: string, maxTokens: number): Promise<string> {
    const m = getGenAI().getGenerativeModel({
        model,
        generationConfig: { maxOutputTokens: maxTokens },
    });
    const result = await m.generateContent(prompt);
    const raw = result.response.text().trim();
    return stripMarkdownFences(raw);
}

async function attempt(prompt: string, maxTokens: number): Promise<string> {
    let lastError: unknown;
    for (const model of MODEL_CHAIN) {
        try {
            console.log(`[gemini] trying model: ${model}`);
            const result = await attemptWithModel(model, prompt, maxTokens);
            console.log(`[gemini] succeeded with: ${model}`);
            return result;
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            // Only fallback on 503 (overloaded) or 429 (quota). Re-throw 400/403/404.
            if (msg.includes('503') || msg.includes('429') || msg.includes('Service Unavailable') || msg.includes('Too Many Requests')) {
                console.warn(`[gemini] ${model} failed (${msg.slice(0, 80)}), trying next...`);
                lastError = err;
            } else {
                throw err; // Hard error — don't retry different model
            }
        }
    }
    throw lastError ?? new Error('All Gemini models exhausted.');
}

export async function callGemini(prompt: string, maxTokens: number): Promise<string> {
    try {
        return await attempt(prompt, maxTokens);
    } catch (_firstError) {
        // Single retry
        try {
            return await attempt(prompt, maxTokens);
        } catch (retryError) {
            throw new Error(
                `Gemini call failed after retry: ${retryError instanceof Error ? retryError.message : String(retryError)}`
            );
        }
    }
}

export function parseJSON<T>(raw: string): T {
    const cleaned = stripMarkdownFences(raw);
    try {
        return JSON.parse(cleaned) as T;
    } catch {
        throw new Error(`Failed to parse Gemini response as JSON. Raw: ${cleaned.slice(0, 300)}`);
    }
}
