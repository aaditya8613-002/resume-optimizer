import { Router } from 'express';
import { upload } from '../middleware/upload';
import { generateLimiter } from '../middleware/rateLimit';
import { generateCoverLetter } from '../controllers/coverLetter.controller';

const router = Router();

// POST /api/cover-letter/generate
// multipart/form-data: file + jobDescription + optional companyName + optional tone
router.post('/generate', generateLimiter, upload.single('file'), generateCoverLetter);

export default router;
