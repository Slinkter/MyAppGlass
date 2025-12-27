import { projects } from "@/data/projects";

/**
 * @file projectService.js
 * @description Capa de servicio para la gestión de datos de proyectos.
 * Abstrae el origen de los datos (actualmente estático, preparado para una futura API).
 */

/**
 * Obtiene la lista de todos los proyectos.
 * Simula una llamada a una API.
 * @returns {Promise<Array>} Una promesa que se resuelve con la lista de proyectos.
 */
export const getProjects = async () => {
    // Simula un pequeño retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Promise.resolve(projects);
};
