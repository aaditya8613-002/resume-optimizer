import { ResumeInput } from '../types';

const TONE_MAP: Record<string, string> = {
  professional: 'authoritative, polished, and results-driven',
  conversational: 'approachable and direct while remaining professional',
  executive: 'strategic, high-level, and leadership-focused',
  'entry-level': 'eager, growth-oriented, and emphasising transferable skills',
};

// ── POST /api/resume/generate ──────────────────────────────────────
export function buildGeneratePrompt(data: ResumeInput): string {
  const {
    personalInfo,
    targetJob,
    background,
    skills = [],
    experience = [],
    education,
    tone = 'professional',
    targetJobDescription,
  } = data;

  const toneDesc = TONE_MAP[tone] ?? TONE_MAP.professional;

  return `You are an expert resume writer. Generate a polished, ATS-optimised resume.

TONE: ${toneDesc}
CANDIDATE NAME: ${personalInfo.name}
EMAIL: ${personalInfo.email ?? 'Not provided'}
PHONE: ${personalInfo.phone ?? 'Not provided'}
LOCATION: ${personalInfo.location ?? 'Not provided'}
LINKEDIN: ${personalInfo.linkedin ?? 'Not provided'}
PORTFOLIO: ${personalInfo.portfolio ?? 'Not provided'}

TARGET JOB TITLE: ${targetJob}
BACKGROUND: ${background}
SKILLS: ${skills.join(', ') || 'Not provided'}
EXPERIENCE NOTES: ${experience.join('\n') || 'Not provided'}
EDUCATION: ${education ? `${education.degree ?? ''} from ${education.school ?? ''} (${education.year ?? ''})` : 'Not provided'}
${targetJobDescription ? `JOB DESCRIPTION:\n${targetJobDescription}` : ''}

RULES:
- Start every bullet point with a strong action verb (Architected, Engineered, Spearheaded, Optimised, Delivered, Reduced, Launched, Automated).
- Every bullet must include at least one quantified achievement (%, $, # users, time saved, etc.).
- 3+ bullets per role. Tone: ${toneDesc}.
- Do NOT fabricate experience. Only use what the candidate provided.

Return ONLY valid JSON — no markdown, no fences:
{
  "summary": "<3-sentence professional summary>",
  "experience": [
    { "title": "<role>", "company": "<company>", "dates": "<date range>", "bullets": ["<bullet>"] }
  ],
  "education": { "degree": "<degree>", "school": "<school>", "year": "<year>" },
  "skills": ["<skill>"],
  "keywords": ["<ATS keyword>"]
}`;
}

// ── POST /api/resume/optimize ──────────────────────────────────────
export function buildOptimizePrompt(resumeText: string, jd: string): string {
  return `You are a senior ATS specialist. Rewrite this resume to maximise match with the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jd}

RULES:
- Mirror the exact keywords and phrases from the JD where truthful.
- Replace weak verbs with power verbs (Architected, Spearheaded, Delivered, Optimised).
- Add quantified achievements where the candidate hinted at results.
- Keep all facts truthful — do not invent experience.
- Output a clean, ATS-safe plain-text resume.

Return ONLY valid JSON:
{ "optimizedResume": "<full rewritten resume as plain text>" }`;
}

