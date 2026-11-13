/**
 * @file index.ts
 * @description Modelo de la entidad `service`: documento de Firestore y modelos de vista
 * (lista y página de detalle). El modelo de datos vive en `@/shared/api/firebase/types`.
 * @module entities/service/model
 */

import type { ElementType } from "react";
import type {
  ServiceFaq,
  ServiceSpec,
  ServiceSystemSheet,
} from "@/shared/api/firebase/types";
import type { GalleryItem } from "@/shared/types/gallery";

export type {
  Service,
  ServiceFaq,
  ServiceSpec,
  ServiceSystemSheet,
} from "@/shared/api/firebase/types";

export interface ServicePageSEO {
  title: string;
  description: string;
}

export interface ServicePageSystem {
  label: string;
  icon: ElementType;
  /** Descripción propia del sistema (sistemas publicados desde el panel). */
  description?: string;
}

export interface ServicePageFeature {
  label: string;
  icon: ElementType;
}

/** Datos de la página de detalle de un servicio, derivados de un documento de Firestore. */
export interface ServicePageData {
  seo: ServicePageSEO;
  about: { title: string; description: string };
  benefits: ServicePageFeature[];
  systems: ServicePageSystem[];
  features: ServicePageFeature[];
  imageLists: GalleryItem[][];
  /** Preguntas frecuentes del servicio (vacío = no se muestra la sección). */
  faqs: ServiceFaq[];
  /** Especificaciones técnicas del servicio (vacío = no se muestra la sección). */
  specs: ServiceSpec[];
  /** Fichas técnicas por sistema (vacío = se mantiene el comportamiento estándar). */
  systemSheets: ServiceSystemSheet[];
}

/** Modelo mínimo que consumen las tarjetas de la lista pública. */
export interface ServiceListItem {
  id: string | number;
  slug: string;
  image: string;
  name: string;
  category: string;
  description: string;
  plink: string;
}
