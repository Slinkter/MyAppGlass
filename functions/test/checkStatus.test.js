"use strict";

const { describe, test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const { crearFakeDb, instalarFirebaseAdminFalso } = require("./fakeDb");

// checkStatus -> withGuards -> admin.firestore(): se precarga el doble antes de cargar la función.
const admin = instalarFirebaseAdminFalso();
let checkStatus;
before(() => {
  delete require.cache[require.resolve("../src/http/checkStatus")];
  delete require.cache[require.resolve("../src/guards/withGuards")];
  ({ checkStatus } = require("../src/http/checkStatus"));
});
after(() => {
  delete require.cache[require.resolve("../src/http/checkStatus")];
  delete require.cache[require.resolve("../src/guards/withGuards")];
  admin.restaurar();
});

let db;
beforeEach(() => {
  db = crearFakeDb()
    .sembrar("contact_submissions", "GYA-CON-2026-ABCDEF", {
      nombreCompleto: "Juan Pérez García",
      status: "RECIBIDO",
      createdAtIso: "2026-01-05T10:00:00.000Z",
    })
    .sembrar("libro_de_reclamaciones", "GYA-REC-2026-ZZZZ22", { name: "Ana", status: "EN_PROCESO" })
    .sembrar("contact_submissions", "gya-antiguo-1", { nombreCompleto: "Al Bo", status: "RECIBIDO" })
    .sembrar("contact_submissions", "re-falso-0000000001", { nombreCompleto: "Carla Ruiz", status: "RECIBIDO" });
  admin.fijarDb(db);
});

/** Req tipo Express. Por defecto: query {} y body {} (como en Cloud Functions con cuerpo vacío). */
function crearReq(opciones = {}) {
  const { method = "GET", query = {}, origin = "https://gyacompany.com" } = opciones;
  // "body" se toma tal cual si se pasa (incluido undefined); un default lo reemplazaría por {}.
  const body = "body" in opciones ? opciones.body : {};
  return {
    method,
    headers: { origin, "x-forwarded-for": "1.1.1.1, 203.0.113.50" },
    socket: { remoteAddress: "10.0.0.1" },
    query,
    body,
    get(nombre) {
      return this.headers[nombre.toLowerCase()];
    },
  };
}

/**
 * Res tipo Express. Es un EventEmitter porque el wrapper de CORS de firebase-functions espera
 * `res.on("finish")`; al responder se emite "finish" y se resuelve `terminado`.
 */
function crearRes() {
  const res = new EventEmitter();
  Object.assign(res, {
    statusCode: undefined,
    cuerpo: undefined,
    enviado: undefined,
    headers: {},
    error: undefined,
  });
  let resolver;
  res.terminado = new Promise((r) => {
    resolver = r;
  });
  const terminar = () => {
    res.emit("finish");
    resolver();
  };
  res.status = (codigo) => {
    res.statusCode = codigo;
    return res;
  };
  res.set = res.setHeader = (nombre, valor) => {
    res.headers[nombre.toLowerCase()] = valor;
    return res;
  };
  res.getHeader = (nombre) => res.headers[nombre.toLowerCase()];
  res.writeHead = () => res;
  res.json = (cuerpo) => {
    res.cuerpo = cuerpo;
    terminar();
    return res;
  };
  res.send = (cuerpo) => {
    res.enviado = cuerpo;
    terminar();
    return res;
  };
  res.end = (cuerpo) => {
    res.enviado = cuerpo;
    terminar();
    return res;
  };
  return res;
}

/** Invoca checkStatus y espera a que la respuesta termine (o falla si no termina a tiempo). */
async function invocar(req, res, ms = 2000) {
  Promise.resolve()
    .then(() => checkStatus(req, res))
    .catch((err) => {
      res.error = err;
    });
  let timer;
  const plazo = new Promise((_, reject) => {
    timer = setTimeout(() => {
      const causa = res.error ? ` (error lanzado: ${res.error.message})` : "";
      reject(new Error(`checkStatus no respondió en ${ms} ms${causa}`));
    }, ms);
  });
  try {
    await Promise.race([res.terminado, plazo]);
  } finally {
    clearTimeout(timer);
  }
  return res;
}

const MENSAJE_400 = "ID de seguimiento requerido.";

describe("checkStatus: validación de id", () => {
  test("sin id responde 400", async () => {
    const res = await invocar(crearReq({ query: {}, body: {} }), crearRes());
    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.cuerpo, { success: false, message: MENSAJE_400 });
  });

  test("id no textual responde 400", async () => {
    const res = await invocar(crearReq({ query: { id: 123 } }), crearRes());
    // 123 es truthy: pasa el destructuring y falla la comprobación typeof.
    assert.equal(res.statusCode, 400);
  });

  // Posible bug de producción (src/http/checkStatus.js, línea con `const { id } = request.query.id ? ...`):
  // si la petición no trae query.id ni body, `request.body` es undefined y la desestructuración lanza
  // FUERA del try, por lo que no se responde el 400 esperado.
  test("sin query ni body (body undefined) responde 400", async () => {
    const res = await invocar(crearReq({ query: {}, body: undefined }), crearRes());
    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.cuerpo, { success: false, message: MENSAJE_400 });
  });
});

