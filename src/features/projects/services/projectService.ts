/**
 * @file projectService.ts
 * @description Service layer for managing and retrieving project portfolio data (re-exports from shared).
 * @module projects/services
 */

export { getProjects, getProjectById } from "@/shared/services/projectService";
export type { Project, ProjectPhoto } from "@/shared/types/project";
