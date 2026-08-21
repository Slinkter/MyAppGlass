# Fase 2 — Performance y Arquitectura · Findings

> **Agente:** B — Performance Engineer  
> **Skills activas:** `vercel-react-best-practices`, `vercel-optimize`, `vercel-composition-patterns`, `vercel-react-view-transitions`, `react-doctor`  
> **Estado:** ⬜ Pendiente  
> **Rama:** `audit/gya-q3-2026`  
> **Inicio:** — · **Cierre:** —

---

## 📌 Alcance

Performance, SEO técnico y composición React en el Portal GYA (Next.js 16 App Router).

**Áreas:**
- Server vs Client Components (`src/app/**`)
- RSC waterfalls y Suspense boundaries
- Bundle size y code-splitting (`@react-google-maps/api`, `framer-motion`)
- Imágenes (`next/image`, WebP/AVIF, `scripts/optimize-images.mjs`)
- SEO técnico (JSON-LD, sitemap, robots, OG/Twitter cards)
- Animaciones (`framer-motion` vs ViewTransition API nativa)
- Core Web Vitals: LCP < 2.5s · INP < 200ms · CLS < 0.1 · TBT < 200ms

---

## 📊 Métricas baseline (de `.audits/fase-0-baseline/`)

| Métrica | Valor | Objetivo | Estado |
|---|---|---|---|
| LCP | — | < 2.5s | — |
| INP | — | < 200ms | — |
| CLS | — | < 0.1 | — |
| TBT | — | < 200ms | — |
| Bundle JS (gzip) | — | — | — |

---

## 📊 Resumen ejecutivo

> _A llenar por el agente al cerrar la fase (3–5 bullets)_

- 🔴 Hallazgos críticos: —
- 🟡 Hallazgos medios: —
- 🟢 Hallazgos menores: —

---

## 🔴 Hallazgos críticos

| # | Título | Archivo | Impacto métrica | Esfuerzo |
|---|---|---|---|---|
| — | — | — | — | — |

## 🟡 Hallazgos medios

| # | Título | Archivo | Impacto métrica | Esfuerzo |
|---|---|---|---|---|
| — | — | — | — | — |

## 🟢 Hallazgos menores

| # | Título | Archivo | Impacto métrica | Esfuerzo |
|---|---|---|---|---|
| — | — | — | — | — |

---

## 🧩 Inventario Server vs Client Components

> _Mapeo de `"use client"` por ruta_

| Ruta | Tipo | Justificación de `"use client"` | ¿Evitable? |
|---|---|---|---|
| — | — | — | — |

---

## 🎬 Animaciones: framer-motion vs ViewTransition

> _Evaluar sustitución por `<ViewTransition>`, `addTransitionType`, CSS `::view-transition-*`_

| Componente | Uso actual | ¿Sustituible? | Alternativa propuesta |
|---|---|---|---|
| — | — | — | — |

---

## 🚀 Quick wins (≤ 1 día)

1. —
2. —

## 🏗️ Mejoras de largo plazo (> 1 sprint)

1. —

---

## 🔄 Log de actividad del agente

| Fecha | Acción |
|---|---|
| — | Inicio de fase |

---

**Próximo paso:** al cerrar, actualizar `.audits/PLAN_AUDITORIA_GYA.md` y commitear con formato `perf(audit): phase-2 performance findings` (ver `.audits/AGENTS.md`).