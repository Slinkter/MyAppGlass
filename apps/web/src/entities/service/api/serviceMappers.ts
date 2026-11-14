/**
 * @file serviceMappers.ts
 * @description Adaptadores entre el modelo Firestore (`Service`) y los modelos de vista.
 * @module services/hooks
 */

import { Check, ChevronRight } from "lucide-react";
import type { Service as FirestoreService } from "@/shared/api/firebase/types";
import type { GalleryItem } from "@/shared/types/gallery";
import type { ServiceListItem, ServicePageData } from "../model";
import { getServiceHref } from "../lib/getServiceHref";
import { cleanSeoTitle } from "@/shared/utils/seo-utils";
import { createGroupMap } from "@/shared/utils/algorithm-utils";

export type { ServiceListItem };
export { getServiceHref };

/**
 * Diccionario canónico de respaldo SEO para servicios oficiales.
 * Respeta reglas de catálogo: Sistema Nova, Serie 20, Serie 25, Serie 35/36, Serie 62;
 * tipos de vidrio (Crudo, Laminado, Templado), ortografía "vidrio y aluminio",
 * y descripciones persuasivas optimizadas de 135 a 158 caracteres para La Molina y Lima.
 */
export const SERVICE_SEO_FALLBACKS: Record<string, { title: string; description: string }> = {
  ventana: {
    title: "Ventana de Aluminio y Vidrio | GYA",
    description:
      "Ventana de aluminio 6063-T5 en Sistema Nova, Series 20, 25, 28, 29, 3825, 3831, 42 y 62 con vidrio crudo, laminado, templado o DVH en La Molina y Lima.",
  },
  mampara: {
    title: "Mampara de Aluminio y Vidrio | GYA",
    description:
      "Mampara corrediza y batiente en aluminio y vidrio templado o laminado. Ensamblaje e instalación a medida en La Molina, Surco, San Borja, San Isidro y Miraflores.",
  },
  ducha: {
    title: "Box de Ducha en Vidrio Templado | GYA",
    description:
      "Box de ducha frontal y esquinero en vidrio templado de 6, 8 y 10 mm con herrajes cromados y sellado perimetral en La Molina y Lima.",
  },
  parapeto: {
    title: "Parapeto de Vidrio y Muro Cortina | GYA",
    description:
      "Parapeto de vidrio templado o laminado y muro cortina Stick o Frame en aluminio 6063-T5/T6 para terrazas y fachadas en Lima.",
  },
  baranda: {
    title: "Baranda de Vidrio y Acero | GYA",
    description:
      "Baranda de vidrio templado o laminado con perfilería de aluminio o accesorios tubulares para escaleras, balcones y terrazas en La Molina y Lima.",
  },
  balcones: {
    title: "Balcón en Vidrio y Aluminio | GYA",
    description:
      "Cerramiento y baranda para balcón en vidrio laminado o templado y perfilería de aluminio con privacidad arenada y control solar en Lima.",
  },
  techo: {
    title: "Techo de Policarbonato y Aluminio | GYA",
    description:
      "Techo sol y sombra en estructura de aluminio 6063-T5 y policarbonato con capa UV, perfiles U, F, H y desagüe pluvial en La Molina y Lima.",
  },
  pvidrio: {
    title: "Puerta de Vidrio Templado | GYA",
    description:
      "Puerta de vidrio templado de 8 y 10 mm con herrajes pivotantes o batientes, freno hidráulico, cerradura y jalador en La Molina y Lima.",
  },
  pserie: {
    title: "Puerta de Aluminio en Serie | GYA",
    description:
      "Puerta batiente de aluminio Serie 35 y Serie 36 con vidrio de 4 a 6 mm, bisagras, chapa, felpa y burlete EPDM en La Molina y Lima.",
  },
  celosias: {
    title: "Celosía de Aluminio y Vidrio | GYA",
    description:
      "Celosía fija o móvil en lamas de aluminio 6063-T5/T6 o paletas de vidrio con clips para control solar y ventilación en La Molina y Lima.",
  },
  espejos: {
    title: "Espejo a Medida | GYA",
    description:
      "Espejo de vidrio flotado con recubrimiento de plata a medida en 3, 4 y 6 mm con montaje flotante o marco de aluminio en La Molina y Lima.",
  },
  "frenos-hidraulicos": {
    title: "Freno Hidráulico para Puerta de Vidrio | GYA",
    description:
      "Freno hidráulico de piso y bisagra aérea para puertas de vidrio templado: suministro, instalación y calibración en La Molina y Lima.",
  },
  mantenimiento: {
    title: "Mantenimiento de Vidrio y Aluminio | GYA",
    description:
      "Mantenimiento preventivo y correctivo para ventana, mampara, puerta y box de ducha: garruchas, felpas, burletes EPDM, brazos y sellado en Lima.",
  },
};

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
          : "Servicios especializados de vidriería y carpintería de aluminio en La Molina y Lima. Suministro, ensamblaje e instalación con la más alta calidad y garantía.");

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

  const validSystems = new Set(service.systems);
  const galleryBySystem = createGroupMap(
    service.gallery.filter((g) => g.system && validSystems.has(g.system)),
    (g) => g.system as string
  );

  const lists = service.systems.map((system) =>
    (galleryBySystem.get(system) || []).map(toItem)
  );

  const loose = service.gallery
    .filter((g) => !g.system || !validSystems.has(g.system))
    .map(toItem);

  const systems = service.systems.filter((_, i) => lists[i].length > 0);
  const imageLists = lists.filter((l) => l.length > 0);
  if (loose.length > 0) imageLists.push(loose);

  return {
    seo: getServiceSeo(service),
    about: {
      title: service.title,
      description: service.fullDescription,
      shortDescription: service.shortDescription,
    },
    coverImage: service.coverImage,
    benefits: service.benefits.map((label) => ({ label, icon: Check })),
    features: service.features.map((label) => ({ label, icon: Check })),
    systems: systems.map((label) => ({ label, icon: ChevronRight })),
    imageLists: imageLists.length > 0 ? imageLists : [[]],
    faqs: service.faqs ?? [],
    specs: service.specs ?? [],
    systemSheets: service.systemSheets ?? [],
  };
};
