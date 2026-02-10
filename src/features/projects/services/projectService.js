/**
 * @file projectService.js
 * @description Service layer for managing and retrieving project portfolio data.
 * @module projects/services
 */

import { projects } from "../data/projects";

/**
 * @typedef {Object} ProjectImage
 * @property {number} id - Identificador único de la imagen.
 * @property {string} image - Ruta o URL de la imagen.
 * @property {string} [name] - Nombre opcional de la imagen.
 */

/**
 * @typedef {Object} Project - Representa la estructura de un proyecto individual.
 * @property {number} id - Identificador único del proyecto.
 * @property {string} image - Ruta de la imagen principal del proyecto.
 * @property {string} residencial - Nombre del edificio o residencial.
 * @property {string} name - Nombre de la empresa o cliente.
 * @property {string} address - Dirección del proyecto.
 * @property {string} numdpto - Número de departamentos asociados al proyecto.
 * @property {string} year - Año de ejecución del proyecto.
 * @property {string} g_maps - Enlace o dirección de Google Maps del proyecto.
 * @property {ProjectImage[]} photosObra - Array de objetos de imagen de la obra.
 */

/**
 * Returns the list of all projects and their associated data.
 *
 * @returns {Project[]} Array of project objects.
 */
export const getProjects = () => {
  return projects;
};
