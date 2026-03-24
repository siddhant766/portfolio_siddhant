const fs = require('fs');
let c = fs.readFileSync('components/Skills.jsx', 'utf8');

c = c.replace(
  /<div className="skill-category-card" key=\{catIndex\}>/g,
  `<BorderGlow className="skill-category-card" key={catIndex} backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>`
);
c = c.replace(
  /<\/div>\r?\n\s*<\/div>\r?\n\s*\)\)/g,
  `</div>\n              </BorderGlow>\n            ))`
);

fs.writeFileSync('components/Skills.jsx', c);
console.log('Fixed Skills');
