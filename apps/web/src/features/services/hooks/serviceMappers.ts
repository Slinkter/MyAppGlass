/**
 * @file serviceMappers.ts
 * @description Adaptadores entre el modelo Firestore (`Service`) y los modelos de vista.
 * @module services/hooks
 */

import { Check, ChevronRight } from "lucide-react";
import type { Service as FirestoreService } from "@/shared/api/firebase/types";
import type { GalleryItem } from "@/shared/types/gallery";
import type { ServiceListItem, ServicePageData } from "@/features/services/types";

export type { ServiceListItem };

/**
 * Con `output: 'export'` solo existe HTML para los slugs leídos en build
 * (`prerenderedSlugs`, que llegan desde page.tsx). El resto —servicios creados después
 * desde el admin o sin lista de build— se atiende en la ruta cliente
 * `/servicios/ver?slug=...`.
 */
export const getServiceHref = (
  slug: string,
  prerenderedSlugs?: ReadonlySet<string>
): string =>
  prerenderedSlugs?.has(slug)
    ? `/servicios/${slug}`
    : `/servicios/ver?slug=${encodeURIComponent(slug)}`;

export const toServiceListItem = (
  service: FirestoreService,
  prerenderedSlugs?: ReadonlySet<string>
): ServiceListItem => ({
  id: service.id,
  slug: service.slug,
  image: service.coverImage,
  name: service.title,
  category: service.category ?? "",
  description: service.shortDescription,
  plink: getServiceHref(service.slug, prerenderedSlugs),
});

/** SEO de la página de detalle: `seoTitle`/`seoDescription` con respaldo en título y resumen. */
export const getServiceSeo = (service: FirestoreService): ServicePageData["seo"] => ({
  title: service.seoTitle || service.title,
  description: service.seoDescription || service.shortDescription,
});

/**
 * Construye el `ServicePageData` de la página de detalle solo con datos de Firestore.
 * La galería se agrupa por `system` en el orden de `service.systems`; las fotos sin
 * sistema (o de un sistema que ya no existe) van a una lista general al final.
 */
export const toServicePageData = (service: FirestoreService): ServicePageData => {
  const toItem = (g: FirestoreService["gallery"][number], idx: number): GalleryItem => ({
    id: g.id || idx,
    src: g.url,
    title: g.alt || service.title,
  });

  const lists = service.systems.map((system) =>
    service.gallery.filter((g) => g.system === system).map(toItem)
  );
  const loose = service.gallery
    .filter((g) => !g.system || !service.systems.includes(g.system))
    .map(toItem);

  const systems = service.systems.filter((_, i) => lists[i].length > 0);
  const imageLists = lists.filter((l) => l.length > 0);
  if (loose.length > 0) imageLists.push(loose);

  return {
    seo: getServiceSeo(service),
    about: { title: service.title, description: service.fullDescription },
    benefits: service.benefits.map((label) => ({ label, icon: Check })),
    features: service.features.map((label) => ({ label, icon: Check })),
    systems: systems.map((label) => ({ label, icon: ChevronRight })),
    imageLists: imageLists.length > 0 ? imageLists : [[]],
    faqs: service.faqs,
  };
};
