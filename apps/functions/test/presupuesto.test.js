"use strict";

// Presupuesto formal (PRES-0001): totales y correlativo calculados en el servidor, estados y permisos.

const { describe, test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { crearFakeDb } = require("./fakeDb");
const { guardarPresupuesto, cambiarEstadoPresupuesto } = require("../src/services/presupuestoService");
const { requireAdmin } = require("../src/guards/requireAdmin");

const ACTOR = { uid: "admin-1" };
const AHORA = new Date("2026-11-16T15:00:00.000Z");

const entrada = (extra = {}) => ({
  clienteId: "cli-1",
  items: [
    { productoId: "prod-vidrio", descripcion: "Vidrio templado 8 mm", unidad: "m2", cantidad: 2.5, precioUnitario: 120 },
    { descripcion: "Instalación en obra", tipo: "servicio", unidad: "servicio", cantidad: 1, precioUnitario: 80.5 },
  ],
  validezDias: 15,
  ...extra,
});

let db;
beforeEach(() => {
  db = crearFakeDb();
  db.sembrar("clientes", "cli-1", {
    fullName: "Constructora Prueba S.A.C.",
    dniRuc: "20123456789",
    phone: "999888777",
    email: "cliente_20123456789@gyacompany.com",
    address: "Av. Prueba 123",
    district: "La Molina",
  });
  db.sembrar("productos", "prod-vidrio", { sku: "VID-008", name: "Vidrio templado 8 mm", category: "vidrio", isActive: true });
});

describe("guardarPresupuesto", () => {
  test("crea PRES-0001 en borrador con totales calculados en el servidor", async () => {
    const r = await guardarPresupuesto(db, entrada(), ACTOR, AHORA);
    assert.deepEqual(r, { numero: "PRES-0001", estado: "borrador", subtotal: 380.5, igv: 68.49, total: 448.99 });

    const doc = db.almacen.get("presupuestos/PRES-0001");
    assert.equal(doc.numero, "PRES-0001");
    assert.equal(doc.estado, "borrador");
    assert.equal(doc.moneda, "PEN");
    assert.equal(doc.igvRate, 0.18);
    assert.equal(doc.creadoPor, "admin-1");
    assert.deepEqual(doc.items.map((i) => i.importe), [300, 80.5]);
    assert.equal(doc.items[0].sku, "VID-008");
    assert.equal(doc.items[0].tipo, "producto");
    assert.equal(doc.items[1].tipo, "servicio");
    assert.equal(db.almacen.get("contadores/presupuestos-formales").seq, 1);
  });

  test("ignora totales e importes enviados por el cliente", async () => {
    const manipulada = entrada({ subtotal: 1, igv: 0, total: 1 });
    manipulada.items[0].importe = 1;
    const r = await guardarPresupuesto(db, manipulada, ACTOR, AHORA);
    assert.equal(r.total, 448.99);
    assert.equal(db.almacen.get("presupuestos/PRES-0001").items[0].importe, 300);
  });

  test("guarda una copia del cliente sin el correo de relleno", async () => {
    await guardarPresupuesto(db, entrada(), ACTOR, AHORA);
    const { cliente } = db.almacen.get("presupuestos/PRES-0001");
    assert.equal(cliente.fullName, "Constructora Prueba S.A.C.");
    assert.equal(cliente.email, "");
  });

  test("altas simultáneas reciben correlativos distintos y consecutivos", async () => {
    const resultados = await Promise.all([1, 2, 3, 4, 5].map(() => guardarPresupuesto(db, entrada(), ACTOR, AHORA)));
    const numeros = resultados.map((r) => r.numero).sort();
    assert.deepEqual(numeros, ["PRES-0001", "PRES-0002", "PRES-0003", "PRES-0004", "PRES-0005"]);
    assert.equal(db.almacen.get("contadores/presupuestos-formales").seq, 5);
  });

  test("edita un borrador sin consumir correlativo", async () => {
    await guardarPresupuesto(db, entrada(), ACTOR, AHORA);
    const r = await guardarPresupuesto(db, entrada({ numero: "PRES-0001", items: [entrada().items[1]] }), ACTOR, AHORA);
    assert.equal(r.numero, "PRES-0001");
    assert.equal(r.subtotal, 80.5);
    assert.equal(db.almacen.get("contadores/presupuestos-formales").seq, 1);
    assert.equal(db.almacen.get("presupuestos/PRES-0001").items.length, 1);
  });

  test("no edita un presupuesto enviado", async () => {
    await guardarPresupuesto(db, entrada(), ACTOR, AHORA);
    await cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "enviado" }, ACTOR, AHORA);
    await assert.rejects(guardarPresupuesto(db, entrada({ numero: "PRES-0001" }), ACTOR, AHORA), { code: "failed-precondition" });
  });

  test("rechaza cliente inexistente o desactivado y no consume correlativo", async () => {
    await assert.rejects(guardarPresupuesto(db, entrada({ clienteId: "no-existe" }), ACTOR, AHORA), { code: "not-found" });
    db.sembrar("clientes", "cli-2", { fullName: "Inactivo", dniRuc: "12345678", isActive: false });
    await assert.rejects(guardarPresupuesto(db, entrada({ clienteId: "cli-2" }), ACTOR, AHORA), { code: "failed-precondition" });
    assert.equal(db.almacen.has("contadores/presupuestos-formales"), false);
  });

  test("rechaza un producto que ya no está en el catálogo o está desactivado", async () => {
    const conFantasma = entrada();
    conFantasma.items[0].productoId = "prod-borrado";
    await assert.rejects(guardarPresupuesto(db, conFantasma, ACTOR, AHORA), { code: "not-found" });
    db.sembrar("productos", "prod-vidrio", { sku: "VID-008", category: "vidrio", isActive: false });
    await assert.rejects(guardarPresupuesto(db, entrada(), ACTOR, AHORA), { code: "failed-precondition" });
  });

  test("valida la entrada: sin ítems, cantidad 0, validez fuera de rango, unidad desconocida, total 0", async () => {
    const invalido = { code: "invalid-argument" };
    await assert.rejects(guardarPresupuesto(db, entrada({ items: [] }), ACTOR, AHORA), invalido);
    await assert.rejects(guardarPresupuesto(db, entrada({ validezDias: 0 }), ACTOR, AHORA), invalido);
    await assert.rejects(guardarPresupuesto(db, entrada({ validezDias: 91 }), ACTOR, AHORA), invalido);
    const cantidadCero = entrada();
    cantidadCero.items[0].cantidad = 0;
    await assert.rejects(guardarPresupuesto(db, cantidadCero, ACTOR, AHORA), invalido);
    const unidadRara = entrada();
    unidadRara.items[0].unidad = "litros";
    await assert.rejects(guardarPresupuesto(db, unidadRara, ACTOR, AHORA), invalido);
    const gratis = entrada({ items: [{ descripcion: "Visita", unidad: "servicio", cantidad: 1, precioUnitario: 0 }] });
    await assert.rejects(guardarPresupuesto(db, gratis, ACTOR, AHORA), invalido);
  });
});

