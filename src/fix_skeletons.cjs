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
        
        // Skeleton logic
        content = content.replace(/isLoaded=\{!isPending\}/g, 'loading={isPending}');
        content = content.replace(/isLoaded=\{isLoaded\}/g, 'loading={!isLoaded}');
        
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed Skeleton:', filePath);
        }
    }
});
