/**
 * @file test-integration.cjs
 * @description Prueba de integración directa corregida para ejecutarse dentro de /functions.
 */
const fs = require('fs');
const path = require('path');

// 1. Cargar variables de entorno
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) process.env[key.trim()] = value.trim();
  });
}

const adminMock = {
  firestore: () => ({
    collection: () => ({
      doc: () => ({ set: async (data) => { console.log('✅ Firestore persistido:', data.nombreCompleto); return true; } })
    })
  })
};

// 2. Cargar datos del JSON
const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'test-reclamo.json')));

// 3. Ejecutar lógica
const { sendEmailLogic } = require('./emailSender');

async function runTest() {
  console.log('🚀 Validando lógica con test-reclamo.json...');
  try {
    const result = await sendEmailLogic(testData, adminMock);
    console.log('🎉 SIMULACIÓN EXITOSA');
    console.log('📧 ID DE RESEND:', result.id);
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

runTest();
