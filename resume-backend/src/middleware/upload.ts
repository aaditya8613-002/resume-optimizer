import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const ALLOWED_MIMETYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
];

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const storage = multer.memoryStorage();

function fileFilter(
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): void {
    if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const err = Object.assign(
            new Error(`Unsupported file type "${file.mimetype}". Upload a PDF or DOCX.`),
            { status: 415, name: 'FileError' }
        );
        cb(err as unknown as null, false);
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_SIZE_BYTES },
});
