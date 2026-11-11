/**
 * @file index.ts
 * @description Modelo de la entidad `order`. El esquema Zod es el contrato compartido
 * (`@gya/shared`); aquí solo se reexportan los tipos.
 * @module entities/order/model
 */

export type { Order, OrderItem } from "@/shared/schemas/ecommerce-schemas";
