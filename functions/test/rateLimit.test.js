"use strict";

const { describe, test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { Timestamp } = require("firebase-admin/firestore");
const { checkRateLimitFirestore } = require("../src/guards/rateLimit");
const { crearFakeDb } = require("./fakeDb");

const HORA_MS = 3600 * 1000;

let db;
beforeEach(() => {
  db = crearFakeDb();
});

/** Opciones por defecto: name "checkStatus", máximo 3, ventana de 1000 ms. */
function opts(now, extra = {}) {
  return { name: "checkStatus", max: 3, windowMs: 1000, now, ...extra };
}

describe("checkRateLimitFirestore: máximo por ventana", () => {
  test("permite hasta el máximo y bloquea el siguiente", async () => {
    const ip = "203.0.113.10";
    assert.equal(await checkRateLimitFirestore(db, ip, opts(1000)), true);
    assert.equal(await checkRateLimitFirestore(db, ip, opts(1001)), true);
    assert.equal(await checkRateLimitFirestore(db, ip, opts(1002)), true);
    assert.equal(await checkRateLimitFirestore(db, ip, opts(1003)), false);
  });

  test("una petición bloqueada no escribe en Firestore", async () => {
    const ip = "203.0.113.11";
    for (let t = 0; t < 3; t++) await checkRateLimitFirestore(db, ip, opts(t));
    const escriturasAntes = db.escrituras.length;
    assert.equal(await checkRateLimitFirestore(db, ip, opts(10)), false);
    assert.equal(db.escrituras.length, escriturasAntes);
  });

  test("una entrada expira exactamente cuando se cumple windowMs", async () => {
    const ip = "203.0.113.12";
    const o = { max: 1, windowMs: 1000 };
    assert.equal(await checkRateLimitFirestore(db, ip, opts(0, o)), true);
    // A 999 ms la entrada de t=0 sigue dentro de la ventana: bloquea.
    assert.equal(await checkRateLimitFirestore(db, ip, opts(999, o)), false);
    // A 1000 ms ya no cuenta (now - ts < windowMs es falso): permite.
    assert.equal(await checkRateLimitFirestore(db, ip, opts(1000, o)), true);
  });

  test("tras expirar la ventana se vuelve a permitir el máximo completo", async () => {
    const ip = "203.0.113.13";
    for (let t = 0; t < 3; t++) await checkRateLimitFirestore(db, ip, opts(t));
    assert.equal(await checkRateLimitFirestore(db, ip, opts(500)), false);
    assert.equal(await checkRateLimitFirestore(db, ip, opts(5000)), true);
    assert.equal(await checkRateLimitFirestore(db, ip, opts(5001)), true);
    assert.equal(await checkRateLimitFirestore(db, ip, opts(5002)), true);
    assert.equal(await checkRateLimitFirestore(db, ip, opts(5003)), false);
  });
});

describe("checkRateLimitFirestore: buckets", () => {
  test("buckets separados por función (misma IP, distinto name)", async () => {
    const ip = "203.0.113.20";
    const o = { max: 1 };
    assert.equal(await checkRateLimitFirestore(db, ip, opts(0, { ...o, name: "submitReclamo" })), true);
    assert.equal(await checkRateLimitFirestore(db, ip, opts(1, { ...o, name: "submitReclamo" })), false);
    assert.equal(await checkRateLimitFirestore(db, ip, opts(2, { ...o, name: "checkStatus" })), true);
  });

  test("buckets separados por IP (mismo name)", async () => {
    const o = { max: 1 };
    assert.equal(await checkRateLimitFirestore(db, "203.0.113.30", opts(0, o)), true);
    assert.equal(await checkRateLimitFirestore(db, "203.0.113.30", opts(1, o)), false);
    assert.equal(await checkRateLimitFirestore(db, "203.0.113.31", opts(2, o)), true);
  });
});

describe("checkRateLimitFirestore: documento escrito", () => {
  test("contiene fn, ip, timestamps, updatedAt y expireAt (now + 24 h)", async () => {
    const ahora = 5000;
    await checkRateLimitFirestore(db, "203.0.113.40", opts(ahora, { name: "submitReclamo" }));
    const doc = db.almacen.get("rate_limits/submitReclamo_203_0_113_40");
    assert.ok(doc, "debe existir el documento rate_limits/submitReclamo_203_0_113_40");
    assert.equal(doc.fn, "submitReclamo");
    assert.equal(doc.ip, "203.0.113.40");
    assert.deepEqual(doc.timestamps, [ahora]);
    assert.notEqual(doc.updatedAt, undefined);
    assert.ok(doc.expireAt instanceof Timestamp, "expireAt debe ser un Timestamp de firebase-admin");
    assert.equal(doc.expireAt.toMillis(), ahora + 24 * HORA_MS);
  });

  test("timestamps se acota a max entradas (conserva las más recientes)", async () => {
    // max 3 y paso de 400 ms con ventana de 1000 ms: siempre hay sitio, y el array no crece más de max.
    const ip = "203.0.113.41";
    for (let i = 0; i < 10; i++) {
      const t = i * 400;
      assert.equal(await checkRateLimitFirestore(db, ip, opts(t)), true, `petición ${i} debe permitirse`);
      assert.ok(db.almacen.get("rate_limits/checkStatus_203_0_113_41").timestamps.length <= 3);
    }
    assert.deepEqual(db.almacen.get("rate_limits/checkStatus_203_0_113_41").timestamps, [2800, 3200, 3600]);
  });

  test("IPv6: el id del documento no contiene ':' ni '.'", async () => {
    await checkRateLimitFirestore(db, "2001:db8::1", opts(0));
    assert.ok(db.almacen.has("rate_limits/checkStatus_2001_db8__1"));
    const ids = [...db.almacen.keys()].map((k) => k.split("/")[1]);
    assert.ok(ids.length > 0);
    for (const id of ids) assert.ok(!/[:.]/.test(id), `id inválido: ${id}`);
  });
});

describe("checkRateLimitFirestore: casos especiales y fallos", () => {
  test("IP \"unknown\" se permite y no toca Firestore", async () => {
    assert.equal(await checkRateLimitFirestore(db, "unknown", opts(0)), true);
    assert.equal(db.estado.transacciones, 0);
    assert.equal(db.escrituras.length, 0);
    assert.equal(db.almacen.size, 0);
  });

  test("IP vacía se permite y no toca Firestore", async () => {
    assert.equal(await checkRateLimitFirestore(db, "", opts(0)), true);
    assert.equal(db.estado.transacciones, 0);
    assert.equal(db.almacen.size, 0);
  });

  test("si la transacción falla, el error se propaga", async () => {
    const dbCaido = crearFakeDb({ fallaTransaccion: true });
    await assert.rejects(checkRateLimitFirestore(dbCaido, "203.0.113.50", opts(0)), /Firestore no disponible/);
  });

  test("si la lectura falla dentro de la transacción, el error se propaga", async () => {
    const dbCaido = crearFakeDb({ fallaLectura: true });
    await assert.rejects(checkRateLimitFirestore(dbCaido, "203.0.113.51", opts(0)), /Firestore no disponible/);
  });
});
