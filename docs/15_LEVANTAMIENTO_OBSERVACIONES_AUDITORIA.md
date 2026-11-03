# 🛡️ Levantamiento de Observaciones — 2.ª Auditoría Cruzada (Código, Telemetría, Documentación y Memoria de Agentes)

> **Documento oficial de trazabilidad y cierre de hallazgos.**
> Registra cada observación reportada por el modelo auditor en la segunda pasada de revisión y la evidencia exacta de su levantamiento en el código, artefactos compilados (`apps/web/out/`) y documentación del repositorio.

---

## 📊 Barra de Progreso en Tiempo Real

```text
Progreso Remediación: [███░░░░░░░░░] 25% (1 / 4 Fases completadas)
├── [🟢 100%] Fase 1: Telemetría Limpia GA4/GTM (send_page_view: false, prod-only, import() dinámico)
├── [⏳   0%] Fase 2: Ajustes Finos SEO, robots.txt, 404, Dimensiones OG, JSON-LD ISO y Retiro de SAMPLE_CLIENTS
├── [⏳   0%] Fase 3: Corrección de Deriva Documental en 6 Archivos .md (01, 02, 03, 05, 07, README, diplomado)
└── [⏳   0%] Fase 4: Saneamiento de Memoria de Agentes (gya-cms SKILL.md, MCP unificado y Build/Audit Final)
```

---

## 📋 Matriz de Levantamiento de Observaciones (Secciones 3, 4 y 5 de la Auditoría)

### 1. Bugs y Riesgos en Código / Telemetría / SEO Técnico (Sección 3)

| ID | Sev. | Observación Reportada | Estado | Solución Implementada y Archivo(s) |
|---|---|---|---|---|
| **OBS-01** | 🟠 | **`page_view` duplicado en GA4:** Firebase Analytics envía un `page_view` automático al inicializar y `GoogleMetricsProvider` envía otro en el primer mount. | ✅ Levantada | En [`analytics.ts`](../apps/web/src/shared/lib/analytics.ts) se reemplazó `getAnalytics(app)` por `initializeAnalytics(app, { config: { send_page_view: false } })`, dejando a `GoogleMetricsProvider` como única fuente de `page_view`. |
| **OBS-02** | 🟠 | **Analytics activo en local/dev:** solo se excluía en emuladores, no con `NODE_ENV`. `pnpm dev` enviaba tráfico a producción (`G-TY0NJP1S81`). | ✅ Levantada | Se creó `isProductionAnalyticsEnabled()` en [`analytics.ts`](../apps/web/src/shared/lib/analytics.ts) que exige `process.env.NODE_ENV === "production"`, `!NEXT_PUBLIC_USE_EMULATORS` y `hostname !== "localhost" / "127.0.0.1"`. |
| **OBS-03** | 🟠 | **Doble medición potencial GTM + GA4:** si se configura `NEXT_PUBLIC_GTM_ID` con etiqueta GA4 interna, habría doble envío de `page_view`. | ✅ Levantada | En [`GoogleMetricsProvider.tsx`](../apps/web/src/shared/components/Analytics/GoogleMetricsProvider.tsx), cuando `NEXT_PUBLIC_GTM_ID` está definido, las vistas de página se emiten exclusivamente a `window.dataLayer` (`virtual_page_view`) y se omite `trackSeoEvent("page_view")` directo. |
| **OBS-04** | 🔵 | **Importación estática de `firebase/analytics`:** se incluía en el bundle síncrono de todas las páginas. | ✅ Levantada | En [`analytics.ts`](../apps/web/src/shared/lib/analytics.ts) se migró a `import("firebase/analytics")` dinámico (code-splitting asíncrono). |
| **OBS-05** | 🟡 | **Dimensiones falsas de `logovcr.png`:** el archivo mide `906×904`, pero se declaraba `512×512` en OpenGraph y Manifest. | ⏳ En curso (Fase 2) | Se actualizan `width: 906, height: 904` en `layout.tsx`, `seo-utils.ts` y `sizes: "906x904"` en `manifest.ts`. |
| **OBS-06** | 🟡 | **`robots.txt` con barra final en rutas sin subruta:** `Disallow: /admin/` no bloqueaba `/admin` exacto (igual con `/auth` y `/design-system`). | ⏳ En curso (Fase 2) | En `robots.ts` se actualizan los prefijos a `["/api/", "/admin", "/auth", "/design-system", "/servicios/ver", "/proyectos/ver"]` (cubriendo tanto la ruta exacta con `cleanUrls: true` como sus subrutas). |
| **OBS-07** | 🟡 | **`404.html` con dos `<meta name="robots">`:** tenía `noindex` (de Next.js) y `noindex, follow` (de `not-found.tsx`). | ⏳ En curso (Fase 2) | Se retira `robots` del `metadata` de `apps/web/src/app/not-found.tsx` para conservar únicamente el `<meta name="robots" content="noindex" />` nativo de Next.js. |
| **OBS-08** | 🟡 | **`lastModified` fijo `2026-11-02` en páginas estáticas del sitemap:** en futuros builds seguiría mostrando la misma fecha. | ⏳ En curso (Fase 2) | En `sitemap.ts` se usa `const BUILD_DATE = new Date()` para las 8 páginas estáticas compiladas en el build, dejando `DEFAULT_LAST_MODIFIED` solo como fallback de documentos sin timestamp. |
| **OBS-09** | 🟡 | **`dateCreated` desde texto libre en proyectos:** `completedAt` es `z.string()` libre y puede generar JSON-LD `CreativeWork` no-ISO. | ⏳ En curso (Fase 2) | En `getProjectJsonLd()` (`seo-utils.ts`) se valida con regex ISO 8601 (`/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/`) antes de incluir `dateCreated`, cubierto con test unitario en `seo-utils.test.ts`. |
| **OBS-10** | 🔵 | **Títulos de `/admin/**` con marca triplicada:** incluían `\| Admin GYA` además del template `\| Glass & Aluminum Company S.A.C.`. | ⏳ En curso (Fase 2) | Se limpian los `metadata.title` en `apps/web/src/app/admin/**/page.tsx` para dejar un único separador de marca. |
| **OBS-11** | 🟠 | **`SAMPLE_CLIENTS` sigue activo en `/admin/clientes`:** muestra clientes ficticios si Firestore está vacío o falla. | ⏳ En curso (Fase 2) | En `ClientManagementScreen.tsx` se elimina el fallback `SAMPLE_CLIENTS` y se borra `apps/web/src/screens/Admin/clients/sampleClients.ts`. |

