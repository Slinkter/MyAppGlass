import { services } from "@/data/services";
import { servicePageDataMap } from "@/data/servicePageDataMap";

/**
 * @file serviceService.js
 * @description Capa de servicio para la gestión de datos de servicios.
 */

/**
 * Obtiene la lista de todos los servicios.
 * Simula una llamada a una API.
 * @returns {Promise<Array>} Una promesa que se resuelve con la lista de servicios.
 */
export const getServices = async () => {
    // Simula un pequeño retraso de red
    await new Promise((resolve) => setTimeout(resolve, 100));
    return Promise.resolve(services);
};

/**
 * Obtiene los datos de una página de servicio específica según su slug.
 * Simula una llamada a una API.
 * @param {string} slug - El slug de la página de servicio a obtener.
 * @returns {Promise<object|null>} Una promesa que se resuelve con los datos de la página o null si no se encuentra.
 */
export const getServicePageData = async (slug) => {
    // Simula un pequeño retraso de red
    await new Promise((resolve) => setTimeout(resolve, 200));
    const pageData = servicePageDataMap[slug];
    if (!pageData) {
        return Promise.reject(new Error("Página de servicio no encontrada."));
    }
    return Promise.resolve(pageData);
};