// ── POST /api/resume/generate (structured JSON output) ─────────────
export function buildATSScorePrompt(resumeText: string, jd?: string): string {
  const jdSection = jd
    ? `\nJOB DESCRIPTION:\n${jd}\n`
    : '\nNo JD provided — score using general industry benchmarks.\n';

  return `You are the Antigravity Career Agent. Your mission: calculate an honest API Score for this resume.

RESUME:
${resumeText}
${jdSection}

SCORING DIMENSIONS (weight shown):

1. QUANTIFIABLE RESULTS (30%)
   Award full marks only if bullets contain hard metrics: percentages, time saved, users impacted, revenue, rankings.
   Examples that score well: "30% performance optimization", "40% faster page loads", "Led team of 8".
   Examples that score poorly: "improved performance", "worked on features".

2. TECHNICAL DEPTH (30%)
   Award full marks for specific, named technologies rather than generic terms.
   Examples that score well: "OpenAI API", "Socket.io", "Cloud MongoDB", "Puppeteer", "JWT authentication", "Firebase".
   Examples that score poorly: "various tools", "modern frameworks", "databases".

3. ACTION VERBS (20%)
   Award full marks for high-impact, specific verbs at the start of every bullet.
   Power verbs: Architected, Systemized, Spearheaded, Engineered, Optimized, Deployed, Reduced, Automated, Launched.
   Weak verbs: Responsible for, Helped, Worked on, Assisted, Was part of.

4. COMPLETENESS (20%)
   Award full marks if resume includes: LinkedIn, GitHub/portfolio links, professional summary, certifications,
   clearly structured sections (Header, Objective, Skills, Experience, Projects, Achievements).

SCORING RULES:
- Be strict and honest. Most resumes score 40–70. Only truly exceptional ones score 85+.
- Weighted average: apiScore = (quantifiable*0.3 + technical*0.3 + verbs*0.2 + completeness*0.2) * 100
- For missingPowerKeywords: list specific tech terms or verbs the candidate should add (max 8).
- For quickFixes: give 3 specific, immediately actionable instructions with examples.

Return ONLY raw JSON — no markdown, no code fences:
{
  "apiScore": <0-100 integer>,
  "grade": "<Diamond/Platinum/Gold/Silver/Bronze>",
  "breakdown": {
    "quantifiableResults": {
      "score": <0-100>,
      "weight": 30,
      "examples": ["<good bullet found>"],
      "missing": ["<vague bullet that needs a metric>"],
      "comment": "<1 sentence>"
    },
    "technicalDepth": {
      "score": <0-100>,
      "weight": 30,
      "foundTools": ["<specific tool found>"],
      "suggestedTools": ["<relevant tool to add>"],
      "comment": "<1 sentence>"
    },
    "actionVerbs": {
      "score": <0-100>,
      "weight": 20,
      "powerVerbsFound": ["<strong verb>"],
      "weakPhrasesFound": ["<weak phrase>"],
      "replacements": [{"from": "<weak>", "to": "<strong>"}],
      "comment": "<1 sentence>"
    },
    "completeness": {
      "score": <0-100>,
      "weight": 20,
      "present": ["<section found>"],
      "missing": ["<section missing>"],
      "comment": "<1 sentence>"
    }
  },
  "missingPowerKeywords": ["<keyword 1>", "<keyword 2>"],
  "quickFixes": [
    "<specific fix 1 with example>",
    "<specific fix 2 with example>",
    "<specific fix 3 with example>"
  ]
}`;
}

export function buildBetterWordPrompt(text: string): string {
  return `You are a Resume Copywriter. Rewrite this project/experience description for maximum impact using the Problem-Action-Result (PAR) framework.

INPUT:
${text}

STYLE GUIDE:
- Instead of "made" → use "Designed and implemented" or "Developed a full-stack platform"
- Instead of "did" → use "Streamlined core operations" or "Leveraged AI to analyze content"
- Instead of "was the leader" → use "Led a team of N in..." or "Spearheaded the development of..."
- Instead of "worked on" → use "Architected", "Engineered", "Optimised", "Deployed"
- Every bullet must reference the specific tech stack used (e.g. "Using Python, OpenCV, and NumPy")
- Every bullet must end with a measurable result or concrete outcome

Return ONLY raw JSON — no markdown, no code fences:
{
  "rewritten": "<improved version as 2-4 bullet points, each starting on new line with •>",
  "powerVerbsUsed": ["<verb 1>", "<verb 2>"],
  "techStackMentioned": ["<tech 1>", "<tech 2>"]
}`;
}

