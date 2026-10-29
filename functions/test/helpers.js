"use strict";

/**
 * Dobles de prueba para las pruebas de caracterización (node:test).
 *
 * - Resend: se inyecta un módulo falso en require.cache ANTES de cargar emailSender.js.
 *   Permite fallos configurables por destinatario (`resendCtl.fallos.admin` / `.cliente`).
 * - firebase-admin: doble con colecciones en memoria. Soporta collection().doc() con
 *   create (code 6 si el id ya existe), set, get y update (rutas con punto, p. ej. "notifications.admin").
 *   Fallos configurables: `falla` (create/set/get) y `fallaUpdate` (update).
 * - eventos: arreglo ÚNICO compartido por Firestore y Resend. Registra en orden de ejecución
 *   operaciones como "firestore.create:<coleccion>" o "resend.send:admin" para afirmar el orden.
 * - reCAPTCHA: se reemplaza global.fetch por un doble (se restaura en cada test).
 * - Variables de entorno: valores FALSOS inventados para pruebas (nunca reales).
 */

const Module = require("node:module");
const { computeSignature } = require("../mathCaptchaValidator");

const FAKE_RESEND_ID = "re-falso-0000000001";
const ADMIN_FALSO = "admin-falso@example.com";

// Formato de código propio: GYA-REC-AAAA-XXXXXX / GYA-CON-AAAA-XXXXXX (sin 0, O, 1, I)
const PATRON_CODIGO = {
  REC: /^GYA-REC-\d{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/,
  CON: /^GYA-CON-\d{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/,
};

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

// ─── Registro compartido de eventos ──────────────────────────────────────────
// Se vacía con length = 0 (no se reasigna) para que las referencias guardadas sigan válidas.
const eventos = [];

// ─── Doble de Resend ─────────────────────────────────────────────────────────
const resendCtl = {
  llamadas: [],
  // null => respuesta OK; función(payload) => { data, error } (compatibilidad con tests antiguos)
  respuesta: null,
  // Mensaje de error por destinatario ("admin" | "cliente"); null => envío correcto.
  fallos: { admin: null, cliente: null },
  reset() {
    this.llamadas = [];
    this.respuesta = null;
    this.fallos = { admin: null, cliente: null };
    eventos.length = 0;
  },
};

class ResendFalso {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.emails = {
      send: async (payload) => {
        const destino = payload.to === ADMIN_FALSO ? "admin" : "cliente";
        eventos.push(`resend.send:${destino}`);
        resendCtl.llamadas.push(payload);
        const mensajeFallo = resendCtl.fallos[destino];
        if (mensajeFallo) return { data: null, error: { message: mensajeFallo } };
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
/** Copia profunda de objetos planos (los valores especiales, como FieldValue, se conservan). */
function clonar(valor) {
  if (Array.isArray(valor)) return valor.map(clonar);
  if (valor && typeof valor === "object" && Object.getPrototypeOf(valor) === Object.prototype) {
    const copia = {};
    for (const clave of Object.keys(valor)) copia[clave] = clonar(valor[clave]);
    return copia;
  }
  return valor;
}

/** Asigna un valor en una ruta con puntos dentro de `objeto`, creando los niveles intermedios. */
function fijarRuta(objeto, ruta, valor) {
  const partes = ruta.split(".");
  let actual = objeto;
  for (const parte of partes.slice(0, -1)) {
    if (!actual[parte] || typeof actual[parte] !== "object") actual[parte] = {};
    actual = actual[parte];
  }
  actual[partes[partes.length - 1]] = valor;
}

function errorFirestore(mensaje, code) {
  const error = new Error(mensaje);
  if (code !== undefined) error.code = code;
  return error;
}

function crearAdminFalso() {
  const escrituras = []; // create/set exitosos: { coleccion, id, datos }
  const actualizaciones = []; // update exitosos: { coleccion, id, campos }
  const colecciones = new Map(); // nombre -> Map(id -> datos guardados)

  const coleccion = (nombre) => {
    if (!colecciones.has(nombre)) colecciones.set(nombre, new Map());
    return colecciones.get(nombre);
  };

  const admin = {
    escrituras,
    actualizaciones,
    falla: false, // create, set y get lanzan un Error genérico
    fallaUpdate: false, // update lanza un Error genérico

    /** Copia del documento guardado (refleja los update aplicados), o undefined si no existe. */
    documento(nombre, id) {
      const datos = coleccion(nombre).get(id);
      return datos === undefined ? undefined : clonar(datos);
    },

    /** Precarga un documento (por ejemplo, para simular una colisión de códigos). */
    sembrar(nombre, id, datos) {
      coleccion(nombre).set(id, clonar(datos));
    },

    firestore() {
      return {
        collection(nombre) {
          return {
            doc(id) {
              return {
                id,

                // Falla si el id ya existe (code 6 = ALREADY_EXISTS, como Firestore real).
                create: async (datos) => {
                  eventos.push(`firestore.create:${nombre}`);
                  if (admin.falla) throw errorFirestore("Firestore no disponible (doble de prueba)");
                  if (coleccion(nombre).has(id)) {
                    throw errorFirestore(`${id}: ALREADY_EXISTS (doble de prueba)`, 6);
                  }
                  coleccion(nombre).set(id, clonar(datos));
                  escrituras.push({ coleccion: nombre, id, datos });
                },

                set: async (datos) => {
                  eventos.push(`firestore.set:${nombre}`);
                  if (admin.falla) throw errorFirestore("Firestore no disponible (doble de prueba)");
                  coleccion(nombre).set(id, clonar(datos));
                  escrituras.push({ coleccion: nombre, id, datos });
                },

                get: async () => {
                  eventos.push(`firestore.get:${nombre}`);
                  if (admin.falla) throw errorFirestore("Firestore no disponible (doble de prueba)");
                  const datos = coleccion(nombre).get(id);
                  return {
                    exists: datos !== undefined,
                    data: () => (datos === undefined ? undefined : clonar(datos)),
                  };
                },

                // Acepta rutas con punto ("notifications.admin") y las fusiona en el documento.
                update: async (campos) => {
                  eventos.push(`firestore.update:${nombre}`);
                  if (admin.fallaUpdate) throw errorFirestore("Firestore update no disponible (doble de prueba)");
                  const datos = coleccion(nombre).get(id);
                  if (datos === undefined) throw errorFirestore(`${id}: NOT_FOUND (doble de prueba)`, 5);
                  for (const [ruta, valor] of Object.entries(campos)) {
                    fijarRuta(datos, ruta, clonar(valor));
                  }
                  actualizaciones.push({ coleccion: nombre, id, campos: clonar(campos) });
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
 * Prepara process.env (valores falsos), fetch, dobles y el registro de eventos.
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
    eventos,
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
  PATRON_CODIGO,
  eventos,
  resendCtl,
  preparar,
  fijarRecaptcha,
  tokenMatematico,
  reclamoValido,
  contactoValido,
  capturarError,
  cargarEmailSender,
};
