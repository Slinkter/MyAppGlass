# Auditoría Portal GYA — Plan de Trabajo

> **Estado:** 🟡 En curso  
> **Inicio:** 2026-08-20  
> **Modo:** Paralelo (Fases 1–4) + Consolidación (Fase 5)  
> **Rama de trabajo:** `audit/gya-q3-2026`  
> **Proyecto:** Glass & Aluminum Company S.A.C. — Portal GYA (Next.js 16)

---

## 🎯 Objetivo

Auditoría integral del Portal GYA utilizando las skills instaladas en `.agents/skills/`, ejecutada por **agentes AI paralelos especializados** que dejan sus hallazgos en `.audits/fase-{N}-{slug}/`.

---

## 📍 Ubicación de artefactos

| Tipo | Ruta |
|---|---|
| Plan + checklist maestro (este archivo) | `.audits/PLAN_AUDITORIA_GYA.md` |
| Definición de agentes AI | `.audits/AGENTS.md` |
| README para otros agentes | `.audits/README.md` |
| Findings Fase 1 (UI/UX) | `.audits/fase-1-ui-ux/findings.md` |
| Findings Fase 2 (Performance) | `.audits/fase-2-performance/findings.md` |
| Findings Fase 3 (Calidad) | `.audits/fase-3-calidad/findings.md` |
| Findings Fase 4 (Backend) | `.audits/fase-4-backend/findings.md` |
| Informe final consolidado | `.audits/INFORME_FINAL.md` |
| Baseline (Lighthouse, screenshots) | `.audits/fase-0-baseline/` |

---

## 📊 Estado global de fases

| Fase | Nombre | Agente | Estado | Fecha cierre |
|---|---|---|---|---|
| 0 | Baseline | — | ✅ Completa | 2026-08-20 |
| 1 | UI/UX y diseño | A — UI/UX Auditor | ✅ Completa | 2026-08-20 |
| 2 | Performance | B — Performance Engineer | 🟡 En curso | — |
| 3 | Calidad y testing | C — QA Engineer | ✅ Completa | 2026-08-20 |
| 4 | Backend & DevOps | D — Backend Auditor | ✅ Completa | 2026-08-20 |
| 5 | Documentación | E — Tech Writer | ⬜ Pendiente | — |

**Leyenda:** ⬜ Pendiente · 🟡 En curso · ✅ Completa · 🔴 Bloqueada

---

## 🤖 Agentes especializados (resumen)

Definición completa en `.audits/AGENTS.md`.

| ID | Agente | Skills activas |
|---|---|---|
| A | UI/UX Auditor | `web-design-guidelines`, `ui-ux-pro-max`, `frontend-design`, `hallmark` |
| B | Performance Engineer | `vercel-react-best-practices`, `vercel-optimize`, `vercel-composition-patterns`, `vercel-react-view-transitions`, `react-doctor` |
| C | QA Engineer | `react-doctor`, `webapp-testing`, `web-design-guidelines` (a11y) |
| D | Backend & DevOps Auditor | `vercel-optimize`, `vercel-cli-with-tokens`, `deploy-to-vercel` |
| E | Tech Writer | `writing-guidelines`, `doc-coauthoring`, `discernment-nudge` |

**Skills excluidas** (no aplican al proyecto): `algorithmic-art`, `brand-guidelines`, `canvas-design`, `claude-api`, `docx`, `pdf`, `pptx`, `xlsx`, `slack-gif-creator`, `mcp-builder`, `academy-guide`, `find-skills`, `skill-creator`, `template-skill`, `doc-coauthoring`, `internal-comms`, `theme-factory`, `vercel-react-native-skills`, `hyperframes-animation`.

---

## 🚦 Modo de ejecución

```
Fase 0 (secuencial)
        ↓
    ┌───┴───┬───┴───┬───┐
    F1      F2      F3   F4   ← paralelas (dominios disjuntos)
    └───┬───┴───┬───┴───┘
        ↓
      Fase 5 (secuencial, consolidación)
```

---

## 📋 Checklists por fase

### **FASE 0 · Baseline** ✅ Completa

> **Objetivo:** Capturar línea base antes de cualquier cambio.

