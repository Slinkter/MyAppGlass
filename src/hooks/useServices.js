import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '@/features/services/servicesSlice';

/**
 * @hook useServices
 * @description Hook personalizado para gestionar la obtención de datos de servicios.
 * Encapsula la lógica de Redux (dispatch y selectors) y el ciclo de vida para la carga de datos.
 * @returns {{services: Array<object>, status: string, error: string|null, isLoading: boolean}} Un objeto con la lista de servicios, el estado de la carga, el error (si existe) y un booleano `isLoading`.
 */
export const useServices = () => {
    const dispatch = useDispatch();
    const { items: services, status, error } = useSelector((state) => state.services);

    useEffect(() => {
        // Solo busca los datos si no se han cargado o están en estado 'idle'.
        if (status === 'idle') {
            dispatch(fetchServices());
        }
    }, [status, dispatch]);

    return { services, status, error, isLoading: status === 'loading' };
};
