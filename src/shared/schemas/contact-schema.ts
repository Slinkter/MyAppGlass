import { z } from "zod";

/**
 * Esquema de validación Zod para formularios de contacto y cotizaciones
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .trim(),
  email: z
    .string()
    .email("Formato de correo electrónico inválido")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .regex(/^[0-9+()\s-]{7,20}$/, "Número telefónico no válido")
    .trim(),
  serviceSlug: z
    .string()
    .min(1, "Debe seleccionar un servicio")
    .trim(),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
