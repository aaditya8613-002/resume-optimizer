import React from 'react';

const Features = () => {
    const features = [
        {
            title: "ATS Check",
            desc: "See if your resume will actually make it past the automated filters. Fix it if it won't.",
            icon: "📄"
        },
        {
            title: "Keyword Matching",
            desc: "Reads the job posting and tells you what language you should be using. Simple as that.",
            icon: "🎯"
        },
        {
            title: "Better Wording",
            desc: "Transforms vague descriptions into specific, measurable achievements that sound real.",
            icon: "⚡"
        },
        {
            title: "Cover Letter Magic",
            desc: "Quick cover letter that actually connects your experience to what they're looking for.",
            icon: "✍️"
        }
    ];

    return (
        <section id="features" style={{ padding: '120px 0', background: 'hsl(var(--bg-dark))' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
                        What You <span className="text-gradient">Actually Get</span>
                    </h2>
                    <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        Real tools, not just hype.
                    </p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    {features.map((feature, i) => (
                        <div key={i} className="glass-card" style={{ padding: '40px', textAlign: 'left' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '24px' }}>{feature.icon}</div>
                            <h3 style={{ marginBottom: '16px', fontSize: '1.4rem' }}>{feature.title}</h3>
                            <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1rem', lineHeight: 1.6 }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
