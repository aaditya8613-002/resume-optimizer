import React, { useState } from 'react';

// ── Inline CSS template preview thumbnails ─────────────────────────
function ModernPreview() {
    return (
        <div style={{ width: '100%', height: '180px', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', display: 'flex', fontSize: '5px', border: '1px solid hsl(var(--border))' }}>
            {/* sidebar */}
            <div style={{ width: '35%', background: '#f0f4f8', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px', borderRight: '1px solid #e2e5ec' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'hsl(var(--accent))', marginBottom: '6px' }} />
                <div style={{ height: '5px', background: 'hsl(var(--accent))', borderRadius: '2px', width: '70%', opacity: 0.8 }} />
                <div style={{ height: '4px', background: '#9ca3af', borderRadius: '2px', width: '90%', marginTop: '6px' }} />
                <div style={{ height: '4px', background: '#9ca3af', borderRadius: '2px', width: '60%' }} />
                <div style={{ height: '4px', background: '#9ca3af', borderRadius: '2px', width: '80%' }} />
                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {[40, 55, 30, 50, 45].map((w, i) => <div key={i} style={{ height: '8px', width: `${w}%`, background: 'hsl(var(--accent-light))', border: '1px solid hsl(var(--accent))', borderRadius: '4px' }} />)}
                </div>
                <div style={{ marginTop: '8px' }}>
                    {[80, 92, 75].map((p, i) => (
                        <div key={i} style={{ marginBottom: '4px' }}>
                            <div style={{ height: '4px', background: '#d1d5db', borderRadius: '2px', marginBottom: '2px' }}>
                                <div style={{ height: '100%', width: `${p}%`, background: 'hsl(var(--accent))', borderRadius: '2px' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* main */}
            <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ height: '8px', background: '#111827', borderRadius: '2px', width: '60%' }} />
                <div style={{ height: '4px', background: 'hsl(var(--accent))', borderRadius: '2px', width: '40%' }} />
                <div style={{ height: '3px', background: '#6b7280', borderRadius: '2px', width: '90%', marginTop: '6px' }} />
                <div style={{ height: '3px', background: '#6b7280', borderRadius: '2px', width: '80%' }} />
                <div style={{ height: '3px', background: '#6b7280', borderRadius: '2px', width: '85%' }} />
                <div style={{ height: '4px', background: '#111827', borderRadius: '2px', width: '40%', marginTop: '10px' }} />
                <div style={{ height: '3px', background: '#9ca3af', borderRadius: '2px', width: '90%', borderLeft: '3px solid hsl(var(--accent))', paddingLeft: '4px' }} />
                <div style={{ height: '3px', background: '#9ca3af', borderRadius: '2px', width: '75%', borderLeft: '3px solid hsl(var(--accent))', paddingLeft: '4px' }} />
                <div style={{ height: '3px', background: '#9ca3af', borderRadius: '2px', width: '85%', borderLeft: '3px solid hsl(var(--accent))', paddingLeft: '4px' }} />
            </div>
        </div>
    );
}

function ATSPreview() {
    return (
        <div style={{ width: '100%', height: '180px', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', padding: '12px', display: 'flex', flexDirection: 'column', gap: '5px', border: '1px solid hsl(var(--border))' }}>
            <div style={{ height: '10px', background: '#111827', borderRadius: '2px', width: '50%', margin: '0 auto' }} />
            <div style={{ height: '4px', background: '#6b7280', borderRadius: '2px', width: '70%', margin: '2px auto 8px' }} />
            <div style={{ height: '2px', background: 'hsl(var(--accent))', borderRadius: '1px', width: '100%', marginBottom: '4px' }} />
            <div style={{ height: '3px', background: '#4b5563', borderRadius: '2px', width: '90%' }} />
            <div style={{ height: '3px', background: '#4b5563', borderRadius: '2px', width: '80%' }} />
            <div style={{ height: '2px', background: 'hsl(var(--accent))', borderRadius: '1px', width: '100%', marginTop: '6px', marginBottom: '4px' }} />
            <div style={{ height: '3px', background: '#4b5563', borderRadius: '2px', width: '95%' }} />
            <div style={{ height: '3px', background: '#4b5563', borderRadius: '2px', width: '75%' }} />
            <div style={{ height: '2px', background: 'hsl(var(--accent))', borderRadius: '1px', width: '100%', marginTop: '6px', marginBottom: '4px' }} />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[35, 45, 30, 50, 40, 35].map((w, i) => <div key={i} style={{ height: '8px', width: `${w}%`, background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '2px' }} />)}
            </div>
        </div>
    );
}

const TEMPLATES = [
    { id: 'modern_two_column', label: 'Modern Two-Column', desc: 'Sidebar with skill bars + proficiency · Best for tech roles', Preview: ModernPreview },
    { id: 'ats_single_column', label: 'ATS Single-Column', desc: 'Clean, parser-friendly layout · Best for corporate / ATS systems', Preview: ATSPreview },
];

// ── Rendered templates ─────────────────────────────────────────────
function ModernTwoColumnResume({ data }) {
    const { resume_data: r, api_score } = data;
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 0, background: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid hsl(var(--border))', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ background: '#f0f4f8', padding: '28px 20px', borderRight: '1px solid #e2e5ec' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'hsl(var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, marginBottom: '12px', color: '#fff', boxShadow: '0 4px 10px rgba(10, 102, 194, 0.2)' }}>
                    {r.header.initials}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'hsl(var(--accent))', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '3px', fontWeight: 700 }}>{r.header.title}</div>
                <div style={{ fontSize: '0.7rem', color: '#4b5563', marginBottom: '20px', lineHeight: 1.5 }}>{r.header.contact_line}</div>
                {r.sidebar.skill_groups.map((g, i) => (
                    <div key={i} style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.65rem', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px', fontWeight: 700 }}>{g.label}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {g.tags.map((t, j) => <span key={j} style={{ background: 'white', border: '1px solid #d1d5db', color: '#374151', padding: '3px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 500 }}>{t}</span>)}
                        </div>
                    </div>
                ))}
                <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '0.65rem', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', fontWeight: 700 }}>Proficiency</div>
                    {r.sidebar.proficiency.map((p, i) => (
                        <div key={i} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span style={{ fontSize: '0.7rem', color: '#374151', fontWeight: 500 }}>{p.name}</span>
                                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--accent))', fontWeight: 700 }}>{p.percentage}%</span>
                            </div>
                            <div style={{ height: '4px', background: '#d1d5db', borderRadius: '2px' }}>
                                <div style={{ height: '100%', width: `${p.percentage}%`, background: 'hsl(var(--accent))', borderRadius: '2px' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ padding: '32px 28px', overflowY: 'auto', maxHeight: '680px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827', margin: '0 0 3px', fontFamily: 'Playfair Display, serif' }}>{r.header.name}</h2>
                <div style={{ color: 'hsl(var(--accent))', fontSize: '0.9rem', marginBottom: '18px', fontWeight: 600 }}>{r.header.title}</div>
                <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: '0.85rem', marginBottom: '22px' }}>{r.main.summary}</p>
                <SecHead>Experience</SecHead>
                {r.main.experience.map((e, i) => (
                    <div key={i} style={{ marginBottom: '18px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>{e.role}</span>
                            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{e.meta}</span>
                        </div>
                        <div style={{ color: 'hsl(var(--accent))', fontSize: '0.8rem', marginBottom: '6px', fontWeight: 600 }}>{e.company}</div>
                        {e.bullets.map((b, j) => <div key={j} style={{ fontSize: '0.82rem', color: '#374151', paddingLeft: '12px', borderLeft: '2px solid hsl(var(--accent))', marginBottom: '4px', lineHeight: 1.5 }}>• {b}</div>)}
                    </div>
                ))}
                <SecHead>Education</SecHead>
                {r.main.education.map((ed, i) => (
                    <div key={i} style={{ marginBottom: '10px', fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 700, color: '#111827' }}>{ed.degree}</span>
                        <span style={{ color: '#4b5563' }}> — {ed.school} <span style={{ color: '#9ca3af' }}>· {ed.meta}</span></span>
                    </div>
                ))}
                <ApiScoreBox score={api_score} />
            </div>
        </div>
    );
}

function ATSSingleColumnResume({ data }) {
    const { resume_data: r, api_score } = data;
    return (
        <div style={{ background: '#ffffff', border: '1px solid hsl(var(--border))', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderRadius: '12px', padding: '40px', fontFamily: 'Inter, sans-serif', maxHeight: '720px', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #e5e7eb', paddingBottom: '20px' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', margin: '0 0 5px', fontFamily: 'Playfair Display, serif' }}>{r.header.name}</h2>
                <p style={{ color: '#4b5563', fontSize: '0.85rem' }}>{r.header.contact_line}</p>
            </div>
            <ATSSection label="Summary"><p style={{ color: '#374151', lineHeight: 1.7, fontSize: '0.85rem' }}>{r.summary}</p></ATSSection>
            <ATSSection label="Technical Skills">
                {Object.entries(r.technical_skills).map(([k, v]) => (
                    <div key={k} style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                        <span style={{ color: '#111827', fontWeight: 700, textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}: </span>
                        <span style={{ color: '#4b5563' }}>{String(v)}</span>
                    </div>
                ))}
            </ATSSection>
            <ATSSection label="Experience">
                {r.experience.map((e, i) => (
                    <div key={i} style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.9rem' }}>{e.header_left}</span>
                            <span style={{ color: '#4b5563', fontSize: '0.8rem', fontWeight: 600 }}>{e.header_right}</span>
                        </div>
                        {e.bullets.map((b, j) => <div key={j} style={{ fontSize: '0.82rem', color: '#374151', paddingLeft: '12px', marginBottom: '4px', lineHeight: 1.5 }}>• {b}</div>)}
                    </div>
                ))}
            </ATSSection>
            <ATSSection label="Projects">
                {r.projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: '14px' }}>
                        <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.85rem', marginBottom: '4px' }}>{p.title_with_stack}</div>
                        {p.bullets.map((b, j) => <div key={j} style={{ fontSize: '0.82rem', color: '#374151', paddingLeft: '12px', marginBottom: '3px', lineHeight: 1.5 }}>• {b}</div>)}
                    </div>
                ))}
            </ATSSection>
            {r.education?.length > 0 && (
                <ATSSection label="Education">
                    {r.education.map((ed, i) => (
                        <div key={i} style={{ fontSize: '0.85rem', marginBottom: '7px' }}>
                            <span style={{ fontWeight: 700, color: '#111827' }}>{ed.degree_and_major}</span>
                            <span style={{ color: '#4b5563' }}> — {ed.institution_and_score}</span>
                            <span style={{ color: '#6b7280', float: 'right', fontSize: '0.8rem', fontWeight: 600 }}>{ed.timeline}</span>
                        </div>
                    ))}
                </ATSSection>
            )}
            {r.achievements?.length > 0 && (
                <ATSSection label="Achievements">
                    {r.achievements.map((a, i) => <div key={i} style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '4px' }}>🏆 {a}</div>)}
                </ATSSection>
            )}
            <ApiScoreBox score={api_score} />
        </div>
    );
}

function SecHead({ children }) {
    return <div style={{ fontSize: '0.85rem', color: 'hsl(var(--accent))', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', marginTop: '24px', borderBottom: '2px solid hsl(var(--accent))', paddingBottom: '5px', fontWeight: 800 }}>{children}</div>;
}
function ATSSection({ label, children }) {
    return <div style={{ marginBottom: '20px' }}><SecHead>{label}</SecHead>{children}</div>;
}
function ApiScoreBox({ score }) {
    if (!score) return null;
    const c = score.total >= 80 ? 'hsl(var(--accent))' : score.total >= 60 ? '#f59e0b' : '#ef4444';
    return (
        <div style={{ marginTop: '32px', padding: '16px 20px', background: '#f8fafc', borderRadius: '10px', border: `1px solid ${c}40`, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>API Score Analysis</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: c }}>{score.total}</span>
            </div>
            {score.suggestions?.map((s, i) => <div key={i} style={{ fontSize: '0.8rem', color: '#4b5563', marginBottom: '4px' }}>💡 {s}</div>)}
        </div>
    );
}

// ── Main component ─────────────────────────────────────────────────
const ResumeCopilot = () => {
    const [step, setStep] = useState('template');
    const [templateChoice, setTemplateChoice] = useState('');
    const [userData, setUserData] = useState('');
    const [percent, setPercent] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [inputMode, setInputMode] = useState('upload');
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleModeUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadedFile(file);
        setUploading(true); setError('');
        const fd = new FormData(); fd.append('file', file);
        try {
            const res = await fetch('/api/resume/parse', { method: 'POST', body: fd });
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || 'Failed to parse file.');
            setUserData(json.data.text);
        } catch (err) { setError(err.message); setUploadedFile(null); }
        setUploading(false);
        e.target.value = null;
    };

    const handleGenerate = async () => {
        if (userData.trim().length < 50) { setError('Please provide at least 50 characters of resume data.'); return; }
        setError(''); setStep('loading'); setPercent(0);
        const iv = setInterval(() => setPercent(p => p >= 88 ? 88 : p + 8), 400);
        try {
            const res = await fetch('/api/resume/architect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templateChoice, userData }),
            });
            clearInterval(iv); setPercent(100);
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || 'Something went wrong. Try again.');
            setTimeout(() => { setResult(json.data); setStep('result'); }, 400);
        } catch (e) {
            clearInterval(iv); setError(e.message); setStep('input');
        }
    };

    const reset = () => { setStep('template'); setResult(null); setUserData(''); setTemplateChoice(''); setError(''); setInputMode('upload'); setUploadedFile(null); };

    return (
        <div style={{ width: '100%', animation: 'fadeIn 0.4s' }}>
            {/* ── STEP 1: Template ── */}
            {step === 'template' && (
                <div>
                    <div style={{ fontWeight: 700, color: 'hsl(var(--text-main))', marginBottom: '24px', fontSize: '1.2rem', paddingBottom: '12px', borderBottom: '1px solid hsl(var(--border))', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        Template Format
                        <span style={{ fontWeight: 400, color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>Choose your foundation.</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                        {TEMPLATES.map(t => (
                            <button key={t.id} onClick={() => setTemplateChoice(t.id)} style={{
                                background: templateChoice === t.id ? '#f8fbfc' : 'white',
                                border: `1px solid ${templateChoice === t.id ? 'hsl(var(--accent))' : 'hsl(var(--border))'}`,
                                borderRadius: '12px', padding: '0', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease-in-out',
                                boxShadow: templateChoice === t.id ? '0 0 0 1px hsl(var(--accent))' : '0 1px 3px rgba(0,0,0,0.04)',
                                overflow: 'hidden'
                            }}>
                                <div style={{ padding: '24px', background: '#f8fafc', borderBottom: '1px solid hsl(var(--border))', display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ transform: 'scale(0.9)', transformOrigin: 'top center', width: '100%', height: '380px', pointerEvents: 'none', overflow: 'hidden' }}>
                                        <t.Preview />
                                    </div>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <div style={{ fontWeight: 600, color: 'hsl(var(--text-main))', fontSize: '1rem', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {t.label}
                                        {templateChoice === t.id && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                    </div>
                                    <div style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem', lineHeight: 1.5 }}>{t.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button className="btn-primary" disabled={!templateChoice} onClick={() => setStep('input')} style={{ padding: '16px 52px', opacity: templateChoice ? 1 : 0.4, cursor: templateChoice ? 'pointer' : 'not-allowed', borderRadius: '100px', fontSize: '1.05rem' }}>
                            Continue →
                        </button>
                    </div>
                </div>
            )}

            {/* ── STEP 2: Input ── */}
            {step === 'input' && (
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                    {/* Header bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                            <div style={{ fontWeight: 800, color: 'hsl(var(--text-main))', fontSize: '1.4rem', marginBottom: '4px', fontFamily: 'Playfair Display, serif' }}>
                                Your Resume Data
                            </div>
                            <div style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
                                Template: <span style={{ color: 'hsl(var(--accent))', fontWeight: 700 }}>{TEMPLATES.find(t => t.id === templateChoice)?.label}</span>
                            </div>
                        </div>
                        <button onClick={() => setStep('template')} className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem', borderRadius: '100px' }}>← Change Template</button>
                    </div>

                    {/* Mode toggle */}
                    <div style={{ display: 'flex', gap: '0', marginBottom: '28px', background: '#f1f5f9', borderRadius: '12px', padding: '4px' }}>
                        {[
                            { id: 'upload', icon: '📄', label: 'Upload PDF / Word', sub: 'Drag & drop or browse' },
                            { id: 'type', icon: '✏️', label: 'Type Manually', sub: 'Paste or write your info' },
                        ].map(m => (
                            <button key={m.id} onClick={() => { setInputMode(m.id); if (m.id === 'type') { setUploadedFile(null); setUserData(''); } }} style={{
                                flex: 1, padding: '14px 20px', border: 'none', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.2s',
                                background: inputMode === m.id ? 'white' : 'transparent',
                                boxShadow: inputMode === m.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                                display: 'flex', alignItems: 'center', gap: '10px',
                            }}>
                                <span style={{ fontSize: '1.2rem' }}>{m.icon}</span>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: inputMode === m.id ? 'hsl(var(--text-main))' : '#6b7280' }}>{m.label}</div>
                                    <div style={{ fontSize: '0.75rem', color: inputMode === m.id ? 'hsl(var(--accent))' : '#9ca3af' }}>{m.sub}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Upload mode */}
                    {inputMode === 'upload' && (
                        <div>
                            {!uploadedFile ? (
                                <label style={{ display: 'block', cursor: 'pointer' }}>
                                    <div style={{
                                        border: '2px dashed hsl(var(--border))', borderRadius: '16px', padding: '60px 40px',
                                        textAlign: 'center', background: '#fafbff', transition: 'all 0.2s',
                                    }}
                                        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'hsl(var(--accent))'; e.currentTarget.style.background = 'hsla(211,90%,40%,0.04)'; }}
                                        onDragLeave={e => { e.currentTarget.style.borderColor = 'hsl(var(--border))'; e.currentTarget.style.background = '#fafbff'; }}
                                        onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'hsl(var(--border))'; e.currentTarget.style.background = '#fafbff'; const f = e.dataTransfer.files[0]; if (f) handleModeUpload({ target: { files: [f], value: null } }); }}
                                    >
                                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📂</div>
                                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'hsl(var(--text-main))', marginBottom: '8px' }}>Drop your resume here</div>
                                        <div style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem', marginBottom: '24px' }}>Supports <strong>PDF</strong> and <strong>Word (.docx)</strong> documents</div>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'hsl(var(--accent))', color: 'white', borderRadius: '100px', fontWeight: 700, fontSize: '0.9rem' }}>
                                            Browse File
                                        </div>
                                    </div>
                                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleModeUpload} style={{ display: 'none' }} disabled={uploading} />
                                </label>
                            ) : (
                                <div style={{ border: '1px solid hsl(var(--border))', borderRadius: '16px', padding: '28px 32px', background: 'white', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'hsla(211,90%,40%,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>📄</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 700, color: 'hsl(var(--text-main))', fontSize: '1rem', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{uploadedFile.name}</div>
                                        <div style={{ color: uploading ? '#f59e0b' : '#16a34a', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {uploading ? '⏳ Parsing your resume...' : '✅ Parsed successfully — ready to build!'}
                                        </div>
                                    </div>
                                    <button onClick={() => { setUploadedFile(null); setUserData(''); }} style={{ background: '#fef2f2', border: 'none', color: '#ef4444', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>Remove</button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Type mode */}
                    {inputMode === 'type' && (
                        <div>
                            <div style={{
                                border: `2px solid ${error ? '#ef4444' : 'hsl(var(--border))'}`,
                                borderRadius: '16px', background: 'white', overflow: 'hidden',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'border-color 0.2s',
                            }}
                                onFocusCapture={e => e.currentTarget.style.borderColor = 'hsl(var(--accent))'}
                                onBlurCapture={e => e.currentTarget.style.borderColor = error ? '#ef4444' : 'hsl(var(--border))'}
                            >
                                {/* Creative top bar */}
                                <div style={{ padding: '14px 20px', background: '#f8fafc', borderBottom: '1px solid hsl(var(--border))', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2d' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28ca41' }} />
                                    <span style={{ marginLeft: '8px', fontSize: '0.78rem', color: '#9ca3af', fontFamily: 'monospace' }}>resume_data.txt</span>
                                </div>
                                <textarea
                                    placeholder={"Name: Alex Johnson\nEmail: alex@example.com  |  Phone: +1-XXXXXXX\n\nROLE: Full Stack Engineer at TechCorp (2022–2024)\n  •  Built realtime dashboard with React + Socket.io — 500 daily users\n  •  Reduced API latency by 40% using Redis caching\n\nPROJECTS:\n  •  Resume Optimizer (React, Node.js, Gemini API)\n  •  Chat App (Socket.io, MongoDB)\n\nSKILLS: TypeScript, React, Node.js, PostgreSQL, Docker\nEDUCATION: B.Tech CS, Example University, 2022"}
                                    value={userData}
                                    onChange={e => { setUserData(e.target.value); setError(''); }}
                                    style={{
                                        width: '100%', height: '340px', background: 'white',
                                        border: 'none', padding: '24px 24px',
                                        color: 'hsl(var(--text-main))', fontFamily: 'Inter, sans-serif',
                                        fontSize: '1rem', lineHeight: '1.9', resize: 'vertical',
                                        outline: 'none', letterSpacing: '0.01em',
                                        boxSizing: 'border-box',
                                    }}
                                />
                                {/* Bottom status bar */}
                                <div style={{ padding: '10px 20px', background: '#f8fafc', borderTop: '1px solid hsl(var(--border))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: userData.length < 50 ? '#f59e0b' : '#16a34a' }}>
                                        {userData.length < 50 ? `⚠ ${50 - userData.length} more chars needed` : '✓ Ready to generate'}
                                    </span>
                                    <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontFamily: 'monospace' }}>{userData.length} / 5000</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '12px', fontWeight: 600 }}>⚠ {error}</div>}

                    <div style={{ textAlign: 'center', marginTop: '36px' }}>
                        <button
                            className="btn-primary"
                            disabled={(inputMode === 'upload' ? !uploadedFile || uploading : userData.length < 50) || uploading}
                            onClick={handleGenerate}
                            style={{ padding: '18px 56px', fontSize: '1.1rem', borderRadius: '100px', opacity: (inputMode === 'upload' ? (uploadedFile && !uploading) : userData.length >= 50) ? 1 : 0.4 }}
                        >
                            {uploading ? 'Parsing...' : 'Build My Resume ✨'}
                        </button>
                    </div>
                </div>
            )}

            {/* ── STEP loading ── */}
            {step === 'loading' && (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>✍️</div>
                    <div style={{ maxWidth: '360px', margin: '0 auto' }}>
                        <div style={{ height: '5px', background: 'hsla(255,255%,255%,0.05)', borderRadius: '100px', overflow: 'hidden', marginBottom: '16px' }}>
                            <div style={{ height: '100%', width: `${percent}%`, background: 'linear-gradient(90deg,hsl(158,64%,42%),hsl(168,60%,55%))', borderRadius: '100px', transition: 'width 0.4s ease', boxShadow: '0 0 12px hsl(158,64%,42%)' }} />
                        </div>
                        <p style={{ color: 'hsl(158,60%,55%)', fontWeight: 600, fontSize: '0.9rem' }}>
                            {percent < 30 ? 'Reading your experience...' : percent < 60 ? 'Crafting power bullets...' : percent < 85 ? 'Structuring your template...' : 'Almost done...'}
                        </p>
                    </div>
                </div>
            )}

            {/* ── STEP 3: Result ── */}
            {step === 'result' && result && (
                <div className="animate-fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>Done. <span className="text-gradient">Your Resume.</span></h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={reset} className="btn-secondary" style={{ padding: '9px 22px', borderRadius: '100px', fontSize: '0.82rem' }}>Start Over</button>
                            <button onClick={() => { const b = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `resume-${templateChoice}.json`; a.click(); URL.revokeObjectURL(u); }} className="btn-primary" style={{ padding: '9px 22px', borderRadius: '100px', fontSize: '0.82rem' }}>↓ Download</button>
                        </div>
                    </div>
                    {templateChoice === 'modern_two_column' ? <ModernTwoColumnResume data={result} /> : <ATSSingleColumnResume data={result} />}
                </div>
            )}
        </div>
    );
};

export default ResumeCopilot;
