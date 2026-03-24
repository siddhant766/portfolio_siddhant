import SplitText from "./SplitText";
import { useEffect, useRef } from 'react';
import BorderGlow from "./BorderGlow";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaPython, FaFigma, FaBootstrap, FaLaravel, FaPhp, FaDatabase
} from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiCplusplus, SiC, SiMysql, SiExpress } from 'react-icons/si';

const CATEGORIZED_SKILLS = [
  {
    category: 'Programming',
    skills: [
      { name: 'JavaScript', level: 90, icon: <FaJs color="#F7DF1E" /> },
      { name: 'C++', level: 75, icon: <SiCplusplus color="#00599C" /> },
      { name: 'C', level: 70, icon: <SiC color="#A8B9CC" /> },
      { name: 'Python', level: 80, icon: <FaPython color="#3776AB" /> },
    ]
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', level: 90, icon: <FaReact color="#61DAFB" /> },
      { name: 'Next.js', level: 80, icon: <SiNextdotjs /> },
      { name: 'HTML5', level: 95, icon: <FaHtml5 color="#E34F26" /> },
      { name: 'CSS3', level: 90, icon: <FaCss3Alt color="#1572B6" /> },
      { name: 'Tailwind CSS', level: 85, icon: <SiTailwindcss color="#06B6D4" /> },
      { name: 'Bootstrap', level: 75, icon: <FaBootstrap color="#7952B3" /> },
      { name: 'Figma', level: 80, icon: <FaFigma color="#F24E1E" /> },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 75, icon: <FaNodeJs color="#339933" /> },
      { name: 'Express.js', level: 80, icon: <SiExpress /> },
      { name: 'PHP', level: 75, icon: <FaPhp color="#777BB4" /> },
      { name: 'Laravel', level: 70, icon: <FaLaravel color="#FF2D20" /> },
    ]
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB', level: 80, icon: <SiMongodb color="#47A248" /> },
      { name: 'MySQL', level: 85, icon: <SiMysql color="#4479A1" /> },
      { name: 'PostgreSQL', level: 75, icon: <SiPostgresql color="#4169E1" /> },
      { name: 'SQL', level: 85, icon: <FaDatabase /> },
    ]
  }
];

export default function Skills() {
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-level') + '%';
            bar.style.width = targetWidth;
          } else {
             // Reset back to 0% when out of view to make it replay beautifully
             entry.target.style.width = '0%';
          }
        });
      },
      { threshold: 0.1 }
    );

    barsRef.current.forEach((bar) => {
      if (bar) observer.observe(bar);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills">
      <div className="sec-head reveal">
        <span className="sec-num">01</span>
        <h2 className="sec-title">
          <SplitText
            text="Technical Skills"
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
      
      <div className="skills-container reveal">
         <div className="skills-grid-categorized">
           {CATEGORIZED_SKILLS.map((cat, catIndex) => (
             <BorderGlow className="skill-category-card" key={catIndex} backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
               <div className="skill-cat-title">{cat.category}</div>
               <div className="skills-list">
                 {cat.skills.map((skill, skillIndex) => {
                   const uniqueIndex = catIndex * 100 + skillIndex;
                   return (
                     <div className="skill-item" key={skillIndex}>
                       <div className="skill-info">
                         <div className="skill-title">
                           <span className="skill-icon">{skill.icon}</span>
                           <span className="skill-name">{skill.name}</span>
                         </div>
                         <span className="skill-percentage">{skill.level}%</span>
                       </div>
                       <div className="progress-track">
                         <div 
                           className="progress-fill" 
                           data-level={skill.level}
                           ref={(el) => (barsRef.current[uniqueIndex] = el)}
                           style={{ width: '0%' }}
                         ></div>
                       </div>
                     </div>
                   );
                 })}
               </div>
              </BorderGlow>
            ))}
         </div>
      </div>
    </section>
  );
}
