import { Router } from 'express';
import { upload } from '../middleware/upload';
import { generateLimiter } from '../middleware/rateLimit';
import { validate } from '../middleware/validate';
import { ResumeGenerateSchema } from '../types';
import { optimizeResume, generateResume, generateCoverLetter, parseResume } from '../controllers/resume.controller';

const router = Router();

// POST /api/resume/parse — upload PDF/DOCX and return raw text
router.post('/parse', upload.single('file'), parseResume);

// POST /api/resume/optimize — upload PDF/DOCX + jobDescription
router.post('/optimize', generateLimiter, upload.single('file'), optimizeResume);

// POST /api/resume/generate — JSON body validated against ResumeGenerateSchema
router.post('/generate', generateLimiter, validate(ResumeGenerateSchema), generateResume);

// POST /api/resume/cover-letter — JSON body: resumeContext, jobDescription, companyName, tone
router.post('/cover-letter', generateLimiter, generateCoverLetter);

export default router;