export function buildImproveSuggestionsPrompt(
  resumeText: string,
  jd?: string,
  focusAreas?: string[]
): string {
  const jdSection = jd ? `\nJOB DESCRIPTION:\n${jd}\n` : '';
  const focusSection = focusAreas?.length
    ? `\nFOCUS AREAS: ${focusAreas.join(', ')}\n`
    : '';

  return `You are a senior career coach and resume strategist. Provide deep, actionable improvement suggestions.

RESUME:
${resumeText}
${jdSection}${focusSection}

Return ONLY raw JSON — no markdown, no code fences:
{
  "executiveSummary": "<2-sentence overall assessment>",
  "sections": {
    "summary": {
      "current": "<current summary or null>",
      "rewritten": "<improved version>",
      "reasoning": "<why this is better>"
    },
    "bullets": [
      { "original": "<original bullet>", "improved": "<improved bullet>", "principle": "<PAR/metric/verb>" }
    ],
    "skills": {
      "current": ["<current skill>"],
      "suggested_additions": ["<skill to add>"],
      "suggested_removals": ["<outdated skill>"],
      "reasoning": "<1 sentence>"
    },
    "gaps": [
      { "area": "<section>", "issue": "<problem>", "fix": "<specific fix>" }
    ]
  },
  "prioritizedActionList": [
    { "priority": 1, "action": "<most impactful change>", "impact": "<why>" }
  ]
}`;
}

export function buildRewriteSectionPrompt(
  section: string,
  content: string,
  tone: string,
  context?: string
): string {
  const toneDesc = TONE_MAP[tone] ?? TONE_MAP.professional;
  return `You are an expert resume copywriter. Rewrite the following resume section for maximum impact.

SECTION: ${section}
TONE: ${toneDesc}
${context ? `CONTEXT: ${context}\n` : ''}
CURRENT CONTENT:
${content}

RULES:
- Start bullets with strong action verbs.
- Include metrics wherever possible.
- Tone: ${toneDesc}.
- Do not fabricate experience.

Return ONLY raw JSON — no markdown, no code fences:
{
  "original": "<original content>",
  "rewritten": "<improved version>",
  "alternatives": ["<alt 1>", "<alt 2>"],
  "explanation": "<what changed and why>"
}`;
}

export function buildTailorResumePrompt(
  resumeText: string,
  jobDescription: string,
  tone = 'professional'
): string {
  const toneDesc = TONE_MAP[tone] ?? TONE_MAP.professional;
  return `You are an expert ATS resume tailor. Rewrite this resume to maximise the match score for the given job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

TONE: ${toneDesc}

RULES:
- Do not fabricate experience. Only reframe existing experience to highlight alignment.
- Mirror the exact keywords and phrases from the JD.
- Replace weak verbs with power verbs.
- Add quantified achievements where the resume hints at results.

Return ONLY raw JSON — no markdown, no code fences:
{
  "tailoredResume": {
    "summary": "<rewritten summary>",
    "experience": [
      { "title": "<role>", "company": "<company>", "dates": "<dates>", "bullets": ["<bullet>"] }
    ],
    "skills": ["<skill>"]
  },
  "changeLog": [
    { "section": "<section name>", "change": "<what was changed and why>" }
  ],
  "predictedAtsScore": <0-100 integer>
}`;
}

export function buildCoverLetterPrompt(
  resumeContext: string,
  jobDescription: string,
  companyName: string,
  tone = 'professional'
): string {
  const toneDesc = TONE_MAP[tone] ?? TONE_MAP.professional;
  return `You are an expert cover letter writer.

RESUME CONTEXT:
${resumeContext}

JOB DESCRIPTION:
${jobDescription}

COMPANY: ${companyName}
TONE: ${toneDesc}

Write a tailored cover letter. Rules:
- Maximum 400 words
- Opening: hook connecting the applicant's background to the role
- Middle: 2 specific examples of relevant achievement
- Closing: confident, not needy
- No filler phrases ("I am excited to apply...")
- Sound human — no AI-generated patterns

Return ONLY valid JSON:
{
  "coverLetter": "<the full cover letter as plain text>",
  "subject": "<suggested email subject line>"
}`;
}

