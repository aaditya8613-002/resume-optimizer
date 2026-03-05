import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            title: "Drop Your Info",
            desc: "Copy-paste your resume and the job description. That's it. No complicated setup."
        },
        {
            title: "Get Optimized",
            desc: "Get back a rewritten version that highlights your real achievements and matches the role's keywords."
        },
        {
            title: "Apply & Hear Back",
            desc: "Download, tweak if needed, and start getting actual interview requests instead of silence."
        }
    ];

    return (
        <section id="how-it-works" style={{ padding: '120px 0', background: 'hsl(var(--bg-panel))' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
                        <span className="text-gradient">Three Steps</span> to Better Applications
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '64px'
                }}>
                    {steps.map((step, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                            <div style={{
                                fontSize: '8rem',
                                fontWeight: 900,
                                opacity: 0.04,
                                position: 'absolute',
                                top: '-60px',
                                left: '-20px',
                                zIndex: 0,
                                fontFamily: 'var(--font-heading)',
                                pointerEvents: 'none',
                                background: 'hsl(var(--border))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                borderRadius: '12px',
                                border: '1px solid hsla(0,0%,0%,0.05)'
                            }}>
                                0{i + 1}
                            </div>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h3 style={{ marginBottom: '16px', fontSize: '1.8rem', color: 'hsl(var(--accent))' }}>{step.title}</h3>
                                <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1.1rem', lineHeight: 1.6 }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
