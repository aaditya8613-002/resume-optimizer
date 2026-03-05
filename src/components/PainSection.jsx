import React from 'react';

const PainSection = () => {
    const pains = [
        {
            title: "Your Resume Gets Lost",
            desc: "Most applications never reach a human. Your resume needs to pass the ATS scan first or you're invisible."
        },
        {
            title: "Skills Don't Translate",
            desc: "You know what you did, but your bullet points read generic. Recruiters skip over vague achievements."
        },
        {
            title: "Wrong Keywords Cost You",
            desc: "You have the experience, but you're using different language than the job posting. Result? Rejection."
        }
    ];

    return (
        <section id="pain" style={{ padding: '120px 0', background: 'hsl(var(--bg-panel))' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
                        Why You're Not Getting <span className="text-gradient">Interviews</span>
                    </h2>
                    <p style={{ color: 'hsl(var(--text-muted))', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
                        It's probably not you. It's how your resume is written.
                    </p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {pains.map((pain, i) => (
                        <div key={i} className="glass-card" style={{ padding: '40px' }}>
                            <h3 style={{ marginBottom: '16px', fontSize: '1.4rem', color: 'hsl(var(--accent))' }}>{pain.title}</h3>
                            <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1rem', lineHeight: 1.6 }}>{pain.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PainSection;