// ── POST /api/resume/architect ─────────────────────────────────────
export function buildResumeArchitectPrompt(
  templateChoice: 'modern_two_column' | 'ats_single_column',
  userData: string
): string {
  const schema =
    templateChoice === 'modern_two_column'
      ? `{
  "api_score": {
    "total": <0-100>,
    "suggestions": ["<tip 1>", "<tip 2>", "<tip 3>"]
  },
  "resume_data": {
    "header": { "initials": "<2-3 letter initials>", "name": "<Full Name>", "title": "<Job Title>", "contact_line": "<email | phone | linkedin>" },
    "main": {
      "summary": "<3-sentence professional summary>",
      "experience": [ { "role": "<role>", "company": "<company>", "meta": "<date range>", "bullets": ["<strong bullet>"] } ],
      "education": [ { "degree": "<degree>", "school": "<school>", "meta": "<year range>" } ]
    },
    "sidebar": {
      "skill_groups": [ { "label": "<category e.g. Frameworks>", "tags": ["<skill>"] } ],
      "proficiency": [ { "name": "<macro skill e.g. Backend Development>", "percentage": <70-100> } ]
    }
  }
}`
      : `{
  "api_score": {
    "total": <0-100>,
    "suggestions": ["<tip 1>", "<tip 2>", "<tip 3>"]
  },
  "resume_data": {
    "header": { "name": "<Full Name>", "contact_line": "<Phone | Email | LinkedIn | GitHub>" },
    "summary": "<3-sentence professional summary>",
    "education": [ { "timeline": "<2020 - 2024>", "degree_and_major": "<B.S. Computer Science>", "institution_and_score": "<University Name (3.8 GPA)>" } ],
    "experience": [ { "header_left": "<Role - Company>", "header_right": "<Jan 2021 - Present>", "bullets": ["<strong bullet>"] } ],
    "technical_skills": { "languages": "<Java, Python>", "developer_tools": "<Git, Docker>", "frameworks": "<React, Spring>" },
    "projects": [ { "title_with_stack": "<App Name (React, Node, MongoDB)>", "bullets": ["<Tech-First bullet: TechName: describes what it does and result>"] } ],
    "achievements": ["<hackathon win / rank / publication>"]
  }
}`;

  return `You are an expert Resume Architect API. Take the user's raw data and output a complete, polished resume.

USER DATA:
${userData}

TEMPLATE: ${templateChoice}

STEP 1 — CALCULATE API SCORE (0-100):
Score based on:
- Metrics & Numbers used (e.g. "Increased sales by 20%", "Led team of 8")
- Technical Keywords used (named tools, frameworks, languages)
- Strong Action Verbs used (Spearheaded, Architected, Engineered, Optimised, Delivered)
Provide 3 short, specific suggestions to improve the score.

STEP 2 — IMPROVE WORDING:
- Start every bullet with a strong action verb
- Format specific tech clearly: "Using React, Node.js, and PostgreSQL..."
- If the user mentions a result, quantify it

STEP 3 — OUTPUT JSON:
Return ONLY the following JSON with no markdown, no code fences, no explanation:
${schema}`;
}

// ── POST /api/resume/match ─────────────────────────────────────────
export function buildJDMatchPrompt(resumeText: string, jobDescription: string): string {
  return `You are the Antigravity Career Agent. Analyse this resume against the job description in three steps.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

STEP 1 — MATCH SCORE:
Compare the candidate's skills, tools, and experience against what the JD explicitly requires.
Calculate a Match Score from 0 to 100.
Grade: 90-100 = Excellent, 70-89 = Good, 50-69 = Fair, <50 = Poor

STEP 2 — KEYWORD GAP ANALYSIS:
List every specific keyword, tool, technology, or soft skill the JD asks for that is NOT in the resume.
For each, note why it matters (which part of the JD requires it).

STEP 3 — TAILOR EXPERIENCE (NO FABRICATION):
Select 3-4 of the candidate's existing project or experience bullets.
Rewrite each to directly mirror the language and priorities of the JD.
CRITICAL RULE: Do NOT invent any experience. Do NOT add technologies the candidate never mentioned.
Only reframe their existing work to highlight overlap with the JD.

Return ONLY raw JSON — no markdown, no code fences:
{
  "matchScore": <0-100>,
  "matchGrade": "<Excellent/Good/Fair/Poor>",
  "keywordGaps": [
    { "keyword": "<missing term>", "context": "<why the JD needs it>" }
  ],
  "tailoredBullets": [
    { "original": "<original bullet>", "rewritten": "<JD-aligned rewrite>", "section": "<experience/project>" }
  ],
  "topSuggestions": [
    "<actionable tip 1>",
    "<actionable tip 2>",
    "<actionable tip 3>"
  ]
}`;
}
