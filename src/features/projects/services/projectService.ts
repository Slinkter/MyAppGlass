/**
 * @file projectService.ts
 * @description Service layer for managing and retrieving project portfolio data.
 * @module projects/services
 */

import { projects, Project as DataProject, ProjectPhoto as DataProjectPhoto } from "../data/projects";

/**
 * Representa la estructura de una imagen de proyecto.
 */
export type ProjectPhoto = DataProjectPhoto;

/**
 * Representa la estructura de un proyecto individual.
 */
export type Project = DataProject;

/**
 * Returns the list of all projects and their associated data.
 *
 * @returns {Project[]} Array of project objects.
 */
export const getProjects = (): Project[] => {
  return projects as Project[];
};

/**
 * Retrieves a single project by its unique identifier.
 *
 * @param {string|number} id - The unique ID of the project to retrieve.
 * @returns {Project|undefined} The project object or undefined if not found.
 */
export const getProjectById = (id: string | number): Project | undefined => {
  return (projects as Project[]).find((project) => String(project.id) === String(id));
};
