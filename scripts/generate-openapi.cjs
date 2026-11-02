"use strict";

/**
 * Genera `docs/api/openapi.json` (OpenAPI 3.1) a partir de los schemas Zod del backend.
 * El backend (`apps/functions/src/schemas`) es la fuente del contrato: este archivo no se edita a mano.
 *
 * Uso:  pnpm run contract:generate
 * Un test del backend (`apps/functions/test/openapi.test.js`) falla si el archivo queda desactualizado.
 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const FUNCTIONS = path.join(ROOT, "apps", "functions");
const OUTPUT = path.join(ROOT, "docs", "api", "openapi.json");

const { z } = require(require.resolve("zod", { paths: [FUNCTIONS] }));
const { reclamoSchema } = require(path.join(FUNCTIONS, "src", "schemas", "reclamo.js"));
const { contactSchema } = require(path.join(FUNCTIONS, "src", "schemas", "contacto.js"));
const { RATE_LIMITS, RATE_LIMIT_WINDOW_MS } = require(path.join(FUNCTIONS, "src", "config", "limits.js"));

/** JSON Schema (2020-12) de un schema Zod, tal como lo recibe el backend (antes de transformaciones). */
function toJsonSchema(schema) {
  const { $schema, ...rest } = z.toJSONSchema(schema, { io: "input", target: "draft-2020-12", unrepresentable: "any" });
  void $schema;
  return rest;
}

/** Campos de seguridad que el backend lee fuera de los schemas Zod. */
const SECURITY_PROPERTIES = {
  mathToken: { type: "string", description: "Token base64 firmado del reto matemático (ver `mathCaptcha` del frontend). Vigencia: 15 minutos." },
  mathAnswer: { type: ["string", "number"], description: "Respuesta del consumidor al reto matemático." },
  recaptchaToken: { type: "string", description: "Token de reCAPTCHA v3 generado en el navegador." },
  _ts: { type: "number", description: "Marca de tiempo (ms) del render del formulario. Un envío en menos de 1.8 s se descarta como bot." },
  middleName: { type: "string", description: "Honeypot: debe ir vacío. Si viene con texto, el envío se descarta en silencio." },
  website_hp: { type: "string", description: "Honeypot: debe ir vacío." },
};

/** Une el schema de negocio con los campos de seguridad. */
function withSecurity(schema, { required, extraRequired }) {
  const base = toJsonSchema(schema);
  return {
    ...base,
    properties: { ...base.properties, ...Object.fromEntries(required.concat(["_ts", "middleName", "website_hp"]).map((k) => [k, SECURITY_PROPERTIES[k]])) },
    required: [...(base.required || []), ...extraRequired],
  };
}

const errorResponse = (description) => ({
  description,
  content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
});

const rateLimitNote = (name) =>
  `Límite por IP: ${RATE_LIMITS[name]} solicitudes cada ${RATE_LIMIT_WINDOW_MS / 60000} minutos (responde 429 al superarlo).`;

