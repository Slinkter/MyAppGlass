/**
 * @file serviceMappers.ts
 * @description Adaptadores entre el modelo Firestore (`Service`) y los modelos de vista locales.
 * @module services/hooks
 */

import { Check } from "lucide-react";
import type { Service as FirestoreService } from "@/shared/api/firebase/types";
import type { GalleryItem } from "@/shared/types/gallery";
import {
  getServices as getLocalServices,
  type ServicePageData,
} from "@/features/services/services/serviceService";
import { servicePageDataMap } from "@/features/services/data/servicePageDataMap";

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

/** Slugs prerenderizados en el export estático (generateStaticParams). */
const prerenderedSlugs = new Set(
  getLocalServices().map((s) => s.plink.split("/").pop() || "")
);

/**
 * Con `output: 'export'` solo existen como HTML los slugs locales. Los creados
 * desde el admin se atienden en la ruta cliente `/servicios/ver?slug=...`.
 */
export const getServiceHref = (slug: string): string =>
  prerenderedSlugs.has(slug)
    ? `/servicios/${slug}`
    : `/servicios/ver?slug=${encodeURIComponent(slug)}`;

export const toServiceListItem = (service: FirestoreService): ServiceListItem => ({
  id: service.id,
  slug: service.slug,
  image: service.coverImage,
  name: service.title,
  category: service.category ?? "",
  description: service.shortDescription,
  plink: getServiceHref(service.slug),
});

export const getLocalServiceListItems = (): ServiceListItem[] =>
  getLocalServices().map((s) => {
    const slug = s.plink.split("/").pop() || "";
    return {
      id: s.id,
      slug,
      image: s.image,
      name: s.name,
      category: s.category,
      description: s.description,
      plink: s.plink,
    };
  });

const sameImageSet = (remote: GalleryItem[], local: GalleryItem[][]): boolean => {
  const localSrcs = new Set(local.flat().map((i) => i.src));
  const remoteSrcs = new Set(remote.map((i) => i.src));
  if (localSrcs.size !== remoteSrcs.size) return false;
  for (const src of localSrcs) if (!remoteSrcs.has(src)) return false;
  return true;
};

/**
 * Construye el `ServicePageData` de la página de detalle desde Firestore.
 * Los textos y la galería vienen de Firestore. Si existe configuración local para el
 * slug y la galería remota está vacía o es idéntica a la sembrada, se conservan los
 * sistemas con sus listas de imágenes por sistema; si el admin editó el álbum, se
 * muestra la `gallery[]` completa en una sola lista.
 */
export const toServicePageData = (service: FirestoreService): ServicePageData => {
  const local: ServicePageData | undefined = servicePageDataMap[service.slug];
  const gallery: GalleryItem[] = service.gallery.map((g) => ({
    id: g.id,
    src: g.url,
    title: g.alt || service.title,
  }));

  const keepLocalLists =
    !!local && (gallery.length === 0 || sameImageSet(gallery, local.imageLists));

  return {
    seo: { title: service.title, description: service.shortDescription },
    about: { title: service.title, description: service.fullDescription },
    benefits: service.benefits.map((label) => ({ label, icon: Check })),
    features: service.features.map((label) => ({ label, icon: Check })),
    systems: keepLocalLists && local ? local.systems : [],
    imageLists: keepLocalLists && local ? local.imageLists : [gallery],
  };
};

export const getLocalServicePageData = (slug: string): ServicePageData | null =>
  servicePageDataMap[slug] ?? null;
