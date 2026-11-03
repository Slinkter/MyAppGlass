# 🪶 Plan de Diagnóstico y Optimización de Peso del Repositorio (`MyAppGlass`)

> **Documento vivo de seguimiento en tiempo real.** Se actualiza al cerrar cada fase con su commit preventivo.
> **Rama de trabajo:** `chore/optimizacion-peso-repo`
> **Objetivo:** Eliminar `23.37 MB` de imágenes muertas rastreadas en Git (`61` archivos en `apps/web/src/assets/` y `apps/web/public/images/`), reducir en `-5.27 MB` el artefacto desplegable a Firebase Hosting (`apps/web/out/`) y sanear `~1.04 GB` de cachés acumulados (`.next` y paquetes huérfanos en `node_modules/.pnpm`).

---

## 📊 Barra de Progreso en Tiempo Real

```text
Progreso Global: [████████████] 100% (4 / 4 Fases completadas)
├── [🟢 100%] Fase 0: Creación de Rama, Registro de Plan Maestro y Commit Preventivo Inicial
├── [🟢 100%] Fase 1: Purga de 31 imágenes JPG/PNG muertas en apps/web/src/assets/ (-18.10 MB)
├── [🟢 100%] Fase 2: Purga de 30 imágenes huérfanas en apps/web/public/images/ (-5.27 MB)
└── [🟢 100%] Fase 3: Saneamiento de Cachés (.next + .pnpm), Build Limpio y Cierre Documental
```

---

## 📈 3. Balance Comparativo de Reducción de Peso (Antes vs. Después)

| Ubicación / Módulo | Peso Inicial | Peso Final | Reducción Lograda | Impacto en el Proyecto |
|---|---:|---:|---:|---|
| **`apps/web/src/assets/`** | `18.30 MB` | **`0.20 MB`** | **`-18.10 MB` (-98.9%)** | Eliminadas 31 imágenes de alta resolución sin referencias. Git ya no rastrea estos binarios pesados. |
| **`apps/web/public/images/`** | `7.60 MB` | **`2.93 MB`** | **`-4.67 MB` (-61.4%)** | Eliminadas 30 imágenes huérfanas; conservadas exclusivamente las 18 en uso. |
| **`apps/web/out/` (Firebase Hosting)** | `20.69 MB` | **`17.54 MB`** | **`-3.15 MB` (-15.2%)** | Despliegue más rápido y menor consumo de ancho de banda en Firebase Hosting. |
| **`apps/web/.next/` (Caché compilación)** | `790.32 MB` | **`499.25 MB`** | **`-291.07 MB` (-36.8%)** | Limpieza total de cachés viejos acumulados de Webpack/Turbopack. |
| **`node_modules/`** | `1,011.09 MB` | **`747.01 MB`** | **`-264.08 MB` (-26.1%)** | Poda de paquetes y enlaces huérfanos de compilaciones anteriores. |
| **`apps/` total** | `839.69 MB` | **`522.72 MB`** | **`-316.97 MB` (-37.8%)** | La carpeta de aplicaciones redujo su tamaño total considerablemente. |
| **Total Proyecto en Disco** | **`~1,895 MB`** | **`~1,314 MB`** | **`-581 MB` (-30.7%)** | Saneamiento inmediato de espacio y artefactos limpios. |

---

## 🔍 1. Diagnóstico Inicial de Peso (Línea Base)

Al auditar el repositorio antes de comenzar (`commit 089a45a`), el proyecto ocupaba **`~1,895 MB` (`1.89 GB`)** en disco distribuidos en 5 fuentes:

