# 🚀 Plan Estratégico Maestro: SEO Técnico, Sitelinks, Copywriting/Storytelling y Ecosistema Google

> **Documento vivo de seguimiento en tiempo real.** Se actualiza al cerrar cada fase con su commit preventivo.
> **Responsable / Orquestador:** Gemini 4 Argon (Project Lead & Principal QA Architect)
> **Cuenta Administradora Ecosistema Google:** `luis.j.cueva@gmail.com` (Google Business Profile, Google Search Console, Google Analytics 4 `G-TY0NJP1S81`, Firebase `gya-app-4c8a9`)
> **Correo Corporativo Público (NAP):** `acueva@gyacompany.com` | **Dirección:** `Av. Los Fresnos 1250 - La Molina` | **WhatsApp:** `974 278 303`

---

## 📊 Barra de Progreso en Tiempo Real

```text
Progreso Global: [████████████] 100% (6 / 6 Fases completadas)
├── [🟢 100%] Fase 0: Línea Base, Limpieza de public/ y Registro de Plan Maestro
├── [🟢 100%] Fase 1: Schemas Zod, Grafo JSON-LD (SiteNavigationElement) y buildPageMetadata
├── [🟢 100%] Fase 2: Rastreo (robots.ts), Sitemap Dinámico + Image Sitemap (sitemap.ts) y Manifest
├── [🟢 100%] Fase 3: Ejecución Paralela — Copywriting, Storytelling, Sitelinks en Footer y noindex
├── [🟢 100%] Fase 4: Conexión Ecosistema Google (GA4 G-TY0NJP1S81, GTM, Search Console y CSP)
└── [🟢 100%] Fase 5: Sincronización Documental, Build Estático y Auditoría de .html
```

---

## 👥 Equipo Multidisciplinario de Agentes Senior

| Agente | Rol Senior | Modelo Asignado | Dominio de Archivos |
|---|---|---|---|
| **Orquestador Central** | Project Lead & Principal QA Architect | **Gemini 4 Argon (`inherit`)** | Orquestación, `typecheck`, `lint`, `build`, auditoría `.html`, commits preventivos y este plan. |
| **`seo-schema-architect`** | Consultor Senior de SEO Técnico, Sitelinks & Schema.org | **Gemini 4 Argon (`inherit`)** | `packages/shared/src/schemas/firebase-types.ts`, `apps/web/src/shared/config/env.ts`, `apps/web/src/shared/utils/seo-utils.ts`, `apps/web/tests/unit/seo-utils.test.ts`, `apps/web/src/app/robots.ts`, `apps/web/src/app/sitemap.ts`, `apps/web/src/app/manifest.ts` |
| **`google-analytics-specialist`** | Especialista Senior en Ecosistema Google (GA4, GTM, GSC, CSP) | **Gemini 4 Argon (`inherit`)** | `apps/web/src/shared/lib/analytics.ts`, `apps/web/src/shared/components/Analytics/GoogleMetricsProvider.tsx`, `apps/web/src/app/layout.tsx`, `firebase.json` |
| **`seo-copywriter-routes`** | Senior SEO Marketing Copywriter & Sitelinks Strategist | **Modelo Ligero (`flash`)** | `apps/web/src/features/services/hooks/serviceMappers.ts`, `apps/web/src/widgets/Footer/Footer.tsx`, `apps/web/src/app/page.tsx`, `apps/web/src/app/servicios/[serviceSlug]/page.tsx`, `apps/web/src/app/blog/**`, `apps/web/src/app/contacto/page.tsx`, `apps/web/src/app/presupuesto/page.tsx`, `apps/web/src/app/simulador-ai/page.tsx`, `apps/web/src/app/libro-de-reclamacion/page.tsx`, `apps/web/src/app/cuentas-bancarias/page.tsx`, `apps/web/src/app/politicas-empresa/page.tsx` |
| **`seo-storyteller-guards`** | Senior Brand Storyteller (E-E-A-T) & Indexation Guard | **Modelo Ligero (`flash`)** | `apps/web/src/app/proyectos/[projectId]/page.tsx`, `apps/web/src/app/admin/**`, `apps/web/src/app/servicios/ver/layout.tsx`, `apps/web/src/app/proyectos/ver/layout.tsx`, `apps/web/src/app/auth/page.tsx`, `apps/web/src/app/not-found.tsx`, `docs/09_PLAN_SEO_CONTENIDOS.md`, `docs/10_SEO_JERARQUIA.md`, `docs/11_MANUAL_SEO_LOCAL.md`, `docs/05_CHANGELOG.md` |

---

## ✅ Checklist de Actividades por Fase

### Fase 0: Línea Base, Limpieza de Plantillas Residuales y Documento Maestro
- [x] **0.1.** Eliminar `apps/web/public/index.html` y `apps/web/public/404.html` residuales de Firebase CLI.
- [x] **0.2.** Crear `docs/14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md` con barra de progreso y checklist.
- [x] **0.3.** Validar `pnpm run typecheck`.
- [x] **0.4.** Commit Preventivo 1 (`chore(seo): eliminar plantillas html residuales de public y registrar plan maestro seo`).