function buildOpenApi() {
  const reclamo = withSecurity(reclamoSchema, {
    required: ["mathToken", "mathAnswer", "recaptchaToken"],
    extraRequired: ["mathToken", "mathAnswer", "recaptchaToken"],
  });
  const contacto = withSecurity(contactSchema, {
    required: ["mathToken", "mathAnswer", "recaptchaToken"],
    extraRequired: ["mathToken", "mathAnswer", "recaptchaToken"],
  });

  return {
    openapi: "3.1.0",
    info: {
      title: "GYA Company API",
      version: "1.0.0",
      description: [
        "Contrato de las Cloud Functions HTTP de Glass & Aluminum Company S.A.C.",
        "",
        "Fuente: los schemas Zod de `apps/functions/src/schemas`. Este archivo se genera con `pnpm run contract:generate`; no se edita a mano.",
        "El frontend debe cumplir estos límites y valores (`packages/shared/src/schemas/reclamation-schema.ts`); un test de contrato falla si divergen.",
        "",
        "Orden de validación de `submitReclamo`: antibot (descartes silenciosos con 200 y `GHOST_BLOCKED`) → schema → captcha matemático → reCAPTCHA v3 → documento de identidad → guardado en Firestore → correos.",
      ].join("\n"),
    },
    servers: [{ url: "https://us-central1-gya-app-4c8a9.cloudfunctions.net", description: "Producción" }],
    paths: {
      "/submitReclamo": {
        post: {
          operationId: "submitReclamo",
          summary: "Registra una hoja del Libro de Reclamaciones",
          description: `Guarda el registro en la colección \`libro_de_reclamaciones\` (campos \`createdAt\`, \`createdAtIso\`, \`status\`, \`notifications\`) y envía un correo a la empresa y otro al consumidor. ${rateLimitNote("submitReclamo")}`,
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ReclamoRequest" } } } },
          responses: {
            200: { description: "Registrado. `data.id` es el código de seguimiento (`GYA-REC-AAAA-XXXXXX`), o `GHOST_BLOCKED` si el antibot lo descartó.", content: { "application/json": { schema: { $ref: "#/components/schemas/SubmitResponse" } } } },
            400: errorResponse("Datos inválidos o captcha matemático incorrecto."),
            403: errorResponse("reCAPTCHA no superado."),
            405: errorResponse("Método no permitido (solo POST)."),
            429: errorResponse("Límite de solicitudes superado."),
            500: errorResponse("Error interno del servidor."),
          },
        },
      },
      "/submitContacto": {
        post: {
          operationId: "submitContacto",
          summary: "Registra una consulta de contacto o cotización",
          description: `Guarda el registro en \`contact_submissions\` y envía un correo a la empresa y otro al cliente. ${rateLimitNote("submitContacto")}`,
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ContactoRequest" } } } },
          responses: {
            200: { description: "Registrado. `data.id` es el código `GYA-CON-AAAA-XXXXXX`.", content: { "application/json": { schema: { $ref: "#/components/schemas/SubmitResponse" } } } },
            400: errorResponse("Datos inválidos o captcha matemático incorrecto."),
            403: errorResponse("reCAPTCHA no superado."),
            405: errorResponse("Método no permitido (solo POST)."),
            429: errorResponse("Límite de solicitudes superado."),
            500: errorResponse("Error interno del servidor."),
          },
        },
      },
      "/checkStatus": {
        get: {
          operationId: "checkStatus",
          summary: "Consulta el estado de una solicitud por su código",
          description: `Acepta códigos nuevos (\`GYA-...\`) y antiguos (id de Resend). El nombre se devuelve ofuscado (Ley N° 29733). ${rateLimitNote("checkStatus")}`,
          parameters: [{ name: "id", in: "query", required: true, schema: { type: "string", maxLength: 200 }, description: "Código de seguimiento." }],
          responses: {
            200: { description: "Solicitud encontrada.", content: { "application/json": { schema: { $ref: "#/components/schemas/StatusResponse" } } } },
            400: errorResponse("Falta el id de seguimiento."),
            404: errorResponse("No existe una solicitud con ese código."),
            429: errorResponse("Límite de solicitudes superado."),
            500: errorResponse("Error interno del servidor."),
          },
        },
      },
    },
    components: {
      schemas: {
        ReclamoRequest: reclamo,
        ContactoRequest: contacto,
        SubmitResponse: {
          type: "object",
          required: ["success", "data"],
          properties: {
            success: { const: true },
            message: { type: "string" },
            data: {
              type: "object",
              required: ["id"],
              properties: { id: { type: "string", description: "Código de seguimiento." }, createdAt: { type: "string", format: "date-time" } },
            },
          },
        },
        StatusResponse: {
          type: "object",
          required: ["success", "data"],
          properties: {
            success: { const: true },
            data: {
              type: "object",
              properties: {
                id: { type: "string" },
                type: { enum: ["Consulta de Contacto", "Libro de Reclamaciones"] },
                status: { type: "string", examples: ["RECIBIDO"] },
                createdAt: { type: ["string", "null"], description: "Fecha de registro (`createdAt` en Firestore)." },
                name: { type: "string", description: "Nombre ofuscado." },
                maskedName: { type: "string" },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          required: ["success", "message"],
          properties: { success: { const: false }, message: { type: "string" } },
        },
      },
    },
  };
}

function serialize(doc) {
  return `${JSON.stringify(doc, null, 2)}\n`;
}

if (require.main === module) {
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, serialize(buildOpenApi()));
  console.log(`OpenAPI generado: ${path.relative(ROOT, OUTPUT)}`);
}

module.exports = { buildOpenApi, serialize, OUTPUT };
