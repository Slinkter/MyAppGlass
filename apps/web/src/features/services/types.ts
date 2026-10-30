/**
 * @file types.ts
 * @description Tipos de vista del dominio de servicios (modelo de la página pública).
 * El modelo de datos (Firestore) vive en `@/shared/api/firebase/types`.
 * @module services/types
 */

import type { ElementType } from "react";
import type { ServiceFaq } from "@/shared/api/firebase/types";
import type { GalleryItem } from "@/shared/types/gallery";

export type { ServiceFaq };

export interface ServicePageSEO {
  title: string;
  description: string;
}

export interface ServicePageSystem {
  label: string;
  icon: ElementType;
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
