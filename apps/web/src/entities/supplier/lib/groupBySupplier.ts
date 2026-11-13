/**
 * @file groupBySupplier.ts
 * @description Funciones puras para agrupar las líneas del pedido de compra por proveedor y calcular subtotales y total.
 * @module entities/supplier/lib
 */

import type { SupplierId } from "../model";
import type { PurchaseGroup, PurchaseLine } from "../model/purchaseOrder";

/** Orden fijo en que aparecen los proveedores dentro del pedido. */
const SUPPLIER_ORDER: readonly SupplierId[] = ["corporacion_corrales", "eduhg", "hpd_glass", "favitem"];

/** Redondea a 2 decimales para evitar errores de coma flotante. */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Agrupa las líneas por proveedor, en el orden fijo de `SUPPLIER_ORDER`.
 * Solo incluye los proveedores que tienen líneas. El subtotal es null si alguna línea no tiene precio.
 */
export function groupBySupplier(lineas: PurchaseLine[]): PurchaseGroup[] {
  const groups: PurchaseGroup[] = [];

  for (const proveedor of SUPPLIER_ORDER) {
    const lineasDelProveedor = lineas.filter((linea) => linea.proveedor === proveedor);
    if (lineasDelProveedor.length === 0) continue;

    const sinPrecio = lineasDelProveedor.some((linea) => linea.precio === null);
    const subtotal = sinPrecio
      ? null
      : round2(lineasDelProveedor.reduce((acc, linea) => acc + (linea.precio ?? 0) * linea.cantidad, 0));

    groups.push({ proveedor, lineas: lineasDelProveedor, subtotal });
  }

  return groups;
}

/**
 * Total del pedido: suma de precio por cantidad de todas las líneas.
 * Devuelve null si alguna línea no tiene precio; lista vacía devuelve 0.
 */
export function purchaseTotal(lineas: PurchaseLine[]): number | null {
  if (lineas.some((linea) => linea.precio === null)) return null;
  return round2(lineas.reduce((acc, linea) => acc + (linea.precio ?? 0) * linea.cantidad, 0));
}
