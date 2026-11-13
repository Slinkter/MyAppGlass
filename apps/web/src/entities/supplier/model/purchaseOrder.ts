/**
 * @file purchaseOrder.ts
 * @description Tipos del pedido de compra a proveedores (colección `pedidos_proveedor`).
 * Uso interno del panel: el cliente nunca ve estos datos.
 * @module entities/supplier/model
 */

import type { SupplierId } from "./index";

/** Estados del pedido. "enviado" y "recibido" dependen de la respuesta E18 del dueño. */
export type PurchaseOrderStatus = "borrador" | "por_aprobar" | "aprobado";

export const PURCHASE_STATUS_LABELS: Record<PurchaseOrderStatus, string> = {
  borrador: "Borrador",
  por_aprobar: "Por aprobar",
  aprobado: "Aprobado",
};

/** Texto único para una línea, un grupo o un pedido sin precio confirmado. */
export const NO_PRICE_LABEL = "Sin información de precio";

/** Línea del pedido: copia de los datos del producto al momento de pedir. */
export interface PurchaseLine {
  /** ID del documento en `proveedores_productos`. */
  productId: string;
  proveedor: SupplierId;
  cod: string;
  descripcion: string;
  /** Ruta de la foto en Storage (`proveedores/...`); null si no hay foto. */
  imagenPath: string | null;
  cantidad: number;
  /** Precio unitario de compra; null cuando el proveedor no lo publica. */
  precio: number | null;
}

/** Líneas de un mismo proveedor con su subtotal. */
export interface PurchaseGroup {
  proveedor: SupplierId;
  lineas: PurchaseLine[];
  /** null si alguna línea no tiene precio. */
  subtotal: number | null;
}

/** Pedido de compra guardado. */
export interface PurchaseOrder {
  /** ID del documento = número del pedido (por ejemplo `PC-2026-0001`). */
  id: string;
  number: string;
  estado: PurchaseOrderStatus;
  lineas: PurchaseLine[];
  /** null si alguna línea no tiene precio. */
  total: number | null;
  nota: string;
  createdByUid: string;
  createdByName: string;
  approvedByName: string | null;
  createdAt?: { seconds: number };
  approvedAt?: { seconds: number } | null;
}
