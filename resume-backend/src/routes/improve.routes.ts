import { Router } from 'express';
import { upload } from '../middleware/upload';
import { generateLimiter, tailorLimiter } from '../middleware/rateLimit';
import { validate } from '../middleware/validate';
import { RewriteSectionSchema } from '../types';
import { improveSuggestions, rewriteSection } from '../controllers/improve.controller';

const router = Router();

// POST /api/improve/suggestions — multipart: file (resume) + optional jobDescription + focusAreas
router.post('/suggestions', generateLimiter, upload.single('resume'), improveSuggestions);

// POST /api/improve/rewrite-section — JSON body validated via Zod
router.post('/rewrite-section', tailorLimiter, validate(RewriteSectionSchema), rewriteSection);

export default router;
