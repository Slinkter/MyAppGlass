#!/usr/bin/env node
/**
 * Phase 2A: Image Optimization & Storage Reprocessing
 * - Step A: Optimizes local high-weight webp images in apps/web/public/images/
 *   and generates responsive variants (-480w, -960w) for client logos/sectors.
 * - Step B: Iterates all cover.webp images in Firebase Storage bucket (gya-app-4c8a9.firebasestorage.app),
 *   resizes them to max 1600px, and uploads cover.webp, cover-960w.webp, and cover-480w.webp
 *   preserving the exact download token and cache headers.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

let sharp;
try {
  sharp = require("../node_modules/.pnpm/node_modules/sharp");
} catch {
  sharp = require("sharp");
}

const { getFirebaseCliAccessToken } = require("./firebase-token.cjs");

const BUCKET = "gya-app-4c8a9.firebasestorage.app";
const PUBLIC_IMAGES_DIR = path.resolve(import.meta.dirname, "../apps/web/public/images");

const formatKB = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

/**
 * Step A: Optimize local images
 */
async function processLocalImages() {
  console.log("\n=======================================================");
  console.log(" Step A: Local Images Optimization");
  console.log("=======================================================\n");

  const localTargets = [
    "clients-building.webp",
    "clients-sectorhogar.webp",
    "clients-sectoroffices.webp",
    "home-img_t05.webp",
    "services-general-init01.webp",
    "services-general-init02a.webp",
    "services-general-init03.webp",
    "services-general-init04.webp",
    "services-products-01.Ventanas-nova-a10.webp",
  ];

  const responsiveTargets = new Set([
    "clients-building.webp",
    "clients-sectorhogar.webp",
    "clients-sectoroffices.webp",
  ]);

  const report = [];

  for (const filename of localTargets) {
    const fullPath = path.join(PUBLIC_IMAGES_DIR, filename);
    if (!existsSync(fullPath)) {
      console.warn(`[WARN] File not found: ${fullPath}`);
      continue;
    }

    const originalBuf = readFileSync(fullPath);
    const originalSize = originalBuf.length;
    const meta = await sharp(originalBuf).metadata();

    // Resize main file in-place (max 1600px inside, quality 75 default, effort 6)
    // If image > 120 KB, step down quality to meet the <= 120 KB requirement
    let quality = 75;
    let mainOptimized = await sharp(originalBuf)
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    while (mainOptimized.length > 120 * 1024 && quality > 50) {
      quality -= 3;
      mainOptimized = await sharp(originalBuf)
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toBuffer();
    }

    writeFileSync(fullPath, mainOptimized);
    const newMeta = await sharp(mainOptimized).metadata();

    report.push({
      file: filename,
      originalSize: formatKB(originalSize),
      newSize: formatKB(mainOptimized.length),
      quality: `q=${quality}`,
      dimensions: `${meta.width}x${meta.height} -> ${newMeta.width}x${newMeta.height}`,
      reduction: `${Math.round(((originalSize - mainOptimized.length) / originalSize) * 100)}%`,
    });

    // Generate responsive variants (-480w, -960w) for clients-*
    if (responsiveTargets.has(filename)) {
      const baseName = filename.replace(/\.webp$/, "");

      // 960w (max width 960, quality 75, effort 6)
      const buf960 = await sharp(originalBuf)
        .resize({ width: 960, height: 960, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 75, effort: 6 })
        .toBuffer();
      const path960 = path.join(PUBLIC_IMAGES_DIR, `${baseName}-960w.webp`);
      writeFileSync(path960, buf960);

      // 480w (max width 480, quality 74, effort 6)
      const buf480 = await sharp(originalBuf)
        .resize({ width: 480, height: 480, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 74, effort: 6 })
        .toBuffer();
      const path480 = path.join(PUBLIC_IMAGES_DIR, `${baseName}-480w.webp`);
      writeFileSync(path480, buf480);

      report.push({
        file: `${baseName}-960w.webp`,
        originalSize: "-",
        newSize: formatKB(buf960.length),
        quality: "q=75",
        dimensions: "<= 960px",
        reduction: "variant",
      });
      report.push({
        file: `${baseName}-480w.webp`,
        originalSize: "-",
        newSize: formatKB(buf480.length),
        quality: "q=74",
        dimensions: "<= 480px",
        reduction: "variant",
      });
    }
  }

  console.table(report);
  return report;
}

/**
 * Upload buffer to Firebase Storage preserving token and cache headers
 */
