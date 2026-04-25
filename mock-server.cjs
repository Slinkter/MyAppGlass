/**
 * @file mock-server.cjs
 * @description Servidor de prueba minimalista.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');

// Leer el .env manualmente para evitar dependencia 'dotenv' en el mock
const envPath = path.join(__dirname, 'functions', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) process.env[key.trim()] = value.trim();
  });
}

const { sendEmailLogic } = require('./functions/emailSender');
const admin = require('firebase-admin');

// Mock de Firebase Admin
admin.initializeApp({
  projectId: 'gya-app-4c8a9'
});

const app = express();
app.use(express.json());

app.post('/gya-app-4c8a9/us-central1/submitReclamo', async (req, res) => {
  console.log('🚀 Petición recibida para:', req.body.nombreCompleto);
  try {
    const result = await sendEmailLogic(req.body, admin);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('❌ Error en el envío:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Servidor Mock listo en http://localhost:${PORT}`);
});
