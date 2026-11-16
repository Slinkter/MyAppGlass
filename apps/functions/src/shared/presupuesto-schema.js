/* eslint-disable */
// GENERADO desde packages/shared/src/schemas/presupuesto-schema.ts. No editar: correr `pnpm run shared:sync`.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presupuestoSchema = exports.presupuestoClienteSchema = exports.presupuestoItemSchema = exports.setAdminRoleInputSchema = exports.generarPdfInputSchema = exports.cambiarEstadoInputSchema = exports.guardarPresupuestoInputSchema = exports.presupuestoItemInputSchema = exports.MAX_ITEMS_PRESUPUESTO = exports.VALIDEZ_DIAS_DEFECTO = exports.NUMERO_PRESUPUESTO_REGEX = exports.TRANSICIONES_PRESUPUESTO = exports.ESTADO_PRESUPUESTO_LABELS = exports.estadoPresupuestoSchema = exports.UNIDAD_LABELS = exports.unidadSchema = void 0;
exports.puedeCambiarEstado = puedeCambiarEstado;
/**
 * @file presupuesto-schema.ts
 * @description Contrato del presupuesto formal (colección `presupuestos`, id PRES-0001).
 * Lo validan las Cloud Functions callables y lo consume el panel /admin.
 * El cliente nunca envía importes ni totales: los calcula la function.
 */
const zod_1 = require("zod");
/** Unidades de venta. En pantalla: m², ml, und. */
exports.unidadSchema = zod_1.z.enum(["m2", "ml", "unidad", "barra", "plancha", "kg", "servicio"]);
exports.UNIDAD_LABELS = {
    m2: "m²",
    ml: "ml",
    unidad: "und",
    barra: "barra",
    plancha: "plancha",
    kg: "kg",
    servicio: "servicio",
};
exports.estadoPresupuestoSchema = zod_1.z.enum(["borrador", "enviado", "aprobado", "rechazado"]);
exports.ESTADO_PRESUPUESTO_LABELS = {
    borrador: "Borrador",
    enviado: "Enviado",
    aprobado: "Aprobado",
    rechazado: "Rechazado",
};
/** Cambios de estado permitidos. `aprobado` y `rechazado` son finales. */
exports.TRANSICIONES_PRESUPUESTO = {
    borrador: ["enviado"],
    enviado: ["aprobado", "rechazado"],
    aprobado: [],
    rechazado: [],
};
function puedeCambiarEstado(desde, hacia) {
    return exports.TRANSICIONES_PRESUPUESTO[desde].includes(hacia);
}
exports.NUMERO_PRESUPUESTO_REGEX = /^PRES-\d{4,}$/;
const numeroSchema = zod_1.z.string().regex(exports.NUMERO_PRESUPUESTO_REGEX, "Número de presupuesto no válido");
exports.VALIDEZ_DIAS_DEFECTO = 15;
exports.MAX_ITEMS_PRESUPUESTO = 100;
/** Línea tal como la envía el panel. */
exports.presupuestoItemInputSchema = zod_1.z.object({
    productoId: zod_1.z.string().min(1).max(128).optional(),
    /** Solo para líneas escritas a mano; si hay `productoId`, manda la categoría del catálogo. */
    tipo: zod_1.z.enum(["producto", "servicio"]).optional(),
    descripcion: zod_1.z.string().trim().min(2, "Describa el ítem").max(300, "Máximo 300 caracteres"),
    unidad: exports.unidadSchema,
    cantidad: zod_1.z.number().positive("La cantidad debe ser mayor a 0").max(1000000),
    precioUnitario: zod_1.z.number().nonnegative("El precio no puede ser negativo").max(10000000),
});
/** Entrada de `guardarPresupuesto`. Sin `numero` crea; con `numero` edita un borrador. */
exports.guardarPresupuestoInputSchema = zod_1.z.object({
    numero: numeroSchema.optional(),
    clienteId: zod_1.z.string().min(1, "Elija un cliente").max(128),
    items: zod_1.z
        .array(exports.presupuestoItemInputSchema)
        .min(1, "Agregue al menos un ítem")
        .max(exports.MAX_ITEMS_PRESUPUESTO, `Máximo ${exports.MAX_ITEMS_PRESUPUESTO} ítems`),
    validezDias: zod_1.z.number().int().min(1, "Mínimo 1 día").max(90, "Máximo 90 días"),
    notas: zod_1.z.string().trim().max(1000, "Máximo 1000 caracteres").optional().default(""),
});
/** Entrada de `cambiarEstadoPresupuesto`. */
exports.cambiarEstadoInputSchema = zod_1.z.object({
    numero: numeroSchema,
    estado: zod_1.z.enum(["enviado", "aprobado", "rechazado"]),
});
/** Entrada de `generarPresupuestoPdf`. */
exports.generarPdfInputSchema = zod_1.z.object({ numero: numeroSchema });
/** Entrada de `setAdminRole`. */
exports.setAdminRoleInputSchema = zod_1.z.object({
    email: zod_1.z.string().trim().toLowerCase().email("Correo no válido").max(254),
    admin: zod_1.z.boolean(),
});
/** Línea guardada: la function agrega tipo, sku e importe. */
exports.presupuestoItemSchema = exports.presupuestoItemInputSchema.extend({
    sku: zod_1.z.string().optional(),
    tipo: zod_1.z.enum(["producto", "servicio"]),
    importe: zod_1.z.number().nonnegative(),
});
/** Copia de los datos del cliente tomada al guardar el presupuesto. */
exports.presupuestoClienteSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    dniRuc: zod_1.z.string(),
    contactName: zod_1.z.string().optional().default(""),
    phone: zod_1.z.string().optional().default(""),
    email: zod_1.z.string().optional().default(""),
    address: zod_1.z.string().optional().default(""),
    district: zod_1.z.string().optional().default(""),
});
/** Documento `presupuestos/{numero}` tal como lo lee el panel. Las fechas son Timestamp de Firestore. */
exports.presupuestoSchema = zod_1.z.object({
    numero: numeroSchema,
    estado: exports.estadoPresupuestoSchema,
    clienteId: zod_1.z.string(),
    cliente: exports.presupuestoClienteSchema,
    items: zod_1.z.array(exports.presupuestoItemSchema),
    subtotal: zod_1.z.number(),
    igv: zod_1.z.number(),
    total: zod_1.z.number(),
    igvRate: zod_1.z.number(),
    moneda: zod_1.z.literal("PEN"),
    validezDias: zod_1.z.number(),
    venceEl: zod_1.z.any().nullable().optional(),
    notas: zod_1.z.string().optional().default(""),
    pdf: zod_1.z
        .object({ path: zod_1.z.string(), version: zod_1.z.number(), generadoEl: zod_1.z.any().optional() })
        .nullable()
        .optional(),
    creadoPor: zod_1.z.string().optional(),
    actualizadoPor: zod_1.z.string().optional(),
    createdAt: zod_1.z.any().optional(),
    updatedAt: zod_1.z.any().optional(),
    enviadoEl: zod_1.z.any().nullable().optional(),
    resueltoEl: zod_1.z.any().nullable().optional(),
});
