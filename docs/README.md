# Documentación — MyAppGlass

**Glass & Aluminum Company S.A.C.** · Next.js 16 (export estático, FSD) + Firebase Functions v2 + Firestore. Las reglas para agentes de IA están en `AGENTS.md` (raíz).

**Regla de esta carpeta:** no se crean planes de trabajo nuevos como archivos. El trabajo abierto va en `PENDIENTES.md` y lo terminado en `05_CHANGELOG.md`. La propuesta de mejoras es un entregable de consultoría; su seguimiento también vive en `PENDIENTES.md`.

## Empieza aquí

| Documento | Para qué sirve |
|---|---|
| [`PENDIENTES.md`](./PENDIENTES.md) | **Única lista** de trabajo abierto |
| [`marca/MANUAL-DE-MARCA.md`](./marca/MANUAL-DE-MARCA.md) | **Manual de marca v1.0**: empresa, público, posicionamiento, voz e identidad. Versión legible: [`MANUAL-DE-MARCA.html`](./marca/MANUAL-DE-MARCA.html) |
| [`marca/BRAND-KIT.html`](./marca/BRAND-KIT.html) | **Brand kit revisable**: logo, isotipo, variaciones, paleta, tipografía, estilos, plantilla de presupuesto, aplicaciones y lista de archivos |
| [`marca/UI-KIT.html`](./marca/UI-KIT.html) | **UI kit web revisable**: navegación, inicio, landings de servicio, proyecto y distrito, tarjetas, formularios, estados, responsive e inventario de componentes |
| [`marca/ENTREGABLES-MARCA.md`](./marca/ENTREGABLES-MARCA.md) | **Mapa completo de entregables**: 8 fases, estado real, qué falta y cómo se unifican docs y design system |
| [`marca/PROPUESTA-MEJORAS.md`](./marca/PROPUESTA-MEJORAS.md) | Propuesta de mejoras priorizada (diagnóstico, plan 180 días, SEO, entregables y KPI) |
| [`marca/PROMPT-CONSULTOR-MARCA.md`](./marca/PROMPT-CONSULTOR-MARCA.md) | Prompt maestro de consultor de marca y marketing para el sector construcción |
| [`marca/PROMPT-BRANDING.md`](./marca/PROMPT-BRANDING.md) | Prompt de branding con criterio de estudio de diseño para producir un brand kit completo |
| [`../apps/web/PRODUCT.md`](../apps/web/PRODUCT.md) | Producto: usuarios, restricciones y decisiones del dueño |
| [`../apps/web/DESIGN.md`](../apps/web/DESIGN.md) | Sistema de diseño (tokens y componentes), alineado con el manual de marca v1.0 |

## Negocio y catálogo

| Ruta | Contenido |
|---|---|
| [`gya/catalogo/`](./gya/catalogo/CATALOGO.md) | Catálogo propuesto, proveedores y fichas de servicio |
| [`gya/`](./gya/README.md) | Conceptos de hoja de presupuesto, 4 casos reales y datos de referencia |

## Técnica

| Documento | Contenido |
|---|---|
| [`01_ARCHITECTURE.md`](./01_ARCHITECTURE.md) | Capas FSD, rutas y flujo de datos |
| [`03_ENTITIES.md`](./03_ENTITIES.md) | Mapa propuesto de la capa `entities/` y orden de migración |
| [`06_DOCS_DEVELOPMENT.md`](./06_DOCS_DEVELOPMENT.md) | Comandos, validación, commit y despliegue manual |
| [`02_AI_HANDOFF.md`](./02_AI_HANDOFF.md) | Estado del backend y avisos para el siguiente agente |
| [`05_CHANGELOG.md`](./05_CHANGELOG.md) | Historial de cambios |
| [`07_BACKEND_IMPLEMENTATION.md`](./07_BACKEND_IMPLEMENTATION.md) | Libro de reclamaciones y contacto (Cloud Functions) |
| [`08_DOCS_SECURITY_BACKEND.md`](./08_DOCS_SECURITY_BACKEND.md) | Seguridad e infraestructura |
| [`api/`](./api/README.md) | Contrato OpenAPI (se genera con `pnpm run contract:generate`) |
| [`SKILLS.md`](./SKILLS.md) | Skills instaladas y cómo restaurarlas |
| [`auditorias/`](./auditorias/) | Salidas de los scripts de auditoría (generadas, no se editan) |

## SEO

| Documento | Contenido |
|---|---|
| [`14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md`](./14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md) | SEO técnico, sitelinks y métricas (implementado) |
| [`10_SEO_JERARQUIA.md`](./10_SEO_JERARQUIA.md) | Títulos y prioridades por ruta |
| [`11_MANUAL_SEO_LOCAL.md`](./11_MANUAL_SEO_LOCAL.md) | Checklist externo: Search Console, Google Business Profile y GA4 |

## Otros

[`_material/diplomado/`](./_material/diplomado/README.md): material del diplomado (aprendizaje; no es del producto).

## Recuperar un documento borrado

Nada se pierde: todo sigue en git.

| Borrado el | Qué | Comando |
|---|---|---|
| 2026-11-08 | Planes 15 a 19 y `PLAN-DISENO` | `git show 1537ee1:docs/<archivo>.md` |
| 2026-11-09 | `DESIGN-SYSTEM.md`, `BRAND-KIT.md`, `PROMPT-REDISENO-DS.md`, plan 23 | `git show 22a4159^:docs/<archivo>.md` |
| 2026-11-09 | `PREGUNTAS-MARCA.md` (respuestas ya integradas en el manual v1.0) | `git show d00687c:docs/marca/PREGUNTAS-MARCA.md` |
| 2026-11-09 | Planes 20, 21, 22, 24 y 25, `CUESTIONARIO-DISENO.md`, `09_PLAN_SEO_CONTENIDOS.md`, `03_AGENTS.md`, `archivo/` y `gya/prompts/` | `git show 3106d43:docs/<ruta>` |
