/**
 * @file seedData.ts
 * @description Módulo de migración y seeding idempotente para poblar Firestore con los servicios y proyectos locales.
 *
 * Cumple con:
 * - Idempotencia (búsqueda y verificación por `slug` o `id`).
 * - Tipos estrictos y validación mediante `CreateServiceSchema` y `CreateProjectSchema`.
 * - Reglas de negocio:
 *   - "antirruido" (doble 'r').
 *   - "vidrio y aluminio" (en singular).
 *   - Razón social oficial: "GLASS & ALUMINUM COMPANY S.A.C.".
 *   - Catálogo oficial de ventanas: Sistemas Nova, Serie 25, Serie 35, Serie 62 (sin series inexistentes).
 */

import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";
import {
  CreateServiceSchema,
  CreateProjectSchema,
  type CreateServiceInput,
  type CreateProjectInput,
} from "./types";
import { services as localServices } from "@/features/services/data/services";
import { servicePageDataMap } from "@/features/services/data/servicePageDataMap";
import { projects as localProjects } from "@/shared/data/projects";
import { companyData } from "@/shared/config/company-data";

// Colecciones oficiales
const SERVICES_COLLECTION = "services";
const PROJECTS_COLLECTION = "projects";

/**
 * Normaliza textos según las reglas inmutables de negocio:
 * 1. "antirruido" (reemplaza 'antiruido' con 'antirruido')
 * 2. "vidrio y aluminio" (en singular)
 * 3. Razón social: GLASS & ALUMINUM COMPANY S.A.C.
 */
export const sanitizeBusinessCopy = (text: string): string => {
  if (!text) return "";
  return text
    // Regla antirruido
    .replace(/antiruido/gi, (match) =>
      match === match.toUpperCase()
        ? "ANTIRRUIDO"
        : match[0] === match[0].toUpperCase()
        ? "Antirruido"
        : "antirruido"
    )
    // Regla vidrio y aluminio en singular
    .replace(/vidrios y aluminios/gi, "vidrio y aluminio")
    .replace(/Vidrios y Aluminios/g, "Vidrio y Aluminio")
    .replace(/vidrios/gi, (match) =>
      match.toLowerCase() === "vidrios" ? (match[0] === "V" ? "Vidrio" : "vidrio") : match
    )
    // Reemplazo de variantes de series obsoletas (ej. Serie 31 por Serie 35)
    .replace(/Serie 31/gi, "Serie 35");
};

/**
 * Transforma los servicios del frontend en inputs listos para Firestore
 */
export const buildServiceSeedData = (): CreateServiceInput[] => {
  return localServices.map((srv, index) => {
    const slug = srv.plink.replace("/servicios/", "").trim();
    const pageData = servicePageDataMap[slug];

    // Extraer beneficios y características del layout detallado si existen
    const features = pageData?.features
      ? pageData.features.map((f) => sanitizeBusinessCopy(f.label))
      : [];

    const systems = pageData?.systems
      ? pageData.systems.map((s) => sanitizeBusinessCopy(s.label))
      : [];

    const benefits = pageData?.benefits
      ? pageData.benefits.map((b) => sanitizeBusinessCopy(b.label))
      : [];

    // Extraer items de galería estructurados
    const galleryItems =
      pageData?.imageLists?.flat().map((img, imgIdx) => ({
        id: `gal-${slug}-${img.id ?? imgIdx}`,
        url: img.src,
        alt: sanitizeBusinessCopy(img.title || `${srv.name} ${imgIdx + 1}`),
      })) || [];

    const shortDesc = sanitizeBusinessCopy(
      srv.description || `${srv.name} de alta calidad fabricadas por ${companyData.razonSocial}.`
    );

    const fullDesc = sanitizeBusinessCopy(
      pageData?.about?.description ||
        pageData?.seo?.description ||
        shortDesc
    );

    const title = sanitizeBusinessCopy(srv.name);

    return CreateServiceSchema.parse({
      id: slug, // Usamos el slug como id determinista del documento
      slug,
      title,
      category: srv.category,
      shortDescription: shortDesc,
      fullDescription: fullDesc,
      features,
      systems,
      benefits,
      coverImage: srv.image,
      gallery: galleryItems,
      order: index + 1,
      published: true,
    });
  });
};

/**
 * Transforma los proyectos del frontend en inputs listos para Firestore
 */
