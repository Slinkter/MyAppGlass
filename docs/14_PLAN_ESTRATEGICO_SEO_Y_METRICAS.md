# SEO técnico y métricas

> **Estado:** implementado y verificado en el export estático. Este documento describe la arquitectura vigente y los puntos de auditoría; ya no es un plan por fases.
> **Alcance:** SEO técnico, datos estructurados, rastreo y analítica. La jerarquía de rutas está en `10_SEO_JERARQUIA.md`; la configuración externa de Google, en `11_MANUAL_SEO_LOCAL.md`.

## 1. Qué está implementado

| Pieza | Archivo | Qué hace |
|---|---|---|
| Metadatos | `apps/web/src/shared/utils/seo-utils.ts` | `buildPageMetadata()`, `cleanSeoTitle()`, `resolveSeoImageUrl()`; canónica, Open Graph y Twitter por página |
| JSON-LD | `apps/web/src/shared/utils/seo-utils.ts` | `@graph` con `WebSite`, `LocalBusiness`/`HomeAndConstructionBusiness` e `ItemList` de `SiteNavigationElement`; además `Service`, `CreativeWork`, `WebApplication`, `BreadcrumbList` y `FAQPage` |
| Sitemap | `apps/web/src/app/sitemap.ts` | Sitemap dinámico con servicios, blog, proyectos e Image Sitemap; escapa entidades XML de Firebase Storage |
| Rastreo | `apps/web/src/app/robots.ts` | Permite `/_next/`, bloquea rutas privadas y shells CSR, habilita bots de búsqueda con IA y bloquea `Bytespider` |
| Manifest | `apps/web/src/app/manifest.ts` | Web App Manifest estático (`es-PE`) |
| Analítica | `apps/web/src/shared/lib/analytics.ts` · `GoogleMetricsProvider.tsx` | GA4 `G-TY0NJP1S81`, GTM opcional (`NEXT_PUBLIC_GTM_ID`), `page_view` en navegación SPA |
| Enlazado interno | `apps/web/src/widgets/Footer/Footer.tsx` | Enlaces semánticos a las rutas principales y NAP visible |

## 2. Invariantes del proyecto

1. **Export estático (`output: 'export'`).** No hay servidor Next.js en runtime. `sitemap.ts`, `robots.ts` y `manifest.ts` deben ser estáticos; no se usan headers, cookies ni middleware SSR.
2. **SSG + CSR para Firestore.** Durante el build, `apps/web/src/shared/api/firebase/publicRest.ts` consulta Firestore y `generateStaticParams()` prerenderiza servicios y proyectos publicados. Si un documento se crea después del build, la tarjeta redirige al shell CSR `/servicios/ver` o `/proyectos/ver`, que llevan `noindex, follow`.
3. **Build tolerante a fallos de red.** `BUILD_SENTINEL = "__placeholder__"` evita romper el build si Firestore no responde.
4. **JSON-LD seguro.** Todo bloque usa `serializeJsonLd()`, que escapa `<`, `\u2028` y `\u2029`. No se inyecta `JSON.stringify()` directo.
5. **Datos oficiales.** Dirección `Av. Los Fresnos 1250 - La Molina`, WhatsApp `974 278 303`, correo `acueva@gyacompany.com`. No se publica el teléfono secundario ni la ficha RUC de 2022.

## 3. Correcciones aplicadas

| Problema | Solución |
|---|---|
| XML inválido en `<image:loc>` por `&` sin escapar | `toSitemapImageUrl()` convierte a absolutas y escapa `&`, `<`, `>`, `"` y `'` |
| Pérdida de `og:image` en páginas hijas al reemplazar `openGraph` | `buildPageMetadata()` siempre declara `openGraph.images` y `twitter.images` |
| Sufijo de marca duplicado en `<title>` | `cleanSeoTitle()` retira variantes del sufijo antes de aplicar el template |
| `page_view` con el título anterior en navegación SPA | `GoogleMetricsProvider` difiere la lectura de `document.title` con `setTimeout(..., 0)` |

## 4. Auditoría recomendada

1. **XML:** validar `apps/web/out/sitemap.xml` con un parser estricto.
2. **Indexación:** ninguna página pública con `noindex`; las rutas privadas y shells sí lo llevan.
3. **CSP:** revisar en `firebase.json` que los orígenes de Firebase, reCAPTCHA, Maps y GA4/GTM estén cubiertos sin comodines inseguros.
4. **Datos estructurados:** pasar `getCompanyJsonLd()`, `getServiceJsonLd()`, `getProjectJsonLd()` y `getWebAppJsonLd()` por Rich Results Test.
5. **NAP:** contrastar web, JSON-LD, footer y Google Business Profile con `companyData`.
6. **Métricas:** comprobar en GA4 los eventos de WhatsApp, presupuesto enviado y llamada; la línea base se registra en `docs/PENDIENTES.md`.

## 5. Límites

- El SEO no garantiza posiciones: se mide con Search Console y GA4.
- Los volúmenes de búsqueda no se inventan; se validan con Keyword Planner antes de priorizar contenido.
- El contenido nuevo depende de la aprobación de páginas por lote y de las fotos de obra.
