import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '@/features/clients/clientsSlice';

/**
 * @hook useClients
 * @description Hook personalizado para gestionar la obtención de datos de clientes.
 * Encapsula la lógica de Redux (dispatch y selectors) y el ciclo de vida para la carga de datos.
 * @returns {{clients: Array<object>, status: string, error: string|null, isLoading: boolean}} Un objeto con la lista de clientes, el estado de la carga, el error (si existe) y un booleano `isLoading`.
 */
export const useClients = () => {
    const dispatch = useDispatch();
    const { items: clients, status, error } = useSelector((state) => state.clients);

    useEffect(() => {
        // Solo busca los datos si no se han cargado o están en estado 'idle'.
        if (status === 'idle') {
            dispatch(fetchClients());
        }
    }, [status, dispatch]);

    return { clients, status, error, isLoading: status === 'loading' };
};
