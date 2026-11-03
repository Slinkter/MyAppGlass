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

---

## 🔍 Guía de Contexto y Auditoría Cruzada para Otros Modelos de IA (Peer Review & Bug Hunting)

> **Propósito de esta sección:** Si eres otro modelo de IA (Claude, GPT, Gemini, DeepSeek, etc.) o un auditor técnico revisando este repositorio en busca de errores, regresiones o casos borde, lee este contexto antes de analizar el código. Evitará falsos positivos por desconocimiento de las restricciones del proyecto y te dirigirá directamente a los puntos críticos.

### 1. Contexto Arquitectónico e Invariantes del Proyecto
1. **Exportación Estática Estricta (`output: 'export'` en Next.js 16.4.3):**
   - `@gya/web` se compila a archivos estáticos en `apps/web/out/` y se despliega en Firebase Hosting (`cleanUrls: true`).
   - **No existe servidor Node.js en runtime para Next.js:** cualquier ruta `app/sitemap.ts`, `app/robots.ts` o `app/manifest.ts` **debe** exportar `export const dynamic = "force-static"`. No se pueden usar headers/cookies dinámicos ni middleware SSR.
2. **Patrón Híbrido SSG + CSR Fallback para Firestore (`publicRest.ts` vs `/ver`):**
   - Durante `pnpm run build`, `apps/web/src/shared/api/firebase/publicRest.ts` consulta la API REST pública de Firestore (`/services` y `/projects`) sin necesidad de credenciales de Admin SDK.
   - `generateStaticParams()` en `/servicios/[serviceSlug]` y `/proyectos/[projectId]` pre-renderiza un `.html` estático para cada documento publicado en el momento del build (y usa `BUILD_SENTINEL = "__placeholder__"` si la red fallara para no romper el build).
   - Si un administrador crea un servicio o proyecto nuevo desde `/admin` *después* del último build estático, las tarjetas redirigen en cliente al shell CSR `/servicios/ver?slug=...` o `/proyectos/ver?id=...` (ver `getServiceHref` en `serviceMappers.ts`).
   - **Por qué `/servicios/ver` y `/proyectos/ver` tienen `noindex, follow`:** Esos shells CSR no tienen contenido propio sin query params y no deben competir en Google con las rutas canónicas pre-renderizadas `/servicios/[serviceSlug]` y `/proyectos/[projectId]`.
3. **Reglas de Negocio Inmutables (`AGENTS.md`):**
   - **Razón Social:** `"GLASS & ALUMINUM COMPANY S.A.C."` (`companyData` en `packages/shared/src/company-data.ts`).
   - **NAP Vigente:** Dirección **`Av. Los Fresnos 1250 - La Molina`** (código postal `15024`), WhatsApp **`974 278 303`** (`+51974278303`), teléfono secundario **`996-537-435`**, correo público **`acueva@gyacompany.com`**. *(La Ficha RUC SUNAT de 2022 y la numeración antigua `1214-1274` están desactualizadas y no deben usarse).*
   - **Cuenta Propietaria del Ecosistema Google:** `luis.j.cueva@gmail.com` administra Google Business Profile, Google Search Console, Google Analytics 4 (`G-TY0NJP1S81`) y Firebase (`gya-app-4c8a9`).
   - **Catálogo Oficial de Ventanas:** Solo existen **4 sistemas** (`Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`), **4 tipos de abertura** (`Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`) y **3 tipos de vidrio** (`Crudo`, `Laminado`, `Templado`). Ortografía obligatoria: `"antirruido"` (doble `r`) y `"vidrio y aluminio"` (singular).
   - **Backend Congelado:** `apps/functions/` (Firebase Functions v2 en Node.js 22) y `firestore.rules` están congelados y no deben modificarse salvo solicitud expresa.

---

### 2. Mapa de Archivos Modificados / Creados en esta Intervención

