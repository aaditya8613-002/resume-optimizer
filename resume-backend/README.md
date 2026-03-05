# Resume Optimizer Backend

Node.js + Express + TypeScript API powering the Resume Optimizer app. Uses Google Gemini 2.0 Flash for all AI operations.

## Setup

```bash
cd resume-backend

# 1. Install dependencies
npm install

# 2. Create your env file
copy .env.example .env
# Open .env and fill in:
#   GEMINI_API_KEY=AIzaSyB...
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
const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resume/architect`, { ... });
```

---

## Endpoints

All file uploads use `multipart/form-data`. All JSON endpoints use `Content-Type: application/json`.

### Health

```bash
curl http://localhost:3001/api/health
# { "status": "ok", "uptime": 12.5, "timestamp": "...", "gemini": "reachable" }
```

---

### Resume Architect

#### POST /api/resume/architect
Generate a full resume from structured input or parsed text.
```bash
curl -X POST http://localhost:3001/api/resume/architect \
  -H "Content-Type: application/json" \
  -d '{
    "userData": "Name: John Doe\nEmail: john@example.com\nExperience: 2 years building React apps...",
    "templateChoice": "modern_two_column"
  }'
```

#### POST /api/resume/match
Optimize a resume for a specific job description to beat ATS.
```bash
curl -X POST http://localhost:3001/api/resume/match \
  -H "Content-Type: application/json" \
  -d '{
    "resumeData": "React Developer with 3 years experience...",
    "jobDescription": "We are looking for a senior Node.js engineer...",
    "templateChoice": "minimal_ats"
  }'
```

---

### Cover Letter

#### POST /api/cover-letter/generate
Generate a tailored cover letter from user context.
```bash
curl -X POST http://localhost:3001/api/cover-letter/generate \
  -H "Content-Type: application/json" \
  -d '{
    "userData": "3 years experience in React and TypeScript...",
    "jobDescription": "Looking for a frontend engineer...",
    "companyName": "Stripe"
  }'
```

---

## Rate Limits (per IP, per minute)

| Limiter | Routes | Max |
|---------|--------|-----|
| `generateLimiter` | /resume/architect, /resume/match, /cover-letter/generate | 10/min |
| `defaultLimiter` | All routes (catch-all) | 30/min |

## Error Response Shape

All errors return:
```json
{ "success": false, "error": "Human-readable message", "code": "ERROR_CODE" }
```

Codes: `GEMINI_ERROR` · `PARSE_ERROR` · `FILE_ERROR` · `VALIDATION_ERROR`