describe("checkStatus: consulta encontrada", () => {
  test("contacto por query: 200 con datos enmascarados", async () => {
    const res = await invocar(crearReq({ query: { id: "GYA-CON-2026-ABCDEF" } }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.cuerpo, {
      success: true,
      data: {
        id: "GYA-CON-2026-ABCDEF",
        type: "Consulta de Contacto",
        status: "RECIBIDO",
        createdAt: "2026-01-05T10:00:00.000Z",
        name: "Ju*** Pé*** Ga***",
        maskedName: "Ju*** Pé*** Ga***",
      },
    });
  });

  test("reclamo en libro_de_reclamaciones: tipo y nombre corto enmascarado", async () => {
    const res = await invocar(crearReq({ query: { id: "GYA-REC-2026-ZZZZ22" } }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.equal(res.cuerpo.data.type, "Libro de Reclamaciones");
    assert.equal(res.cuerpo.data.status, "EN_PROCESO");
    assert.equal(res.cuerpo.data.maskedName, "An***");
  });

  test("nombres de dos letras se enmascaran con inicial y asterisco", async () => {
    const res = await invocar(crearReq({ query: { id: "gya-antiguo-1" } }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.equal(res.cuerpo.data.maskedName, "A* B*");
  });

  test("documento sin nombre responde \"Usuario Registrado\" y estado por defecto", async () => {
    db.sembrar("contact_submissions", "GYA-CON-2026-NONAME", {});
    const res = await invocar(crearReq({ query: { id: "GYA-CON-2026-NONAME" } }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.equal(res.cuerpo.data.maskedName, "Usuario Registrado");
    assert.equal(res.cuerpo.data.status, "RECIBIDO");
  });

  test("id de Resend (no GYA-) se busca tal cual", async () => {
    const res = await invocar(crearReq({ query: { id: "re-falso-0000000001" } }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.equal(res.cuerpo.data.id, "re-falso-0000000001");
    assert.equal(res.cuerpo.data.maskedName, "Ca*** Ru***");
  });

  test("POST con id en el body funciona", async () => {
    const res = await invocar(crearReq({ method: "POST", query: {}, body: { id: "GYA-CON-2026-ABCDEF" } }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.equal(res.cuerpo.data.id, "GYA-CON-2026-ABCDEF");
  });
});

describe("checkStatus: reintento en mayúsculas para códigos GYA-", () => {
  test("gya- en minúsculas encuentra el documento en mayúsculas", async () => {
    const res = await invocar(crearReq({ query: { id: "gya-con-2026-abcdef" } }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.equal(res.cuerpo.data.id, "GYA-CON-2026-ABCDEF");
  });

  test("gya- existente en minúsculas se encuentra sin reintento", async () => {
    const res = await invocar(crearReq({ query: { id: "gya-antiguo-1" } }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.equal(res.cuerpo.data.id, "gya-antiguo-1");
  });
});

describe("checkStatus: no encontrado y métodos", () => {
  test("id inexistente responde 404", async () => {
    const res = await invocar(crearReq({ query: { id: "GYA-CON-2026-NOEXISTE" } }), crearRes());
    assert.equal(res.statusCode, 404);
    assert.deepEqual(res.cuerpo, { success: false, message: "No se encontró ninguna solicitud con ese código." });
  });

  test("id con barra o demasiado largo responde 404 sin consultar Firestore", async () => {
    for (const id of ["GYA/CON/2026", "a/b", "X".repeat(201)]) {
      const res = await invocar(crearReq({ query: { id } }), crearRes());
      assert.equal(res.statusCode, 404, `id inválido: ${id.slice(0, 20)}`);
      assert.deepEqual(res.cuerpo, { success: false, message: "No se encontró ninguna solicitud con ese código." });
    }
  });

  test("método PUT responde 405", async () => {
    const res = await invocar(crearReq({ method: "PUT", query: { id: "GYA-CON-2026-ABCDEF" } }), crearRes());
    assert.equal(res.statusCode, 405);
    assert.equal(res.enviado, "Método no permitido.");
  });
});

describe("checkStatus: errores", () => {
  test("fallo de lectura en Firestore responde 500 (failOpen deja pasar el rate limit)", async () => {
    db = crearFakeDb({ fallaLectura: true });
    admin.fijarDb(db);
    const res = await invocar(crearReq({ query: { id: "GYA-CON-2026-ABCDEF" } }), crearRes());
    assert.equal(res.statusCode, 500);
    assert.deepEqual(res.cuerpo, { success: false, message: "Error al consultar el estado." });
  });
});

describe("checkStatus: CORS", () => {
  test("origen permitido recibe Access-Control-Allow-Origin", async () => {
    const res = await invocar(crearReq({ query: { id: "GYA-CON-2026-ABCDEF" }, origin: "https://gyacompany.com" }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.equal(res.getHeader("Access-Control-Allow-Origin"), "https://gyacompany.com");
  });

  test("origen no permitido no recibe la cabecera CORS", async () => {
    const res = await invocar(crearReq({ query: { id: "GYA-CON-2026-ABCDEF" }, origin: "https://evil.example" }), crearRes());
    assert.equal(res.statusCode, 200);
    assert.equal(res.getHeader("Access-Control-Allow-Origin"), undefined);
  });
});
