import React from 'react';

const Navbar = () => {
  return (
    <nav className="glass-panel" style={{
      width: 'max-content',
      margin: '0 auto 40px auto',
      padding: '12px 32px',
      display: 'flex',
      gap: '40px',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      borderRadius: '100px',
      border: '1px solid rgba(0,0,0,0.05)',
    }}>
      <div style={{
        fontWeight: 800,
        fontSize: '1.05rem',
        fontFamily: 'var(--font-heading)',
        color: 'hsl(var(--text-main))',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'hsl(var(--accent-primary))',
          boxShadow: '0 0 8px hsl(var(--accent-primary))',
        }} />
        ResumeAI
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <a href="#features" style={{ color: 'hsl(var(--text-muted))', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', fontWeight: 500 }}
          onMouseEnter={e => e.target.style.color = 'hsl(var(--accent))'}
          onMouseLeave={e => e.target.style.color = 'hsl(var(--text-muted))'}
        >Features</a>
        <a href="#tool" style={{ color: 'hsl(var(--text-muted))', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', fontWeight: 500 }}
          onMouseEnter={e => e.target.style.color = 'hsl(var(--accent))'}
          onMouseLeave={e => e.target.style.color = 'hsl(var(--text-muted))'}
        >Try it</a>
        <a href="#tool" style={{ background: 'hsl(var(--accent))', color: 'white', padding: '10px 24px', fontSize: '0.85rem', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, transition: 'background 0.2s', boxShadow: '0 4px 12px hsla(211, 90%, 40%, 0.3)' }}
          onMouseEnter={e => e.target.style.background = 'hsl(var(--accent-hover))'}
          onMouseLeave={e => e.target.style.background = 'hsl(var(--accent))'}
        >
          Free — Try Now
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
