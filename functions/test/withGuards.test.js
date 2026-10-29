"use strict";

const { describe, test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { crearFakeDb, instalarFirebaseAdminFalso } = require("./fakeDb");

// withGuards hace admin.firestore() al recibir la petición: se precarga el doble antes de cargarlo.
const admin = instalarFirebaseAdminFalso();
let withGuards;
before(() => {
  delete require.cache[require.resolve("../src/guards/withGuards")];
  ({ withGuards } = require("../src/guards/withGuards"));
});
after(() => {
  delete require.cache[require.resolve("../src/guards/withGuards")];
  admin.restaurar();
});

let db;
beforeEach(() => {
  db = crearFakeDb();
  admin.fijarDb(db);
});

function crearReq({ method = "GET", xff = "1.1.1.1, 203.0.113.50" } = {}) {
  return {
    method,
    headers: { "x-forwarded-for": xff },
    socket: { remoteAddress: "10.0.0.1" },
    query: {},
    body: {},
  };
}

function crearRes() {
  return {
    statusCode: undefined,
    body: undefined,
    enviado: undefined,
    status(codigo) {
      this.statusCode = codigo;
      return this;
    },
    json(cuerpo) {
      this.body = cuerpo;
      return this;
    },
    send(cuerpo) {
      this.enviado = cuerpo;
      return this;
    },
  };
}

const MENSAJE_429 = "Demasiadas solicitudes desde esta dirección. Por favor, inténtelo más tarde.";
const MENSAJE_503 = "Servicio temporalmente no disponible. Por favor, inténtelo nuevamente en unos minutos.";

describe("withGuards: método HTTP", () => {
  test("método no permitido responde 405 y no llama al handler", async () => {
    const llamadas = [];
    const guard = withGuards({ name: "t405", methods: ["GET", "POST"], limit: 5 }, async (q, r, ctx) => {
      llamadas.push(ctx);
    });
    const res = crearRes();
    await guard(crearReq({ method: "PUT" }), res);
    assert.equal(res.statusCode, 405);
    assert.equal(res.enviado, "Método no permitido.");
    assert.equal(llamadas.length, 0);
    assert.equal(db.estado.transacciones, 0);
  });

  test("método permitido llama al handler", async () => {
    const llamadas = [];
    const guard = withGuards({ name: "tOk", methods: ["GET", "POST"], limit: 5 }, async (q, r, ctx) => {
      llamadas.push(ctx);
    });
    await guard(crearReq({ method: "POST" }), crearRes());
    assert.equal(llamadas.length, 1);
  });
});

describe("withGuards: rate limit", () => {
  test("al superar el límite responde 429 con el JSON esperado", async () => {
    const llamadas = [];
    const guard = withGuards({ name: "t429", methods: ["GET"], limit: 2 }, async (q, r) => {
      llamadas.push(true);
      r.status(200).json({ ok: true });
    });
    await guard(crearReq(), crearRes());
    await guard(crearReq(), crearRes());
    const res = crearRes();
    await guard(crearReq(), res);
    assert.equal(res.statusCode, 429);
    assert.deepEqual(res.body, { success: false, message: MENSAJE_429 });
    assert.equal(llamadas.length, 2);
  });

  test("límites independientes por nombre de función", async () => {
    const llamadas = [];
    const h = async () => llamadas.push(true);
    const a = withGuards({ name: "fnA", methods: ["GET"], limit: 1 }, h);
    const b = withGuards({ name: "fnB", methods: ["GET"], limit: 1 }, h);
    await a(crearReq(), crearRes());
    const resA = crearRes();
    await a(crearReq(), resA);
    await b(crearReq(), crearRes());
    assert.equal(resA.statusCode, 429);
    assert.equal(llamadas.length, 2);
  });

  test("IP desconocida no se limita y no toca Firestore", async () => {
    const llamadas = [];
    const guard = withGuards({ name: "tUnk", methods: ["GET"], limit: 1 }, async () => llamadas.push(true));
    const req = { method: "GET", headers: {}, socket: { remoteAddress: "no-es-ip" }, query: {}, body: {} };
    await guard(req, crearRes());
    await guard(req, crearRes());
    assert.equal(llamadas.length, 2);
    assert.equal(db.estado.transacciones, 0);
  });
});

describe("withGuards: fallo de Firestore", () => {
  test("failOpen false responde 503 y no llama al handler", async () => {
    db = crearFakeDb({ fallaTransaccion: true });
    admin.fijarDb(db);
    const llamadas = [];
    const guard = withGuards({ name: "t503", methods: ["GET"], limit: 5, failOpen: false }, async () => llamadas.push(true));
    const res = crearRes();
    await guard(crearReq(), res);
    assert.equal(res.statusCode, 503);
    assert.deepEqual(res.body, { success: false, message: MENSAJE_503 });
    assert.equal(llamadas.length, 0);
  });

  test("failOpen true deja pasar al handler", async () => {
    db = crearFakeDb({ fallaTransaccion: true });
    admin.fijarDb(db);
    const llamadas = [];
    const guard = withGuards({ name: "tOpen", methods: ["GET"], limit: 5, failOpen: true }, async (q, r) => {
      llamadas.push(true);
      r.status(200).json({ ok: true });
    });
    const res = crearRes();
    await guard(crearReq(), res);
    assert.equal(llamadas.length, 1);
    assert.equal(res.statusCode, 200);
  });

  test("failOpen por defecto (no indicado) responde 503", async () => {
    db = crearFakeDb({ fallaTransaccion: true });
    admin.fijarDb(db);
    const guard = withGuards({ name: "tDef", methods: ["GET"], limit: 5 }, async () => {});
    const res = crearRes();
    await guard(crearReq(), res);
    assert.equal(res.statusCode, 503);
  });
});

describe("withGuards: contexto para el handler", () => {
  test("pasa { clientIp, db } al handler", async () => {
    let recibido;
    const guard = withGuards({ name: "tCtx", methods: ["GET"], limit: 5 }, async (q, r, ctx) => {
      recibido = ctx;
    });
    await guard(crearReq({ xff: "1.1.1.1, 203.0.113.50" }), crearRes());
    assert.equal(recibido.clientIp, "203.0.113.50");
    assert.equal(recibido.db, db);
  });
});
