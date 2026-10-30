/**
 * @file useProjects.ts
 * @description Hooks públicos de proyectos: leen Firestore en el cliente y caen a los
 * datos locales si falla, expira o no hay documentos.
 * @module projects/hooks
 */

import {
  getProjects,
  getProjectById,
  getProjectBySlug,
} from "@/shared/api/firebase/projectsRepository";
import {
  useAsyncResource,
  type AsyncResource,
} from "@/shared/hooks/data/useAsyncResource";
import { getProjectById as getLocalProjectById } from "@shared/services/projectService";
import type { Project } from "@shared/types/project";
import {
  getLocalProjectList,
  toProject,
  toProjectList,
} from "./projectMappers";

/** Proyectos publicados, más recientes primero. */
export function useProjects(): AsyncResource<Project[]> {
  return useAsyncResource<Project[]>(
    "projects",
    async () => {
      // Se filtra `published` en cliente para no requerir índice compuesto.
      const all = await getProjects();
      return all.length === 0 ? null : toProjectList(all);
    },
    getLocalProjectList
  );
}

/**
 * Proyectos de un servicio (`serviceId` = id/slug del servicio).
 * El fallback local no asocia servicios, por lo que devuelve la lista completa.
 */
export function useProjectsByService(serviceId: string | undefined): AsyncResource<Project[]> {
  return useAsyncResource<Project[]>(
    `projects:service:${serviceId ?? ""}`,
    async () => {
      const all = await getProjects({ serviceId });
      return all.length === 0 ? null : toProjectList(all);
    },
    getLocalProjectList,
    Boolean(serviceId)
  );
}

/**
 * Detalle de un proyecto por id de documento (o slug).
 * `data === null` y `isLoading === false` significa "no encontrado".
 */
export function useProject(id: string | undefined): AsyncResource<Project> {
  const resource = useAsyncResource<{ project: Project | null }>(
    `project:${id ?? ""}`,
    async () => {
      const key = id ?? "";
      const remote = (await getProjectById(key)) ?? (await getProjectBySlug(key));
      if (!remote) return null; // sin documento: usar local
      return { project: remote.published ? toProject(remote) : null };
    },
    () => {
      const project = (id && getLocalProjectById(id)) || null;
      return project ? { project } : null; // null: id solo en Firestore, queda en carga
    },
    Boolean(id)
  );
  return { ...resource, data: resource.data?.project ?? null };
}
