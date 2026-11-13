/**
 * @file index.ts
 * @description Modelo de dominio de los sistemas de catálogo (perfiles, accesorios y vidrio
 * por sistema). Los alias de proveedor son datos internos: solo los ve el administrador.
 * @module entities/system/model
 */

/** Estado de publicación de un sistema de catálogo. */
export type SystemStatus = "borrador" | "publicado";

/** Tipo de apertura del sistema. */
export type SystemOpening = "corrediza" | "proyectante" | "batiente" | "fijo" | "no_aplica";

/** Nombre con el que cada proveedor identifica el mismo sistema. */
export interface SystemAlias {
  proveedor: string;
  denominacion: string;
}

/** Accesorio técnico asociado a un sistema, con código del proveedor. */
export interface SystemAccessory {
  proveedor: string;
  cod: string;
  descripcion: string;
}

/** Sistema de catálogo tal como se guarda en Firestore (colección `sistemas`). */
export interface CatalogSystem {
  /** Slug del documento, p. ej. "ventana-serie-25". */
  id: string;
  /** Slug del servicio al que pertenece. */
  serviceSlug: string;
  /** Nombre propio que ve el cliente. */
  nombre: string;
  /** Cómo lo llama cada proveedor (solo admin). */
  aliases: SystemAlias[];
  tipoApertura: SystemOpening;
  /** Perfiles de aluminio usados. */
  perfiles: string[];
  accesorios: SystemAccessory[];
  /** Tipos y espesores de vidrio compatibles. */
  vidrio: string[];
  descripcion: string;
  /** Documento y página de origen. */
  fuente: string;
  estado: SystemStatus;
  /** true cuando el precio aún no está confirmado ("Precio a definir"). */
  pricePending: boolean;
  order?: number;
}

/** Datos para crear o reemplazar un sistema (el id es la clave del documento). */
export type CatalogSystemInput = Omit<CatalogSystem, "id">;

/**
 * Copia pública de un sistema publicado (colección `sistemas_publicos`).
 * Solo lleva lo que puede ver el cliente: sin alias, accesorios ni fuente de proveedor.
 */
export interface PublicSystem {
  id: string;
  serviceSlug: string;
  nombre: string;
  descripcion: string;
  tipoApertura: SystemOpening;
  vidrio: string[];
  pricePending: boolean;
  order?: number;
}
