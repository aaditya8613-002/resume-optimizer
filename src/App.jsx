import React from 'react';

import Hero from './components/Hero';
import PainSection from './components/PainSection';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import ToolsDashboard from './components/ToolsDashboard';

function App() {
  return (
    <div className="app-container">
      <main>
        <Hero />
        <ToolsDashboard />
        <Features />
        <HowItWorks />
        <PainSection />
      </main>

      <footer className="container" style={{
        padding: '60px 0 40px',
        borderTop: '1px solid hsl(var(--border))',
        textAlign: 'center',
        color: 'hsl(var(--text-muted))',
        fontSize: '0.9rem'
      }}>
        <div style={{ marginBottom: '12px' }}>
          Resume Optimizer — Made with ❤️ by Gupta • <span style={{ color: 'hsl(var(--accent-primary))' }}>Always Free</span>
        </div>
        <div style={{ marginBottom: '20px', fontSize: '0.8rem', opacity: 0.6 }}>
          Built for the Next Generation of Talent.
        </div>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Support</a>
        </div>
      </footer>
    </div>
  );
}

export default App;


