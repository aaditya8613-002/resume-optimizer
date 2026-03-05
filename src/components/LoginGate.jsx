import React, { useState, useEffect } from 'react';

const ACCESS_PASSWORD = import.meta.env.VITE_ACCESS_PASSWORD || 'resumeai2025';
const SESSION_KEY = 'ra_session';

export default function LoginGate({ children }) {
    const [authed, setAuthed] = useState(false);
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPw, setShowPw] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem(SESSION_KEY) === 'ok') setAuthed(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            if (pw === ACCESS_PASSWORD) {
                sessionStorage.setItem(SESSION_KEY, 'ok');
                setAuthed(true);
            } else {
                setError('Incorrect password. Try again.');
                setPw('');
            }
            setLoading(false);
        }, 600);
    };

    if (authed) return children;

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f0ff 100%)',
            fontFamily: 'DM Sans, Inter, sans-serif', padding: '20px',
        }}>
            {/* Background blobs */}
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, hsla(215,90%,70%,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, hsla(260,80%,75%,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            </div>

            <div style={{
                position: 'relative', zIndex: 1,
                background: 'white', borderRadius: '20px', padding: '48px 44px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                width: '100%', maxWidth: '420px', textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.8)',
            }}>
                {/* Logo */}
                <div style={{ marginBottom: '28px' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '64px', height: '64px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, hsl(211,90%,40%), hsl(230,80%,55%))',
                        marginBottom: '16px',
                        boxShadow: '0 8px 24px hsla(211,90%,40%,0.3)',
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                        Resume Optimizer
                    </h1>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
                        Enter your access password to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ position: 'relative', marginBottom: '16px' }}>
                        <input
                            type={showPw ? 'text' : 'password'}
                            placeholder="Access password"
                            value={pw}
                            onChange={e => { setPw(e.target.value); setError(''); }}
                            autoFocus
                            style={{
                                width: '100%', padding: '14px 48px 14px 16px',
                                border: `2px solid ${error ? '#ef4444' : '#e2e8f0'}`,
                                borderRadius: '12px', fontSize: '1rem', outline: 'none',
                                color: '#0f172a', background: '#f8fafc',
                                transition: 'border-color 0.2s', boxSizing: 'border-box',
                            }}
                            onFocus={e => !error && (e.target.style.borderColor = 'hsl(211,90%,40%)')}
                            onBlur={e => !error && (e.target.style.borderColor = '#e2e8f0')}
                        />
                        <button type="button" onClick={() => setShowPw(v => !v)} style={{
                            position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px',
                        }}>
                            {showPw ? '🙈' : '👁️'}
                        </button>
                    </div>

                    {error && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px', fontWeight: 500 }}>
                            ⚠ {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading || !pw} style={{
                        width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                        background: 'linear-gradient(135deg, hsl(211,90%,40%), hsl(230,80%,55%))',
                        color: 'white', fontWeight: 700, fontSize: '1rem', cursor: loading || !pw ? 'not-allowed' : 'pointer',
                        opacity: !pw ? 0.5 : 1, transition: 'all 0.2s',
                        boxShadow: pw ? '0 4px 14px hsla(211,90%,40%,0.35)' : 'none',
                    }}>
                        {loading ? 'Verifying...' : 'Enter →'}
                    </button>
                </form>

                <p style={{ marginTop: '24px', fontSize: '0.78rem', color: '#94a3b8' }}>
                    Made with ❤️ by Gupta · <span style={{ color: 'hsl(211,90%,40%)' }}>Always Free</span>
                </p>
            </div>
        </div>
    );
}
