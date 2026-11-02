import { z } from "zod";

/**
 * Contrato del Libro de Reclamaciones en el frontend.
 *
 * La fuente es el backend (`apps/functions/src/schemas/reclamo.js`), publicada en
 * `docs/api/openapi.json` (se regenera con `pnpm run contract:generate`).
 * Estos límites deben coincidir con ese archivo: el test `api-contract.test.ts` falla si divergen.
 */

/** Valores que ofrece el formulario. El backend acepta además "Carné de Extranjería", "Pasaporte" y "RUC". */
export const tipoDocumentoEnum = z.enum(["DNI", "CE", "PASAPORTE"]);
export const tipoBienEnum = z.enum(["producto", "servicio"]);
export const tipoSolicitudEnum = z.enum(["Reclamo", "Queja"]);

/** Texto libre sin caracteres peligrosos (`< > { }`), igual que el backend. */
const SAFE_TEXT = /^[^<>{}]+$/;
const SAFE_TEXT_OPTIONAL = /^[^<>{}]*$/;
const SAFE_TEXT_MESSAGE = "Caracteres no permitidos";

/**
 * Esquema de validación estricto para el Libro de Reclamaciones
 */
export const reclamationFormSchema = z.object({
  nombreCompleto: z
    .string()
    .trim()
    .min(3, "El nombre completo debe tener al menos 3 caracteres")
    .max(120, "El nombre no puede exceder 120 caracteres")
    .regex(SAFE_TEXT, SAFE_TEXT_MESSAGE),
  tipoDocumento: tipoDocumentoEnum,
  numeroDocumento: z
    .string()
    .trim()
    .min(6, "El número de documento debe tener al menos 6 caracteres")
    .max(15, "El número de documento no puede exceder 15 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "El número de documento solo admite letras y números"),
  domicilio: z
    .string()
    .trim()
    .min(5, "El domicilio debe tener al menos 5 caracteres")
    .max(300, "El domicilio no puede exceder 300 caracteres")
    .regex(SAFE_TEXT, SAFE_TEXT_MESSAGE),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Formato de correo electrónico no válido")
    .max(200, "El correo no puede exceder 200 caracteres"),
  telefono: z
    .string()
    .trim()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .regex(/^\+?[0-9 \-()]+$/, "El teléfono solo admite números, espacios, guiones y paréntesis"),
  tipoBien: tipoBienEnum,
  montoReclamado: z
    .string()
    .optional()
    .default("0.00")
    .refine((v) => v.trim() === "" || (!Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 999999), "Monto inválido"),
  descripcionBien: z
    .string()
    .trim()
    .min(3, "La descripción del bien debe tener al menos 3 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres")
    .regex(SAFE_TEXT, SAFE_TEXT_MESSAGE),
  tipoSolicitud: tipoSolicitudEnum,
  detalle: z
    .string()
    .trim()
    .min(10, "El detalle del reclamo/queja debe tener al menos 10 caracteres")
    .max(2000, "El detalle no puede exceder 2000 caracteres")
    .regex(SAFE_TEXT, SAFE_TEXT_MESSAGE),
  pedido: z
    .string()
    .trim()
    .min(10, "El pedido del consumidor debe tener al menos 10 caracteres")
    .max(1000, "El pedido no puede exceder 1000 caracteres")
    .regex(SAFE_TEXT, SAFE_TEXT_MESSAGE),
  nombrePadreMadre: z
    .string()
    .trim()
    .max(120, "El nombre del padre, madre o tutor no puede exceder 120 caracteres")
    .regex(SAFE_TEXT_OPTIONAL, SAFE_TEXT_MESSAGE)
    .optional()
    .default(""),
  // Consentimientos: el backend exige `true` y lo guarda como evidencia.
  autorizaEmail: z.literal(true, { message: "Debe autorizar la notificación por correo electrónico" }),
  aceptaTerminos: z.literal(true, { message: "Debe aceptar la declaración jurada y políticas de privacidad" }),
  middleName: z.string().optional().default(""),
  website_hp: z.string().optional().default(""),
  recaptchaToken: z.string().optional(),
  _ts: z.number().optional(),
});

export type ReclamationInput = z.infer<typeof reclamationFormSchema>;
