import SplitText from "./SplitText";
import { FaReact, FaNodeJs, FaLaravel, FaDocker } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';
import SocialSidebar from './SocialSidebar';

export default function Hero() {
  const downloadCV = () => {
    const a = document.createElement("a");
    a.href = "/Siddhant_Patel_CV.pdf";
    a.download = "Siddhant_Patel_CV.pdf";
    a.click();
  };

  return (
    <div className="hero">
      <div className="hero-left hero-left-redesign">
        <div className="hero-welcome-text">
          Welcome to my portfolio!
        </div>
        <h1 className="hero-headline">
          Hello, my <br />
          name's <span className="highlight-name">Siddhant.</span>
        </h1>
        <p className="hero-desc-redesign">
          I'm a Full Stack Developer. <br />
          Currently building high-performance web apps with modern <br />
          stacks and scalable architecture.
        </p>
        <div className="hero-btns-redesign">
          <button className="btn-pill btn-solid" onClick={downloadCV}>
            Download cv
          </button>
          <a href="#projects" className="btn-pill btn-outline">
            See my work ⟶
          </a>
        </div>
        
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span className="scroll-text">Scroll down</span>
        </div>
      </div>
      <div className="hero-right">
        <div className="profile-wrap-circular">
          <div className="glowing-ring"></div>
          <div className="profile-card-circular">
            <img
              src="/sid.jpeg"
              alt="Siddhant Patel"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>

          <div className="floating-icon icon-react" title="React">
            <FaReact />
          </div>
          <div className="floating-icon icon-node" title="Node.js">
            <FaNodeJs />
          </div>
          <div className="floating-icon icon-laravel" title="Laravel">
            <FaLaravel />
          </div>
          <div className="floating-icon icon-mongo" title="MongoDB">
            <SiMongodb />
          </div>
          <div className="floating-icon icon-docker" title="Docker">
            <FaDocker />
          </div>
        </div>
      </div>
      <SocialSidebar />
    </div>
  );
}
