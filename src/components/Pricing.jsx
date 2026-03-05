import React from 'react';

const Pricing = () => {
    return (
        <section id="pricing" style={{ padding: '120px 0', background: 'hsl(var(--bg-dark))' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
                        Choose Your <span className="text-gradient">Plan</span>
                    </h2>
                    <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1.2rem' }}>
                        Start free. Upgrade if you want more.
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '32px',
                    flexWrap: 'wrap',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {/* Free Tier */}
                    <div className="glass-card" style={{ padding: '48px', flex: '1 1 350px', maxWidth: '450px' }}>
                        <h3 style={{ marginBottom: '8px', fontSize: '1.5rem' }}>Free</h3>
                        <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem', marginBottom: '24px' }}>Try it out, see what works.</p>
                        <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '32px' }}>₹0</div>

                        <ul className="pricing-list">
                            <li><span>✓</span> 1 Premium optimized resume</li>
                            <li><span>✓</span> 1 Tailored cover letter</li>
                            <li><span>✓</span> ATS compatibility report</li>
                            <li className="disabled"><span>×</span> Unlimited exports</li>
                        </ul>

                        <button className="btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>Start Free</button>
                    </div>

                    {/* Pro Tier */}
                    <div className="glass-card" style={{
                        padding: '48px',
                        flex: '1 1 350px',
                        maxWidth: '450px',
                        borderColor: 'hsl(var(--accent))',
                        boxShadow: '0 0 40px -10px hsla(var(--accent), 0.2)'
                    }}>
                        <div className="popular-badge">POPULAR</div>
                        <h3 style={{ marginBottom: '8px', fontSize: '1.5rem' }}>Pro</h3>
                        <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem', marginBottom: '24px' }}>For people applying seriously.</p>
                        <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '32px', color: 'hsl(var(--accent))' }}>
                            ₹200 <span style={{ fontSize: '1rem', color: 'hsl(var(--text-muted))', fontWeight: 400 }}>/mo</span>
                        </div>

                        <ul className="pricing-list">
                            <li><span>✓</span> Unlimited resume variants</li>
                            <li><span>✓</span> Unlimited cover letters</li>
                            <li><span>✓</span> Priority AI processing</li>
                            <li><span>✓</span> Private discord community</li>
                        </ul>

                        <button className="btn-primary" style={{ width: '100%', marginTop: 'auto' }}>Go Pro Now</button>
                    </div>
                </div>
            </div>

            <style>{`
                .pricing-list {
                    list-style: none;
                    margin-bottom: 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .pricing-list li {
                    display: flex;
                    gap: 12px;
                    color: hsl(var(--text-muted));
                    font-size: 0.95rem;
                }
                .pricing-list li span {
                    color: hsl(var(--accent));
                    font-weight: 700;
                }
                .pricing-list li.disabled {
                    opacity: 0.4;
                }
                .popular-badge {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-hover)));
                    color: white;
                    padding: 4px 12px;
                    border-radius: 100px;
                    font-size: 0.7rem;
                    fontWeight: 800;
                    letter-spacing: 0.05em;
                }
            `}</style>
        </section>
    );
};

export default Pricing;
