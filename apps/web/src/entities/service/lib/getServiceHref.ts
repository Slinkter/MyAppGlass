/**
 * @file getServiceHref.ts
 * @description Resuelve el enlace público de un servicio según tenga HTML prerenderizado.
 * @module entities/service/lib
 */

/**
 * Con `output: 'export'` solo existe HTML para los slugs leídos en build
 * (`prerenderedSlugs`, que llegan desde page.tsx). El resto —servicios creados después
 * desde el admin o sin lista de build— se atiende en la ruta cliente
 * `/servicios/ver?slug=...`.
 */
export const getServiceHref = (
  slug: string,
  prerenderedSlugs?: ReadonlySet<string>
): string =>
  prerenderedSlugs?.has(slug)
    ? `/servicios/${slug}`
    : `/servicios/ver?slug=${encodeURIComponent(slug)}`;
