import SplitText from "./SplitText";
import BorderGlow from "./BorderGlow";
export default function Training() {
  return (
    <section id="training">
      <div className="sec-head reveal">
        <span className="sec-num">03</span>
        <h2 className="sec-title">
          <SplitText
            text="Summer Training"
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
      <BorderGlow className="train-card reveal" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
        <div className="train-top">
          <div>
            <div className="train-title">Think Design Prototype</div>
            <div className="train-sub">Lovely Professional University</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="train-period">Jun 2025 – Jul 2025</div>
            <div style={{ marginTop: "8px" }} className="atags">
              <span className="atag">Design Thinking</span>
              <span className="atag">Figma</span>
              <span className="atag">Prototyping</span>
              <span className="atag">UI/UX</span>
            </div>
          </div>
        </div>
        <div className="bullets">
          <div className="bullet">
            Applied Design Thinking methodologies to build prototype-driven
            solutions focused on user-centric problem solving.
          </div>
          <div className="bullet">
            Designed interactive wireframes and UI layouts using Figma to enhance
            product visualization and usability structure.
          </div>
          <div className="bullet">
            Conducted requirement analysis, brainstormed ideas, and refined
            prototypes iteratively based on feedback and evaluation.
          </div>
        </div>
        <a href="#" className="proj-link">
          View Project{" "}
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </BorderGlow>
    </section>
  );
}
