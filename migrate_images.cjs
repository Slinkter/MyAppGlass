const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(__dirname, fullPath));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles('src');

let totalModified = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"][^'"]+\.(?:png|jpg|jpeg|svg|webp)['"]/g;
  let match;
  const variables = [];
  
  while ((match = importRegex.exec(content)) !== null) {
    variables.push(match[1]);
  }

  for (const varName of variables) {
    const usageRegex = new RegExp(`\\b${varName}\\b(?!\\.src)`, 'g');
    
    let newContent = '';
    let lastIndex = 0;
    let matchUsage;
    
    while ((matchUsage = usageRegex.exec(content)) !== null) {
      const index = matchUsage.index;
      
      const charBefore = index > 0 ? content[index - 1] : '';
      
      const prevContext = content.slice(Math.max(0, index - 20), index);
      const postContext = content.slice(index + varName.length, index + varName.length + 10);
      
      const isImportDecl = prevContext.match(/(import|as|{)\s*$/); // include { for named imports although rare
      const isFileExtension = postContext.match(/^\.(png|jpg|jpeg|svg|webp)/i);
      const isPathSlash = charBefore === '/';
      
      if (isImportDecl || isFileExtension || isPathSlash) {
        newContent += content.slice(lastIndex, index + varName.length);
      } else {
        newContent += content.slice(lastIndex, index) + `${varName}.src`;
      }
      lastIndex = index + varName.length;
    }
    newContent += content.slice(lastIndex);
    content = newContent;
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Modified ${file}`);
    totalModified++;
  }
}

console.log(`Total files modified: ${totalModified}`);