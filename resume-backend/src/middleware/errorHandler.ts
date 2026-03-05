import { Request, Response, NextFunction } from 'express';

const ERROR_CODES: Record<string, string> = {
    ClaudeError: 'CLAUDE_ERROR',
    ParseError: 'PARSE_ERROR',
    FileError: 'FILE_ERROR',
    ValidationError: 'VALIDATION_ERROR',
};

// Custom error class with a code
export class AppError extends Error {
    constructor(
        message: string,
        public readonly code: keyof typeof ERROR_CODES | string,
        public readonly status: number = 500
    ) {
        super(message);
        this.name = code;
    }
}

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    // Never expose stack traces
    const code = ERROR_CODES[err.name] ?? err.name ?? 'INTERNAL_ERROR';
    const status = err instanceof AppError ? err.status : 500;
    const message = err.message || 'An unexpected error occurred';

    res.status(status).json({
        success: false,
        error: message,
        code,
    });
}
