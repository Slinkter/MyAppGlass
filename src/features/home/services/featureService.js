/**
 * @file featureService.js
 * @description Service layer for retrieving company features and their corresponding icons.
 * @module home/services
 */

import { features, iconMap } from "@/data/features";

// Re-using typedefs from "@/data/features"
/**
 * @typedef {Object} Feature
 * @property {number} id - Unique identifier for the feature.
 * @property {string} heading - The title of the feature.
 * @property {string} iconName - The name of the icon component to be used.
 * @property {string} description - A brief description of the feature.
 */

/**
 * @typedef {Object.<string, React.ElementType>} IconMap - A mapping of icon names (strings) to their corresponding React icon components.
 */

/**
 * @typedef {Object} GetFeaturesReturn
 * @property {Feature[]} features - Un array de objetos, cada uno representando una característica clave.
 * @property {IconMap} iconMap - Un mapeo de nombres de iconos a sus componentes React correspondientes.
 */

/**
 * Obtiene la lista de todas las características y su mapa de iconos.
 * Simula una llamada a una API o una operación asíncrona.
 *
 * @returns {Promise<GetFeaturesReturn>} Una promesa que se resuelve con un objeto que contiene
 *                                        un array de `Feature`s y un `IconMap`.
 *
 * @example
 * // Ejemplo de uso para obtener todas las características:
 * import { getFeatures } from '@/services/featureService';
 *
 * async function loadFeatures() {
 *   try {
 *     const { features, iconMap } = await getFeatures();
 *     console.log("Características cargadas:", features);
 *     console.log("Mapa de iconos:", iconMap);
 *     // Usar los datos para renderizar características con sus iconos
 *   } catch (error) {
 *     console.error("Error al cargar características:", error);
 *   }
 * }
 * loadFeatures();
 */
export const getFeatures = () => {
  return { features, iconMap };
};