---

### 2. Deriva Documental en Archivos `.md` (Sección 4)

| ID | Documento | Problema Detectado | Estado | Corrección Aplicada |
|---|---|---|---|---|
| **DOC-01** | `docs/01_ARCHITECTURE.md` | Menciona `projectService.ts` / `serviceService.ts` (inexistentes), ruta rota de `DESIGN-SYSTEM-PLAN.md` y conteo `58 páginas / 18 tests`. | ⏳ En curso (Fase 3) | Actualizado a `projectsRepository.ts` / `servicesRepository.ts` / `publicRest.ts`, `docs/DESIGN-SYSTEM-PLAN.md` y `60 rutas estáticas (56 HTML) / 19 archivos de test`. |
| **DOC-02** | `docs/02_AI_HANDOFF.md` | Pide "purga de `scripts/`" (cuando `scripts/generate-openapi.cjs` es obligatorio) y dice `58 páginas`. | ⏳ En curso (Fase 3) | Se retira `scripts/` de la lista de purga aclarando el rol de `scripts/generate-openapi.cjs` y se actualiza el conteo del build. |
| **DOC-03** | `docs/03_AGENTS.md` y `README.md` | Conteo `58 páginas` desactualizado y divergencia de número de agentes. | ⏳ En curso (Fase 3) | Conteo actualizado a `60 rutas estáticas (56 HTML)` y nota de autoridad apuntando a `AGENTS.md` y `docs/14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md`. |
| **DOC-04** | `docs/05_CHANGELOG.md` | Discrepancia histórica en conteos de páginas y archivos de test (`18` vs `19`). | ⏳ En curso (Fase 3) | Añadida nota aclaratoria en la entrada vigente (`19 archivos de test unitario en apps/web/tests/unit/ y 60 rutas / 56 HTML en out/`). |
| **DOC-05** | `docs/07_BACKEND_IMPLEMENTATION.md` | Dice `120 pruebas` (son `147`) y usa `cd functions` / `functions/.env` en lugar de `apps/functions`. | ⏳ En curso (Fase 3) | Actualizado a `147 pruebas` (`pnpm run test:functions`) y rutas `apps/functions/` y `apps/functions/.env`. |
| **DOC-06** | `docs/diplomado/README.md` | Cita `functions/` sin `apps/` y regla "No tocar `firebase.json`" sin mencionar la excepción autorizada para CSP GA4. | ⏳ En curso (Fase 3) | Rutas corregidas a `apps/functions/` y nota de excepción autorizada en `firebase.json` (`3d47f61`). |

---

### 3. Memoria de Agentes y Configuración MCP (Sección 5)

| ID | Archivo | Problema Detectado | Estado | Corrección Aplicada |
|---|---|---|---|---|
| **MEM-01** | `.gemini/skills/gya-cms/SKILL.md` | Obsoleto y peligroso: manda editar `src/features/projects/data/projects.ts` y `services.ts` (eliminados), usar `npx eslint src` y dice que `scripts/` no existe. | ⏳ En curso (Fase 4) | Reescrito íntegramente para reflejar Firestore (`servicesRepository.ts`, `projectsRepository.ts`, `publicRest.ts`), `scripts/generate-openapi.cjs` y validación con `pnpm run typecheck && pnpm run lint && pnpm run build`. |
| **MEM-02** | `.gemini/settings.json`, `.mcp.json`, `.agents/mcp_config.json` | 3 fuentes divergentes de MCP y ruta absoluta de Windows `/mnt/c/Users/luisj/Desktop/Github/MyAppGlass` en `.gemini/settings.json`. | ⏳ En curso (Fase 4) | Ruta de Windows reemplazada por `"."` y servidores MCP alineados en los 3 archivos. |
