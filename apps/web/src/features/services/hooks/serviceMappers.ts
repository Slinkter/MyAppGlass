/**
 * @file serviceMappers.ts
 * @description Adaptadores entre el modelo Firestore (`Service`) y los modelos de vista.
 * @module services/hooks
 */

import { Check, ChevronRight } from "lucide-react";
import type { Service as FirestoreService } from "@/shared/api/firebase/types";
import type { GalleryItem } from "@/shared/types/gallery";
import type { ServiceListItem, ServicePageData } from "@/features/services/types";
import { cleanSeoTitle } from "@/shared/utils/seo-utils";

export type { ServiceListItem };

/**
 * Diccionario canónico de respaldo SEO para servicios oficiales.
 * Respeta reglas de catálogo: Sistema Nova, Serie 25, Serie 35, Serie 62;
 * tipos de vidrio (Crudo, Laminado, Templado), ortografía "antirruido" y "vidrio y aluminio",
 * y descripciones persuasivas optimizadas de 135 a 158 caracteres para La Molina y Lima.
 */
export const SERVICE_SEO_FALLBACKS: Record<string, { title: string; description: string }> = {
  ventana: {
    title: "Ventanas Antirruido en La Molina y Lima",
    description:
      "Ventanas antirruido en Sistema Nova, Serie 25, Serie 35 y Serie 62 con vidrio laminado o templado. Reduce el ruido en La Molina y Lima. ¡Cotiza tu proyecto!",
  },
  mampara: {
    title: "Mamparas de Vidrio Templado y Aluminio",
    description:
      "Mamparas de vidrio templado y aluminio para terrazas, oficinas y salas. Fabricación a medida con seguridad y diseño moderno en Lima y La Molina. ¡Cotiza hoy!",
  },
  ducha: {
    title: "Boxes y Puertas de Ducha en Vidrio Templado",
    description:
      "Boxes y puertas de ducha en vidrio templado y perfiles de aluminio. Diseños elegantes y herméticos a medida para baños en La Molina y Lima. ¡Pide tu visita!",
  },
  parapeto: {
    title: "Parapetos de Vidrio y Muros Cortina de Aluminio",
    description:
      "Parapetos y muros cortina en vidrio templado y laminado con perfiles de aluminio reforzado. Resistencia y elegancia para edificios en todo Lima. ¡Cotiza ya!",
  },
  baranda: {
    title: "Barandas de Vidrio y Acero Inoxidable",
    description:
      "Barandas de vidrio templado y acero inoxidable para escaleras, terrazas y balcones. Máxima seguridad y estilo arquitectónico en La Molina y Lima. ¡Escríbenos!",
  },
  balcones: {
    title: "Cerramientos de Balcones en Vidrio y Aluminio",
    description:
      "Cerramientos y barandas de vidrio y aluminio para balcones residenciales. Mayor luminosidad, protección y diseño contemporáneo en La Molina y Lima. ¡Cotiza ya!",
  },
  techo: {
    title: "Techos de Policarbonato y Vidrio Laminado",
    description:
      "Techos de policarbonato y vidrio laminado con perfiles de aluminio. Coberturas sol y sombra resistentes en La Molina y Lima. ¡Solicita tu presupuesto!",
  },
  pvidrio: {
    title: "Puertas de Vidrio Templado a Medida",
    description:
      "Puertas de vidrio templado batientes y corredizas con perfiles de aluminio. Soluciones modernas y elegantes para residencias y locales en Lima. ¡Cotiza hoy!",
  },
  pserie: {
    title: "Puertas de Aluminio Serie 25, 35 y 62",
    description:
      "Puertas de aluminio Serie 25, Serie 35 y Serie 62 con vidrio templado o crudo. Alta durabilidad y aislamiento hermético en La Molina y Lima. ¡Contáctanos hoy!",
  },
  celosias: {
    title: "Celosías de Vidrio y Aluminio para Ventilación",
    description:
      "Celosías de vidrio y aluminio para ventilación natural, privacidad y protección solar en residencias y oficinas de La Molina y Lima. ¡Pide asesoría técnica!",
  },
};

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

/**
 * SEO de la página de detalle: `seoTitle`/`seoDescription` con respaldo enriquecido en `SERVICE_SEO_FALLBACKS`.
 * El título se limpia con `cleanSeoTitle` sin sufijo de marca redundante para evitar duplicación con el layout.
 */
export const getServiceSeo = (service: FirestoreService): ServicePageData["seo"] => {
  const fallback = SERVICE_SEO_FALLBACKS[service.slug];
  const rawTitle = service.seoTitle?.trim() || service.title || fallback?.title || "Servicio de Vidriería y Aluminio";
  const title = cleanSeoTitle(rawTitle);

  const rawDescription = service.seoDescription?.trim();
  const description =
    rawDescription && rawDescription.length >= 90
      ? rawDescription
      : fallback?.description ||
        (service.shortDescription?.trim().length >= 90
          ? service.shortDescription.trim()
          : "Servicios especializados de vidriería y carpintería de aluminio en La Molina y Lima. Fabricación e instalación con la más alta calidad y garantía.");

  return {
    title,
    description,
  };
};

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