- [x] Crear rama `audit/gya-q3-2026` desde `main`
- [x] Verificar entorno: `node --version`, `pnpm --version`
- [x] `pnpm install` limpio (sin warnings críticos)
- [x] `pnpm lint` → snapshot de warnings/errores
- [x] `pnpm typecheck` → snapshot de errores TS
- [x] `pnpm test:run` → snapshot de tests/coverage (154 tests passing)
- [x] `pnpm build` → tiempo, tamaño de bundle, 47/47 rutas estáticas
- [x] Inventariar `src/app/**`, `src/screens/**`, `src/widgets/**`, `src/features/**`, `src/shared/**`, `functions/**`
- [x] Contar líneas por capa FSD → `.audits/fase-0-baseline/fsd-inventory.md`
- [x] Commit inicial de fase 0 baseline

**Entregable:** `.audits/fase-0-baseline/README.md` con métricas + archivos auxiliares.

---

### **FASE 1 · UI/UX y diseño** ✅ Completa — **Agente A**

> **Objetivo:** Auditar la capa visual y la coherencia de diseño.

**Skills activas:** `web-design-guidelines`, `ui-ux-pro-max`, `frontend-design`, `hallmark`

- [x] Auditar páginas públicas (`/`, `/servicios`, `/servicios/[serviceSlug]`, `/proyectos`, `/proyectos/[projectId]`, `/blog`, `/blog/[slug]`, `/contacto`, `/libro-de-reclamacion`, `/cuentas-bancarias`, `/politicas-empresa`)
- [x] Validar Chakra UI v3 "Aura" y consistencia de tokens
- [x] Verificar cumplimiento de la **escala Fibonacci** declarada en README (`phi_xs` a `phi_3xl`)
- [x] Detectar patrones AI-slop (gradientes genéricos, copy vacío, layouts idénticos entre páginas)
- [x] Revisar `src/widgets/Navbar`, `src/widgets/Footer`: responsive, sticky, accesibilidad de menú móvil
- [x] Validar responsive en 375px / 768px / 1440px
- [x] Modo oscuro (`next-themes`): contraste WCAG AA en ambos modos
- [x] Jerarquía tipográfica y uso de headings (h1 único por página, h2/h3 semánticos)
- [x] Espaciado, ritmo vertical y grid consistency
- [x] Estados: hover, focus, active, disabled, loading, error
- [x] Animaciones `framer-motion`: duración, easing, respeto a `prefers-reduced-motion`
- [x] **Entregable:** `.audits/fase-1-ui-ux/findings.md` con:
  - Resumen ejecutivo (3–5 bullets)
  - Hallazgos 🔴 críticos / 🟡 medios / 🟢 menores (con `file_path:line_number`)
  - Matriz responsiva y validación Fibonacci
  - Patches sugeridos en bloques de código copiables
  - Quick wins vs mejoras de largo plazo

---

### **FASE 2 · Performance y arquitectura** ⬜ Pendiente — **Agente B**

> **Objetivo:** Performance, SEO técnico y composición React.

**Skills activas:** `vercel-react-best-practices`, `vercel-optimize`, `vercel-composition-patterns`, `vercel-react-view-transitions`, `react-doctor`

- [ ] **FSD:** violaciones de capa (e.g., `features` importando de `app`, `shared` importando de `widgets`)
- [ ] **Server vs Client Components:** mapear `"use client"` en `src/app/**/page.tsx` — minimizar cuando no haya estado/efectos
- [ ] **RSC fetch waterfalls:** identificar `await` secuenciales en server components; oportunidades de `Promise.all`
- [ ] **Suspense boundaries:** zonas donde falta streaming (loading.tsx vs skeleton)
- [ ] **Bundle:** ejecutar `ANALYZE=true pnpm build` → revisar `stats.html`; code-splitting; dynamic import de componentes pesados (`@react-google-maps/api`, animaciones `framer-motion`)
- [ ] **Imágenes:** uso de `next/image`, `priority` en LCP, formatos WebP/AVIF, ejecución de `scripts/optimize-images.mjs`
- [ ] **SEO técnico:** JSON-LD (Organization, LocalBusiness, Article, BreadcrumbList), sitemap dinámico, robots.txt, metadatos por ruta, OG/Twitter cards
- [ ] **Animaciones:** `framer-motion` → evaluar sustitución por `ViewTransition` API nativa (`<ViewTransition>`, `addTransitionType`, CSS `::view-transition-*`)
- [ ] **CLS:** `will-change` excesivo, fuentes con `font-display`, skeletons sincronizados
- [ ] **Lighthouse antes/después:** LCP < 2.5s, INP < 200ms, CLS < 0.1, TBT < 200ms
- [ ] **Vercel cost & performance:** Function Invocations, Build Minutes, Fast Data Transfer (si aplica)
- [ ] **Composición React:** boolean prop proliferation → sugerir compound components (`<Card.Header>`, `<Card.Body>`)
- [ ] **Entregable:** `.audits/fase-2-performance/findings.md` con métricas y plan de remediación priorizado.