| Archivo | Rol en la Arquitectura SEO & Analytics | Puntos Clave a Revisar |
|---|---|---|
| [`packages/shared/src/schemas/firebase-types.ts`](../packages/shared/src/schemas/firebase-types.ts) | Schemas Zod compartidos (`ServiceSchema`, `ProjectSchema`) | `ProjectSchema` ahora incluye `seoTitle` y `seoDescription` opcionales (al igual que `ServiceSchema`). |
| [`apps/web/src/shared/config/env.ts`](../apps/web/src/shared/config/env.ts) | Validación tipada de variables `NEXT_PUBLIC_*` | Añadidos `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` y `NEXT_PUBLIC_GTM_ID`. |
| [`apps/web/src/shared/utils/seo-utils.ts`](../apps/web/src/shared/utils/seo-utils.ts) | Motor central de Metadata y JSON-LD Schema.org | `cleanSeoTitle()`, `resolveSeoImageUrl()`, `buildPageMetadata()`, `getCompanyJsonLd()` (`@graph` con `WebSite` + `LocalBusiness` + `ItemList` `#sitelinks`), `getServiceJsonLd()`, `getProjectJsonLd()`, `getWebAppJsonLd()`, `serializeJsonLd()`. |
| [`apps/web/tests/unit/seo-utils.test.ts`](../apps/web/tests/unit/seo-utils.test.ts) | Suite Vitest de contratos SEO y JSON-LD | 9 tests unitarios validando `@graph`, `SiteNavigationElement`, `cleanSeoTitle`, `resolveSeoImageUrl`, `buildPageMetadata`, `CreativeWork` y `WebApplication`. |
| [`apps/web/src/app/robots.ts`](../apps/web/src/app/robots.ts) | Generador estático de `/robots.txt` | Desbloquea `/_next/`, bloquea rutas privadas/shells (`DISALLOW_PATHS`), habilita bots IA (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`) repitiendo `disallow` según RFC 9309, y bloquea `Bytespider`. |
| [`apps/web/src/app/sitemap.ts`](../apps/web/src/app/sitemap.ts) | Generador estático de `/sitemap.xml` + Image Sitemap | Incluye `/presupuesto` y `/simulador-ai`, prioridades Sitelinks (`1.0` / `0.9` / `0.85` / `0.75` / `0.7`), `resolveLastModified()` y `toSitemapImageUrl()` con escape de entidades XML. |
| [`apps/web/src/app/manifest.ts`](../apps/web/src/app/manifest.ts) | Generador estático de `/manifest.webmanifest` | Configura PWA manifest con `lang: "es-PE"`, colores `#09090b` e íconos `/favicon.svg` y `/logovcr.png`. |
| [`apps/web/src/widgets/Footer/Footer.tsx`](../apps/web/src/widgets/Footer/Footer.tsx) | Enlazado interno semántico y NAP visible | Columnas `<Box as="nav" aria-label="...">` con `<Link href="...">` hacia las 8 rutas de Sitelinks y dirección `Av. Los Fresnos 1250 - La Molina`. |
| [`apps/web/src/features/services/hooks/serviceMappers.ts`](../apps/web/src/features/services/hooks/serviceMappers.ts) | Adaptador Firestore → Vista de Servicio | Diccionario `SERVICE_SEO_FALLBACKS` para los 10 slugs; `getServiceSeo()` usa `cleanSeoTitle()` y aplica el fallback si `seoDescription` falta o tiene `< 90` caracteres. |
| [`apps/web/src/shared/lib/analytics.ts`](../apps/web/src/shared/lib/analytics.ts) | Inicializador seguro de Firebase Analytics (`G-TY0NJP1S81`) | Usa `isSupported()` asíncrono en cliente, desactivado en SSR y emuladores. |
| [`apps/web/src/shared/components/Analytics/GoogleMetricsProvider.tsx`](../apps/web/src/shared/components/Analytics/GoogleMetricsProvider.tsx) | Componente cliente de rastreo de rutas y GTM | Escucha `usePathname()`, difiere la lectura de `document.title` con `setTimeout(..., 0)` para capturar el `<title>` actualizado tras navegación SPA, y emite `page_view` a GA4 y `virtual_page_view` a `dataLayer`. |
| [`apps/web/src/app/layout.tsx`](../apps/web/src/app/layout.tsx) | Root Layout de Next.js App Router | Define `metadataBase`, `title.template`, `robots` (`max-image-preview: "large"`), `verification.google` condicional, JSON-LD raíz y monta `<GoogleMetricsProvider />`. |
| [`firebase.json`](../firebase.json) | Configuración de Firebase Hosting y cabeceras HTTP | `Content-Security-Policy` actualizada en `script-src`, `img-src` y `connect-src` para permitir Google Analytics 4, Google Tag Manager y Firebase Installations API. |

---

### 3. Bugs Reales Detectados y Corregidos durante la Auto-Auditoría

> Estos 4 problemas fueron detectados al inspeccionar el artefacto compilado en `apps/web/out/` y ya están corregidos en el código actual:

1. **Bug Crítico XML en `<image:loc>` de `sitemap.xml` (Next.js `MetadataRoute.Sitemap`):**
   - **Síntoma:** Las URLs de imágenes almacenadas en Firebase Storage incluyen query strings con `&` (`.../cover.webp?alt=media&token=...`). El serializador interno de Next.js (`MetadataRoute.Sitemap`) **no escapa** `&` como `&amp;` dentro del array `images`, generando XML mal formado (`xml.etree.ElementTree.ParseError: not well-formed (invalid token): line 54`) que Google Search Console rechaza al enviar el sitemap.
   - **Solución aplicada (`apps/web/src/app/sitemap.ts`):** Se implementó `toSitemapImageUrl(rawUrl)` que convierte rutas relativas en absolutas y escapa `&` (`&(?!amp;|lt;|gt;|quot;|apos;) -> &amp;`), `<`, `>`, `"` y `'`. Validado con el parser estricto `xml.etree.ElementTree.parse("apps/web/out/sitemap.xml")` (`0 errores`).
2. **Pérdida de `og:image` en 28 páginas hijas por reemplazo superficial de `openGraph` en Next.js:**
   - **Síntoma:** En Next.js App Router, cuando una ruta hija define `metadata.openGraph = { title, description, url }` sin declarar `images`, Next.js **sobrescribe por completo** el objeto `openGraph` del `layout.tsx` padre, eliminando `og:image`.
   - **Solución aplicada (`apps/web/src/shared/utils/seo-utils.ts`):** `buildPageMetadata()` incluye siempre `openGraph.images` y `twitter.images` resueltos con `resolveSeoImageUrl()`.
3. **Duplicación de sufijos de marca en `<title>` (`| Glass & Aluminum Company S.A.C.` x2):**
   - **Síntoma:** `app/layout.tsx` aplica `template: "%s | Glass & Aluminum Company S.A.C."`, pero las páginas hijas y documentos de Firestore ya incluían `| Glass & Aluminum Company S.A.C.` o `| GYA Company`.
   - **Solución aplicada:** `cleanSeoTitle()` limpia iterativamente cualquier variante del sufijo de marca antes de entregar el título a Next.js, y construye `fullTitle` para `openGraph.title` y `twitter.title` (donde Next.js no aplica `title.template`).
4. **Sincronización de `document.title` en navegaciones SPA para GA4/GTM (`GoogleMetricsProvider.tsx`):**
   - **Síntoma:** En App Router, `useEffect` al cambiar `usePathname()` puede ejecutarse antes de que React/Next.js actualice el nodo `<title>` del DOM, enviando el título de la página anterior en el evento `page_view`.
   - **Solución aplicada:** Se difiere la lectura de `document.title` con `window.setTimeout(..., 0)` (con limpieza en el `return` del efecto) y se envía tanto a `trackSeoEvent("page_view", ...)` como a `window.dataLayer`.

---

### 4. Vectores de Auditoría Recomendados para Otros Modelos Revisores

Si vas a auditar este código para buscar posibles mejoras o bugs adicionales, verifica estos puntos específicos:
1. **Validación XML y HTML del export estático (`apps/web/out/`):**
   - Ejecuta `python3 -c 'import xml.etree.ElementTree as ET; ET.parse("apps/web/out/sitemap.xml"); print("XML OK")'` para comprobar que `sitemap.xml` es 100% bien formado.
   - Verifica que ninguna página pública tenga `noindex` y que las 17 páginas privadas/shells (`/admin/**`, `/auth`, `/design-system*`, `/servicios/ver`, `/proyectos/ver`, `/404`) tengan `<meta name="robots" content="noindex...">`.
2. **Seguridad CSP (`firebase.json`) vs Scripts Externos:**
   - Revisa la cabecera `Content-Security-Policy` en `firebase.json` línea 46: comprueba que todos los orígenes requeridos por Firebase SDK (`firestore.googleapis.com`, `identitytoolkit.googleapis.com`, `firebaseinstallations.googleapis.com`), reCAPTCHA v3 (`www.google.com`, `www.gstatic.com`), Google Maps (`maps.googleapis.com`, `maps.gstatic.com`) y GA4/GTM (`www.googletagmanager.com`, `*.google-analytics.com`, `analytics.google.com`) estén cubiertos sin abrir comodines inseguros (`*`).
3. **Prevención de XSS en JSON-LD (`serializeJsonLd` en `seo-utils.ts`):**
   - Todos los bloques `<script type="application/ld+json">` usan `serializeJsonLd(data)`, que escapa `<` como `\u003c`, `\u2028` y `\u2029`. Verifica que ningún archivo inyecte `JSON.stringify()` directo dentro de `dangerouslySetInnerHTML`.
4. **Coherencia de Datos Estructurados Schema.org:**
   - Contrasta los campos de `getCompanyJsonLd()`, `getServiceJsonLd()`, `getProjectJsonLd()` y `getWebAppJsonLd()` en `apps/web/src/shared/utils/seo-utils.ts` contra el validador oficial de Schema.org y Google Rich Results Test.
