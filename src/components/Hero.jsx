import React from 'react';
import Navbar from './Navbar';

const Hero = () => {
    return (
        <section className="animate-fade-in" style={{ padding: '160px 0 100px', position: 'relative', overflow: 'hidden' }}>

            {/* Multiple Floating Background Images - Dark Theme */}
            {/* Image 1 - Top Right */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '350px',
                height: '350px',
                zIndex: 0,
                opacity: 0.15,
                animation: 'float 20s ease-in-out infinite',
                pointerEvents: 'none'
            }}>
                <img
                    src="/hero-image.jpg"
                    alt="Background decoration"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                        filter: 'blur(2px) grayscale(40%)'
                    }}
                />
            </div>

            {/* Image 2 - Bottom Left */}
            <div style={{
                position: 'absolute',
                bottom: '5%',
                left: '3%',
                width: '280px',
                height: '280px',
                zIndex: 0,
                opacity: 0.12,
                animation: 'float 25s ease-in-out infinite reverse',
                pointerEvents: 'none'
            }}>
                <img
                    src="/hero-image.jpg"
                    alt="Background decoration"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                        filter: 'blur(3px) grayscale(50%)'
                    }}
                />
            </div>

            {/* Image 3 - Middle Left */}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '-5%',
                width: '250px',
                height: '250px',
                zIndex: 0,
                opacity: 0.1,
                animation: 'float 30s ease-in-out infinite',
                pointerEvents: 'none'
            }}>
                <img
                    src="/hero-image.jpg"
                    alt="Background decoration"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50% 50% 50% 50%',
                        filter: 'blur(4px) grayscale(60%)'
                    }}
                />
            </div>

            {/* Image 4 - Top Center */}
            <div style={{
                position: 'absolute',
                top: '5%',
                left: '40%',
                width: '200px',
                height: '200px',
                zIndex: 0,
                opacity: 0.08,
                animation: 'float 22s ease-in-out infinite reverse',
                pointerEvents: 'none'
            }}>
                <img
                    src="/hero-image.jpg"
                    alt="Background decoration"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        filter: 'blur(2px) grayscale(50%)'
                    }}
                />
            </div>

            {/* Image 5 - Bottom Right */}
            <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '-3%',
                width: '220px',
                height: '220px',
                zIndex: 0,
                opacity: 0.11,
                animation: 'float 28s ease-in-out infinite',
                pointerEvents: 'none'
            }}>
                <img
                    src="/hero-image.jpg"
                    alt="Background decoration"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '70% 30% 50% 50% / 30% 70% 30% 70%',
                        filter: 'blur(2px) grayscale(40%)'
                    }}
                />
            </div>

            {/* Floating Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '15%',
                width: '180px',
                height: '180px',
                background: 'linear-gradient(135deg, hsla(var(--accent), 0.1), hsla(var(--accent-hover), 0.05))',
                borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%',
                zIndex: 0,
                opacity: 0.6,
                animation: 'float 18s ease-in-out infinite',
                boxShadow: '0 8px 32px -8px hsla(0, 0%, 0%, 0.3)'
            }} />

            <div style={{
                position: 'absolute',
                bottom: '25%',
                left: '12%',
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, hsla(var(--accent), 0.08), hsla(var(--accent), 0.05))',
                borderRadius: '50% 50% 40% 60% / 50% 50% 60% 40%',
                zIndex: 0,
                opacity: 0.5,
                animation: 'float 24s ease-in-out infinite reverse',
                boxShadow: '0 8px 32px -8px hsla(0, 0%, 0%, 0.2)'
            }} />

            <div className="container" style={{ textAlign: 'center' }}>
                <Navbar />

                {/* Badge - Personal/Direct */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'hsla(var(--accent), 0.1)',
                    padding: '8px 24px',
                    borderRadius: '100px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'hsl(var(--accent))',
                    marginBottom: '32px',
                    border: '1px solid hsla(var(--accent), 0.2)',
                    transform: 'rotate(-1deg)'
                }}>
                    <span>🚀</span> 1,200+ humans landed interviews this week
                </div>

                <h1 style={{
                    fontSize: 'clamp(3.5rem, 12vw, 7rem)',
                    marginBottom: '24px',
                    maxWidth: '1100px',
                    margin: '0 auto 32px',
                    lineHeight: 1,
                    fontWeight: 900
                }}>
                    Stop Being a <br />
                    <span className="text-gradient" style={{
                        fontSize: 'clamp(4rem, 13vw, 7.5rem)',
                        display: 'block',
                        marginTop: '12px'
                    }}>
                        Number in an Inbox.
                    </span>
                </h1>

                <p style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    color: 'hsl(var(--text-secondary))',
                    maxWidth: '700px',
                    margin: '0 auto 64px',
                    lineHeight: 1.4,
                    fontWeight: 400
                }}>
                    The "perfect" resume is a myth. The **impactful** resume is what gets you hired. We help you cut through the noise and show them what you're actually capable of.
                </p>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '80px' }}>
                    <button
                        className="btn-primary"
                        style={{ padding: '20px 48px', fontSize: '1.2rem' }}
                        onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Start My Transformation →
                    </button>
                </div>

                {/* The "Workshop" Visual - Messy, human, organic */}
                <div style={{ position: 'relative', height: '500px', maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    {/* Floating Code Snippet Card */}
                    <div className="glass-card" style={{
                        position: 'absolute',
                        left: '0',
                        top: '40px',
                        padding: '24px',
                        textAlign: 'left',
                        maxWidth: '380px',
                        transform: 'rotate(-2deg)',
                        zIndex: 2,
                        background: 'white',
                        boxShadow: 'var(--shadow-soft)',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px'
                    }}>
                        <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', marginBottom: '12px' }}>// TODO: Stop making this sound generic</div>
                        <div style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem', marginBottom: '8px', textDecoration: 'line-through' }}>- Managed a team of 5</div>
                        <div style={{ color: 'hsl(var(--accent))', fontSize: '1rem', fontWeight: 800 }}>- Led a cross-functional squad of 5 to scale internal tools by 40%</div>

                        <svg style={{ position: 'absolute', right: '-40px', top: '20px', width: '60px' }} viewBox="0 0 100 50">
                            <path d="M0,25 Q50,0 100,25" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
                            <circle cx="100" cy="25" r="3" fill="hsl(var(--accent))" />
                        </svg>
                    </div>

                    {/* Main Interaction Mock */}
                    <div className="glass-panel" style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '32px',
                        background: 'linear-gradient(135deg, white, #f8f9fa)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✍️</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'hsl(var(--text-main))' }}>Crafting Your Identity...</div>
                            <div style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))', marginTop: '12px' }}>"Let's make that experience pop."</div>
                        </div>
                    </div>

                    {/* Sticky Note */}
                    <div style={{
                        position: 'absolute',
                        right: '20px',
                        bottom: '60px',
                        background: '#fef3c7',
                        padding: '20px',
                        color: '#92400e',
                        transform: 'rotate(4deg)',
                        boxShadow: '10px 10px 30px rgba(0,0,0,0.3)',
                        borderRadius: '2px',
                        maxWidth: '200px',
                        textAlign: 'left',
                        fontFamily: '"Architects Daughter", cursive',
                        fontSize: '0.9rem'
                    }}>
                        <div style={{ fontWeight: 900, marginBottom: '8px' }}>NOTE:</div>
                        Google loves impact. Rewrite the AWS section to focus on cost savings!
                    </div>

                    {/* Canva-Style Decorative Shapes */}
                    <div style={{
                        position: 'absolute',
                        top: '50px',
                        left: '-100px',
                        width: '200px',
                        height: '200px',
                        background: 'linear-gradient(135deg, hsla(var(--accent), 0.3), hsla(var(--accent-yellow), 0.2))',
                        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                        filter: 'blur(40px)',
                        zIndex: 0,
                        animation: 'float 15s ease-in-out infinite'
                    }} />

                    <div style={{
                        position: 'absolute',
                        bottom: '100px',
                        right: '-80px',
                        width: '250px',
                        height: '250px',
                        background: 'linear-gradient(135deg, hsla(var(--accent), 0.25), hsla(var(--accent), 0.2))',
                        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                        filter: 'blur(50px)',
                        zIndex: 0,
                        animation: 'float 20s ease-in-out infinite reverse'
                    }} />

                    {/* Bold Geometric Accent */}
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '50%',
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(45deg, hsl(var(--accent-hover)), hsl(var(--accent)))',
                        borderRadius: '20px',
                        transform: 'rotate(15deg)',
                        opacity: 0.15,
                        zIndex: 0
                    }} />
                </div>
            </div>

            {/* Floating decorative circles - Canva style */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '4px solid hsla(var(--accent), 0.3)',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '8%',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '5px solid hsla(var(--accent), 0.25)',
                zIndex: 0
            }} />

            {/* Subtle "Arrow" Annotations */}
            <svg style={{ position: 'absolute', bottom: '0', left: '10%', opacity: 0.2 }} width="100" height="100" viewBox="0 0 100 100">
                <path d="M10,10 Q50,90 90,10" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
        </section>
    );
};

export default Hero;
