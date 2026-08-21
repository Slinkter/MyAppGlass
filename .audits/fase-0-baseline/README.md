# Fase 0 — Baseline · Portal GYA

> **Estado:** ⬜ Pendiente  
> **Objetivo:** Capturar la línea base del proyecto antes de cualquier auditoría o cambio.  
> **Rama:** `audit/gya-q3-2026`

---

## Checklist de ejecución

```bash
# 1. Rama de trabajo
git checkout -b audit/gya-q3-2026

# 2. Entorno
node --version > .audits/fase-0-baseline/metrics/env.txt
pnpm --version >> .audits/fase-0-baseline/metrics/env.txt

# 3. Instalación limpia
pnpm install

# 4. Snapshots (guardar salida en metrics/)
pnpm lint        > .audits/fase-0-baseline/metrics/lint.txt
pnpm typecheck   > .audits/fase-0-baseline/metrics/typecheck.txt
pnpm test:run    > .audits/fase-0-baseline/metrics/test.txt
pnpm build       > .audits/fase-0-baseline/metrics/build.txt
```

---

## Lighthouse (rutas clave)

> Ejecutar contra build de producción (`pnpm start` tras `pnpm build`) y guardar JSON/HTML en `metrics/lighthouse/`.

| Ruta | Perf | A11y | Best Practices | SEO | LCP | INP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | — | — | — | — | — | — | — |
| `/blog` | — | — | — | — | — | — | — |
| `/proyectos` | — | — | — | — | — | — | — |
| `/contacto` | — | — | — | — | — | — | — |

---

## Screenshots responsive

> Guardar en `screenshots/` con nomenclatura: `{ruta}-{breakpoint}.png`

- [ ] `home-375.png` · `home-768.png` · `home-1440.png`
- [ ] `blog-1440.png`
- [ ] `proyectos-1440.png`
- [ ] `contacto-375.png`
- [ ] `libro-reclamaciones-768.png`

---

## Entregables de esta fase

1. `metrics/lint.txt`, `typecheck.txt`, `test.txt`, `build.txt`, `env.txt`
2. `metrics/lighthouse/*.json|html`
3. `screenshots/*.png`
4. `fsd-inventory.md` (completado)
5. Commit: `chore(audit): phase-0 baseline`

---

## Criterio de cierre

- [ ] Todos los snapshots capturados sin errores de ejecución
- [ ] Inventario FSD completado
- [ ] Commit creado
- [ ] `.audits/PLAN_AUDITORIA_GYA.md` actualizado (Fase 0 → ✅)