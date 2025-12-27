import { features, iconMap } from "@/data/features";

/**
 * @file featureService.js
 * @description Capa de servicio para la gestión de datos de características.
 */

/**
 * Obtiene la lista de todas las características.
 * Simula una llamada a una API.
 * @returns {Promise<object>} Una promesa que se resuelve con las características y el mapa de iconos.
 */
export const getFeatures = async () => {
    // Simula un pequeño retraso de red
    await new Promise((resolve) => setTimeout(resolve, 400));
    return Promise.resolve({ features, iconMap });
};
