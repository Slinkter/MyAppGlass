import { features } from "@/data/features";

/**
 * @hook useFeatures
 * @description Hook personalizado para obtener los datos de las características de forma síncrona.
 * @returns {{features: Array<object>, isLoading: boolean, error: null}} Un objeto con la lista de características, y estados de carga/error para compatibilidad con DataLoader.
 */
export const useFeatures = () => {
    return { features, isLoading: false, error: null };
};
