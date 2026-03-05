import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function healthCheck(
    _req: Request,
    res: Response
): Promise<void> {
    let geminiStatus: 'reachable' | 'unreachable' = 'unreachable';

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        await model.generateContent({ contents: [{ role: 'user', parts: [{ text: 'hi' }] }] });
        geminiStatus = 'reachable';
    } catch {
        geminiStatus = 'unreachable';
    }

    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        gemini: geminiStatus,
    });
}
