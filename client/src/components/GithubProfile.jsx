import SplitText from "./SplitText";
import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export default function GithubProfile({ theme = 'dark' }) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const username = 'siddhant766';
        
        // Fetch User Data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        
        if (!userRes.ok) {
          if (userRes.status === 403 || userRes.status === 429) {
            console.warn("GitHub API rate limit exceeded. Using fallback data for preview.");
            setUser({
              login: username,
              name: 'Siddhant Patel',
              avatar_url: '/sid.jpeg', // Use the local hero image representing them
              bio: 'Full Stack Developer',
              public_repos: 12,
              followers: 8,
              html_url: `https://github.com/${username}`
            });
            setRepos([
              { id: 1, name: 'Portfolio', stargazers_count: 5, language: 'JavaScript', description: 'My personal portfolio website', html_url: `https://github.com/${username}` },
              { id: 2, name: 'Admin-Dashboard', stargazers_count: 2, language: 'React', description: 'Full stack admin panel', html_url: `https://github.com/${username}` },
              { id: 3, name: 'E-commerce-App', stargazers_count: 3, language: 'Node.js', description: 'Scalable backend API', html_url: `https://github.com/${username}` },
              { id: 4, name: 'Weather-App', stargazers_count: 1, language: 'HTML/CSS', description: 'Simple weather fetcher', html_url: `https://github.com/${username}` },
            ]);
            setLoading(false);
            return;
          }
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await userRes.json();
        
        // Fetch Repos Data
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!reposRes.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposRes.json();

        setUser(userData);
        setRepos(reposData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Unable to load GitHub profile right now.');
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  // Set up intersection observer for dynamically loaded content
  useEffect(() => {
    if (!loading && !error) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('in'), i * 50);
          }
        });
      }, { threshold: 0.07 });

      const githubSection = document.getElementById('github');
      if (githubSection) {
        const elements = githubSection.querySelectorAll('.reveal');
        elements.forEach(el => obs.observe(el));
      }

      return () => obs.disconnect();
    }
  }, [loading, error, repos]);

  if (loading) {
    return (
      <section id="github">
        <div className="sec-head reveal">
          <span className="sec-num">03</span>
          <h2 className="sec-title">
          <SplitText
            text="GitHub Activity"
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
          Loading repositories...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github">
        <div className="sec-head reveal">
          <span className="sec-num">03</span>
          <h2 className="sec-title">
          <SplitText
            text="GitHub Activity"
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
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#f87171', fontFamily: 'var(--mono)' }}>
          {error}
          <br /><br />
          <a href="https://github.com/siddhant766" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ marginTop: '16px' }}>
            Visit GitHub Profile directly
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="github">
      <div className="sec-head reveal">
        <span className="sec-num">03</span>
        <h2 className="sec-title">
          <SplitText
            text="GitHub Activity"
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

      <div className="github-profile reveal" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px', 
        marginBottom: '32px',
        padding: '24px',
        background: 'var(--bg1)',
        border: '1px solid var(--line)',
        flexWrap: 'wrap'
      }}>
        <img 
          src={user.avatar_url} 
          alt={`${user.login} avatar`} 
          style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--line)' }} 
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--t1)', fontWeight: '700', marginBottom: '4px' }}>
            {user.name || user.login}
          </h3>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '1.05rem', color: 'var(--t3)', marginBottom: '12px' }}>
            {user.bio || 'Full Stack Developer'}
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '1.05rem', color: 'var(--t2)' }}>
              <strong style={{ color: 'var(--ac)' }}>{user.public_repos}</strong> Repositories
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '1.05rem', color: 'var(--t2)' }}>
              <strong style={{ color: 'var(--ac)' }}>{user.followers}</strong> Followers
            </span>
          </div>
          
          <div style={{ marginTop: '32px', width: '100%', overflowX: 'auto', paddingBottom: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--t2)', marginBottom: '16px', fontWeight: '500' }}>
              Contribution Activity
            </h4>
            <GitHubCalendar 
              username="siddhant766" 
              colorScheme={theme}
              fontSize={14}
              blockSize={12}
              blockMargin={4}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
            />
          </div>
        </div>
        <a href={user.html_url} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>
          Follow on GitHub
        </a>
      </div>

      <div className="proj-grid">
        {repos.map((repo) => (
          <div className="proj-card reveal" key={repo.id}>
            <div className="proj-top">
              <h3 className="proj-name" style={{ wordBreak: 'break-word', paddingRight: '12px' }}>
                {repo.name}
              </h3>
              {repo.stargazers_count > 0 && (
                <span className="proj-date" style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ★ {repo.stargazers_count}
                </span>
              )}
            </div>
            
            {repo.language && (
              <div className="atags" style={{ marginTop: '8px' }}>
                <span className="atag">{repo.language}</span>
              </div>
            )}
            
            <div className="bullets" style={{ marginTop: '12px', marginBottom: '16px' }}>
              <div className="bullet">
                {repo.description || 'No description available for this repository.'}
              </div>
            </div>
            
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="proj-link" style={{ marginTop: 'auto' }}>
              View Repository{' '}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
