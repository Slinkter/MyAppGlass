/**
 * @file Módulo para la carga dinámica de imágenes de servicios.
 * @description Utiliza import.meta.glob de Vite para importar dinámicamente todas las imágenes
 * de la carpeta de servicios y crea un mapa para acceder a ellas por su nombre de archivo.
 * Esto permite mantener los assets en /src mientras se cargan dinámicamente desde un JSON.
 */

// Importa todas las imágenes de la carpeta, las carga inmediatamente (eager: true)
// y nos da su URL pública procesada (as: 'url').
const serviceImageModules = import.meta.glob('@/assets/webService/general/*.{jpg,png,jpeg,svg}', {
    eager: true,
    as: 'url'
});

/**
 * Un mapa que asocia el nombre de archivo de una imagen con su URL pública final.
 * Ej: { 'init01.jpg': '/assets/init01.a1b2c3d4.jpg' }
 */
const imageUrlMap = Object.keys(serviceImageModules).reduce((map, path) => {
    // Extrae el nombre del archivo de la ruta completa (ej. 'init01.jpg')
    const fileName = path.split('/').pop();
    map[fileName] = serviceImageModules[path];
    return map;
}, {});

/**
 * Obtiene la URL pública y procesada de una imagen de servicio por su nombre de archivo.
 * @param {string} imageName - El nombre del archivo de la imagen (ej. 'init01.jpg').
 * @returns {string} La URL pública hasheada de la imagen, o una cadena vacía si no se encuentra.
 */
export const getServiceImageUrl = (imageName) => {
    return imageUrlMap[imageName] || '';
};
