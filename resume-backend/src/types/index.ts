import { z } from 'zod';

// ── Rewrite section schema ────────────────────────────────────────
export const RewriteSectionSchema = z.object({
    section: z.string().min(1, 'section is required'),
    content: z.string().min(1, 'content is required'),
    tone: z.enum(['professional', 'conversational', 'executive', 'entry-level']),
    context: z.string().optional(),
});
export type RewriteSectionRequest = z.infer<typeof RewriteSectionSchema>;

// ── Existing schemas ───────────────────────────────────────────────
export const OptimizeResumeSchema = z.object({
    resumeText: z.string().min(1, 'Resume text is required'),
    jobDescription: z.string().min(1, 'Job description is required'),
});

export const CoverLetterSchema = z.object({
    resumeText: z.string().min(1, 'Resume text is required'),
    jobDescription: z.string().min(1, 'Job description is required'),
    companyName: z.string().optional(),
});

// ── Resume Generate schema ─────────────────────────────────────────
export const ResumeGenerateSchema = z.object({
    personalInfo: z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email').optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        linkedin: z.string().url('Invalid LinkedIn URL').optional(),
        portfolio: z.string().url('Invalid portfolio URL').optional(),
    }),
    jobTitle: z.string().optional(),
    targetJob: z.string().min(1, 'targetJob is required'),
    background: z.string().min(1, 'background is required').max(1000, 'background must be 1000 chars or less'),
    skills: z.array(z.string()).optional().default([]),
    experience: z.array(z.string()).optional().default([]),
    education: z.object({
        degree: z.string().optional(),
        school: z.string().optional(),
        year: z.string().optional(),
    }).optional(),
    tone: z.enum(['professional', 'conversational', 'executive', 'entry-level']).default('professional'),
    targetJobDescription: z.string().optional(),
});

// ── Inferred types ─────────────────────────────────────────────────
export type OptimizeResumeRequest = z.infer<typeof OptimizeResumeSchema>;
export type CoverLetterRequest = z.infer<typeof CoverLetterSchema>;
export type ResumeInput = z.infer<typeof ResumeGenerateSchema>;

// ── Response interfaces ────────────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface OptimizeResumeResponse {
    optimizedResume: string;
}

export interface CoverLetterResponse {
    coverLetter: string;
}

export interface GeneratedResumeResponse {
    summary: string;
    experience: {
        title: string;
        company: string;
        dates: string;
        bullets: string[];
    }[];
    education: {
        degree: string;
        school: string;
        year: string;
    };
    skills: string[];
    keywords: string[];
}

// ── Resume Architect schemas ───────────────────────────────────────
export const ResumeArchitectSchema = z.object({
    templateChoice: z.enum(['modern_two_column', 'ats_single_column'], {
        errorMap: () => ({ message: "templateChoice must be 'modern_two_column' or 'ats_single_column'" }),
    }),
    userData: z
        .string({ required_error: 'userData is required' })
        .min(50, 'userData must be at least 50 characters')
        .max(5000, 'userData must be 5000 characters or less'),
});
export type ResumeArchitectRequest = z.infer<typeof ResumeArchitectSchema>;

// ── JD Match schema ────────────────────────────────────────────────
export const JDMatchSchema = z.object({
    resumeText: z
        .string({ required_error: 'resumeText is required' })
        .min(50, 'resumeText must be at least 50 characters')
        .max(5000, 'resumeText must be 5000 characters or less'),
    jobDescription: z
        .string({ required_error: 'jobDescription is required' })
        .min(50, 'jobDescription must be at least 50 characters')
        .max(3000, 'jobDescription must be 3000 characters or less'),
});
export type JDMatchRequest = z.infer<typeof JDMatchSchema>;

// ── Architect response shapes ──────────────────────────────────────
export interface ArchitectApiScore {
    total: number;
    suggestions: string[];
}

export interface ModernTwoColumnResult {
    api_score: ArchitectApiScore;
    resume_data: {
        header: { initials: string; name: string; title: string; contact_line: string };
        main: {
            summary: string;
            experience: { role: string; company: string; meta: string; bullets: string[] }[];
            education: { degree: string; school: string; meta: string }[];
        };
        sidebar: {
            skill_groups: { label: string; tags: string[] }[];
            proficiency: { name: string; percentage: number }[];
        };
    };
}

export interface ATSSingleColumnResult {
    api_score: ArchitectApiScore;
    resume_data: {
        header: { name: string; contact_line: string };
        summary: string;
        education: { timeline: string; degree_and_major: string; institution_and_score: string }[];
        experience: { header_left: string; header_right: string; bullets: string[] }[];
        technical_skills: { languages: string; developer_tools: string; frameworks: string };
        projects: { title_with_stack: string; bullets: string[] }[];
        achievements: string[];
    };
}

export interface JDMatchResult {
    matchScore: number;
    matchGrade: string;
    keywordGaps: { keyword: string; context: string }[];
    tailoredBullets: { original: string; rewritten: string; section: string }[];
    topSuggestions: string[];
}
