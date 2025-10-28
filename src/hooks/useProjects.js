import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '@/features/projects/projectsSlice';

/**
 * @hook useProjects
 * @description Hook personalizado para gestionar la obtención de datos de proyectos.
 * Encapsula la lógica de Redux (dispatch y selectors) y el ciclo de vida para la carga de datos.
 * @returns {{projects: Array<object>, status: string, error: string|null, isLoading: boolean}} Un objeto con la lista de proyectos, el estado de la carga, el error (si existe) y un booleano `isLoading`.
 */
export const useProjects = () => {
    const dispatch = useDispatch();
    const { items: projects, status, error } = useSelector((state) => state.projects);

    useEffect(() => {
        // Solo busca los datos si no se han cargado o están en estado 'idle'.
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [status, dispatch]);

    return { projects, status, error, isLoading: status === 'loading' };
};
