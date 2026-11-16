/* eslint-disable */
// GENERADO desde packages/shared/src/schemas/cliente-crm-schema.ts. No editar: correr `pnpm run shared:sync`.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteCrmSchema = void 0;
exports.tipoDocumento = tipoDocumento;
/**
 * @file cliente-crm-schema.ts
 * @description Validación del cliente que registra o edita el admin en /admin/clientes.
 * A diferencia del registro público (`clientProfileSchema`), el correo es opcional.
 */
const zod_1 = require("zod");
exports.clienteCrmSchema = zod_1.z.object({
    fullName: zod_1.z.string().trim().min(3, "Escriba la razón social o el nombre completo").max(200),
    dniRuc: zod_1.z.string().trim().regex(/^(\d{8}|\d{11})$/, "DNI de 8 dígitos o RUC de 11 dígitos"),
    contactName: zod_1.z.string().trim().max(200).optional().default(""),
    phone: zod_1.z.string().trim().min(6, "Escriba un teléfono de contacto").max(30),
    email: zod_1.z.union([zod_1.z.literal(""), zod_1.z.string().trim().email("Correo no válido").max(254)]).optional().default(""),
    address: zod_1.z.string().trim().min(5, "Escriba la dirección").max(300),
    district: zod_1.z.string().trim().min(3, "Escriba el distrito").max(100),
    notes: zod_1.z.string().trim().max(500, "Máximo 500 caracteres").optional().default(""),
    isActive: zod_1.z.boolean().optional().default(true),
});
/** "DNI" o "RUC" según el largo del documento. */
function tipoDocumento(dniRuc) {
    return dniRuc.trim().length === 11 ? "RUC" : "DNI";
}
