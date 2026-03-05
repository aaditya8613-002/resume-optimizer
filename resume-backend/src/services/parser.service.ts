import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const MAX_CHARS = 4000;

/**
 * Normalize extracted text: collapse excessive whitespace,
 * strip non-printable characters, ensure clean UTF-8.
 */
function normalizeText(raw: string): string {
    return raw
        .replace(/\r\n/g, '\n')
        .replace(/[^\x09\x0A\x20-\x7E\u00A0-\uFFFF]/g, ' ') // strip non-printable
        .replace(/[ \t]{3,}/g, '  ')                           // collapse long spaces
        .replace(/\n{4,}/g, '\n\n')                            // collapse blank lines
        .trim();
}


export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    const data = await pdfParse(buffer);
    return data.text.trim();
}

export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
}

export async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
    const { mimetype, buffer } = file;

    let text: string;

    if (mimetype === 'application/pdf') {
        text = await extractTextFromPDF(buffer);
    } else if (
        mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mimetype === 'application/msword'
    ) {
        text = await extractTextFromDOCX(buffer);
    } else if (mimetype === 'text/plain') {
        text = buffer.toString('utf-8').trim();
    } else {
        throw new Error(`Unsupported file type: ${mimetype}. Upload a PDF, DOCX, or plain text file.`);
    }

    // Normalize and truncate to MAX_CHARS to keep prompt clean
    text = normalizeText(text);
    if (text.length > MAX_CHARS) {
        text = text.slice(0, MAX_CHARS);
    }

    return text;
}
