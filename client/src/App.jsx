import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashCursor from './components/SplashCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GithubProfile from './components/GithubProfile';
import LeetcodeProfile from './components/LeetcodeProfile';
import Training from './components/Training';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import LightRays from './components/LightRays';
import ScrollToTop from './components/ScrollToTop';


function Portfolio() {
  const [theme, setTheme] = useState('dark');
  
  // Theme Toggle Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  // Scroll Reveal Logic
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in'), i * 50);
        }
      });
    }, { threshold: 0.07 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => obs.observe(el));

    return () => {
      elements.forEach(el => obs.unobserve(el));
      obs.disconnect();
    };
  }, []);

  // Track visitor on page load
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/visit', { method: 'POST' }).catch(() => {});
  }, []);

  return (
    <>
      <SplashCursor />
      <canvas id="fluid-canvas"
        style={{ position: 'fixed', zIndex: '0', width: '100vw', height: '100vh', top: '0', left: '0', pointerEvents: 'none' }}>
      </canvas>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>
      <div className="glow"></div>
      
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Hero />
      <Stats />
      <Skills />
      <Projects />
      <GithubProfile theme={theme} />
      <LeetcodeProfile theme={theme} />
      <Training />
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
