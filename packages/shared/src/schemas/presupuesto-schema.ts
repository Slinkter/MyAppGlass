/**
 * @file presupuesto-schema.ts
 * @description Contrato del presupuesto formal (colección `presupuestos`, id PRES-0001).
 * Lo validan las Cloud Functions callables y lo consume el panel /admin.
 * El cliente nunca envía importes ni totales: los calcula la function.
 */
import { z } from "zod";

/** Unidades de venta. En pantalla: m², ml, und. */
export const unidadSchema = z.enum(["m2", "ml", "unidad", "barra", "plancha", "kg", "servicio"]);
export type Unidad = z.infer<typeof unidadSchema>;

export const UNIDAD_LABELS: Record<Unidad, string> = {
  m2: "m²",
  ml: "ml",
  unidad: "und",
  barra: "barra",
  plancha: "plancha",
  kg: "kg",
  servicio: "servicio",
};

export const estadoPresupuestoSchema = z.enum(["borrador", "enviado", "aprobado", "rechazado"]);
export type EstadoPresupuesto = z.infer<typeof estadoPresupuestoSchema>;

export const ESTADO_PRESUPUESTO_LABELS: Record<EstadoPresupuesto, string> = {
  borrador: "Borrador",
  enviado: "Enviado",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
};

/** Cambios de estado permitidos. `aprobado` y `rechazado` son finales. */
export const TRANSICIONES_PRESUPUESTO: Record<EstadoPresupuesto, readonly EstadoPresupuesto[]> = {
  borrador: ["enviado"],
  enviado: ["aprobado", "rechazado"],
  aprobado: [],
  rechazado: [],
};

export function puedeCambiarEstado(desde: EstadoPresupuesto, hacia: EstadoPresupuesto): boolean {
  return TRANSICIONES_PRESUPUESTO[desde].includes(hacia);
}

export const NUMERO_PRESUPUESTO_REGEX = /^PRES-\d{4,}$/;
const numeroSchema = z.string().regex(NUMERO_PRESUPUESTO_REGEX, "Número de presupuesto no válido");

export const VALIDEZ_DIAS_DEFECTO = 15;
export const MAX_ITEMS_PRESUPUESTO = 100;

/** Línea tal como la envía el panel. */
export const presupuestoItemInputSchema = z.object({
  productoId: z.string().min(1).max(128).optional(),
  /** Solo para líneas escritas a mano; si hay `productoId`, manda la categoría del catálogo. */
  tipo: z.enum(["producto", "servicio"]).optional(),
  descripcion: z.string().trim().min(2, "Describa el ítem").max(300, "Máximo 300 caracteres"),
  unidad: unidadSchema,
  cantidad: z.number().positive("La cantidad debe ser mayor a 0").max(1000000),
  precioUnitario: z.number().nonnegative("El precio no puede ser negativo").max(10000000),
});
export type PresupuestoItemInput = z.infer<typeof presupuestoItemInputSchema>;

/** Entrada de `guardarPresupuesto`. Sin `numero` crea; con `numero` edita un borrador. */
export const guardarPresupuestoInputSchema = z.object({
  numero: numeroSchema.optional(),
  clienteId: z.string().min(1, "Elija un cliente").max(128),
  items: z
    .array(presupuestoItemInputSchema)
    .min(1, "Agregue al menos un ítem")
    .max(MAX_ITEMS_PRESUPUESTO, `Máximo ${MAX_ITEMS_PRESUPUESTO} ítems`),
  validezDias: z.number().int().min(1, "Mínimo 1 día").max(90, "Máximo 90 días"),
  notas: z.string().trim().max(1000, "Máximo 1000 caracteres").optional().default(""),
});
export type GuardarPresupuestoInput = z.input<typeof guardarPresupuestoInputSchema>;

export interface GuardarPresupuestoOutput {
  numero: string;
  estado: EstadoPresupuesto;
  subtotal: number;
  igv: number;
  total: number;
}

/** Entrada de `cambiarEstadoPresupuesto`. */
export const cambiarEstadoInputSchema = z.object({
  numero: numeroSchema,
  estado: z.enum(["enviado", "aprobado", "rechazado"]),
});
export type CambiarEstadoInput = z.infer<typeof cambiarEstadoInputSchema>;

export interface CambiarEstadoOutput {
  numero: string;
  estado: EstadoPresupuesto;
  /** ISO 8601; solo al pasar a `enviado`. */
  venceEl?: string;
}

/** Entrada de `generarPresupuestoPdf`. */
export const generarPdfInputSchema = z.object({ numero: numeroSchema });
export type GenerarPdfInput = z.infer<typeof generarPdfInputSchema>;

export interface GenerarPdfOutput {
  path: string;
  version: number;
}

/** Entrada de `setAdminRole`. */
export const setAdminRoleInputSchema = z.object({
  email: z.string().trim().toLowerCase().email("Correo no válido").max(254),
  admin: z.boolean(),
});
export type SetAdminRoleInput = z.infer<typeof setAdminRoleInputSchema>;

export interface SetAdminRoleOutput {
  uid: string;
  role: "admin" | "cliente";
}

/** Línea guardada: la function agrega tipo, sku e importe. */
export const presupuestoItemSchema = presupuestoItemInputSchema.extend({
  sku: z.string().optional(),
  tipo: z.enum(["producto", "servicio"]),
  importe: z.number().nonnegative(),
});
export type PresupuestoItem = z.infer<typeof presupuestoItemSchema>;

/** Copia de los datos del cliente tomada al guardar el presupuesto. */
export const presupuestoClienteSchema = z.object({
  fullName: z.string(),
  dniRuc: z.string(),
  contactName: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  email: z.string().optional().default(""),
  address: z.string().optional().default(""),
  district: z.string().optional().default(""),
});
export type PresupuestoCliente = z.infer<typeof presupuestoClienteSchema>;

/** Documento `presupuestos/{numero}` tal como lo lee el panel. Las fechas son Timestamp de Firestore. */
export const presupuestoSchema = z.object({
  numero: numeroSchema,
  estado: estadoPresupuestoSchema,
  clienteId: z.string(),
  cliente: presupuestoClienteSchema,
  items: z.array(presupuestoItemSchema),
  subtotal: z.number(),
  igv: z.number(),
  total: z.number(),
  igvRate: z.number(),
  moneda: z.literal("PEN"),
  validezDias: z.number(),
  venceEl: z.any().nullable().optional(),
  notas: z.string().optional().default(""),
  pdf: z
    .object({ path: z.string(), version: z.number(), generadoEl: z.any().optional() })
    .nullable()
    .optional(),
  creadoPor: z.string().optional(),
  actualizadoPor: z.string().optional(),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
  enviadoEl: z.any().nullable().optional(),
  resueltoEl: z.any().nullable().optional(),
});
export type Presupuesto = z.infer<typeof presupuestoSchema>;
