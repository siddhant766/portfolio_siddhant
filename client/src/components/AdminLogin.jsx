import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('Cannot connect to the server.');
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg0)',
      fontFamily: 'var(--sans)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--bg1)',
        border: '1px solid var(--line)',
        borderRadius: '8px',
        padding: '40px 32px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px', height: '48px', margin: '0 auto 16px',
            background: 'var(--asoft)', border: '1px solid var(--line)',
            borderRadius: '12px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.4rem'
          }}>🔒</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--t1)', marginBottom: '6px' }}>
            Admin Panel
          </h2>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--t3)' }}>
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block', fontFamily: 'var(--mono)', fontSize: '0.8rem',
              color: 'var(--t3)', letterSpacing: '.1em', textTransform: 'uppercase',
              marginBottom: '8px'
            }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              style={{
                width: '100%', padding: '12px 16px', background: 'var(--bg2)',
                border: '1px solid var(--line)', borderRadius: '4px',
                color: 'var(--t1)', fontSize: '0.95rem', outline: 'none',
                fontFamily: 'var(--mono)', boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block', fontFamily: 'var(--mono)', fontSize: '0.8rem',
              color: 'var(--t3)', letterSpacing: '.1em', textTransform: 'uppercase',
              marginBottom: '8px'
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                style={{
                  width: '100%', padding: '12px 44px 12px 16px', background: 'var(--bg2)',
                  border: '1px solid var(--line)', borderRadius: '4px',
                  color: 'var(--t1)', fontSize: '0.95rem', outline: 'none',
                  fontFamily: 'var(--mono)', boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', fontSize: '1.1rem',
                  color: 'var(--t3)', padding: '0'
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              padding: '10px 14px', background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.3)', borderRadius: '4px',
              color: '#f87171', fontSize: '0.85rem', fontFamily: 'var(--mono)',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-fill"
            style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="/" style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--t4)', textDecoration: 'none' }}>
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
