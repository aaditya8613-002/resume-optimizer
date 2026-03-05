import React from 'react';

const Testimonials = () => {
    const reviews = [
        {
            quote: "Rewrote my resume once and got 3 callbacks in the first week. I was getting nothing before.",
            author: "Sarah J.",
            role: "Junior Developer"
        },
        {
            quote: "Sounds natural, nothing weird. Actually helped me explain what I did better than I could myself.",
            author: "Alex M.",
            role: "Product Manager"
        },
        {
            quote: "Matched keywords I'd never think to use. My application finally got past the initial filter.",
            author: "Rahul S.",
            role: "Backend Engineer"
        }
    ];

    return (
        <section id="testimonials" style={{ padding: '120px 0', background: 'hsl(var(--bg-dark))' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1.2rem' }}>Real feedback from real people.</p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {reviews.map((rev, i) => (
                        <div key={i} className="glass-card" style={{ padding: '40px' }}>
                            <p style={{ fontSize: '1.1rem', marginBottom: '32px', color: 'hsl(var(--text-main))', lineHeight: 1.6 }}>"{rev.quote}"</p>
                            <div>
                                <div style={{ fontWeight: 800, color: 'hsl(var(--accent))' }}>{rev.author}</div>
                                <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>{rev.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
