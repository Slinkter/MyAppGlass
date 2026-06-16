# Plan de Trabajo — Optimización SEO Completa

## Objetivo
Actualizar y optimizar el SEO completo del sitio web de **Glass & Aluminum Company S.A.C.** (Next.js 16 + Chakra UI v3): corregir metadata, structured data, nombres de empresa, sitemap y robots.txt para correcta indexación en Google.

---

## Fase 1 — Metadata de Servicios (`servicePageDataMap.ts`)
**Archivo:** `src/features/services/data/servicePageDataMap.ts`

Actualizar `seo.title` y `seo.description` de los 10 servicios con contenido profesional usando terminología de vidriería y aluminio.

| Servicio | Slug |
|---|---|
| Ventanas Antirruido | `ventana` |
| Mamparas de Baño | `mampara` |
| Boxes de Ducha | `ducha` |
| Parapetos de Vidrio | `parapeto` |
| Barandas de Vidrio Templado | `baranda` |
| Balcones de Vidrio | `balcones` |
| Techos de Policarbonato | `techo` |
| Puertas de Vidrio Templado | `pvidrio` |
| Puertas Enrollables de Aluminio | `pserie` |
| Celosías de Aluminio | `celosias` |

---

## Fase 2 — Conectar `generateMetadata` con SEO Data Real
**Archivo:** `src/app/servicios/[serviceSlug]/page.tsx`

Actualmente `generateMetadata` genera títulos genéricos como `"${service.name} | GYA Glass & Aluminum"`. Debe usar `servicePageDataMap[serviceSlug].seo` para obtener title/description reales.

---

## Fase 3 — Metadata de Páginas Estáticas
Actualizar title y description de las siguientes páginas con el nombre correcto de la empresa:

| Archivo | Acción |
|---|---|
| `src/app/page.tsx` | Actualizar title y description |
| `src/app/proyectos/page.tsx` | Actualizar title y description |
| `src/app/blog/page.tsx` | Actualizar title y description |
| `src/app/contacto/page.tsx` | Separar server/client para poder exportar `metadata` |
| `src/app/cuentas-bancarias/page.tsx` | Actualizar title y description |
| `src/app/politicas-empresa/page.tsx` | Actualizar title y description |
| `src/app/libro-de-reclamacion/page.tsx` | Actualizar title y description |

---

## Fase 4 — Unificar Nombre de Empresa
Actualizar todas las referencias a "GYA Company" por "Glass & Aluminum Company S.A.C.":

| Archivo | Cambio |
|---|---|
| `src/shared/utils/seo-utils.ts` | `WebSite.name`: `"GYA Company"` → `"Glass & Aluminum Company S.A.C."` |
| `src/shared/utils/seo-utils.ts` | `LocalBusiness.name`: limpiar duplicado |
| `src/shared/utils/seo-utils.ts` | `getServiceJsonLd` provider name |
| `src/app/layout.tsx` | `openGraph.siteName`: `"GYA Company"` → `"Glass & Aluminum Company S.A.C."` |
| `src/app/layout.tsx` | `authors`: `"GYA Company"` → `"Glass & Aluminum Company S.A.C."` |

---

## Fase 5 — Sitemap y Robots.txt
Crear archivos faltantes para indexación correcta:

| Archivo | Propósito |
|---|---|
| `src/app/sitemap.ts` | Generar sitemap dinámico con todas las rutas del sitio |
| `src/app/robots.ts` | Configurar crawling y referenciar sitemap |

---

## Fase 6 — Build Final
Ejecutar `pnpm run build` y verificar que las 36/36 rutas compilen sin errores.
