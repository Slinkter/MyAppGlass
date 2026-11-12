import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import heicConvert from "heic-convert";

const INPUT_DIR = path.resolve("docs/photos");
const OUTPUT_DIR = path.resolve("docs/photos-optimized");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".heic", ".webp"]);

async function toBuffer(filePath, ext) {
  const raw = await fs.readFile(filePath);
  if (ext === ".heic") {
    const out = await heicConvert({ buffer: raw, format: "JPEG", quality: 0.92 });
    return Buffer.from(out);
  }
  return raw;
}

async function processFile(filePath, outWebDir, outMobileDir, baseName) {
  const ext = path.extname(filePath).toLowerCase();
  if (!IMAGE_EXTS.has(ext)) return null;

  const webPath = path.join(outWebDir, `${baseName}.webp`);
  const mobilePath = path.join(outMobileDir, `${baseName}.webp`);

  try {
    await fs.access(webPath);
    await fs.access(mobilePath);
    return { webPath, mobilePath };
  } catch {
    // Not yet converted
  }

  const buf = await toBuffer(filePath, ext);

  await sharp(buf)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webPath);

  await sharp(buf)
    .rotate()
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(mobilePath);

  return { webPath, mobilePath };
}

async function main() {
  const entries = await fs.readdir(INPUT_DIR, { withFileTypes: true });
  const projectDirs = entries.filter((e) => e.isDirectory());

  let totalProcessed = 0;
  let totalErrors = 0;

  for (const dir of projectDirs) {
    const projectIn = path.join(INPUT_DIR, dir.name);
    const outWebDir = path.join(OUTPUT_DIR, dir.name, "web");
    const outMobileDir = path.join(OUTPUT_DIR, dir.name, "mobile");
    await fs.mkdir(outWebDir, { recursive: true });
    await fs.mkdir(outMobileDir, { recursive: true });

    const files = await fs.readdir(projectIn, { withFileTypes: true, recursive: true });
    const imageFiles = files.filter(
      (f) => f.isFile() && IMAGE_EXTS.has(path.extname(f.name).toLowerCase())
    );

    console.log(`\n[${dir.name}] ${imageFiles.length} fotos encontradas...`);
    let count = 0;

    for (const file of imageFiles) {
      const filePath = path.join(file.parentPath ?? file.path ?? projectIn, file.name);
      const baseName = path.parse(file.name).name;
      try {
        await processFile(filePath, outWebDir, outMobileDir, baseName);
        count++;
        totalProcessed++;
      } catch (err) {
        totalErrors++;
        console.error(`  Error en ${file.name}: ${err.message}`);
      }
    }
    console.log(`[${dir.name}] Completado: ${count}/${imageFiles.length}`);
  }

  console.log(`\nResumen: ${totalProcessed} fotos optimizadas, ${totalErrors} errores.`);
  console.log(`Salida en: ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
