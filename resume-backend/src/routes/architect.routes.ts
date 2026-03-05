import { Router } from 'express';
import { tailorLimiter } from '../middleware/rateLimit';
import { validate } from '../middleware/validate';
import { ResumeArchitectSchema, JDMatchSchema } from '../types';
import { buildResume, matchJD } from '../controllers/architect.controller';

const router = Router();

// POST /api/resume/architect
router.post('/architect', tailorLimiter, validate(ResumeArchitectSchema), buildResume);

// POST /api/resume/match
router.post('/match', tailorLimiter, validate(JDMatchSchema), matchJD);

export default router;
