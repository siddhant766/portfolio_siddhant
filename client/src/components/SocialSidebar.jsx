import { FaGithub, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <div className="social-sidebar-text">FOLLOW ME ON</div>
      <div className="social-sidebar-line"></div>
      <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
        <FaGithub />
      </a>
      <a href="https://x.com/siddhant766" target="_blank" rel="noreferrer" className="social-icon" aria-label="X (Twitter)">
        <FaTwitter />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
        <FaLinkedinIn />
      </a>
    </div>
  );
}
