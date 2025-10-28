import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeatures } from '@/features/features/featuresSlice';

/**
 * @hook useFeatures
 * @description Hook personalizado para gestionar la obtención de datos de características.
 * Encapsula la lógica de Redux (dispatch y selectors) y el ciclo de vida para la carga de datos.
 * @returns {{features: Array<object>, status: string, error: string|null, isLoading: boolean}} Un objeto con la lista de características, el estado de la carga, el error (si existe) y un booleano `isLoading`.
 */
export const useFeatures = () => {
    const dispatch = useDispatch();
    const { items: features, status, error } = useSelector((state) => state.features);

    useEffect(() => {
        // Solo busca los datos si no se han cargado o están en estado 'idle'.
        if (status === 'idle') {
            dispatch(fetchFeatures());
        }
    }, [status, dispatch]);

    return { features, status, error, isLoading: status === 'loading' };
};
