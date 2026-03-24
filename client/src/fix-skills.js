const fs = require('fs');
let c = fs.readFileSync('components/Skills.jsx', 'utf8');

c = c.replace(
  '<div className="skill-category-card" key={catIndex}>',
  '<BorderGlow className="skill-category-card" key={catIndex} backgroundColor="var(--bg1)" style={{ background: \\'transparent\\', border: \\'none\\' }}>'
);

c = c.replace(
  '<div className="skill-category-card" key={catIndex}>',
  '<BorderGlow className="skill-category-card" key={catIndex} backgroundColor="var(--bg1)" style={{ background: \\'transparent\\', border: \\'none\\' }}>'
); // In case

c = c.replace(
  /<\/div>\s*<\/div>\s*\)\)/g,
  '</div></BorderGlow>}))'
);

fs.writeFileSync('components/Skills.jsx', c);
console.log('Done');
