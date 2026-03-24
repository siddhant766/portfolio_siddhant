import SplitText from "./SplitText";
import BorderGlow from "./BorderGlow";
export default function Achievements() {
  return (
    <section id="achievements">
      <div className="sec-head reveal">
        <span className="sec-num">06</span>
        <h2 className="sec-title">
          <SplitText
            text="Achievements"
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
      <div className="ach-list reveal">
        <BorderGlow className="ach-item" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div className="ach-dot"></div>
          <p className="ach-text">
            Awarded <strong style={{ color: "var(--t2)" }}>Best Project of the Semester</strong> for
            AIBookSummarizer — recognized for innovation, practical execution, and strong user-centric problem solving.
          </p>
        </BorderGlow>
        <BorderGlow className="ach-item" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div className="ach-dot"></div>
          <p className="ach-text">
            Completed summer training in Design Thinking &amp; Figma at Lovely Professional University,
            building prototype-driven user-centric solutions with improved UI/UX and usability.
          </p>
        </BorderGlow>
        <BorderGlow className="ach-item" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div className="ach-dot"></div>
          <p className="ach-text">
            Real Estate Platform adopted by a local real estate firm — demonstrating strong commercial
            viability and real-world impact through production-ready full-stack development.
          </p>
        </BorderGlow>
      </div>
    </section>
  );
}
