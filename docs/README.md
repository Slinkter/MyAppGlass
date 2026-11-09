# Documentación — MyAppGlass

**Glass & Aluminum Company S.A.C.** · Next.js 16 (export estático, FSD) + Firebase Functions v2 + Firestore. Las reglas para agentes de IA están en `AGENTS.md` (raíz). Este índice se mantiene corto: si un documento no figura aquí, es histórico.

## Empieza aquí

| Documento | Para qué sirve |
|---|---|
| [`PENDIENTES.md`](./PENDIENTES.md) | **Única lista viva** de trabajo abierto y de quién lo resuelve |
| [`01_ARCHITECTURE.md`](./01_ARCHITECTURE.md) | Capas FSD, rutas y flujo de datos |
| [`06_DOCS_DEVELOPMENT.md`](./06_DOCS_DEVELOPMENT.md) | Comandos, flujo de validación, commit y despliegue manual |
| [`02_AI_HANDOFF.md`](./02_AI_HANDOFF.md) | Estado canónico del proyecto para el siguiente agente |
| [`05_CHANGELOG.md`](./05_CHANGELOG.md) | Historial de cambios |
| [`../apps/web/DESIGN.md`](../apps/web/DESIGN.md) | **Sistema de diseño único** (color, tipografía, componentes, estados); datos auxiliares en `apps/web/.impeccable/design.json` |
| [`../apps/web/PRODUCT.md`](../apps/web/PRODUCT.md) | Producto: usuarios, posicionamiento, restricciones y decisiones del dueño |

## Planes en curso

| Documento | Alcance |
|---|---|
| [`20_PLAN_TRABAJO_ANALISIS_FASES.md`](./20_PLAN_TRABAJO_ANALISIS_FASES.md) | Calidad, seguridad, CI, SEO y deuda técnica (fases 0 a 6) |
| [`21_PLAN_FLUJO_PRESUPUESTO.md`](./21_PLAN_FLUJO_PRESUPUESTO.md) | Flujo de presupuesto del usuario en `/presupuesto` |
| [`22_PLAN_RENDIMIENTO_WEB.md`](./22_PLAN_RENDIMIENTO_WEB.md) | Rendimiento web, imágenes y métricas |
| [`24_PLAN_NAVBAR_MOVIL.md`](./24_PLAN_NAVBAR_MOVIL.md) | Rediseño estructural de la navbar y el menú móvil |
| [`25_PLAN_MIGRACION_DISENO.md`](./25_PLAN_MIGRACION_DISENO.md) | Migración del código al sistema de diseño único (`apps/web/DESIGN.md`), en 8 fases con checklist |

## Backend y seguridad

| Documento | Contenido |
|---|---|
| [`07_BACKEND_IMPLEMENTATION.md`](./07_BACKEND_IMPLEMENTATION.md) | Libro de reclamaciones y contacto (Cloud Functions) |
| [`08_DOCS_SECURITY_BACKEND.md`](./08_DOCS_SECURITY_BACKEND.md) | Seguridad e infraestructura |
| [`api/`](./api/README.md) | Contrato OpenAPI de `submitReclamo`, `submitContacto` y `checkStatus` (se genera con `pnpm run contract:generate`) |

## SEO

| Documento | Contenido |
|---|---|
| [`14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md`](./14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md) | Plan maestro: SEO técnico, sitelinks y métricas |
| [`09_PLAN_SEO_CONTENIDOS.md`](./09_PLAN_SEO_CONTENIDOS.md) | Copywriting y estrategia de contenidos |
| [`10_SEO_JERARQUIA.md`](./10_SEO_JERARQUIA.md) | Jerarquía SEO recomendada |
| [`11_MANUAL_SEO_LOCAL.md`](./11_MANUAL_SEO_LOCAL.md) | SEO local, Search Console, Google Business Profile y GA4 |

## Marca y presupuestos

| Ruta | Contenido |
|---|---|
| [`gya/`](./gya/README.md) | Conceptos de hoja de presupuesto, 4 casos reales y datos de referencia (la marca está en `apps/web/DESIGN.md`) |

## Referencia

| Ruta | Contenido |
|---|---|
| [`03_AGENTS.md`](./03_AGENTS.md) | Roles de agentes de IA del equipo |
| [`SKILLS.md`](./SKILLS.md) | Skills instaladas |
| [`archivo/`](./archivo/) | Planes archivados con estado desactualizado (04, 12 y 13) |
| [`_material/diplomado/`](./_material/diplomado/README.md) | Material del diplomado (aprendizaje y portafolio; no es plan de producto) |

## Recuperar un documento borrado

Los planes cumplidos (15, 16, 17, 18, 19 y `PLAN-DISENO`) se borraron el 2026-11-08. El material del diplomado vive ahora en `_material/diplomado/`. Siguen en git:

```bash
git show 1537ee1:docs/<archivo>.md
```
