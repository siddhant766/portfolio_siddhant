import SplitText from "./SplitText";
import BorderGlow from "./BorderGlow";
export default function Education() {
  return (
    <section id="education">
      <div className="sec-head reveal">
        <span className="sec-num">04</span>
        <h2 className="sec-title">
          <SplitText
            text="Education"
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
      <div className="edu-list reveal">
        <BorderGlow className="edu-card" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div>
            <div className="edu-inst">Lovely Professional University</div>
            <div className="edu-deg">
              B.Tech in Computer Science and Engineering · Phagwara, Punjab
            </div>
            <div className="edu-yr">Aug 2023 – May 2027</div>
          </div>
          <div>
            <div className="edu-score">8.13</div>
            <div className="edu-lbl">CGPA</div>
          </div>
        </BorderGlow>
        <BorderGlow className="edu-card" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div>
            <div className="edu-inst">BBL Public School (CBSE)</div>
            <div className="edu-deg">
              Higher Secondary (Class XII) · Bareilly, UP
            </div>
            <div className="edu-yr">2021</div>
          </div>
          <div>
            <div className="edu-score">87.68%</div>
            <div className="edu-lbl">Score</div>
          </div>
        </BorderGlow>
        <BorderGlow className="edu-card" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div>
            <div className="edu-inst">BBL Public School (CBSE)</div>
            <div className="edu-deg">Secondary (Class X) · Bareilly, UP</div>
            <div className="edu-yr">2019</div>
          </div>
          <div>
            <div className="edu-score">91.8%</div>
            <div className="edu-lbl">Score</div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
