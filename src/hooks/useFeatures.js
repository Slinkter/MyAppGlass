import { features } from "@/data/features";

/**
 * @hook useFeatures
 * @description Hook personalizado para obtener los datos de las características de forma síncrona.
 * @returns {{features: Array<object>}} Un objeto con la lista de características.
 */
export const useFeatures = () => {
    return { features };
};
