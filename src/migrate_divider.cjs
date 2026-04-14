const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDir = 'c:/Users/LJCR/Documents/GitHub/MyAppGlass/src';

walk(targetDir, (filePath) => {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;
        
        // Divider to Separator
        content = content.replace(/import\s+\{([^}]*)Divider([^}]*)\}\s+from\s+["']@chakra-ui\/react["']/g, (match, p1, p2) => {
            return `import { ${p1}Separator${p2} } from "@chakra-ui/react"`;
        });
        content = content.replace(/<Divider/g, '<Separator');
        content = content.replace(/<\/Divider/g, '</Separator');
        
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Migrated Divider:', filePath);
        }
    }
});
