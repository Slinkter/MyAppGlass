"use strict";

// Pruebas del adaptador de códigos propios (GYA-REC-AAAA-XXXXXX / GYA-CON-AAAA-XXXXXX).

const { describe, test, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const h = require("./helpers");
const { generateCode, createWithUniqueCode, ALPHABET, MAX_ATTEMPTS } = require("../src/adapters/idGenerator");
const { PATRON_CODIGO } = h;

const COLECCION = "libro_de_reclamaciones";
const EVENTO_CREATE = `firestore.create:${COLECCION}`;

// 10:00 del 15-jun-2026 en Lima (UTC-5, sin horario de verano)
const MEDIODIA_LIMA = new Date("2026-06-15T10:00:00-05:00");

let ctx;
beforeEach(() => {
  ctx = h.preparar();
});
afterEach(() => {
  ctx.restaurar();
});

/** randomInt determinista: devuelve siempre el mismo índice. */
const aleatorioFijo = (indice) => () => indice;

describe("idGenerator: generateCode", () => {
  test("formato REC: GYA-REC-AAAA-XXXXXX", () => {
    const codigo = generateCode("REC", { now: MEDIODIA_LIMA });
    assert.match(codigo, PATRON_CODIGO.REC);
    assert.ok(codigo.startsWith("GYA-REC-2026-"));
  });

  test("formato CON: GYA-CON-AAAA-XXXXXX", () => {
    const codigo = generateCode("CON", { now: MEDIODIA_LIMA });
    assert.match(codigo, PATRON_CODIGO.CON);
    assert.ok(codigo.startsWith("GYA-CON-2026-"));
  });

  test("el alfabeto tiene 32 símbolos únicos y no incluye 0, O, 1 ni I", () => {
    assert.equal(ALPHABET.length, 32);
    assert.equal(new Set(ALPHABET).size, 32);
    for (const prohibido of ["0", "O", "1", "I"]) {
      assert.ok(!ALPHABET.includes(prohibido), `no debe incluir ${prohibido}`);
    }
  });

  test("con aleatoriedad real, todos los sufijos usan solo caracteres del alfabeto", () => {
    for (let i = 0; i < 300; i++) {
      const sufijo = generateCode("REC", { now: MEDIODIA_LIMA }).split("-")[3];
      assert.equal(sufijo.length, 6);
      for (const caracter of sufijo) assert.ok(ALPHABET.includes(caracter), `carácter fuera de alfabeto: ${caracter}`);
    }
  });

  test("randomInt inyectado determina el sufijo (cada índice mapea al alfabeto)", () => {
    // Índices 31,0,8,23,24,31 => '9','A','J','Z','2','9'
    const indices = [31, 0, 8, 23, 24, 31];
    let k = 0;
    const randomInt = (max) => {
      assert.equal(max, ALPHABET.length);
      return indices[k++];
    };
    const codigo = generateCode("REC", { now: MEDIODIA_LIMA, randomInt });
    assert.equal(codigo, "GYA-REC-2026-9AJZ29");
    assert.equal(k, 6, "se consume un valor aleatorio por carácter");
  });

  test("año de Lima: 31-dic-2026 23:30 en Lima es 2026 aunque en UTC ya sea 2027", () => {
    const ahora = new Date("2026-12-31T23:30:00-05:00");
    assert.equal(ahora.getUTCFullYear(), 2027, "control: en UTC ya es 2027");
    assert.ok(generateCode("REC", { now: ahora, randomInt: aleatorioFijo(0) }).startsWith("GYA-REC-2026-"));
  });

  test("año de Lima: límite exacto 01-ene-2027 00:00 en Lima ya es 2027", () => {
    const antesDelCorte = new Date("2027-01-01T04:59:59Z"); // Lima: 31-dic-2026 23:59:59
    const enElCorte = new Date("2027-01-01T05:00:00Z"); // Lima: 01-ene-2027 00:00:00
    assert.ok(generateCode("CON", { now: antesDelCorte, randomInt: aleatorioFijo(0) }).startsWith("GYA-CON-2026-"));
    assert.ok(generateCode("CON", { now: enElCorte, randomInt: aleatorioFijo(0) }).startsWith("GYA-CON-2027-"));
  });
});

describe("idGenerator: createWithUniqueCode", () => {
  test("reintenta con otro código si el primero ya existe (already-exists)", async () => {
    // Los primeros 6 valores (primer intento) producen AAAAAA; después, BBBBBB.
    ctx.admin.sembrar(COLECCION, "GYA-REC-2026-AAAAAA", { ocupado: true });
    let llamadas = 0;
    const randomInt = () => {
      llamadas += 1;
      return llamadas <= 6 ? 0 : 1;
    };
    const codigo = await createWithUniqueCode({
      db: ctx.admin.firestore(),
      collection: COLECCION,
      kind: "REC",
      buildData: (id) => ({ id }),
      now: MEDIODIA_LIMA,
      randomInt,
    });
    assert.equal(codigo, "GYA-REC-2026-BBBBBB");
    assert.equal(ctx.eventos.filter((e) => e === EVENTO_CREATE).length, 2, "dos intentos de create");
    assert.equal(ctx.admin.documento(COLECCION, codigo).id, codigo);
  });

  test("agotados los 5 intentos lanza HttpsError con code internal", async () => {
    assert.equal(MAX_ATTEMPTS, 5);
    ctx.admin.sembrar(COLECCION, "GYA-REC-2026-AAAAAA", {});
    const err = await h.capturarError(
      createWithUniqueCode({
        db: ctx.admin.firestore(),
        collection: COLECCION,
        kind: "REC",
        buildData: (id) => ({ id }),
        now: MEDIODIA_LIMA,
        randomInt: aleatorioFijo(0), // siempre AAAAAA: colisiona en todos los intentos
      })
    );
    assert.equal(err.code, "internal");
    assert.match(err.message, /No se pudo generar un código de seguimiento único/);
    assert.equal(ctx.eventos.filter((e) => e === EVENTO_CREATE).length, MAX_ATTEMPTS);
  });

  test("un error distinto de already-exists se propaga sin reintentar", async () => {
    ctx.admin.falla = true;
    const err = await h.capturarError(
      createWithUniqueCode({
        db: ctx.admin.firestore(),
        collection: COLECCION,
        kind: "CON",
        buildData: (id) => ({ id }),
        now: MEDIODIA_LIMA,
        randomInt: aleatorioFijo(0),
      })
    );
    assert.equal(err.message, "Firestore no disponible (doble de prueba)");
    assert.equal(ctx.eventos.filter((e) => e === EVENTO_CREATE).length, 1, "no reintenta");
  });
});
