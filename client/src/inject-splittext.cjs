const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (file === 'SplitText.jsx' || file === 'Hero.jsx') return;
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (/<h2 className="sec-title">/.test(content)) {
    if (!content.includes('import SplitText')) {
      content = 'import SplitText from "./SplitText";\n' + content;
    }

    content = content.replace(/<h2 className="sec-title">([^<]+)<\/h2>/g, (match, text) => {
      return `<h2 className="sec-title">
          <SplitText
            text="${text}"
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
        </h2>`;
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
