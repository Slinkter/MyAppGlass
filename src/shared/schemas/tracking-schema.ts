import { z } from "zod";

/**
 * Esquema de validación para la consulta de estado de ticket/reclamo
 */
export const trackingQuerySchema = z.object({
  id: z
    .string()
    .min(5, "El código de seguimiento debe tener al menos 5 caracteres")
    .max(100, "Código de seguimiento demasiado largo")
    .trim(),
});

export type TrackingQueryInput = z.infer<typeof trackingQuerySchema>;
