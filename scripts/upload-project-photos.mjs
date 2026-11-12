import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const admin = require("../apps/functions/node_modules/firebase-admin");

const BASE_DIR = path.resolve("docs/photos-optimized");
const PROJECT_PREFIX_MAP = {
  "PALMER-1-001": "palmer",
  "Proyecto Elenor-1-001": "elenor",
  "Proyecto Maddy-1-001": "maddy",
  "Proyecto Parque Prado-1-001": "parque-prado",
  "Proyecto Ventura-1-001": "ventura",
  "VITTORIE-1-001": "vittorie",
};

const RENAME_ONLY = process.argv.includes("--rename-only");
const BUCKET_NAME = process.env.FIREBASE_STORAGE_BUCKET || "gya-app-4c8a9.firebasestorage.app";

async function renameProjectPhotos(dirName, prefix) {
  const webDir = path.join(BASE_DIR, dirName, "web");
  const mobileDir = path.join(BASE_DIR, dirName, "mobile");

  const webFiles = (await fs.readdir(webDir)).filter((f) => f.endsWith(".webp")).sort();
  const renamed = [];

  // Two-pass rename to avoid collisions if already partially prefixed
  for (let i = 0; i < webFiles.length; i++) {
    const oldName = webFiles[i];
    const tmpName = `__tmp_${String(i + 1).padStart(3, "0")}.webp`;
    await fs.rename(path.join(webDir, oldName), path.join(webDir, tmpName));
    try {
      await fs.rename(path.join(mobileDir, oldName), path.join(mobileDir, tmpName));
    } catch {
      // mobile file may have different case or missing; skip if not found
    }
  }

  const tmpFiles = (await fs.readdir(webDir)).filter((f) => f.startsWith("__tmp_")).sort();
  for (let i = 0; i < tmpFiles.length; i++) {
    const tmpName = tmpFiles[i];
    const newName = `${prefix}${String(i + 1).padStart(3, "0")}.webp`;
    await fs.rename(path.join(webDir, tmpName), path.join(webDir, newName));
    try {
      await fs.rename(path.join(mobileDir, tmpName), path.join(mobileDir, newName));
    } catch {
      // ignore
    }
    renamed.push(newName);
  }

  return renamed;
}

async function uploadProjectPhotos(bucket, prefix, dirName, fileNames) {
  const webDir = path.join(BASE_DIR, dirName, "web");
  const mobileDir = path.join(BASE_DIR, dirName, "mobile");
  const results = [];

  for (const fileName of fileNames) {
    const webDest = `projects/${prefix}/web/${fileName}`;
    const mobileDest = `projects/${prefix}/mobile/${fileName}`;

    await bucket.upload(path.join(webDir, fileName), {
      destination: webDest,
      metadata: {
        contentType: "image/webp",
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    await bucket.upload(path.join(mobileDir, fileName), {
      destination: mobileDest,
      metadata: {
        contentType: "image/webp",
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    const webUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET_NAME}/o/${encodeURIComponent(webDest)}?alt=media`;
    const mobileUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET_NAME}/o/${encodeURIComponent(mobileDest)}?alt=media`;
    results.push({ fileName, web: webUrl, mobile: mobileUrl });
  }

  return results;
}

async function main() {
  const manifest = {};

  for (const [dirName, prefix] of Object.entries(PROJECT_PREFIX_MAP)) {
    const files = await renameProjectPhotos(dirName, prefix);
    console.log(`[rename] ${dirName} -> ${files.length} archivos (${prefix}001.webp .. ${prefix}${String(files.length).padStart(3, "0")}.webp)`);
    manifest[prefix] = { dirName, count: files.length, files };
  }

  if (RENAME_ONLY) {
    console.log("[done] Renombrado completado (--rename-only).");
    return;
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: "gya-app-4c8a9",
      storageBucket: BUCKET_NAME,
    });
  }

  const bucket = admin.storage().bucket();
  for (const [prefix, info] of Object.entries(manifest)) {
    console.log(`[upload] Subiendo ${info.count} pares (web + mobile) para ${prefix}...`);
    info.urls = await uploadProjectPhotos(bucket, prefix, info.dirName, info.files);
    console.log(`[upload] ${prefix} completado.`);
  }

  const manifestPath = path.resolve("docs/photos-optimized/manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`[done] Manifiesto guardado en ${manifestPath}`);
}

main().catch((err) => {
  console.error("[error]", err);
  process.exit(1);
});
