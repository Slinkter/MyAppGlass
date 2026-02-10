/**
 * @file serviceService.js
 * @description Capa de servicio para la gestión de datos de servicios.
 * Proporciona funciones para obtener la lista general de servicios y los datos detallados de páginas de servicio individuales.
 */

import { services } from "../data/services";
import { servicePageDataMap } from "../data/servicePageDataMap";

/**
 * @typedef {Object} Service - Representa un servicio individual en la lista general.
 * @property {number} id - Identificador único del servicio.
 * @property {string} image - Ruta o URL de la imagen principal del servicio.
 * @property {string} name - Nombre del servicio.
 * @property {string} link - Enlace externo relacionado con el servicio (ej. Facebook).
 * @property {string} plink - Enlace interno a la página de detalles del servicio (slug).
 */

/**
 * @typedef {Object} ServicePageSEO
 * @property {string} title - Título para el SEO de la página de servicio.
 * @property {string} description - Descripción para el SEO de la página de servicio.
 */

/**
 * @typedef {Object} ServicePageSystem
 * @property {string} label - Etiqueta del sistema o tipo.
 * @property {React.ElementType} icon - Componente de icono a mostrar.
 */

/**
 * @typedef {Object} ServicePageFeature
 * @property {string} label - Etiqueta de la característica.
 * @property {React.ElementType} icon - Componente de icono a mostrar.
 */

/**
 * @typedef {Object} GalleryImage - Definido en Gallery.jsx y projectService.js, representa un objeto de imagen para galerías.
 * @property {string|number} id - Identificador único de la imagen.
 * @property {string} image - URL o path de la imagen.
 * @property {string} [name] - Nombre opcional de la imagen.
 */

/**
 * @typedef {Object} ServicePageData - Representa los datos detallados de una página de servicio específica.
 * @property {ServicePageSEO} seo - Metadatos SEO para la página de servicio.
 * @property {ServicePageSystem[]} systems - Lista de sistemas o categorías de productos relacionados con el servicio.
 * @property {ServicePageFeature[]} features - Lista de características destacadas del servicio.
 * @property {Array<GalleryImage[]>} imageLists - Array de listas de imágenes para las galerías de la página del servicio.
 */

/**
 * Obtiene la lista de todos los servicios disponibles.
 * Simula una llamada a una API o una operación asíncrona.
 *
 * @returns {Promise<Service[]>} Una promesa que se resuelve con un array de objetos de servicio.
 *
 * @example
 * // Ejemplo de uso para obtener todos los servicios:
 * import { getServices } from '@/services/serviceService';
 *
 * async function fetchAllServices() {
 *   try {
 *     const servicesList = await getServices();
 *     console.log("Servicios disponibles:", servicesList);
 *   } catch (error) {
 *     console.error("Error al cargar servicios:", error);
 *   }
 * }
 * fetchAllServices();
 */
export const getServices = () => {
  return services;
};

/**
 * Obtiene los datos detallados de una página de servicio específica basándose en su 'slug'.
 * Simula una llamada a una API o una operación asíncrona.
 *
 * @param {string} slug - El identificador único (slug) de la página de servicio a obtener.
 * @returns {Promise<ServicePageData>} Una promesa que resuelve con un objeto ServicePageData
 *                                     si la página se encuentra.
 * @throws {Error} Si la página de servicio no se encuentra, la promesa es rechazada con un Error.
 *
 * @example
 * // Ejemplo de uso para obtener los datos de la página de un servicio específico:
 * import { getServicePageData } from '@/services/serviceService';
 *
 * async function fetchServicePage(serviceSlug) {
 *   try {
 *     const pageData = await getServicePageData(serviceSlug);
 *     console.log(`Datos para la página ${serviceSlug}:`, pageData);
 *   } catch (error) {
 *     console.error(`Error al cargar la página ${serviceSlug}:`, error.message);
 *   }
 * }
 * fetchServicePage("ventana"); // Obtener datos para la página de "Ventanas"
 */
export const getServicePageData = async (slug) => {
  const pageData = servicePageDataMap[slug];
  if (!pageData) {
    return Promise.reject(new Error("Página de servicio no encontrada."));
  }
  return Promise.resolve(pageData);
};
