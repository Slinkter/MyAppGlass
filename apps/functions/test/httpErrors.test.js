"use strict";

// Handlers submitReclamo / submitContacto: solo los HttpsError llegan al cliente; el resto se oculta.
// Se usa la librería Resend REAL (sin la clave lanza "Missing API key"), por eso NO se carga helpers.js.

const { describe, test, before, after, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const { crearFakeDb, instalarFirebaseAdminFalso } = require("./fakeDb");
const { computeSignature } = require("../src/guards/captcha");

const admin = instalarFirebaseAdminFalso();
let submitReclamo;
let submitContacto;
const MODULOS = ["../src/http/submitReclamo", "../src/http/submitContacto", "../src/guards/withGuards"];

before(() => {
  for (const m of MODULOS) delete require.cache[require.resolve(m)];
  ({ submitReclamo } = require("../src/http/submitReclamo"));
  ({ submitContacto } = require("../src/http/submitContacto"));
});
after(() => {
  for (const m of MODULOS) delete require.cache[require.resolve(m)];
  admin.restaurar();
});

const ENV_CLAVES = ["RESEND_API_KEY", "ADMIN_EMAIL", "RECAPTCHA_SECRET_KEY"];
let envPrevio;
let fetchPrevio;
beforeEach(() => {
  envPrevio = Object.fromEntries(ENV_CLAVES.map((k) => [k, process.env[k]]));
  fetchPrevio = global.fetch;
  admin.fijarDb(crearFakeDb());
});
afterEach(() => {
  for (const k of ENV_CLAVES) {
    if (envPrevio[k] === undefined) delete process.env[k];
    else process.env[k] = envPrevio[k];
  }
  global.fetch = fetchPrevio;
});

function crearReq(body) {
  return {
    method: "POST",
    headers: { "origin": "https://gyacompany.com", "x-forwarded-for": "1.1.1.1, 203.0.113.50" },
    socket: { remoteAddress: "10.0.0.1" },
    query: {},
    body,
    get(nombre) {
      return this.headers[nombre.toLowerCase()];
    },
  };
}

function crearRes() {
  const res = new EventEmitter();
  Object.assign(res, { statusCode: undefined, cuerpo: undefined, enviado: undefined, headers: {} });
  let resolver;
  res.terminado = new Promise((r) => {
    resolver = r;
  });
  const terminar = () => {
    res.emit("finish");
    resolver();
  };
  res.status = (c) => {
    res.statusCode = c;
    return res;
  };
  res.set = res.setHeader = (n, v) => {
    res.headers[n.toLowerCase()] = v;
    return res;
  };
  res.getHeader = (n) => res.headers[n.toLowerCase()];
  res.writeHead = () => res;
  res.json = (c) => {
    res.cuerpo = c;
    terminar();
    return res;
  };
  res.send = (c) => {
    res.enviado = c;
    terminar();
    return res;
  };
  res.end = (c) => {
    res.enviado = c;
    terminar();
    return res;
  };
  return res;
}

async function invocar(handler, body) {
  const res = crearRes();
  Promise.resolve()
    .then(() => handler(crearReq(body), res))
    .catch((err) => {
      res.error = err;
    });
  let timer;
  const plazo = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`sin respuesta (${res.error ? res.error.message : "timeout"})`)), 2000);
  });
  try {
    await Promise.race([res.terminado, plazo]);
  } finally {
    clearTimeout(timer);
  }
  return res;
}

function mathToken() {
  const ts = Date.now();
  const token = Buffer.from(JSON.stringify({ a: 7, op: "+", b: 5, ts, sig: computeSignature(7, "+", 5, ts) })).toString("base64");
  return { mathAnswer: 12, mathToken: token };
}

const crearContactoPayload = () => ({
  name: "María Soto",
  email: "maria.prueba@example.com",
  phone: "+51 988 777 666",
  message: "Quisiera una cotización para ventanas de aluminio.",
  _ts: Date.now() - 10000,
  recaptchaToken: "TOKEN_RECAPTCHA_FALSO",
  ...mathToken(),
});

