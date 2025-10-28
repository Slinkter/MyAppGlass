import { projects } from "@/data/projects";

/**
 * @hook useProjects
 * @description Hook personalizado para obtener los datos de los proyectos de forma síncrona.
 * @returns {{projects: Array<object>}} Un objeto con la lista de proyectos.
 */
export const useProjects = () => {
    return { projects };
};
