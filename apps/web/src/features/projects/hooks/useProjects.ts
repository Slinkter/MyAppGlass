/**
 * @file useProjects.ts
 * @description Hooks públicos de proyectos: el primer render usa `initialData` (datos de
 * build leídos de Firestore, para el HTML exportado) y luego se refresca desde Firestore
 * en el cliente.
 * @module projects/hooks
 */

import { useMemo } from "react";
import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import {
  getProjects,
  getProjectById,
  getProjectBySlug,
} from "@/shared/api/firebase/projectsRepository";
import {
  useAsyncResource,
  type AsyncResource,
} from "@/shared/hooks/data/useAsyncResource";
import type { Project } from "@shared/types/project";
import { toProject, toProjectList } from "./projectMappers";

/**
 * Proyectos publicados, más recientes primero. `initialData` son los proyectos leídos en
 * build; sus ids son los que tienen HTML prerenderizado (el resto enlaza a `/proyectos/ver?id=`).
 */
export function useProjects(initialData?: FirestoreProject[]): AsyncResource<Project[]> {
  const prerenderedIds = useMemo(
    () => new Set((initialData ?? []).map((p) => String(p.id))),
    [initialData]
  );
  const initialItems = useMemo(
    () =>
      initialData && initialData.length > 0 ? toProjectList(initialData, prerenderedIds) : null,
    [initialData, prerenderedIds]
  );

  return useAsyncResource<Project[]>(
    "projects",
    async () => {
      // Se filtra `published` en cliente para no requerir índice compuesto.
      const all = await getProjects();
      return toProjectList(all, prerenderedIds);
    },
    initialItems
  );
}

/** Proyectos de un servicio (`serviceId` = id/slug del servicio). */
export function useProjectsByService(serviceId: string | undefined): AsyncResource<Project[]> {
  return useAsyncResource<Project[]>(
    `projects:service:${serviceId ?? ""}`,
    async () => toProjectList(await getProjects({ serviceId })),
    undefined,
    Boolean(serviceId)
  );
}

/**
 * Detalle de un proyecto por id de documento (o slug). `initialData` es el proyecto
 * leído en build para ese id.
 * `data === null` y `isLoading === false` significa "no encontrado".
 */
export function useProject(
  id: string | undefined,
  initialData?: FirestoreProject
): AsyncResource<Project> {
  const initialProject = useMemo(
    () =>
      initialData && (initialData.id === id || initialData.slug === id)
        ? { project: toProject(initialData, new Set([String(initialData.id)])) }
        : null,
    [initialData, id]
  );

  const resource = useAsyncResource<{ project: Project | null }>(
    `project:${id ?? ""}`,
    async () => {
      const key = id ?? "";
      const remote = (await getProjectById(key)) ?? (await getProjectBySlug(key));
      // Sin documento o documento oculto desde el admin: no encontrado.
      return { project: remote && remote.published ? toProject(remote) : null };
    },
    initialProject,
    Boolean(id)
  );
  return { ...resource, data: resource.data?.project ?? null };
}
