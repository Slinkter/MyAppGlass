import { z } from "zod";

/**
 * Tipos admitidos para el Libro de Reclamaciones conforme a normativa Indecopi
 */
export const tipoDocumentoEnum = z.enum(["DNI", "CE", "PASAPORTE"]);
export const tipoBienEnum = z.enum(["producto", "servicio"]);
export const tipoSolicitudEnum = z.enum(["Reclamo", "Queja"]);

/**
 * Esquema de validación estricto para el Libro de Reclamaciones
 */
export const reclamationFormSchema = z.object({
  nombreCompleto: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres")
    .max(120, "El nombre no puede exceder 120 caracteres")
    .trim(),
  tipoDocumento: tipoDocumentoEnum,
  numeroDocumento: z
    .string()
    .min(6, "El número de documento debe tener al menos 6 caracteres")
    .max(20, "El número de documento no puede exceder 20 caracteres")
    .trim(),
  domicilio: z
    .string()
    .min(5, "El domicilio debe tener al menos 5 caracteres")
    .max(200, "El domicilio no puede exceder 200 caracteres")
    .trim(),
  email: z
    .string()
    .email("Formato de correo electrónico no válido")
    .toLowerCase()
    .trim(),
  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .trim(),
  tipoBien: tipoBienEnum,
  montoReclamado: z
    .string()
    .optional()
    .default("0.00"),
  descripcionBien: z
    .string()
    .min(3, "La descripción del bien debe tener al menos 3 caracteres")
    .max(250, "La descripción no puede exceder 250 caracteres")
    .trim(),
  tipoSolicitud: tipoSolicitudEnum,
  detalle: z
    .string()
    .min(10, "El detalle del reclamo/queja debe tener al menos 10 caracteres")
    .max(2000, "El detalle no puede exceder 2000 caracteres")
    .trim(),
  pedido: z
    .string()
    .min(5, "El pedido del consumidor debe tener al menos 5 caracteres")
    .max(1000, "El pedido no puede exceder 1000 caracteres")
    .trim(),
  autorizaEmail: z
    .boolean()
    .refine((val) => val === true, "Debe autorizar la notificación por correo electrónico"),
  aceptaTerminos: z
    .boolean()
    .refine((val) => val === true, "Debe aceptar la declaración jurada y políticas de privacidad"),
  middleName: z.string().optional().default(""),
  website_hp: z.string().optional().default(""),
  recaptchaToken: z.string().optional(),
  _ts: z.number().optional(),
});

export type ReclamationInput = z.infer<typeof reclamationFormSchema>;
