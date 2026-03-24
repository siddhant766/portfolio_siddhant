import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const [statsRes, messagesRes] = await Promise.all([
          fetch('http://127.0.0.1:5000/api/admin/stats', { headers }),
          fetch('http://127.0.0.1:5000/api/admin/messages', { headers })
        ]);

        if (statsRes.status === 401 || messagesRes.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
          return;
        }

        const statsData = await statsRes.json();
        const messagesData = await messagesRes.json();

        if (statsData.success) setStats(statsData.stats);
        if (messagesData.success) setMessages(messagesData.messages);

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'read' })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.map(m => m._id === id ? { ...m, status: 'read' } : m));
      }
    } catch (err) {
      console.error('Failed to update message');
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--bg0)', color: 'var(--t3)',
        fontFamily: 'var(--mono)'
      }}>
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--bg0)', color: '#f87171',
        fontFamily: 'var(--mono)'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg0)', fontFamily: 'var(--sans)',
      padding: '32px 5vw'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '40px', flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--t1)', letterSpacing: '-.03em' }}>
            Admin Dashboard
          </h1>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--t3)' }}>
            Portfolio analytics & messages
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="/" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>← Portfolio</a>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ fontSize: '0.85rem', color: '#f87171', borderColor: '#f87171' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px', marginBottom: '48px'
      }}>
        <StatCard label="Total Visitors" value={stats?.totalVisitors || 0} icon="👥" />
        <StatCard label="Today's Visitors" value={stats?.todayVisitors || 0} icon="📈" />
        <StatCard label="Total Messages" value={stats?.totalMessages || 0} icon="✉️" />
        <StatCard label="Unread Messages" value={stats?.unreadMessages || 0} icon="🔴" accent />
      </div>

      {/* Daily Visitors Mini Chart */}
      {stats?.dailyVisitors?.length > 0 && (
        <div style={{
          background: 'var(--bg1)', border: '1px solid var(--line)',
          borderRadius: '8px', padding: '24px', marginBottom: '48px'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--t1)', marginBottom: '20px' }}>
            Daily Visitors (Last 30 Days)
          </h3>
          <div style={{
            display: 'flex', alignItems: 'flex-end', gap: '4px', height: '120px',
            overflowX: 'auto', paddingBottom: '8px'
          }}>
            {stats.dailyVisitors.map((day, i) => {
              const maxCount = Math.max(...stats.dailyVisitors.map(d => d.count), 1);
              const height = (day.count / maxCount) * 100;
              return (
                <div key={i} title={`${day.date}: ${day.count} visitors`} style={{
                  flex: '1 0 12px', maxWidth: '24px', minWidth: '8px',
                  height: `${Math.max(height, 4)}%`,
                  background: day.date === new Date().toISOString().split('T')[0]
                    ? 'var(--ac)' : 'var(--bg5)',
                  borderRadius: '2px', transition: 'height 0.3s',
                  cursor: 'pointer'
                }} />
              );
            })}
          </div>
        </div>
      )}

      {/* Messages Table */}
      <div style={{
        background: 'var(--bg1)', border: '1px solid var(--line)',
        borderRadius: '8px', overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--t1)' }}>
            Contact Messages
          </h3>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--t3)' }}>
            {messages.length} total
          </span>
        </div>

        {messages.length === 0 ? (
          <div style={{
            padding: '48px 24px', textAlign: 'center',
            fontFamily: 'var(--mono)', color: 'var(--t4)', fontSize: '0.9rem'
          }}>
            No messages yet. They'll appear here when visitors contact you.
          </div>
        ) : (
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {messages.map((msg) => (
              <div key={msg._id} style={{
                padding: '18px 24px', borderBottom: '1px solid var(--line)',
                display: 'grid', gridTemplateColumns: '1fr auto',
                gap: '12px', alignItems: 'start',
                background: msg.status === 'unread' ? 'var(--asoft)' : 'transparent',
                transition: 'background 0.2s'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: '600', color: 'var(--t1)', fontSize: '0.95rem' }}>{msg.name}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--t3)' }}>{msg.email}</span>
                    <span style={{
                      fontFamily: 'var(--mono)', fontSize: '0.7rem', padding: '2px 8px',
                      borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '.05em',
                      background: msg.status === 'unread' ? 'rgba(248,113,113,0.15)' : 'var(--bg3)',
                      color: msg.status === 'unread' ? '#f87171' : 'var(--t4)',
                      border: `1px solid ${msg.status === 'unread' ? 'rgba(248,113,113,0.3)' : 'var(--line)'}`
                    }}>
                      {msg.status}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--t2)', lineHeight: '1.6' }}>
                    {msg.message}
                  </p>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--t4)', marginTop: '6px', display: 'block' }}>
                    {new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {msg.status === 'unread' && (
                  <button
                    onClick={() => markAsRead(msg._id)}
                    style={{
                      background: 'var(--bg3)', border: '1px solid var(--line)',
                      borderRadius: '4px', padding: '6px 12px', cursor: 'pointer',
                      fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--t2)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, accent }) {
  return (
    <div style={{
      background: 'var(--bg1)', border: '1px solid var(--line)',
      borderRadius: '8px', padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--t3)', letterSpacing: '.05em', textTransform: 'uppercase' }}>
          {label}
        </span>
        <span style={{ fontSize: '1.2rem' }}>{icon}</span>
      </div>
      <div style={{
        fontSize: '2rem', fontWeight: '800', letterSpacing: '-.03em',
        color: accent ? '#f87171' : 'var(--t1)'
      }}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}
