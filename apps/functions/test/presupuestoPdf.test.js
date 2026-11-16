"use strict";

// Hoja A4 del presupuesto formal: debe salir un PDF válido también con muchas líneas.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { renderPresupuestoPdf } = require("../src/templates/presupuestoPdf");

const base = (items) => ({
  numero: "PRES-0001",
  estado: "enviado",
  cliente: {
    fullName: "Constructora Prueba S.A.C.",
    dniRuc: "20123456789",
    contactName: "Ana Ruiz",
    phone: "999888777",
    email: "",
    address: "Av. Prueba 123",
    district: "La Molina",
  },
  items,
  subtotal: 380.5,
  igv: 68.49,
  total: 448.99,
  igvRate: 0.18,
  validezDias: 15,
  enviadoEl: new Date("2026-11-16T15:00:00.000Z"),
  venceEl: { toDate: () => new Date("2026-12-01T15:00:00.000Z") },
  notas: "Medidas por confirmar en obra.",
});

const item = (n) => ({
  descripcion: `Vidrio templado 8 mm incoloro, paño ${n}`,
  tipo: "producto",
  unidad: "m2",
  cantidad: 2.5,
  precioUnitario: 120,
  importe: 300,
});

const paginas = (pdf) => (pdf.toString("latin1").match(/\/Type \/Page\b/g) || []).length;

test("genera un PDF de una página", async () => {
  const pdf = await renderPresupuestoPdf(base([item(1), item(2)]));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(pdf.length > 1500);
  assert.equal(paginas(pdf), 1);
});

test("con muchas líneas pasa a más páginas sin fallar", async () => {
  const pdf = await renderPresupuestoPdf(base(Array.from({ length: 100 }, (_, i) => item(i + 1))));
  assert.ok(paginas(pdf) >= 2);
});

test("un borrador sin fechas ni notas también se genera", async () => {
  const p = { ...base([item(1)]), estado: "borrador", enviadoEl: null, venceEl: null, notas: "", createdAt: new Date() };
  const pdf = await renderPresupuestoPdf(p);
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
});
