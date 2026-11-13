/**
 * @file index.ts
 * @description Tipos del dominio de proveedores: identificadores, etiquetas y productos del catálogo de proveedores.
 * @module entities/supplier/model
 */

/** Identificadores de los proveedores registrados. */
export type SupplierId = "corporacion_corrales" | "eduhg" | "hpd_glass" | "favitem";

/** Nombre comercial de cada proveedor, para mostrar en la interfaz. */
export const SUPPLIER_LABELS: Record<SupplierId, string> = {
  corporacion_corrales: "Corporación Corrales",
  eduhg: "Eduhg",
  hpd_glass: "HPD Glass",
  favitem: "Favitem",
};

/** Tipo de ítem del catálogo: producto terminado, ficha técnica o herraje. */
export type SupplierProductType = "producto" | "ficha" | "herraje";

/** Ítem del catálogo de un proveedor, tal como se guarda en Firestore. */
export interface SupplierProduct {
  /** ID del documento en Firestore. */
  id: string;
  /** ID numérico original en la fuente del proveedor. */
  apiId: number;
  proveedor: SupplierId;
  tipo: SupplierProductType;
  /** Código del proveedor. */
  cod: string;
  descripcion: string;
  categoria: string | null;
  /** Precio del proveedor; null cuando no está confirmado. */
  precio: number | null;
  /** Imagen de origen en la API del proveedor. */
  imagenApi: string | null;
  /** Ruta de la foto en Storage (`proveedores/...`), escrita por el script de sincronización. */
  imagenPath?: string | null;
  /** Imagen alojada localmente, si existe. */
  imagenUrl?: string | null;
  /** Enlace de referencia del proveedor. */
  url: string | null;
  activo: boolean;
}
