/**
 * @file cliente-crm-schema.ts
 * @description Validación del cliente que registra o edita el admin en /admin/clientes.
 * A diferencia del registro público (`clientProfileSchema`), el correo es opcional.
 */
import { z } from "zod";

export const clienteCrmSchema = z.object({
  fullName: z.string().trim().min(3, "Escriba la razón social o el nombre completo").max(200),
  dniRuc: z.string().trim().regex(/^(\d{8}|\d{11})$/, "DNI de 8 dígitos o RUC de 11 dígitos"),
  contactName: z.string().trim().max(200).optional().default(""),
  phone: z.string().trim().min(6, "Escriba un teléfono de contacto").max(30),
  email: z.union([z.literal(""), z.string().trim().email("Correo no válido").max(254)]).optional().default(""),
  address: z.string().trim().min(5, "Escriba la dirección").max(300),
  district: z.string().trim().min(3, "Escriba el distrito").max(100),
  notes: z.string().trim().max(500, "Máximo 500 caracteres").optional().default(""),
  isActive: z.boolean().optional().default(true),
});

export type ClienteCrmInput = z.input<typeof clienteCrmSchema>;
export type ClienteCrm = z.infer<typeof clienteCrmSchema>;

/** "DNI" o "RUC" según el largo del documento. */
export function tipoDocumento(dniRuc: string): "DNI" | "RUC" {
  return dniRuc.trim().length === 11 ? "RUC" : "DNI";
}
