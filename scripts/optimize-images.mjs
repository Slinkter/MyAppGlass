/**
 * @file optimize-images.mjs
 * @description Script de optimización masiva de imágenes para GYA Glass & Aluminum.
 * Convierte activos de src/assets a public/images en formato WebP optimizado.
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '..', 'src', 'assets');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');

// Configuración de optimización
const WEBP_OPTIONS = {
    quality: 80,      // Equilibrio perfecto entre peso y calidad visual
    effort: 6,       // Nivel de CPU dedicado a la compresión (1-6)
    lossless: false  // Compresión con pérdida para máximo ahorro
};

/**
 * Recorre directorios de forma recursiva para encontrar imágenes.
 */
async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
}

/**
 * Procesa y optimiza una imagen individual.
 */
async function processImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

    // Crear nombre único basado en la estructura de carpetas para evitar colisiones
    const relativePath = path.relative(INPUT_DIR, filePath);
    const fileName = relativePath
        .replace(/[\\/]/g, '-') // Reemplaza carpetas por guiones
        .replace(ext, '.webp'); // Cambia extensión a webp

    const outputPath = path.join(OUTPUT_DIR, fileName);

    try {
        // Verificar si ya existe y si el original es más antiguo
        try {
            const statsOut = await fs.stat(outputPath);
            const statsIn = await fs.stat(filePath);
            if (statsOut.mtime > statsIn.mtime) {
                // console.log(`⏩ ${fileName} (ya optimizada)`);
                return;
            }
        } catch (e) {
            // El archivo no existe, proceder a optimizar
        }

        await sharp(filePath)
            .resize(1920, null, { // Redimensiona a Full HD máximo, mantiene aspecto
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp(WEBP_OPTIONS)
            .toFile(outputPath);
        
        const statsBase = await fs.stat(filePath);
        const statsWebp = await fs.stat(outputPath);
        const saving = ((statsBase.size - statsWebp.size) / statsBase.size * 100).toFixed(1);
        
        console.log(`✅ ${fileName} [-${saving}%]`);
    } catch (err) {
        console.error(`❌ Error procesando ${fileName}:`, err.message);
    }
}

async function main() {
    console.log('🚀 Iniciando optimización de imágenes...');
    
    // Asegurar que existe la carpeta de salida
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
    } catch (err) {}

    const allFiles = await getFiles(INPUT_DIR);
    console.log(`🔍 Encontradas ${allFiles.length} archivos en assets.`);

    await Promise.all(allFiles.map(processImage));

    console.log('\n✨ Optimización completada. Imágenes listas en public/images/');
}

main().catch(console.error);
