/**
 * @file purchaseNumber.ts
 * @description Formato del número de pedido de compra (`PC-AAAA-NNNN`) y del documento contador anual.
 * @module entities/supplier/lib
 */

/** Número correlativo del pedido de compra, por ejemplo `PC-2026-0001`. */
export function formatPurchaseNumber(year: number, seq: number): string {
  return `PC-${year}-${String(seq).padStart(4, "0")}`;
}

/** ID del documento contador de pedidos para un año, por ejemplo `pedidos-2026`. */
export function purchaseCounterDocId(year: number): string {
  return `pedidos-${year}`;
}
