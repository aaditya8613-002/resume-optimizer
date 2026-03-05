import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (result.success) {
            req.body = result.data; // replace with coerced/validated data
            next();
            return;
        }

        const errors = (result.error as ZodError).errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
        }));

        res.status(400).json({ success: false, errors });
    };
}