async function uploadToStorage(objectName, buffer, dlToken, token) {
  const boundary = `gya-${randomUUID()}`;
  const metadata = {
    name: objectName,
    contentType: "image/webp",
    cacheControl: "public, max-age=31536000, immutable",
    metadata: {
      firebaseStorageDownloadTokens: dlToken,
    },
  };

  const multipart = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: image/webp\r\n\r\n`
    ),
    buffer,
    Buffer.from(`\r\n--${boundary}--`),
  ]);

  const res = await fetch(
    `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET}/o?uploadType=multipart`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipart,
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upload failed for ${objectName}: ${res.status} ${errText}`);
  }

  return await res.json();
}

/**
 * Step B: Reprocess Firebase Storage cover images
 */
async function processStorageImages() {
  console.log("\n=======================================================");
  console.log(" Step B: Firebase Storage Covers Reprocessing");
  console.log("=======================================================");

  let token = await getFirebaseCliAccessToken();
  console.log("Obtained Firebase CLI access token.");

  // 1. List all objects in bucket (paginating)
  let pageToken = "";
  const allCovers = [];

  do {
    const listUrl =
      `https://storage.googleapis.com/storage/v1/b/${BUCKET}/o?maxResults=500` +
      (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : "");
    const res = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(`Failed to list bucket objects: ${res.status} ${await res.text()}`);
    }

    const data = await res.json();
    const items = data.items || [];
    for (const item of items) {
      if (item.name && item.name.endsWith("/cover.webp")) {
        allCovers.push(item);
      }
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  console.log(`Found ${allCovers.length} cover images to reprocess:\n`);

  const storageReport = [];

  for (let i = 0; i < allCovers.length; i++) {
    const item = allCovers[i];
    const objectName = item.name;
    const originalSizeBytes = parseInt(item.size, 10) || 0;

    // Existing download token or generate new one
    let dlToken = "";
    if (item.metadata && item.metadata.firebaseStorageDownloadTokens) {
      dlToken = item.metadata.firebaseStorageDownloadTokens.split(",")[0].trim();
    }
    if (!dlToken) {
      dlToken = randomUUID();
    }

    process.stdout.write(
      `[${i + 1}/${allCovers.length}] Processing ${objectName} (${formatKB(originalSizeBytes)})... `
    );

    // Download original binary
    const downloadUrl = `https://storage.googleapis.com/storage/v1/b/${BUCKET}/o/${encodeURIComponent(
      objectName
    )}?alt=media`;
    let dlRes = await fetch(downloadUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (dlRes.status === 401) {
      // Refresh token if expired
      token = await getFirebaseCliAccessToken();
      dlRes = await fetch(downloadUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    if (!dlRes.ok) {
      console.error(`\nFailed to download ${objectName}: ${dlRes.status} ${await dlRes.text()}`);
      continue;
    }

    const originalBuf = Buffer.from(await dlRes.arrayBuffer());

    // 1) cover.webp (max 1600px inside, withoutEnlargement, quality 75, effort 6)
    const buf1600 = await sharp(originalBuf)
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75, effort: 6 })
      .toBuffer();

    // 2) cover-960w.webp (max 960px inside, withoutEnlargement, quality 75, effort 6)
    const buf960 = await sharp(originalBuf)
      .resize({ width: 960, height: 960, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75, effort: 6 })
      .toBuffer();

    // 3) cover-480w.webp (max 480px inside, withoutEnlargement, quality 74, effort 6)
    const buf480 = await sharp(originalBuf)
      .resize({ width: 480, height: 480, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toBuffer();

    // Destination object names
    const name960 = objectName.replace(/\/cover\.webp$/, "/cover-960w.webp");
    const name480 = objectName.replace(/\/cover\.webp$/, "/cover-480w.webp");

    // Upload all 3
    await uploadToStorage(objectName, buf1600, dlToken, token);
    await uploadToStorage(name960, buf960, dlToken, token);
    await uploadToStorage(name480, buf480, dlToken, token);

    console.log(`✓ (1600w: ${formatKB(buf1600.length)}, 960w: ${formatKB(buf960.length)}, 480w: ${formatKB(buf480.length)})`);

    storageReport.push({
      path: objectName,
      originalSize: formatKB(originalSizeBytes),
      newCoverSize: formatKB(buf1600.length),
      size960w: formatKB(buf960.length),
      size480w: formatKB(buf480.length),
      reduction: `${Math.round(((originalSizeBytes - buf1600.length) / originalSizeBytes) * 100)}%`,
    });
  }

  console.log("\nStorage covers summary:");
  console.table(storageReport);
  return storageReport;
}

async function main() {
  const args = process.argv.slice(2);
  const skipLocal = args.includes("--skip-local");
  const skipStorage = args.includes("--skip-storage");

  if (!skipLocal) {
    await processLocalImages();
  }
  if (!skipStorage) {
    await processStorageImages();
  }

  console.log("\nImage optimization complete!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
