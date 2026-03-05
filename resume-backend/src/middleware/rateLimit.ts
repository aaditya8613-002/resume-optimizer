import rateLimit from 'express-rate-limit';

const limitResponse = {
    success: false,
    error: 'Too many requests. Try again shortly.',
};

const make = (max: number, windowMs = 60_000) =>
    rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (_req, res) => res.status(429).json(limitResponse),
    });

export const generateLimiter = make(10);   // cover letter / resume generation
export const atsLimiter = make(15);   // ATS analysis
export const tailorLimiter = make(8);    // tailoring (heavier Claude call)
export const defaultLimiter = make(30);   // general routes