const crearReclamoPayload = () => ({
  nombreCompleto: "Juan Pérez García",
  tipoDocumento: "DNI",
  numeroDocumento: "12345678",
  domicilio: "Av. Las Camelias 123, San Isidro",
  telefono: "987654321",
  email: "cliente.prueba@example.com",
  tipoSolicitud: "Reclamo",
  tipoBien: "producto",
  descripcionBien: "Ventana de aluminio Serie 25",
  montoReclamado: 1500,
  detalle: "El producto llegó con un rayón en el vidrio durante la entrega.",
  pedido: "Solicito el cambio del producto por uno nuevo.",
  _ts: Date.now() - 10000,
  recaptchaToken: "TOKEN_RECAPTCHA_FALSO",
  ...mathToken(),
});

const GENERICO = { success: false, message: "Error interno del servidor." };
const casos = [
  ["submitReclamo", () => submitReclamo, crearReclamoPayload],
  ["submitContacto", () => submitContacto, crearContactoPayload],
];

for (const [nombre, obtener, payload] of casos) {
  describe(`${nombre}: errores hacia el cliente`, () => {
    test("error no controlado (Missing API key) responde 500 genérico y no filtra el detalle", async () => {
      delete process.env.RESEND_API_KEY;
      process.env.ADMIN_EMAIL = "admin-falso@example.com";
      const res = await invocar(obtener(), payload());
      assert.equal(res.statusCode, 500);
      assert.deepEqual(res.cuerpo, GENERICO);
      assert.ok(!JSON.stringify(res.cuerpo).includes("API key"));
    });

    test("HttpsError failed-precondition responde 500 con su mensaje", async () => {
      process.env.RESEND_API_KEY = "re_CLAVE_FALSA_SOLO_PARA_TESTS";
      delete process.env.ADMIN_EMAIL;
      const res = await invocar(obtener(), payload());
      assert.equal(res.statusCode, 500);
      assert.deepEqual(res.cuerpo, { success: false, message: "Configuración de servidor incompleta." });
    });

    test("HttpsError invalid-argument responde 400 con su mensaje", async () => {
      process.env.RESEND_API_KEY = "re_CLAVE_FALSA_SOLO_PARA_TESTS";
      process.env.ADMIN_EMAIL = "admin-falso@example.com";
      process.env.RECAPTCHA_SECRET_KEY = "SECRETO_RECAPTCHA_FALSO_SOLO_TESTS";
      global.fetch = async () => ({ json: async () => ({ success: true, score: 0.9, action: "x" }) });
      const res = await invocar(obtener(), { ...payload(), mathAnswer: 999 });
      assert.equal(res.statusCode, 400);
      assert.equal(res.cuerpo.success, false);
      assert.equal(res.cuerpo.message, "La respuesta a la pregunta matemática es incorrecta.");
    });
  });
}

describe("submitContacto: permission-denied", () => {
  test("reCAPTCHA con puntuación baja responde 403 con su mensaje", async () => {
    process.env.RESEND_API_KEY = "re_CLAVE_FALSA_SOLO_PARA_TESTS";
    process.env.ADMIN_EMAIL = "admin-falso@example.com";
    process.env.RECAPTCHA_SECRET_KEY = "SECRETO_RECAPTCHA_FALSO_SOLO_TESTS";
    global.fetch = async () => ({ json: async () => ({ success: true, score: 0.1, action: "contact_submit" }) });
    const res = await invocar(submitContacto, crearContactoPayload());
    assert.equal(res.statusCode, 403);
    assert.deepEqual(res.cuerpo, { success: false, message: "Validación de seguridad no superada (puntuación insuficiente)." });
  });

  test("error de red hacia Google responde 403 con el mensaje genérico de captcha", async () => {
    process.env.RESEND_API_KEY = "re_CLAVE_FALSA_SOLO_PARA_TESTS";
    process.env.ADMIN_EMAIL = "admin-falso@example.com";
    process.env.RECAPTCHA_SECRET_KEY = "SECRETO_RECAPTCHA_FALSO_SOLO_TESTS";
    global.fetch = async () => {
      throw new Error("ECONNRESET interno");
    };
    const res = await invocar(submitContacto, crearContactoPayload());
    assert.equal(res.statusCode, 403);
    assert.deepEqual(res.cuerpo, { success: false, message: "No se pudo validar el token de seguridad." });
  });
});
