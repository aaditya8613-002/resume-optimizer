import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import resumeRoutes from './routes/resume.routes';
import coverLetterRoutes from './routes/coverLetter.routes';
import atsRoutes from './routes/ats.routes';
import improveRoutes from './routes/improve.routes';
import healthRoutes from './routes/health.routes';
import architectRoutes from './routes/architect.routes';
import { errorHandler } from './middleware/errorHandler';
import { defaultLimiter } from './middleware/rateLimit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');

// ── Core middleware ───────────────────────────────────────────────
app.use(helmet());     // Secure HTTP headers (CSP, HSTS, X-Frame etc.)
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(defaultLimiter);   // 30 req/min catch-all applied to every route

// ── Routes ───────────────────────────────────────────────────────
app.use('/api/health', healthRoutes);      // GET  /api/health
app.use('/api/resume', resumeRoutes);      // POST /optimize /generate /cover-letter
app.use('/api/resume', architectRoutes);   // POST /architect /match
app.use('/api/cover-letter', coverLetterRoutes); // POST /generate
app.use('/api/ats', atsRoutes);            // POST /analyze /score /tailor
app.use('/api/improve', improveRoutes);    // POST /suggestions /rewrite-section


// ── Global error handler (must be last) ──────────────────────────
app.use(errorHandler);

// ── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`resume-backend running on http://localhost:${PORT}`);
});

export default app;
