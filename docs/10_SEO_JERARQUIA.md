# Jerarquía SEO de rutas y títulos

> **Estado:** implementada con `buildPageMetadata()` y `cleanSeoTitle()` en `apps/web/src/shared/utils/seo-utils.ts`. La fuente de los títulos de servicio es Firestore, con fallback en `SERVICE_SEO_FALLBACKS` (`apps/web/src/features/services/hooks/serviceMappers.ts`).
> **No duplicar aquí el copy final:** las páginas y Firestore mandan. Este documento fija la jerarquía y las reglas.

## 1. Rutas y prioridad

| Ruta | Título base (el template añade `\| Glass & Aluminum Company S.A.C.`) | Prioridad | Rol |
|---|---|---|---|
| `/` | Vidriería en La Molina \| Ventanas Antirruido y Mamparas | `1.0` | Raíz |
| `/servicios/[serviceSlug]` | Título propio del servicio | `0.9` | Sitelinks de servicio |
| `/presupuesto` | Cotizador de Presupuestos de Vidrio y Aluminio Online | `0.9` | Conversión |
| `/contacto` | Cotizaciones y Contacto en La Molina, Lima | `0.9` | Contacto |
| `/simulador-ai` | Simulador Visual de Ventanas y Mamparas en Tu Espacio | `0.8` | Herramienta |
| `/blog` | Blog Técnico de Vidriería, Aluminio y Aislamiento Acústico | `0.8` | Autoridad |
| `/blog/[slug]` | Título del artículo | `0.7` | Contenido |
| `/vidrieria/[distrito]` | `Vidriería y aluminio en <Distrito>` | — | Landing local (aún fuera del sitemap) |
| `/proyectos/[projectId]` | `<Proyecto> en <Ubicación>` | `0.75` | Prueba de obra |
| `/cuentas-bancarias` | Cuentas Bancarias Oficiales | `0.4` | Legal |
| `/libro-de-reclamacion` | Libro de Reclamaciones Virtual | `0.4` | Legal |
| `/politicas-empresa` | Políticas de la Empresa y Garantías | `0.3` | Legal |

**Estado de las landings locales:** existen 3 de las 5 (`/vidrieria/surco`, `/vidrieria/san-borja` y `/vidrieria/miraflores`, en `apps/web/src/features/local-landings/data/distritos.ts`). Faltan La Molina y San Isidro, y ninguna está todavía en `sitemap.ts`. Se cierra en el Lote 0 y el Lote 3 de `docs/marca/PROPUESTA-MEJORAS.md`.

## 2. Reglas de título y metadescripción

- Un solo `<title>` por página; `buildPageMetadata()` aplica el sufijo de marca una sola vez.
- Metadescripción de 135 a 158 caracteres, escrita para la persona y sin repetir el título.
- Canónica siempre en `https://www.gyacompany.com`; sin parámetros ni duplicados.
- `og:image` y `twitter:image` se resuelven con `resolveSeoImageUrl()`.
- Las rutas privadas y shells CSR (`/admin/**`, `/auth`, `/design-system*`, `/servicios/ver`, `/proyectos/ver`, 404) llevan `noindex`.

## 3. Reglas de copy

- Trato de usted; tono técnico y concreto.
- Nombre completo «Glass & Aluminum Company S.A.C.»; nunca nombres cortos.
- Sin «líderes», «premium», «los mejores» ni certificaciones que no existan.
- La empresa **ensambla e instala**; no se presenta como fabricante.
- Los porcentajes de reducción de ruido son referenciales y se escriben como tales.
- La cobertura es de cinco distritos; no se dice «todo Lima».

## 4. Dónde se implementa

| Pieza | Archivo |
|---|---|
| Metadatos y JSON-LD | `apps/web/src/shared/utils/seo-utils.ts` |
| Sitemap e Image Sitemap | `apps/web/src/app/sitemap.ts` |
| Reglas de rastreo | `apps/web/src/app/robots.ts` |
| Títulos de servicio y fallbacks | `apps/web/src/features/services/hooks/serviceMappers.ts` |
| Verificación y auditoría técnica | `docs/14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md` |
| Configuración externa (GBP, GSC, GA4) | `docs/11_MANUAL_SEO_LOCAL.md` |
