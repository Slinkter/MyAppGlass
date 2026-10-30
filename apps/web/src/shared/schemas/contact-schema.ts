import { z } from "zod";

/**
 * Esquema de validación Zod unificado para formularios de contacto y cotizaciones
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .transform((val) => val.trim().toLowerCase())
    .pipe(z.string().email("Formato de correo electrónico inválido")),
  phone: z
    .string()
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .regex(/^(\+?[0-9 \-()]{7,20})?$/, "Número telefónico no válido")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
  acceptedTerms: z
    .boolean()
    .refine((val) => val === true, "Debes aceptar las políticas de privacidad")
    .optional(),
  middleName: z.string().optional().default(""),
  recaptchaToken: z.string().optional(),
  mathAnswer: z.string().optional(),
  mathToken: z.string().optional(),
  _ts: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
