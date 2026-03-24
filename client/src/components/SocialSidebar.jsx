import { FaBehance, FaDribbble, FaLinkedinIn } from 'react-icons/fa';

export default function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <div className="social-sidebar-text">FOLLOW ME ON</div>
      <div className="social-sidebar-line"></div>
      <a href="https://behance.net" target="_blank" rel="noreferrer" className="social-icon" aria-label="Behance">
        <FaBehance />
      </a>
      <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Dribbble">
        <FaDribbble />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
        <FaLinkedinIn />
      </a>
    </div>
  );
}
