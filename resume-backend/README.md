# resume-backend

Node.js + Express + TypeScript API powering the Resume Copilot app. Uses Anthropic Claude for all AI operations.

## Setup

```bash
cd resume-backend

# 1. Install dependencies
npm install

# 2. Create your env file
copy .env.example .env
# Open .env and fill in:
#   ANTHROPIC_API_KEY=sk-ant-...
#   PORT=3001
#   ALLOWED_ORIGINS=http://localhost:5173

# 3. Start dev server (hot reload)
npm run dev

# 4. Build for production
npm run build
npm start
```

## Connecting the Frontend

In your React app (or `.env` at the Vite root), set:

```
VITE_API_URL=http://localhost:3001
```

Then in your fetch calls:
```js
const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resume/generate`, { ... });
```

---

## Endpoints

All file uploads use `multipart/form-data`. All JSON endpoints use `Content-Type: application/json`.

### Health

```bash
curl http://localhost:3001/api/health
# { "status": "ok", "uptime": 12.5, "timestamp": "...", "claude": "reachable" }
```

---

### Resume

#### POST /api/resume/generate
Generate a full resume from structured input.
```bash
curl -X POST http://localhost:3001/api/resume/generate \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": { "name": "Aaditya Gupta", "email": "a@example.com" },
    "targetJob": "Full Stack Engineer",
    "background": "2 years building React + Node apps at a fintech startup",
    "skills": ["TypeScript", "React", "Node.js"],
    "tone": "professional"
  }'
```

#### POST /api/resume/optimize
Optimize an uploaded resume for a job description.
```bash
curl -X POST http://localhost:3001/api/resume/optimize \
  -F "file=@resume.pdf" \
  -F "jobDescription=We are looking for a senior Node.js engineer..."
```

#### POST /api/resume/cover-letter
Generate a cover letter from text context (no file upload).
```bash
curl -X POST http://localhost:3001/api/resume/cover-letter \
  -H "Content-Type: application/json" \
  -d '{
    "resumeContext": "3 years experience in React and TypeScript at XYZ Corp...",
    "jobDescription": "Looking for a frontend engineer...",
    "companyName": "Stripe",
    "tone": "professional"
  }'
```

---

### ATS

#### POST /api/ats/score
Score a resume upload with a detailed breakdown.
```bash
curl -X POST http://localhost:3001/api/ats/score \
  -F "resume=@resume.pdf" \
  -F "jobDescription=Optional JD text here"
```

#### POST /api/ats/analyze
Quick ATS analysis against a required JD.
```bash
curl -X POST http://localhost:3001/api/ats/analyze \
  -F "file=@resume.pdf" \
  -F "jobDescription=We need a Python backend engineer with 3+ years..."
```

#### POST /api/ats/tailor
Rewrite resume to match a JD, with a change log.
```bash
curl -X POST http://localhost:3001/api/ats/tailor \
  -F "resume=@resume.pdf" \
  -F "jobDescription=Senior backend role requiring Go and Kubernetes..." \
  -F "tone=executive"
```

---

### Cover Letter (file-upload variant)

#### POST /api/cover-letter/generate
Generate a cover letter from an uploaded resume file.
```bash
curl -X POST http://localhost:3001/api/cover-letter/generate \
  -F "file=@resume.pdf" \
  -F "jobDescription=Looking for a product engineer..." \
  -F "companyName=Notion" \
  -F "tone=conversational"
```

---

### Improve

#### POST /api/improve/suggestions
Deep improvement suggestions with before/after bullets.
```bash
curl -X POST http://localhost:3001/api/improve/suggestions \
  -F "resume=@resume.pdf" \
  -F "jobDescription=Optional JD" \
  -F "focusAreas=bullets,skills"
```

#### POST /api/improve/rewrite-section
Rewrite a single section with 2 alternatives.
```bash
curl -X POST http://localhost:3001/api/improve/rewrite-section \
  -H "Content-Type: application/json" \
  -d '{
    "section": "summary",
    "content": "Experienced developer with skills in many technologies.",
    "tone": "professional",
    "context": "Applying for a senior role at a Series B startup"
  }'
```

---

## Rate Limits (per IP, per minute)

| Limiter | Routes | Max |
|---------|--------|-----|
| `generateLimiter` | /resume/generate, /resume/optimize, /resume/cover-letter, /cover-letter/generate, /improve/suggestions | 10/min |
| `atsLimiter` | /ats/analyze, /ats/score | 15/min |
| `tailorLimiter` | /ats/tailor, /improve/rewrite-section | 8/min |
| `defaultLimiter` | All routes (catch-all) | 30/min |

## Error Response Shape

All errors return:
```json
{ "success": false, "error": "Human-readable message", "code": "ERROR_CODE" }
```

Codes: `CLAUDE_ERROR` · `PARSE_ERROR` · `FILE_ERROR` · `VALIDATION_ERROR`
