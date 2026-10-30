/**
 * @file projectMappers.ts
 * @description Adaptadores entre el modelo Firestore (`Project`) y el modelo de vista.
 * @module projects/hooks
 */

import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import type { Project } from "@shared/types/project";

/**
 * Con `output: 'export'` solo existe HTML para los ids leídos en build
 * (`prerenderedIds`, que llegan desde page.tsx). El resto —proyectos creados después
 * desde el admin o sin lista de build— se atiende en la ruta cliente
 * `/proyectos/ver?id=...`.
 */
export const getProjectHref = (
  id: string | number,
  prerenderedIds?: ReadonlySet<string>
): string =>
  prerenderedIds?.has(String(id))
    ? `/proyectos/${id}`
    : `/proyectos/ver?id=${encodeURIComponent(String(id))}`;

export const toProject = (
  project: FirestoreProject,
  prerenderedIds?: ReadonlySet<string>
): Project => ({
  id: project.id,
  href: getProjectHref(project.id, prerenderedIds),
  image: project.coverImage,
  residencial: project.title,
  name: project.client,
  address: project.location,
  numdpto: project.numdpto,
  g_maps: project.address,
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

/** Más reciente primero (ids numéricos descendentes). */
const compareRecentFirst = (a: Project, b: Project): number => {
  const na = Number(a.id);
  const nb = Number(b.id);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return nb - na;
  return 0; // conserva el orden `createdAt desc` del repositorio
};

export const toProjectList = (
  projects: FirestoreProject[],
  prerenderedIds?: ReadonlySet<string>
): Project[] =>
  projects
    .filter((p) => p.published)
    .map((p) => toProject(p, prerenderedIds))
    .sort(compareRecentFirst);
