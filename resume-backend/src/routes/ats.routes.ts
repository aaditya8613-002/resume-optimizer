import { Router } from 'express';
import { upload } from '../middleware/upload';
import { atsLimiter, tailorLimiter } from '../middleware/rateLimit';
import { analyzeATS, scoreResume, tailorResume } from '../controllers/ats.controller';

const router = Router();

// POST /api/ats/analyze — file + required jobDescription
router.post('/analyze', atsLimiter, upload.single('file'), analyzeATS);

// POST /api/ats/score — file (field: 'resume') + optional jobDescription
router.post('/score', atsLimiter, upload.single('resume'), scoreResume);

// POST /api/ats/tailor — file (field: 'resume') + required jobDescription + optional tone
router.post('/tailor', tailorLimiter, upload.single('resume'), tailorResume);

export default router;
