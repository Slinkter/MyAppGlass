---
name: gya-cms
description: "Gestión de contenidos de servicios y proyectos en Firestore para Glass & Aluminum Company S.A.C. (MyAppGlass). Cubre los repositorios de Firestore, lectura SSG por REST (publicRest.ts), esquemas Zod compartidos y generación del contrato OpenAPI."
---

# 🛠️ GYA CMS & Catálogo Firestore Skill

Esta habilidad documenta la arquitectura real y vigente de gestión de contenidos (`services` y `projects`) en **MyAppGlass** (`@gya/web` y `@gya/shared`).

> ⚠️ **Regla crítica:** Los antiguos archivos estáticos `src/features/projects/data/projects.ts` y `src/features/services/data/services.ts` **fueron eliminados**. **Firestore es la única fuente de verdad** para servicios y proyectos. Nunca crees catálogos locales hardcodeados.

---

## 🧭 Arquitectura de Datos Vigente

1. **Esquemas Zod (`@gya/shared`):**
   - Definidos en `packages/shared/src/schemas/firebase-types.ts` (`ServiceSchema`, `ProjectSchema`, `CreateServiceSchema`, `CreateProjectSchema`).
   - Reexportados en `apps/web/src/shared/api/firebase/types.ts`.
   - Incluyen metadatos opcionales `seoTitle` y `seoDescription` tanto en `ServiceSchema` como en `ProjectSchema`.
2. **Lectura en Build Estático (`output: 'export'`):**
   - `apps/web/src/shared/api/firebase/publicRest.ts` (`getBuildServices()`, `getBuildProjects()`) consulta la API REST pública de Firestore durante `pnpm run build` para prerenderizar `/servicios/[serviceSlug]` y `/proyectos/[projectId]`, además de alimentar `apps/web/src/app/sitemap.ts`.
3. **Lectura y Escritura en Cliente (`/admin`):**
   - Repositorios SDK cliente: `apps/web/src/shared/api/firebase/servicesRepository.ts` y `projectsRepository.ts`.
   - Paneles de administración protegidos con `AdminRouteGuard`: `/admin/servicios` y `/admin/proyectos`.
   - Rutas fallback CSR para documentos creados después del último build estático: `/servicios/ver?slug=...` y `/proyectos/ver?id=...` (marcadas con `noindex, follow`).
4. **Adaptadores de Vista y Fallbacks SEO:**
   - `apps/web/src/features/services/hooks/serviceMappers.ts` contiene `toServicePageData()`, `getServiceSeo()` y `SERVICE_SEO_FALLBACKS` para los 10 servicios oficiales (`ventana`, `mampara`, `ducha`, `parapeto`, `baranda`, `balcones`, `techo`, `pvidrio`, `pserie`, `celosias`).

---

## 📐 Reglas de Negocio Inmutables (`AGENTS.md`)

- **Catálogo Oficial de Ventanas:**
  - Solo existen **6 sistemas**: `Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`, `Acústica` y `PVC abatible` (los dos últimos desde 2026-11-08).
  - Tipos de ventana: `Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`.
  - Tipos de vidrio (3): `Crudo`, `Laminado`, `Templado`.
  - Ortografía obligatoria: `"antirruido"` (doble `r`) y `"vidrio y aluminio"` (en singular).
- **Scripts de Repositorio:**
  - La carpeta `scripts/` contiene `scripts/generate-openapi.cjs` (requerido por `pnpm run contract:generate` para sincronizar `docs/api/openapi.json`) y **no debe eliminarse**.

---

## ✅ Flujo de Validación Obligatorio (desde la raíz del monorepo)

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```