---

### **FASE 3 · Calidad y testing** ✅ Completa — **Agente C**

> **Objetivo:** Higiene de código, cobertura y accesibilidad.

**Skills activas:** `react-doctor`, `webapp-testing`, `web-design-guidelines` (a11y)

- [x] `pnpm lint` — análisis de `eslint.config.js`: reglas `react`, `jsx-a11y`, `react-hooks`, `react-refresh`
- [x] `pnpm typecheck` (`tsconfig.build.json`) — errores TS, `any` ocultos, `@types/*` faltantes
- [x] **Tests Vitest + RTL:** cobertura actual por feature (`blog`, `projects`, `services`, reclamaciones); huecos críticos
- [x] **E2E Playwright:** smoke de rutas críticas; flujos de formularios (contacto, libro de reclamaciones)
- [x] **Accesibilidad:** axe-core en cada ruta; foco visible; ARIA correcto; navegación por teclado; lectores de pantalla
- [x] **Zod schemas (`zod ^4`):** validación de formularios cliente y payloads de Functions; mensajes de error user-friendly
- [x] **Errores:** logging con `pino`, manejo de errores en boundaries (`error.tsx`), estados vacíos
- [x] **Console clean:** verificar 0 errores/warnings en consola del navegador en producción
- [x] **Entregable:** `.audits/fase-3-calidad/findings.md` con bugs/riesgos ordenados por severidad.

---

### **FASE 4 · Backend & DevOps** ✅ Completa — **Agente D**

> **Objetivo:** Auditoría de backend Firebase y pipeline de deploy (modo **solo lectura**).

**Skills activas:** `vercel-optimize`, `vercel-cli-with-tokens`, `deploy-to-vercel`

- [x] `functions/` (Node 20+, Functions v2): revisión de handlers (`onCall`, `onRequest`), secretos vía Secret Manager
- [x] Manejo de errores en Functions: try/catch, logging, retries, timeouts, cold starts
- [x] **Firestore rules (`firestore.rules`):** principios de least privilege; validación de tipos; reglas por colección
- [x] **Storage rules (`storage.rules`):** paths permitidos, validaciones de tamaño/tipo MIME
- [x] **Resend** (transaccional HTML): anti-spam headers, plantillas, rebote/bounce handling
- [x] **`firebase.json`:** rewrites, headers de seguridad (CSP, HSTS, X-Frame-Options), cache policies
- [x] **Pipeline de deploy:** `deploy:hosting` y `deploy:functions`; secretos en CI; rollback plan
- [x] **Costos (Firebase + Vercel):** cuotas, alertas, proyecciones de billing
- [x] **Entregable:** `.audits/fase-4-backend/findings.md` con hallazgos de seguridad y costo.

---

### **FASE 5 · Documentación y entrega** ⬜ Pendiente — **Agente E**

> **Objetivo:** Consolidar hallazgos, actualizar docs y entregar.

**Skills activas:** `writing-guidelines`, `doc-coauthoring`, `discernment-nudge`

- [ ] Actualizar `README.md` con resultados de la auditoría (sección "Mantenimiento y Auditoría")
- [ ] Actualizar `ARCHITECTURE.md` si hubo hallazgos estructurales
- [ ] Actualizar `AI_HANDOFF.md` con learnings para futuros agentes
- [ ] Generar `.audits/INFORME_FINAL.md`:
  - Resumen ejecutivo (1 página)
  - Tabla resumen: hallazgos 🔴/🟡/🟢 por fase
  - ROI de cambios estimados
  - Quick wins (≤ 1 día) vs largo plazo (> 1 sprint)
  - Métricas antes/después (si hubo cambios)
