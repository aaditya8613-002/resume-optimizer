import React, { useState } from 'react';
import ResumeCopilot from './ResumeCopilot';

// ── Shared UI ──────────────────────────────────────────────────────
function TabBtn({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
                background: active ? '#f1f5f9' : 'transparent',
                color: active ? 'hsl(var(--text-main))' : 'hsl(var(--text-muted))',
                fontWeight: active ? 600 : 500, border: 'none',
                transition: 'all 0.15s ease', fontSize: '0.9rem',
                boxShadow: active ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }}
        >
            <span style={{ display: 'flex', color: active ? 'hsl(var(--accent))' : 'inherit' }}>{icon}</span> {label}
        </button>
    );
}

// ── JD Match Tool ──────────────────────────────────────────────────
function JdMatchTool() {
    const [resumeText, setResumeText] = useState('');
    const [jd, setJd] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true); setError('');
        const fd = new FormData(); fd.append('file', file);
        try {
            const res = await fetch('/api/resume/parse', { method: 'POST', body: fd });
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || 'Failed to parse PDF.');
            setResumeText(prev => prev ? prev + '\n\n' + json.data.text : json.data.text);
        } catch (err) { setError(err.message); }
        setUploading(false);
        e.target.value = null; // reset input
    };

    const handleRun = async () => {
        if (resumeText.length < 50 || jd.length < 50) return setError('Need at least 50 chars for both.');
        setError(''); setLoading(true); setResult(null);
        try {
            const res = await fetch('/api/resume/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeText, jobDescription: jd })
            });
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || 'Failed to match.');
            setResult(json.data);
        } catch (e) { setError(e.message); }
        setLoading(false);
    };

    return (
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', background: 'white' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'hsl(var(--text-main))', fontFamily: 'Playfair Display, serif' }}>JD Match Analysis</h3>
            <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.95rem', marginBottom: '32px' }}>Compare your resume against a specific Job Description to find keyword gaps and get tailored bullets.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--text-main))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Resume Text</label>
                        <label className="btn-secondary" style={{ padding: '4px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', borderRadius: '100px' }}>
                            {uploading ? 'Parsing...' : '📄 Upload PDF'}
                            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                        </label>
                    </div>
                    <textarea placeholder="Paste your resume here..." value={resumeText} onChange={e => setResumeText(e.target.value)} style={{ width: '100%', height: '220px', background: '#f8fafc', border: '1px solid hsl(var(--border))', borderRadius: '12px', padding: '16px', color: 'hsl(var(--text-main))', fontSize: '0.85rem', resize: 'vertical' }} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--text-main))', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Job Description</label>
                    <textarea placeholder="Paste the target job description..." value={jd} onChange={e => setJd(e.target.value)} style={{ width: '100%', height: '220px', background: '#f8fafc', border: '1px solid hsl(var(--border))', borderRadius: '12px', padding: '16px', color: 'hsl(var(--text-main))', fontSize: '0.85rem', resize: 'vertical' }} />
                </div>
            </div>

            {error && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '16px' }}>{error}</div>}

            <button className="btn-primary" onClick={handleRun} disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: '8px' }}>
                {loading ? 'Analyzing...' : 'Run Match Analysis →'}
            </button>

            {result && (
                <div style={{ marginTop: '40px', borderTop: '1px solid hsl(var(--border))', paddingTop: '40px', animation: 'fadeIn 0.4s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'hsl(var(--accent-light))', border: '4px solid hsl(var(--accent))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px hsla(211, 90%, 40%, 0.15)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'hsl(var(--accent))', lineHeight: 1 }}>{result.matchScore}%</div>
                            <div style={{ fontSize: '0.75rem', color: 'hsl(var(--accent-hover))', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px' }}>Match</div>
                        </div>
                        <div>
                            <h4 style={{ color: 'hsl(var(--text-main))', margin: '0 0 12px', fontSize: '1.4rem', fontFamily: 'Playfair Display, serif' }}>Grade: {result.matchGrade}</h4>
                            {result.topSuggestions.map((s, i) => <div key={i} style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))', marginBottom: '6px' }}>💡 {s}</div>)}
                        </div>
                    </div>

                    <h4 style={{ color: 'hsl(var(--text-main))', fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700 }}>Keyword Gaps</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                        {result.keywordGaps.map((g, i) => (
                            <div key={i} style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}>
                                <span style={{ color: '#dc2626', fontWeight: 700 }}>{g.keyword}</span> <span style={{ color: '#991b1b', opacity: 0.7 }}>— {g.context}</span>
                            </div>
                        ))}
                    </div>

                    <h4 style={{ color: 'hsl(var(--text-main))', fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700 }}>Tailored Bullets (for this JD)</h4>
                    {result.tailoredBullets.map((b, i) => (
                        <div key={i} style={{ background: '#f8fafc', border: '1px solid hsl(var(--border))', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
                            <div style={{ fontSize: '0.85rem', color: '#ef4444', textDecoration: 'line-through', marginBottom: '10px' }}>{b.original}</div>
                            <div style={{ fontSize: '0.95rem', color: 'hsl(var(--accent-hover))', fontWeight: 500 }}>→ {b.rewritten}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Cover Letter Tool ──────────────────────────────────────────────
function CoverLetterTool() {
    const [resumeData, setResumeData] = useState('');
    const [jd, setJd] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true); setError('');
        const fd = new FormData(); fd.append('file', file);
        try {
            const res = await fetch('/api/resume/parse', { method: 'POST', body: fd });
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || 'Failed to parse PDF.');
            setResumeData(prev => prev ? prev + '\n\n' + json.data.text : json.data.text);
        } catch (err) { setError(err.message); }
        setUploading(false);
        e.target.value = null; // reset input
    };

    const handleRun = async () => {
        if (resumeData.length < 50 || jd.length < 50) return setError('Need more context.');
        setError(''); setLoading(true); setResult('');
        try {
            const res = await fetch('/api/cover-letter/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeText: resumeData, jobDescription: jd, companyName: company })
            });
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || 'Failed to generate.');
            setResult(json.data.coverLetter);
        } catch (e) { setError(e.message); }
        setLoading(false);
    };

    return (
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '700px', margin: '0 auto', background: 'white' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'hsl(var(--text-main))', fontFamily: 'Playfair Display, serif' }}>Cover Letter Generator</h3>
            <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.95rem', marginBottom: '32px' }}>Drafts a strict, 400-word max professional letter free of AI fluff.</p>

            <div style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
                <input type="text" placeholder="Target Company Name" value={company} onChange={e => setCompany(e.target.value)} style={{ width: '100%', padding: '16px', background: '#f8fafc', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--text-main))', fontSize: '0.9rem' }} />

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--text-main))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Resume Data</label>
                        <label className="btn-secondary" style={{ padding: '4px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', borderRadius: '100px' }}>
                            {uploading ? 'Parsing...' : '📄 Upload PDF'}
                            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                        </label>
                    </div>
                    <textarea placeholder="Your Resume Data / Background" value={resumeData} onChange={e => setResumeData(e.target.value)} style={{ width: '100%', height: '140px', background: '#f8fafc', border: '1px solid hsl(var(--border))', borderRadius: '12px', padding: '16px', color: 'hsl(var(--text-main))', fontSize: '0.9rem', resize: 'vertical' }} />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--text-main))', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Job Description</label>
                    <textarea placeholder="Job Description" value={jd} onChange={e => setJd(e.target.value)} style={{ width: '100%', height: '140px', background: '#f8fafc', border: '1px solid hsl(var(--border))', borderRadius: '12px', padding: '16px', color: 'hsl(var(--text-main))', fontSize: '0.9rem', resize: 'vertical' }} />
                </div>
            </div>

            {error && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '16px' }}>{error}</div>}

            <button className="btn-primary" onClick={handleRun} disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: '8px' }}>
                {loading ? 'Writing...' : 'Draft Cover Letter →'}
            </button>

            {result && (
                <div style={{ marginTop: '32px' }}>
                    <div style={{ padding: '24px', background: '#e5e7eb', color: '#111827', borderRadius: '8px', fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'serif' }}>
                        {result}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Dashboard Layout ───────────────────────────────────────────────
export default function ToolsDashboard() {
    const [activeTab, setActiveTab] = useState('architect');

    const tabs = [
        {
            id: 'architect',
            label: 'Resume Builder',
            sublabel: 'AI-powered resume',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
            )
        },
        {
            id: 'match',
            label: 'JD Matcher',
            sublabel: 'Beat the ATS filter',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            )
        },
        {
            id: 'coverletter',
            label: 'Cover Letter',
            sublabel: 'Tailored in seconds',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
            )
        },
    ];

    return (
        <section id="tool" style={{ background: 'hsl(var(--bg-dark))', paddingTop: '70px', paddingBottom: '80px' }}>
            <div className="container">

                {/* Big bold tab selector */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0', marginBottom: '56px', flexWrap: 'wrap' }}>
                    {tabs.map((tab, i) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                                    padding: '20px 40px',
                                    background: isActive ? 'white' : 'transparent',
                                    color: isActive ? 'hsl(var(--accent))' : 'hsl(var(--text-muted))',
                                    border: 'none',
                                    borderBottom: isActive ? `3px solid hsl(var(--accent))` : '3px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    fontFamily: 'DM Sans, sans-serif',
                                    minWidth: '160px',
                                    borderRadius: i === 0 ? '10px 0 0 0' : i === tabs.length - 1 ? '0 10px 0 0' : '0',
                                    boxShadow: isActive ? '0 -2px 12px rgba(10,102,194,0.08)' : 'none',
                                }}
                            >
                                <span style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: '44px', height: '44px', borderRadius: '12px',
                                    background: isActive ? 'hsla(211,90%,40%,0.08)' : 'transparent',
                                    color: isActive ? 'hsl(var(--accent))' : '#9ca3af',
                                    transition: 'all 0.2s',
                                }}>
                                    {tab.icon}
                                </span>
                                <span style={{
                                    fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em',
                                    color: isActive ? 'hsl(var(--text-main))' : '#6b7280',
                                }}>
                                    {tab.label}
                                </span>
                                <span style={{
                                    fontSize: '0.75rem', color: isActive ? 'hsl(var(--accent))' : '#9ca3af',
                                    fontWeight: 500,
                                }}>
                                    {tab.sublabel}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {activeTab === 'architect' && <div><ResumeCopilot /></div>}
                {activeTab === 'match' && <JdMatchTool />}
                {activeTab === 'coverletter' && <CoverLetterTool />}
            </div>
        </section>
    );
}
