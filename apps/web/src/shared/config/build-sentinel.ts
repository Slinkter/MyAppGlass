/**
 * Slug/id centinela que usa `generateStaticParams` cuando la lectura de Firestore en
 * build no devuelve datos: con `output: 'export'` la ruta dinámica necesita al menos un
 * parámetro. Esa página prerenderizada no trae contenido y resuelve el detalle en el
 * cliente a partir de la URL.
 */
export const BUILD_SENTINEL = "_";