- [ ] Marcar este `PLAN_AUDITORIA_GYA.md` como ✅ al 100%
- [ ] Verificar que **cada fase tiene su commit** (regla global #6) — historial esperado en `audit/gya-q3-2026`:
  - `chore(audit): phase-0 baseline`
  - `docs(audit): phase-1 ui/ux findings`
  - `perf(audit): phase-2 performance findings`
  - `test(audit): phase-3 quality & testing findings`
  - `security(audit): phase-4 backend & devops findings`
  - `docs(audit): phase-5 final report & handoff`
- [ ] Generar PR hacia `main` con el resumen del `INFORME_FINAL.md`

---

## 🔒 Reglas globales (para todos los agentes)

1. **Solo lectura por defecto.** Todo cambio propuesto debe ir en formato `PATCH:` en bloques copiables.
2. **No modificar `package.json`** ni `pnpm-lock.yaml` sin aprobación explícita del usuario.
3. **Respetar arquitectura FSD.** Capa `app` no importa de `features`/`widgets` (salvo patrón estándar de Next).
4. **Mantener proporción áurea / escala Fibonacci** declarada en `README.md`.
5. **No exponer secretos.** Si encuentras un secreto hardcodeado, **NO** lo pegues en el reporte; indícalo como hallazgo crítico y sugiere remediación.
6. **⚠️ OBLIGATORIO: 1 commit por cada fase terminada.** Al cerrar una fase, el agente DEBE crear su commit con el formato Conventional Commits definido en `.audits/AGENTS.md` (sección "Convenciones de commits"). Una fase NO se considera cerrada sin su commit. Ejemplos:
   - Fase 0 → `chore(audit): phase-0 baseline`
   - Fase 1 → `docs(audit): phase-1 ui/ux findings`
   - Fase 2 → `perf(audit): phase-2 performance findings`
   - Fase 3 → `test(audit): phase-3 quality & testing findings`
   - Fase 4 → `security(audit): phase-4 backend & devops findings`
   - Fase 5 → `docs(audit): phase-5 final report & handoff`
7. **Cada hallazgo debe referenciar `file_path:line_number`** cuando aplique.
8. **Severidad obligatoria:** 🔴 crítico (bloquea release) · 🟡 medio (deuda significativa) · 🟢 menor (nit).
9. **Patches deben ser mínimos y reversibles.**
10. **Commits de código del proyecto** (fuera de `.audits/`) sí requieren aprobación humana previa; los commits de findings dentro de `.audits/` están siempre permitidos al cerrar fase.

---

## 🔄 Cómo actualizar este archivo

Cualquier agente puede actualizar el checklist de su fase conforme avanza:

```markdown
## **FASE 1 · UI/UX y diseño** 🟡 En curso — **Agente A**

- [x] Auditar páginas públicas
- [x] Validar Chakra UI v3
- [🟡] Verificar escala Fibonacci *(en progreso)*
- [ ] Detectar patrones AI-slop
...
```

Actualizar también la tabla de **Estado global de fases** y la columna **Fecha cierre**.

---

## 📅 Bitácora

| Fecha | Agente | Acción |
|---|---|---|
| 2026-08-20 | Humano + Claude | Plan inicial aprobado y materializado |
| 2026-08-20 | Claude (setup) | Plantillas de findings Fases 1–4 completadas, INFORME_FINAL placeholder, baseline README + inventario FSD, regla global #6 (1 commit por fase) añadida, .gitignore configurado |
| 2026-08-20 | Agente A (UI/UX) | Auditoría Fase 1 finalizada: 23 hallazgos (🔴 5, 🟡 10, 🟢 8), reporte exhaustivo en .audits/fase-1-ui-ux/findings.md |
| 2026-08-20 | Agente D (Backend) | Auditoría Fase 4 finalizada: 16 hallazgos (🔴 4, 🟡 6, 🟢 6), reporte en .audits/fase-4-backend/findings.md |
| 2026-08-20 | Agente C (QA & A11y) | Auditoría Fase 3 finalizada: 15 hallazgos (🔴 3, 🟡 7, 🟢 5), 154 tests validados, sincronización Zod, reporte en .audits/fase-3-calidad/findings.md |

---

## 🔗 Referencias rápidas

- `.audits/README.md` — instrucciones para otros agentes AI
- `.audits/AGENTS.md` — definición operativa de los 5 agentes
- `.audits/INFORME_FINAL.md` — se genera al cierre
- `README.md` (raíz) — protocolo de IA del proyecto
- `AI_HANDOFF.md` — protocolo de handoff entre agentes (citado en README)