/**
 * @file update-image-paths.mjs
 * @description Script to automatically update source code to use optimized WebP images from /images/
 */

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

async function updateFile(filePath) {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;

    let content = await fs.readFile(filePath, 'utf8');
    const originalContent = content;

    // 1. Identify all imports from assets
    // Example: import buildingImg from "@/assets/clients/building.jpg";
    // Or: import buildingImg from "../../../assets/clients/building.jpg";
    const importRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+\.(?:png|jpg|jpeg|webp))['"]/g;
    let match;
    const importsToReplace = [];

    while ((match = importRegex.exec(content)) !== null) {
        const [fullMatch, variableName, assetPath] = match;
        
        // Skip if not in assets
        if (!assetPath.includes('assets/')) continue;

        // Determine the flattened name
        // Extract the part after 'assets/'
        const parts = assetPath.split('assets/');
        const relativeAssetPath = parts[1];
        
        const ext = path.extname(relativeAssetPath);
        const flattenedName = relativeAssetPath
            .replace(/[\\/]/g, '-')
            .replace(ext, '.webp');
        
        const newPublicPath = `/images/${flattenedName}`;
        
        importsToReplace.push({
            fullMatch,
            variableName,
            newPublicPath
        });
    }

    if (importsToReplace.length === 0) return;

    // 2. Replace usages and remove imports
    for (const item of importsToReplace) {
        // Remove the import line
        content = content.replace(item.fullMatch + ';', '');
        content = content.replace(item.fullMatch, '');

        // Replace variable usages
        // Handle both variable and variable.src (from previous migration)
        const escapedVar = item.variableName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const usageWithSrcRegex = new RegExp(`${escapedVar}\\.src`, 'g');
        const usageRegex = new RegExp(`\\b${escapedVar}\\b`, 'g');

        content = content.replace(usageWithSrcRegex, `'${item.newPublicPath}'`);
        content = content.replace(usageRegex, `'${item.newPublicPath}'`);
    }

    // 3. Clean up empty lines left by removed imports
    content = content.replace(/^\s*[\r\n]/gm, '\n').trimStart();

    if (content !== originalContent) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`✅ Updated ${path.relative(SRC_DIR, filePath)}`);
    }
}

async function main() {
    console.log('🔄 Updating image paths to optimized WebP...');
    const allFiles = await getFiles(SRC_DIR);
    await Promise.all(allFiles.map(updateFile));
    console.log('✨ All image paths updated successfully.');
}

main().catch(console.error);
