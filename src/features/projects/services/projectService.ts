/**
 * @file projectService.ts
 * @description Service layer for managing and retrieving project portfolio data.
 * @module projects/services
 */

import { projects } from "../data/projects";

/**
 * Representa la estructura de una imagen de proyecto.
 */
export interface ProjectImage {
  id: number;
  image: string;
  name?: string;
}

/**
 * Representa la estructura de un proyecto individual.
 */
export interface Project {
  id: number;
  image: string;
  residencial: string;
  name: string;
  address: string;
  numdpto: string;
  year: string;
  g_maps: string;
  lat: number;
  lng: number;
  photosObra: ProjectImage[];
}

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
