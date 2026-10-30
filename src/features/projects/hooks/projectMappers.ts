/**
 * @file projectMappers.ts
 * @description Adaptadores entre el modelo Firestore (`Project`) y el modelo de vista local.
 * @module projects/hooks
 */

import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import type { Project } from "@shared/types/project";
import { getProjects as getLocalProjects } from "@shared/services/projectService";

/** Ids prerenderizados en el export estático (generateStaticParams). */
const prerenderedIds = new Set(getLocalProjects().map((p) => String(p.id)));

/**
 * Los proyectos locales tienen HTML estático; los creados desde el admin se atienden en
 * la ruta cliente `/proyectos/ver?id=...` (necesario con `output: 'export'`).
 */
export const getProjectHref = (id: string | number): string =>
  prerenderedIds.has(String(id))
    ? `/proyectos/${id}`
    : `/proyectos/ver?id=${encodeURIComponent(String(id))}`;

export const toProject = (project: FirestoreProject): Project => ({
  id: project.id,
  image: project.coverImage,
  residencial: project.title,
  name: project.client,
  address: project.location,
  numdpto: project.numdpto,
  year: project.completedAt ?? "",
  lat: project.lat ?? null,
  lng: project.lng ?? null,
  serviceId: project.serviceId,
  photos: project.gallery.map((g) => ({
    id: g.id,
    src: g.url,
    title: g.caption || project.title,
  })),
});

/** Ordena como la lista local: más reciente primero (ids numéricos descendentes). */
const compareRecentFirst = (a: Project, b: Project): number => {
  const na = Number(a.id);
  const nb = Number(b.id);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return nb - na;
  return 0; // conserva el orden `createdAt desc` del repositorio
};

export const toProjectList = (projects: FirestoreProject[]): Project[] =>
  projects.filter((p) => p.published).map(toProject).sort(compareRecentFirst);

export const getLocalProjectList = (): Project[] => [...getLocalProjects()].reverse();
