/**
 * @file projectService.ts
 * @description Shared service for managing and retrieving project portfolio data.
 * @module shared/services
 */

import { projects } from "@shared/data/projects";
import { Project } from "@shared/types/project";

/**
 * Returns the list of all projects and their associated data.
 *
 * @returns {Project[]} Array of project objects.
 */
export const getProjects = (): Project[] => {
  return projects;
};

// O(1) Lookup Map for Projects
const projectsByIdMap = new Map<string, Project>(
  projects.map(project => [String(project.id), project])
);

/**
 * Retrieves a single project by its unique identifier.
 *
 * @param {string|number} id - The unique ID of the project to retrieve.
 * @returns {Project|undefined} The project object or undefined if not found.
 */
export const getProjectById = (id: string | number): Project | undefined => {
  return projectsByIdMap.get(String(id));
};
