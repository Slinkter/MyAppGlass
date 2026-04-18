import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src');

async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
}

async function fixFile(filePath) {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;

    let content = await fs.readFile(filePath, 'utf8');
    const originalContent = content;

    // Fix the specific broken pattern: '/images/something-'/images/something.webp'.webp'
    // This regex looks for the nested image paths created by the failed migration
    const brokenRegex = /'\/images\/[^']+'\/images\/([^']+)\.webp'\.webp'/g;
    content = content.replace(brokenRegex, "'/images/$1.webp'");
    
    // Also fix cases like '/images/something.webp'.webp
    const brokenRegex2 = /'\/images\/([^']+)\.webp'\.webp/g;
    content = content.replace(brokenRegex2, "'/images/$1.webp'");

    if (content !== originalContent) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`🧹 Cleaned ${path.relative(SRC_DIR, filePath)}`);
    }
}

async function main() {
    console.log('🧼 Cleaning up broken image paths...');
    const allFiles = await getFiles(SRC_DIR);
    await Promise.all(allFiles.map(fixFile));
}

main().catch(console.error);
