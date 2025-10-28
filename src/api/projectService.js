/**
 * @file Servicio para la gestión de datos de proyectos.
 * @description Este módulo abstrae el origen de los datos de los proyectos (actualmente un archivo JSON)
 * y proporciona una interfaz consistente para obtenerlos. Sigue el Patrón Repositorio.
 */

/**
 * Obtiene la lista de todos los proyectos.
 * @async
 * @function fetchAllProjects
 * @returns {Promise<Array<object>>} Una promesa que se resuelve con un array de objetos de proyecto.
 * @throws {Error} Si la solicitud de datos falla.
 */
export const fetchAllProjects = async () => {
    try {
        // La lógica de fetch ahora está encapsulada aquí.
        // Si en el futuro migramos a una API, solo se cambia esta parte.
        const response = await fetch('/projects.json');
        if (!response.ok) {
            throw new Error('Failed to fetch local projects data');
        }
        const projects = await response.json();
        return projects;
    } catch (error) {
        // Se relanza el error para que el llamador (el thunk de Redux) pueda manejarlo.
        console.error("Error in projectService.fetchAllProjects:", error);
        throw error;
    }
};
