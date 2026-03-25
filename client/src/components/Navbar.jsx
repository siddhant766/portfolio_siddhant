import { useState } from 'react';
import GooeyNav from './GooeyNav';
import logo from '../assets/logo.png';


export default function Navbar({ toggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <GooeyNav
          items={[
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" },
            { label: "GitHub", href: "#github" },
            { label: "LeetCode", href: "#leetcode" },
            { label: "Training", href: "#training" },
            { label: "Education", href: "#education" },
            { label: "Certificates", href: "#certifications" },
            { label: "Contact", href: "#contact" }
          ]}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={300}
          initialActiveIndex={-1}
          animationTime={600}
          timeVariance={400}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />

        {/* Settings Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent', border: '1px solid var(--line)',
              cursor: 'pointer', fontSize: '1rem', color: 'var(--t2)',
              padding: '4px 10px', borderRadius: '4px', display: 'flex',
              alignItems: 'center', gap: '6px', fontFamily: 'var(--mono)',
              letterSpacing: '.08em'
            }}
            aria-label="Settings menu"
          >
            ☰
          </button>

          {menuOpen && (
            <div
              style={{
                position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                background: 'var(--bg1)', border: '1px solid var(--line)',
                borderRadius: '6px', minWidth: '180px', zIndex: 300,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => { toggleTheme(); setMenuOpen(false); }}
                style={{
                  width: '100%', padding: '12px 16px', background: 'transparent',
                  border: 'none', borderBottom: '1px solid var(--line)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  gap: '10px', color: 'var(--t2)', fontSize: '0.9rem',
                  fontFamily: 'var(--mono)', textAlign: 'left'
                }}
              >
                {theme === 'light' ? '🌙' : '☀️'}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>

              <a
                href="/admin"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', color: 'var(--t2)', fontSize: '0.9rem',
                  fontFamily: 'var(--mono)', textDecoration: 'none'
                }}
              >
                🔒 Admin Panel
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
