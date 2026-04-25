/**
 * @file upload-to-storage.mjs
 * @description Script para subir imágenes de public/images a Firebase Storage de forma masiva.
 * 
 * INSTRUCCIONES:
 * 1. Descarga el archivo JSON de tu cuenta de servicio desde Firebase Console > Project Settings > Service Accounts.
 * 2. Guárdalo como 'service-account.json' en la raíz de este proyecto.
 * 3. Ejecuta: node scripts/upload-to-storage.mjs
 */

import admin from 'firebase-admin';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURACIÓN
const PROJECT_ID = "gya-app-4c8a9";
const BUCKET_NAME = `${PROJECT_ID}.firebasestorage.app`; // O gya-app-4c8a9.appspot.com
const LOCAL_IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const KEY_FILE = path.join(__dirname, '..', 'service-account.json');

async function main() {
  try {
    const serviceAccount = JSON.parse(await fs.readFile(KEY_FILE, 'utf8'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: BUCKET_NAME
    });

    const bucket = admin.storage().bucket();
    const files = await fs.readdir(LOCAL_IMAGES_DIR);

    console.log(`🚀 Iniciando subida de ${files.length} imágenes a Firebase Storage...`);

    let count = 0;
    for (const file of files) {
      const filePath = path.join(LOCAL_IMAGES_DIR, file);
      const stat = await fs.stat(filePath);

      if (stat.isFile()) {
        const destination = `images/${file}`;
        
        // Subir archivo
        await bucket.upload(filePath, {
          destination,
          public: true, // Hacerlo público para acceso directo vía URL
          metadata: {
            cacheControl: 'public, max-age=31536000',
            contentType: getContentType(file)
          }
        });

        count++;
        if (count % 10 === 0) console.log(`✅ Subidas ${count}/${files.length} imágenes...`);
      }
    }

    console.log(`\n✨ ¡Éxito! Se han subido ${count} imágenes a gs://${BUCKET_NAME}/images/`);
    console.log(`💡 Ahora puedes ignorar la carpeta public/images en firebase.json para ahorrar espacio en Hosting.`);

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error("\n❌ Error: No se encontró el archivo 'service-account.json'.");
      console.log("👉 Por favor, descárgalo desde la consola de Firebase y colócalo en la raíz del proyecto.");
    } else {
      console.error("\n❌ Error durante la migración:", error.message);
    }
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.webp': return 'image/webp';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.png': return 'image/png';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

main();
