"use strict";

/**
 * Dobles de prueba para las pruebas de caracterización (node:test).
 *
 * - Resend: se inyecta un módulo falso en require.cache ANTES de cargar emailSender.js.
 * - firebase-admin: doble con firestore().collection().doc().set() que registra escrituras.
 * - reCAPTCHA: se reemplaza global.fetch por un doble (se restaura en cada test).
 * - Variables de entorno: valores FALSOS inventados para pruebas (nunca reales).
 */

const Module = require("node:module");
const { computeSignature } = require("../mathCaptchaValidator");

const FAKE_RESEND_ID = "re-falso-0000000001";
const ADMIN_FALSO = "admin-falso@example.com";

const ENV_FALSO = {
  RESEND_API_KEY: "re_CLAVE_FALSA_SOLO_PARA_TESTS",
  ADMIN_EMAIL: ADMIN_FALSO,
  RECAPTCHA_SECRET_KEY: "SECRETO_RECAPTCHA_FALSO_SOLO_TESTS",
};

const RECAPTCHA_OK = { success: true, score: 0.9, action: "reclamation_submit" };

// ─── Silenciar solo las líneas JSON del logger de firebase-functions ─────────
// El logger escribe con console "no parcheada", por lo que se filtra en el stream.
function filtrarLogs(escribirOriginal) {
  return function(chunk, ...resto) {
    if (typeof chunk === "string" && /^\{.*"severity":"[A-Z]+".*\}\n?$/.test(chunk)) return true;
    return escribirOriginal(chunk, ...resto);
  };
}
process.stdout.write = filtrarLogs(process.stdout.write.bind(process.stdout));
process.stderr.write = filtrarLogs(process.stderr.write.bind(process.stderr));

// ─── Doble de Resend ─────────────────────────────────────────────────────────
const resendCtl = {
  llamadas: [],
  // null => respuesta OK; función(payload) => { data, error } o lanza excepción
  respuesta: null,
  reset() {
    this.llamadas = [];
    this.respuesta = null;
  },
};

class ResendFalso {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.emails = {
      send: async (payload) => {
        resendCtl.llamadas.push(payload);
        if (resendCtl.respuesta) return resendCtl.respuesta(payload);
        return { data: { id: FAKE_RESEND_ID }, error: null };
      },
    };
  }
}

function instalarMockResend() {
  const ruta = require.resolve("resend");
  const modulo = new Module(ruta);
  modulo.filename = ruta;
  modulo.loaded = true;
  modulo.exports = { Resend: ResendFalso };
  require.cache[ruta] = modulo;
}
instalarMockResend();

// ─── Doble de firebase-admin ─────────────────────────────────────────────────
function crearAdminFalso() {
  const escrituras = [];
  const admin = {
    escrituras,
    falla: false,
    firestore() {
      return {
        collection(nombre) {
          return {
            doc(id) {
              return {
                set: async (datos) => {
                  if (admin.falla) throw new Error("Firestore no disponible (doble de prueba)");
                  escrituras.push({ coleccion: nombre, id, datos });
                },
              };
            },
          };
        },
      };
    },
  };
  return admin;
}

// ─── Doble de fetch (reCAPTCHA) ──────────────────────────────────────────────
function crearFetchFalso(respuesta) {
  const llamadas = [];
  const fetchFalso = async (url, opciones) => {
    llamadas.push({ url, opciones });
    if (respuesta instanceof Error) throw respuesta;
    return { json: async () => respuesta };
  };
  fetchFalso.llamadas = llamadas;
  return fetchFalso;
}

// ─── Preparación y restauración de entorno ───────────────────────────────────
/**
 * Prepara process.env (valores falsos), fetch y los dobles.
 * Llamar en beforeEach y ejecutar `restaurar()` en afterEach.
 */
function preparar({ recaptcha = RECAPTCHA_OK } = {}) {
  const envPrevio = { ...process.env };
  const fetchPrevio = global.fetch;

  Object.assign(process.env, ENV_FALSO);
  const fetchFalso = crearFetchFalso(recaptcha);
  global.fetch = fetchFalso;
  resendCtl.reset();
  const admin = crearAdminFalso();

  return {
    admin,
    fetch: fetchFalso,
    restaurar() {
      for (const clave of Object.keys(process.env)) {
        if (!(clave in envPrevio)) delete process.env[clave];
      }
      Object.assign(process.env, envPrevio);
      global.fetch = fetchPrevio;
      resendCtl.reset();
    },
  };
}

// ─── Captcha matemático ──────────────────────────────────────────────────────
/**
 * Genera { mathAnswer, mathToken } válidos (o alterados según opciones).
 */
function tokenMatematico({ a = 7, op = "+", b = 5, ts = Date.now(), sigOverride } = {}) {
  const resultado = op === "+" ? a + b : a - b;
  const sig = sigOverride ?? computeSignature(a, op, b, ts);
  const token = Buffer.from(JSON.stringify({ a, op, b, ts, sig })).toString("base64");
  return { mathAnswer: resultado, mathToken: token };
}

// ─── Payloads válidos ────────────────────────────────────────────────────────
function reclamoValido(extra = {}) {
  return {
    nombreCompleto: "Juan Pérez García",
    email: "cliente.prueba@example.com",
    tipoDocumento: "DNI",
    numeroDocumento: "12345678",
    domicilio: "Av. Falsa 123, Lima",
    telefono: "+51 999 999 999",
    tipoSolicitud: "Reclamo",
    tipoBien: "producto",
    montoReclamado: 150,
    descripcionBien: "Ventana corrediza serie 25",
    detalle: "El producto llegó con un rayón en el vidrio durante la entrega.",
    pedido: "Solicito el cambio del producto por uno nuevo.",
    _ts: Date.now() - 10000,
    recaptchaToken: "TOKEN_RECAPTCHA_FALSO",
    ...tokenMatematico(),
    ...extra,
  };
}

function contactoValido(extra = {}) {
  return {
    name: "María Soto",
    email: "maria.prueba@example.com",
    phone: "+51 988 777 666",
    message: "Quisiera una cotización para ventanas de aluminio.",
    _ts: Date.now() - 10000,
    recaptchaToken: "TOKEN_RECAPTCHA_FALSO",
    ...tokenMatematico(),
    ...extra,
  };
}

// ─── Utilidades de aserción ──────────────────────────────────────────────────
/** Devuelve el error lanzado por la promesa; falla si resuelve. */
async function capturarError(promesa) {
  try {
    await promesa;
  } catch (err) {
    return err;
  }
  throw new Error("Se esperaba que la promesa rechazara, pero resolvió");
}

/** Reemplaza el fetch global de reCAPTCHA por otro doble con la respuesta indicada. */
function fijarRecaptcha(respuesta) {
  const fetchFalso = crearFetchFalso(respuesta);
  global.fetch = fetchFalso;
  return fetchFalso;
}

/** Carga emailSender.js (el mock de Resend ya está instalado al cargar este módulo). */
function cargarEmailSender() {
  return require("../emailSender");
}

module.exports = {
  FAKE_RESEND_ID,
  ADMIN_FALSO,
  ENV_FALSO,
  RECAPTCHA_OK,
  resendCtl,
  preparar,
  fijarRecaptcha,
  tokenMatematico,
  reclamoValido,
  contactoValido,
  capturarError,
  cargarEmailSender,
};
