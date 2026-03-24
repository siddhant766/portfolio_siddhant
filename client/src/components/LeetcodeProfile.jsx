import SplitText from "./SplitText";
import { useState, useEffect } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';

export default function LeetcodeProfile({ theme = 'dark' }) {
  const [data, setData] = useState({
    profile: null,
    solved: null,
    calendar: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWithRetry = async (url, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res;
      } catch (err) {
        if (attempt === retries) throw err;
        await new Promise(r => setTimeout(r, attempt * 2000));
      }
    }
  };

  const fetchLeetcodeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const username = 'Siddhant6395';
      
      const [profileRes, solvedRes, calendarRes] = await Promise.all([
        fetchWithRetry(`https://alfa-leetcode-api.onrender.com/${username}`),
        fetchWithRetry(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
        fetchWithRetry(`https://alfa-leetcode-api.onrender.com/${username}/calendar`)
      ]);

      const profileData = await profileRes.json();
      const solvedData = await solvedRes.json();
      const calendarData = await calendarRes.json();

      let activityList = [];
      if (calendarData.submissionCalendar) {
        const calendarObj = JSON.parse(calendarData.submissionCalendar);
        const datesMap = {};
        const today = new Date();
        for (let i = 365; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          const dateString = d.toISOString().split('T')[0];
          datesMap[dateString] = 0;
        }
        for (const timestamp in calendarObj) {
          const d = new Date(parseInt(timestamp) * 1000);
          const dateString = d.toISOString().split('T')[0];
          if (datesMap[dateString] !== undefined) {
            datesMap[dateString] += calendarObj[timestamp];
          }
        }
        for (const date in datesMap) {
          let count = datesMap[date];
          let level = 0;
          if (count > 0 && count <= 2) level = 1;
          else if (count >= 3 && count <= 5) level = 2;
          else if (count >= 6 && count <= 9) level = 3;
          else if (count >= 10) level = 4;
          activityList.push({ date, count, level });
        }
      }

      setData({ profile: profileData, solved: solvedData, calendar: calendarData, parsedCalendar: activityList });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Unable to load LeetCode dashboard. The API may be waking up — click Retry.');
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeetcodeData(); }, []);

  useEffect(() => {
    if (!loading && !error) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 50);
        });
      }, { threshold: 0.07 });
      const section = document.getElementById('leetcode');
      if (section) section.querySelectorAll('.reveal').forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }
  }, [loading, error]);

  if (loading) {
    return (
      <section id="leetcode" style={{ marginTop: '80px' }}>
        <div className="sec-head reveal">
          <span className="sec-num">04</span>
          <h2 className="sec-title">
          <SplitText
            text="LeetCode Dashboard"
            className=""
            delay={20}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
            tag="span"
          />
        </h2>
          <div className="sec-rule"></div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t3)', fontFamily: 'var(--mono)' }}>
          Loading your LeetCode metrics...
          <div style={{ fontSize: '0.8rem', marginTop: '8px', color: 'var(--t4)' }}>
            (First load may take up to 30s while the API wakes up)
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="leetcode" style={{ marginTop: '80px' }}>
        <div className="sec-head reveal">
          <span className="sec-num">04</span>
          <h2 className="sec-title">
          <SplitText
            text="LeetCode Dashboard"
            className=""
            delay={20}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
            tag="span"
          />
        </h2>
          <div className="sec-rule"></div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: 'var(--mono)' }}>
          <p style={{ color: '#f87171', marginBottom: '20px' }}>{error}</p>
          <button onClick={fetchLeetcodeData} className="btn btn-fill" style={{ marginRight: '12px' }}>
            🔄 Retry
          </button>
          <a href="https://leetcode.com/u/Siddhant6395/" target="_blank" rel="noreferrer" className="btn btn-ghost">
            Visit Profile
          </a>
        </div>
      </section>
    );
  }

  const { profile, solved, calendar, parsedCalendar } = data;

  const allSubmissions = solved.totalSubmissionNum.find(i => i.difficulty === "All") || { submissions: 1, count: 1 };
  const allAc = solved.acSubmissionNum.find(i => i.difficulty === "All") || { submissions: 0 };
  const acceptanceRate = ((allAc.submissions / allSubmissions.submissions) * 100).toFixed(2);
  
  const easyTotal = solved.totalSubmissionNum.find(i => i.difficulty === "Easy")?.count || 0;
  const medTotal = solved.totalSubmissionNum.find(i => i.difficulty === "Medium")?.count || 0;
  const hardTotal = solved.totalSubmissionNum.find(i => i.difficulty === "Hard")?.count || 0;

  return (
    <section id="leetcode" style={{ marginTop: '80px' }}>
      <div className="sec-head reveal">
        <span className="sec-num">04</span>
        <h2 className="sec-title">
          <SplitText
            text="LeetCode Dashboard"
            className=""
            delay={20}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
            tag="span"
          />
        </h2>
        <div className="sec-rule"></div>
      </div>

      <div className="lc-container reveal" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px', marginBottom: '20px',
        fontFamily: 'Inter, -apple-system, sans-serif'
      }}>
        
        {/* LEFT PROFILE BOX */}
        <div style={{
          background: 'var(--bg1)', borderRadius: '12px', padding: '24px',
          border: '1px solid var(--line)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          color: 'var(--t1)'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
            <img src={profile.avatar} alt="Avatar" 
              style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '2px' }}>{profile.name}</h3>
              <p style={{ color: 'var(--t3)', fontSize: '0.9rem', marginBottom: '8px' }}>{profile.username}</p>
              <p style={{ fontSize: '0.95rem' }}>Rank <strong style={{ color: 'var(--t1)' }}>{profile.ranking.toLocaleString()}</strong></p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--t2)', marginBottom: '16px' }}>
            <span><strong style={{ color: 'var(--t1)' }}>0</strong> Following</span>
            <span><strong style={{ color: 'var(--t1)' }}>0</strong> Followers</span>
          </div>
          
          <a href={`https://leetcode.com/u/${profile.username}/`} target="_blank" rel="noreferrer" style={{
            display: 'block', textAlign: 'center', background: 'var(--bg2)',
            color: 'var(--ac)', padding: '8px 0', borderRadius: '6px',
            textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500',
            marginBottom: '24px', border: '1px solid var(--line)'
          }}>
            Edit Profile
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--t2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span role="img" aria-label="location">📍</span> {profile.country || 'Not specified'}
            </div>
            {profile.school && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span role="img" aria-label="school">🎓</span> {profile.school}
              </div>
            )}
            {profile.linkedIN && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span role="img" aria-label="linkedin">🔗</span> 
                <a href={profile.linkedIN} target="_blank" rel="noreferrer" style={{ color: 'var(--t2)', textDecoration: 'none' }}>
                  {profile.linkedIN.split('.com/')[1] || 'LinkedIn'}
                </a>
              </div>
            )}
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
              {profile.skillTags && profile.skillTags.map(skill => (
                <span key={skill} style={{
                  background: 'var(--bg2)', padding: '4px 10px', borderRadius: '12px',
                  fontSize: '0.75rem', border: '1px solid var(--line)'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE STATS BOX */}
        <div style={{
          background: 'var(--bg1)', borderRadius: '12px', padding: '24px',
          border: '1px solid var(--line)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          
          <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
             <svg width="130" height="130" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="45" fill="none" stroke="var(--line)" strokeWidth="4" />
               <circle cx="50" cy="50" r="45" fill="none" stroke="#ffa116" strokeWidth="4" 
                       strokeDasharray={`${(acceptanceRate / 100) * 283} 283`} strokeDashoffset="0"
                       transform="rotate(-90 50 50)" strokeLinecap="round" />
             </svg>
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--t1)' }}>{Number(acceptanceRate).toFixed(1)}<span style={{ fontSize: '0.8rem' }}>%</span></div>
                <div style={{ fontSize: '0.7rem', color: 'var(--t3)' }}>Acceptance</div>
             </div>
             <div style={{ position: 'absolute', bottom: '-25px', width: '100%', textAlign: 'center', fontSize: '0.8rem', color: 'var(--t2)' }}>
               {allSubmissions.submissions} submissions
             </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginLeft: '32px' }}>
            <div style={{ background: 'var(--bg2)', padding: '10px 16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid var(--line)' }}>
              <span style={{ fontSize: '0.8rem', color: '#00b8a3', marginBottom: '4px' }}>Easy</span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--t1)' }}>{solved.easySolved}<span style={{ fontSize: '0.8rem', color: 'var(--t3)', fontWeight: 'normal' }}>/{easyTotal}</span></span>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '10px 16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid var(--line)' }}>
              <span style={{ fontSize: '0.8rem', color: '#ffc01e', marginBottom: '4px' }}>Med.</span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--t1)' }}>{solved.mediumSolved}<span style={{ fontSize: '0.8rem', color: 'var(--t3)', fontWeight: 'normal' }}>/{medTotal}</span></span>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '10px 16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid var(--line)' }}>
              <span style={{ fontSize: '0.8rem', color: '#ef4743', marginBottom: '4px' }}>Hard</span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--t1)' }}>{solved.hardSolved}<span style={{ fontSize: '0.8rem', color: 'var(--t3)', fontWeight: 'normal' }}>/{hardTotal}</span></span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM CALENDAR BOX */}
      <div className="reveal" style={{
        background: 'var(--bg1)', borderRadius: '12px', padding: '24px',
        border: '1px solid var(--line)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '1rem', color: 'var(--t2)' }}>
            <strong style={{ fontSize: '1.2rem', color: 'var(--t1)' }}>{allSubmissions.submissions}</strong> submissions in the past one year
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.9rem', color: 'var(--t2)' }}>
            <span>Total active days: <strong style={{ color: 'var(--t1)' }}>{calendar.totalActiveDays}</strong></span>
            <span>Max streak: <strong style={{ color: 'var(--t1)' }}>{calendar.streak}</strong></span>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '8px' }}>
          <ActivityCalendar 
            data={parsedCalendar}
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              dark: ['#2b2b2b', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            colorScheme={theme}
            fontSize={14}
            blockSize={12}
            blockMargin={4}
            showTotalCount={false}
            showColorLegend={false}
          />
        </div>
      </div>

    </section>
  );
}
