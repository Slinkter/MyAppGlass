/**
 * @file index.ts
 * @description Modelo de la entidad `client`. Los tipos provienen del contrato
 * compartido (`@gya/shared` vía `@/shared/schemas/ecommerce-schemas`); no se
 * redefinen aquí para no duplicar el esquema que valida el backend.
 * @module entities/client/model
 */

export type { ClientProfile, UserRole } from "@/shared/schemas/ecommerce-schemas";
