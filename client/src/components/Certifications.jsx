import SplitText from "./SplitText";
import MagicBento from './MagicBento';

const CERTS = [
  { 
    color: '#0a0a0a',
    title: 'Data Structures & Algorithms',
    description: 'neoColab',
    label: '🧩',
    href: '/DSA.pdf',
    span: 'col-span-2 row-span-2'
  },
  { color: '#0a0a0a', title: 'OOPs (Java)', description: 'neoColab', label: '🔷', href: '/OOPs.pdf', span: '' },
  { color: '#0a0a0a', title: 'C Programming', description: 'neoColab', label: '💻', href: '/c Programing.pdf', span: '' },
  { color: '#0a0a0a', title: 'Responsive Web Design', description: 'freeCodeCamp', label: '📱', href: '/freecodecamp.pdf', span: 'col-span-2' },
  { color: '#0a0a0a', title: 'Operating Systems', description: 'Coursera', label: '🖥️', href: '/Operating System.pdf', span: '' },
  { color: '#0a0a0a', title: 'Computer Networks', description: 'Coursera', label: '🌐', href: '/Bits and Byte Comp Networks.pdf', span: 'col-span-2' },
  { color: '#0a0a0a', title: 'Network Comms', description: 'Coursera', label: '📡', href: '/Network Communication.pdf', span: '' },
  { color: '#0a0a0a', title: 'TCP / IP', description: 'Coursera', label: '🔗', href: '/TCP  IP.pdf', span: '' },
  { color: '#0a0a0a', title: 'Digital Systems', description: 'NPTEL', label: '💡', href: '/Digital Systems.pdf', span: 'col-span-2' },
  { color: '#0a0a0a', title: 'Design Thinking', description: 'NPTEL', label: '🎯', href: '/Design and Thinking.pdf', span: '' },
  { color: '#0a0a0a', title: 'Excel Beginners', description: 'Simplilearn', label: '📊', href: '/excel simplylearn.pdf', span: '' },
  { color: '#0a0a0a', title: 'Binary Blitz', description: 'ISTE', label: '🏆', href: '/Binary Blitzpdf.pdf', span: 'col-span-2' },
];

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="sec-head reveal">
        <span className="sec-num">05</span>
        <h2 className="sec-title">
          <SplitText
            text="Certifications"
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

      <div className="reveal" style={{ width: '100%' }}>
        <MagicBento 
          items={CERTS}
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="226, 232, 240"
          disableAnimations={false}
        />
      </div>
    </section>
  );
}
