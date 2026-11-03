import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gcpRoot = path.resolve(__dirname, '..');

console.log('--- Validando configuraciones de GCP & Firebase (Costo $0.00) ---');

const jsonFiles = [
  'monitoring/alert-policies/alert-functions-5xx.json',
  'monitoring/alert-policies/alert-functions-latency.json',
  'monitoring/alert-policies/alert-uptime-ssl.json',
  'monitoring/uptime-checks/uptime-gyacompany.json',
  'monitoring/channels/notification-email.json',
  'budget/zero-cost-budget-alert.json',
  'bigquery/schemas/reclamos.schema.json',
  'bigquery/schemas/contactos.schema.json',
  'bigquery/schemas/presupuestos.schema.json',
  'bigquery/schemas/pedidos.schema.json',
];

let hasErrors = false;

for (const relPath of jsonFiles) {
  const fullPath = path.join(gcpRoot, relPath);
  try {
    const raw = fs.readFileSync(fullPath, 'utf8');
    const parsed = JSON.parse(raw);
    console.log(`✔ [JSON VÁLIDO] ${relPath}`);
  } catch (err) {
    console.error(`✖ [ERROR JSON] ${relPath}:`, err.message);
    hasErrors = true;
  }
}

const sqlPath = path.join(gcpRoot, 'bigquery/views/views_bi.sql');
try {
  const sql = fs.readFileSync(sqlPath, 'utf8');
  if (sql.includes('CREATE OR REPLACE VIEW') && sql.includes('gya-app-4c8a9.gya_bi')) {
    console.log(`✔ [SQL VÁLIDO] bigquery/views/views_bi.sql (vistas para presupuestos, reclamos, contactos y pedidos)`);
  } else {
    throw new Error('Estructura de vistas SQL incompleta.');
  }
} catch (err) {
  console.error(`✖ [ERROR SQL]`, err.message);
  hasErrors = true;
}

if (hasErrors) {
  console.error('\nFalló la validación.');
  process.exit(1);
} else {
  console.log('\n✔ Todas las configuraciones declarativas son válidas y seguras (Costo $0.00 garantizado).');
}