export const buildProjectSeedData = (): CreateProjectInput[] => {
  return localProjects.map((proj) => {
    const slug = `proyecto-${proj.id}-${proj.residencial
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`;

    const clientName = sanitizeBusinessCopy(
      proj.name || companyData.razonSocial
    );

    const title = sanitizeBusinessCopy(proj.residencial.trim());
    const location = sanitizeBusinessCopy(proj.address.trim());

    // Mapeo de fotos de obra
    const gallery =
      proj.photosObra?.map((p, pIdx) => ({
        id: `p-${proj.id}-${p.id ?? pIdx}`,
        url: p.image,
        caption: sanitizeBusinessCopy(p.name || `${title} - Detalle de obra`),
      })) || [];

    // Determinamos servicio asociado sugerido
    const serviceId = "ventana"; // Servicio ancla para proyectos residenciales

    const description = sanitizeBusinessCopy(
      `Instalación y cerramientos para ${title} (${location}), ejecutado para ${clientName} en ${proj.year}. Respaldado por ${companyData.razonSocial}.`
    );

    return CreateProjectSchema.parse({
      id: String(proj.id),
      slug,
      title,
      client: clientName,
      location,
      address: proj.g_maps || proj.address,
      serviceId,
      description,
      coverImage: proj.image,
      gallery,
      completedAt: proj.year,
      numdpto: proj.numdpto,
      lat: proj.lat ?? null,
      lng: proj.lng ?? null,
      published: true,
    });
  });
};

export interface SeedResult {
  servicesInserted: number;
  servicesSkipped: number;
  projectsInserted: number;
  projectsSkipped: number;
  errors: string[];
}

/**
 * Ejecuta el proceso de seeding en Firestore de manera idempotente.
 * No sobrescribe ni duplica documentos existentes con el mismo slug/id.
 */
export const seedDatabase = async (forceOverwrite = false): Promise<SeedResult> => {
  const result: SeedResult = {
    servicesInserted: 0,
    servicesSkipped: 0,
    projectsInserted: 0,
    projectsSkipped: 0,
    errors: [],
  };

  logger.info("Iniciando proceso de seeding en Firestore...", {
    company: companyData.razonSocial,
    forceOverwrite,
  });

  try {
    // ----------------------------------------------------
    // 1. SEED DE SERVICIOS
    // ----------------------------------------------------
    const servicesToSeed = buildServiceSeedData();
    const servicesRef = collection(db, SERVICES_COLLECTION);
    const existingServicesSnap = await getDocs(servicesRef);
    const existingServiceSlugs = new Set(
      existingServicesSnap.docs.map((d) => d.data().slug || d.id)
    );

    const servicesBatch = writeBatch(db);
    let servicesBatchCount = 0;

    for (const srv of servicesToSeed) {
      const exists = existingServiceSlugs.has(srv.slug);

      if (exists && !forceOverwrite) {
        result.servicesSkipped++;
        logger.info(`Servicio omitido (ya existe): ${srv.slug}`);
        continue;
      }

      const docRef = doc(servicesRef, srv.id || srv.slug);
      servicesBatch.set(
        docRef,
        {
          ...srv,
          updatedAt: serverTimestamp(),
          ...(exists ? {} : { createdAt: serverTimestamp() }),
        },
        { merge: true }
      );

      servicesBatchCount++;
      result.servicesInserted++;
    }

    if (servicesBatchCount > 0) {
      await servicesBatch.commit();
      logger.info(`Lote de ${servicesBatchCount} servicios persistido exitosamente en Firestore.`);
    }

    // ----------------------------------------------------
    // 2. SEED DE PROYECTOS
    // ----------------------------------------------------
    const projectsToSeed = buildProjectSeedData();
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const existingProjectsSnap = await getDocs(projectsRef);
    const existingProjectSlugs = new Set(
      existingProjectsSnap.docs.map((d) => d.data().slug || d.id)
    );

    const projectsBatch = writeBatch(db);
    let projectsBatchCount = 0;

    for (const proj of projectsToSeed) {
      const exists =
        existingProjectSlugs.has(proj.slug) ||
        (proj.id && existingProjectsSnap.docs.some((d) => d.id === proj.id));

      if (exists && !forceOverwrite) {
        result.projectsSkipped++;
        logger.info(`Proyecto omitido (ya existe): ${proj.slug}`);
        continue;
      }

      const docRef = doc(projectsRef, proj.id || proj.slug);
      projectsBatch.set(
        docRef,
        {
          ...proj,
          updatedAt: serverTimestamp(),
          ...(exists ? {} : { createdAt: serverTimestamp() }),
        },
        { merge: true }
      );

      projectsBatchCount++;
      result.projectsInserted++;
    }

    if (projectsBatchCount > 0) {
      await projectsBatch.commit();
      logger.info(`Lote de ${projectsBatchCount} proyectos persistido exitosamente en Firestore.`);
    }

    logger.info("Proceso de seeding completado exitosamente", result);
    return result;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    result.errors.push(errorMsg);
    logger.error("Error crítico durante el seeding de Firestore", error);
    return result;
  }
};