| Categoría | Carpeta / Origen | Peso Inicial | ¿En Git? | ¿En Hosting? | Diagnóstico Técnico |
|---|---|---:|:---:|:---:|---|
| **1. Dependencias y paquetes huérfanos** | `node_modules/` | `1,011.09 MB` | ❌ No | ❌ No | En `node_modules/.pnpm` quedaron copias duplicadas de instalaciones previas: `next@16.4.3` duplicado (`183.21 MB × 2`), `lucide-react@1.64.0` duplicado (`36.20 MB × 2`), `typescript` (`5.9.3` + `6.0.3`) y `@firebase/database` (`1.0.8` + `1.1.5`). |
| **2. Caché acumulado de compilación** | `apps/web/.next/` | `790.32 MB` | ❌ No | ❌ No | `.next/cache` acumula `581.50 MB` (Webpack) y `.next/dev` acumula `190.25 MB` (Turbopack). |
| **3. Imágenes originales sin uso en `src/`** | `apps/web/src/assets/` | `18.30 MB` | ✅ Sí | ❌ No | `31` imágenes `.jpg`/`.png` de alta resolución (`18.10 MB`) sin ningún `import` en el código fuente. Solo se usan `5` archivos SVG/TSX (`0.20 MB`). |
| **4. Imágenes huérfanas en `public/` y `out/`** | `apps/web/public/images/` + `out/images/` | `15.20 MB` (`7.60 MB × 2`) | ✅ Sí (`public/`) | ✅ Sí (`out/`) | De `48` archivos en `public/images/` (`7.60 MB`), `30` archivos (`5.27 MB`) no tienen referencias en el código y se duplican en `apps/web/out/images/` en cada build. |
| **5. Historial `.git` y documentación** | `.git/` + `docs/` + `.agents/` | `44.32 MB` | ✅ Sí | ❌ No | `.git` ocupa `33.40 MB` (`size-pack: 33.15 MiB` por el historial de commits) y `docs/` ocupa `5.44 MB`. |

---

## ✅ 2. Checklist de Ejecución por Fase

### Fase 0: Creación de Rama, Documento Maestro y Commit Preventivo Inicial
- [x] **0.1.** Crear rama dedicada `chore/optimizacion-peso-repo` desde `main`.
- [x] **0.2.** Registrar el diagnóstico y plan en `docs/16_PLAN_OPTIMIZACION_PESO_REPO.md`.
- [x] **0.3.** Crear Commit Preventivo 0 (`docs(plan): registrar plan de diagnóstico y optimización de peso del repositorio`).

### Fase 1: Purga de 31 imágenes muertas en `apps/web/src/assets/` (`-18.10 MB`)
- [x] **1.1.** Conservar únicamente los 5 archivos en uso (`branding/logosvg.svg`, `branding/LogoIcon.tsx`, `bbva.svg`, `banconacion.svg`, `libro.svg`).
- [x] **1.2.** Eliminar `apps/web/src/assets/common/` (`11` archivos, `9.26 MB`), `apps/web/src/assets/home/` (`8` archivos, `7.56 MB`), `apps/web/src/assets/clients/` (`3` archivos, `1.14 MB`), `apps/web/src/assets/firma/` (`7` archivos, `29.4 KB`), `glassqr2026.jpg` (`71.7 KB`) y `branding/LogoCompanytrans.png` (`42.1 KB`).
- [x] **1.3.** Validar `pnpm run typecheck` y actualizar barra de progreso al `50%`.
- [x] **1.4.** Crear Commit Preventivo 1 (`chore(assets): eliminar 31 imagenes jpg/png sin uso en apps/web/src/assets (-18.1 MB)`).

### Fase 2: Purga de 30 imágenes huérfanas en `apps/web/public/images/` (`-5.27 MB`)
- [x] **2.1.** Conservar intactas las 18 imágenes referenciadas por Blog, Clientes, Simulador AI, Cuentas Bancarias, SEO/Navbar y Design System (`2.33 MB`).
- [x] **2.2.** Eliminar las 30 imágenes sin referencias (`home-img_t03..t04`, `home-img_t06..t14`, `common-*.webp`, `branding-logovcr.webp` y `firma-*.webp`).
- [x] **2.3.** Validar y actualizar barra de progreso al `75%`.
- [x] **2.4.** Crear Commit Preventivo 2 (`chore(public): eliminar 30 imagenes huerfanas en apps/web/public/images (-5.27 MB)`).

### Fase 3: Saneamiento de Cachés (`.next` + `.pnpm`), Build Limpio y Cierre Documental
- [x] **3.1.** Eliminar `apps/web/.next` (`790.32 MB`) y `apps/web/tsconfig.build.tsbuildinfo` (`1.35 MB`).
- [x] **3.2.** Podar paquetes huérfanos duplicados en `node_modules/.pnpm` y ejecutar `git gc --prune=now`.
- [x] **3.3.** Ejecutar `pnpm run typecheck && pnpm run lint && pnpm run build` y medir los pesos finales.
- [x] **3.4.** Actualizar tabla comparativa final en `docs/16_PLAN_OPTIMIZACION_PESO_REPO.md` (`100%`), `docs/05_CHANGELOG.md` y `docs/README.md`.
- [x] **3.5.** Crear Commit Preventivo 3 (`docs(repo): cerrar plan de optimización de peso y actualizar changelog`).