describe("cambiarEstadoPresupuesto", () => {
  beforeEach(async () => {
    await guardarPresupuesto(db, entrada(), ACTOR, AHORA);
  });

  test("borrador → enviado fija la fecha de envío y el vencimiento", async () => {
    const r = await cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "enviado" }, ACTOR, AHORA);
    assert.equal(r.estado, "enviado");
    assert.equal(r.venceEl, "2026-12-01T15:00:00.000Z");
    const doc = db.almacen.get("presupuestos/PRES-0001");
    assert.equal(doc.enviadoEl.toISOString(), AHORA.toISOString());
    assert.equal(doc.total, 448.99);
  });

  test("enviado → aprobado registra la fecha de resolución", async () => {
    await cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "enviado" }, ACTOR, AHORA);
    const r = await cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "aprobado" }, ACTOR, AHORA);
    assert.equal(r.estado, "aprobado");
    assert.ok(db.almacen.get("presupuestos/PRES-0001").resueltoEl);
  });

  test("rechaza transiciones no permitidas", async () => {
    const no = { code: "failed-precondition" };
    await assert.rejects(cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "aprobado" }, ACTOR, AHORA), no);
    await cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "enviado" }, ACTOR, AHORA);
    await cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "rechazado" }, ACTOR, AHORA);
    await assert.rejects(cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "aprobado" }, ACTOR, AHORA), no);
    await assert.rejects(cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "enviado" }, ACTOR, AHORA), no);
  });

  test("número inexistente o mal formado", async () => {
    await assert.rejects(cambiarEstadoPresupuesto(db, { numero: "PRES-0099", estado: "enviado" }, ACTOR, AHORA), { code: "not-found" });
    await assert.rejects(cambiarEstadoPresupuesto(db, { numero: "GYA-2026-0001", estado: "enviado" }, ACTOR, AHORA), { code: "invalid-argument" });
    await assert.rejects(cambiarEstadoPresupuesto(db, { numero: "PRES-0001", estado: "borrador" }, ACTOR, AHORA), { code: "invalid-argument" });
  });
});

describe("requireAdmin", () => {
  test("sin sesión → unauthenticated", () => {
    assert.throws(() => requireAdmin({}), { code: "unauthenticated" });
  });

  test("sesión sin claim role=admin → permission-denied", () => {
    assert.throws(() => requireAdmin({ auth: { uid: "u1", token: { email: "a@b.com" } } }), { code: "permission-denied" });
    assert.throws(() => requireAdmin({ auth: { uid: "u1", token: { role: "cliente" } } }), { code: "permission-denied" });
    assert.throws(() => requireAdmin({ auth: { uid: "u1", token: { admin: true } } }), { code: "permission-denied" });
  });

  test("claim role=admin → devuelve el actor", () => {
    assert.deepEqual(requireAdmin({ auth: { uid: "u1", token: { role: "admin", email: "a@b.com" } } }), { uid: "u1", email: "a@b.com" });
  });
});
