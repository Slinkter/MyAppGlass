import { services } from "@/data/services";

/**
 * @hook useServices
 * @description Hook personalizado para obtener los datos de los servicios de forma síncrona.
 * @returns {{services: Array<object>}} Un objeto con la lista de servicios.
 */
export const useServices = () => {
    return { services };
};