### Fase 1: Schemas Zod, Grafo JSON-LD (`SiteNavigationElement`) y Motor de Metadatos
- [x] **1.1.** Añadir `seoTitle` y `seoDescription` opcionales a `ProjectSchema` en `packages/shared/src/schemas/firebase-types.ts`.
- [x] **1.2.** Añadir `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` y `NEXT_PUBLIC_GTM_ID` en `apps/web/src/shared/config/env.ts`.
- [x] **1.3.** Enriquecer `getCompanyJsonLd()` con `WebSite`, `LocalBusiness`/`HomeAndConstructionBusiness` y `SiteNavigationElement` (5 rutas clave de Sitelinks + soporte), y crear `buildPageMetadata()`, `getProjectJsonLd()` y `getWebAppJsonLd()` en `apps/web/src/shared/utils/seo-utils.ts`.
- [x] **1.4.** Ampliar tests unitarios en `apps/web/tests/unit/seo-utils.test.ts`.
- [x] **1.5.** Validar `pnpm run typecheck` y `vitest run tests/unit/seo-utils.test.ts`.
- [x] **1.6.** Commit Preventivo 2 (`feat(seo): actualizar schemas zod, grafo json-ld con SiteNavigationElement y buildPageMetadata`).

### Fase 2: Rastreo de Bots (`robots.ts`), Sitemap Dinámico (`sitemap.ts`) y Manifest (`manifest.ts`)
- [x] **2.1.** Actualizar `apps/web/src/app/robots.ts`: desbloquear `/_next/`, bloquear `/api/`, `/admin/`, `/auth/`, `/design-system*`, `/servicios/ver`, `/proyectos/ver`, permitir bots IA de búsqueda/citación (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`) y bloquear `Bytespider`.
- [x] **2.2.** Actualizar `apps/web/src/app/sitemap.ts`: añadir `/presupuesto` y `/simulador-ai`, prioridades jerárquicas de Sitelinks, `lastModified` real desde Firestore e Image Sitemap (`images`).
- [x] **2.3.** Crear `apps/web/src/app/manifest.ts` para Web App Manifest estático.
- [x] **2.4.** Validar `pnpm run typecheck`.
- [x] **2.5.** Commit Preventivo 3 (`feat(seo): optimizar robots.txt, enriquecer sitemap.xml para sitelinks e imagenes y agregar manifest`).

### Fase 3: Ejecución en Paralelo — Copywriting, Storytelling, Enlaces Sitelinks y Blindaje `noindex`
- [x] **3.A.1.** Enlaces internos semánticos (`<nav>` + `<Link>`) hacia las 5 rutas clave de Sitelinks y dirección `Av. Los Fresnos 1250 - La Molina` en `apps/web/src/widgets/Footer/Footer.tsx`.
- [x] **3.A.2.** Diccionario `SERVICE_SEO_FALLBACKS` y limpieza de títulos en `apps/web/src/features/services/hooks/serviceMappers.ts`.
- [x] **3.A.3.** Aplicar `buildPageMetadata` en `/`, `/servicios/[serviceSlug]`, `/blog`, `/blog/[slug]`, `/contacto`, `/presupuesto`, `/simulador-ai`, `/libro-de-reclamacion`, `/cuentas-bancarias` y `/politicas-empresa`.
- [x] **3.B.1.** Storytelling E-E-A-T y JSON-LD (`BreadcrumbList` + `getProjectJsonLd`) en `apps/web/src/app/proyectos/[projectId]/page.tsx`.
- [x] **3.B.2.** Blindaje `noindex` en `apps/web/src/app/admin/layout.tsx`, `apps/web/src/app/admin/**/page.tsx`, `apps/web/src/app/servicios/ver/layout.tsx`, `apps/web/src/app/proyectos/ver/layout.tsx`, `apps/web/src/app/auth/page.tsx` y `apps/web/src/app/not-found.tsx`.
- [x] **3.C.** Validar `pnpm run typecheck && pnpm run lint`.
- [x] **3.D.** Commit Preventivo 4 (`feat(seo): aplicar copywriting, storytelling, enlaces sitelinks en footer y noindex en rutas internas`).

### Fase 4: Conexión Ecosistema Google (GA4 `G-TY0NJP1S81`, GTM, Search Console y CSP)
- [x] **4.1.** Crear `apps/web/src/shared/lib/analytics.ts` con inicialización segura de Firebase Analytics (`G-TY0NJP1S81`) y `trackEvent()`.
- [x] **4.2.** Crear `apps/web/src/shared/components/Analytics/GoogleMetricsProvider.tsx` para registro automático de vistas de página y contenedor opcional `NEXT_PUBLIC_GTM_ID`.
- [x] **4.3.** Actualizar `apps/web/src/app/layout.tsx` (`verification.google`, `robots` con `max-image-preview: large` y `<GoogleMetricsProvider />`) y `firebase.json` (CSP para dominios de Google Analytics / Tag Manager).
- [x] **4.4.** Validar `pnpm run typecheck && pnpm run lint`.
- [x] **4.5.** Commit Preventivo 5 (`feat(analytics): conectar firebase google analytics G-TY0NJP1S81, search console y csp`).

### Fase 5: Sincronización Documental, Build Estático y Auditoría de `.html`
- [x] **5.1.** Actualizar `docs/09_PLAN_SEO_CONTENIDOS.md`, `docs/10_SEO_JERARQUIA.md`, `docs/11_MANUAL_SEO_LOCAL.md` (con guía paso a paso de Search Console y Google Business Profile en `luis.j.cueva@gmail.com`) y `docs/05_CHANGELOG.md`.
- [x] **5.2.** Ejecutar `pnpm run typecheck && pnpm run lint && pnpm run build` y auditar todos los `.html` de `apps/web/out/`.
- [x] **5.3.** Commit Preventivo 6 (`docs(seo): sincronizar manuales de search console, google business profile, jerarquia seo y changelog`).
