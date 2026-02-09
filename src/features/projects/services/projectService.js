/**
 * @file projectService.js
 * @description Servicio para obtener datos de proyectos desde una fuente de datos local.
 */

import { projects } from "@/data/proyectos/palmer";

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
 * Simula la obtención asíncrona de la lista de proyectos.
 * Actualmente, carga los datos desde un archivo local `projects.js`.
 *
 * @returns {Promise<Project[]>} Una promesa que resuelve con un array de objetos de proyectos.
 *
 * @example
 * // Ejemplo de uso para obtener todos los proyectos:
 * import { getProjects } from '@/services/projectService';
 *
 * async function loadProjects() {
 *   try {
 *     const allProjects = await getProjects();
 *     console.log("Proyectos cargados:", allProjects);
 *   } catch (error) {
 *     console.error("Error al cargar proyectos:", error);
 *   }
 * }
 * loadProjects();
 */
export const getProjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return Promise.resolve(projects);
};