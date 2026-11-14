# Renders pendientes del catálogo de servicios (Nano Banana)

> **Alcance:** solo sistemas **visibles** en la web pública (`32` sistemas). Los `18` sistemas ocultos en `sortServiceSystems.ts` quedan excluidos.
> **Estado:** `11 / 32` renders visibles completados · **`21` renders pendientes** *(además existen `8` renders ya generados de series hoy ocultas en `ventana`)*.
> **Restricción operativa:** con **Nano Banana** solo se pueden generar **máximo 10 renders por sesión/lote**. En el Lote 1 se generaron `7` y `3` alcanzaron límite de cuota (`429 RESOURCE_EXHAUSTED` en `gemini-3.1-flash-image`).
> **Fuente de verdad:**
> - Prompts y catálogo completo: `apps/web/src/screens/ImagenGenerator/serviceSystemPrompts.ts`
> - Registro activo de renders en la web: `apps/web/src/entities/system/ui/systemRenders.ts`
> - Visibilidad actual en la web pública: `apps/web/src/entities/service/lib/sortServiceSystems.ts`

---

## 1. Resumen por servicio (solo visibles)

| Servicio (`slug`) | Visibles | Ocultos (excluidos) | Visibles con render | Visibles faltantes |
| --- | ---: | ---: | ---: | ---: |
| `ventana` | 6 | 11 | 6 | 0 |
| `mampara` | 3 | 6 | 2 (`Nova`, `Serie 80`) | 1 (`Serie 25`) |
| `ducha` | 3 | 1 | 2 (`Kit 1 hoja`, `Kit esquinero`) | 1 (`Kit de ducha corredizo`) |
| `frenos-hidraulicos` | 4 | 0 | 0 | 4 *(sin fotos reales en Firestore)* |
| `baranda` | 3 | 0 | 0 | 3 |
| `parapeto` | 3 | 0 | 0 | 3 |
| `pserie` | 3 | 0 | 0 | 3 |
| `pvidrio` | 2 | 0 | 0 | 2 |
| `balcones` | 1 | 0 | 0 | 1 |
| `celosias` | 1 | 0 | 0 | 1 |
| `espejos` | 1 | 0 | 0 | 1 *(sin fotos reales en Firestore)* |
| `techo` | 1 | 0 | 0 | 1 |
| `mantenimiento` | 1 | 0 | 1 | 0 |
| **Total** | **32** | **18** | **11** | **21** |

---

## 2. Renders visibles ya completados (11)

| Servicio | Sistema | Archivo actual |
| --- | --- | --- |
| `ventana` | `Nova` | `/images/renders/ventana/nova.webp` |
| `ventana` | `Serie 20` | `/images/renders/ventana/serie-20.webp` |
| `ventana` | `Serie 25` | `/images/renders/ventana/serie-25.webp` |
| `ventana` | `Serie 35` | `/images/renders/ventana/serie-35.webp` |
| `ventana` | `Serie 62` | `/images/renders/ventana/serie-62.webp` |
| `ventana` | `Serie 3831` | `/images/renders/ventana/serie-3831.webp` |
| `mampara` | `Nova` | `/images/renders/mampara/nova.webp` |
| `mampara` | `Serie 80` | `/images/lab/mampara-europea-serie80.webp` |
| `ducha` | `Kit de ducha de 1 hoja` | `/images/lab/box-ducha-kit-frontal.webp` |
| `ducha` | `Kit de ducha esquinero` | `/images/renders/ducha/kit-esquinero.webp` |
| `mantenimiento` | `Mantenimiento Preventivo y Correctivo` | `/images/renders/mantenimiento/mantenimiento-preventivo.webp` |

*(Los 8 renders ya generados de series hoy ocultas en `ventana` —`Serie 28`, `Serie 29`, `Serie 3825`, `Serie 42`, `Serie 80`, `VCO 031`, `VCO 036`, `VCO 042`— permanecen en `public/images/renders/ventana/`, todos con variantes `-480w.webp` y `-960w.webp`.)*

---

## 3. Plan de generación por lotes (máx. 10 por lote en Nano Banana)

### Lote 1 (7 completados / 3 pendientes por cuota `429`)

- [x] `ventana` · **Nova** (`ventana-nova`) → `/images/renders/ventana/nova.webp`
- [x] `ventana` · **Serie 25** (`ventana-serie-25`) → `/images/renders/ventana/serie-25.webp`
- [x] `ventana` · **Serie 35** (`ventana-serie-35`) → `/images/renders/ventana/serie-35.webp`
- [x] `ventana` · **Serie 62** (`ventana-serie-62`) → `/images/renders/ventana/serie-62.webp`
- [x] `mampara` · **Nova** (`mampara-nova`) → `/images/renders/mampara/nova.webp`
- [ ] `mampara` · **Serie 25** (`mampara-serie-25`) → `/images/renders/mampara/serie-25.webp` *(429 cuota)*
- [ ] `ducha` · **Kit de ducha corredizo** (`ducha-kit-corredizo`) → `/images/renders/ducha/kit-corredizo.webp` *(429 cuota)*
- [x] `ducha` · **Kit de ducha esquinero** (`ducha-kit-esquinero`) → `/images/renders/ducha/kit-esquinero.webp`
- [ ] `espejos` · **Espejo Flotante a Medida** (`espejo-flotante`) → `/images/renders/espejos/espejo-flotante.webp` *(429 cuota)*
- [x] `mantenimiento` · **Mantenimiento Preventivo y Correctivo** (`mantenimiento-preventivo`) → `/images/renders/mantenimiento/mantenimiento-preventivo.webp`

### Lote 2 (10 renders) — Frenos hidráulicos, puertas y baranda principal

- [ ] `frenos-hidraulicos` · **Freno Hidráulico de Piso** (`freno-piso-estandar`) → `/images/renders/frenos-hidraulicos/freno-piso-estandar.webp`
- [ ] `frenos-hidraulicos` · **Bisagra Aérea Hidráulica** (`freno-bisagra-aerea`) → `/images/renders/frenos-hidraulicos/bisagra-aerea.webp`
- [ ] `frenos-hidraulicos` · **Freno hidráulico de piso Sevax** (`freno-sevax`) → `/images/renders/frenos-hidraulicos/freno-sevax.webp`
- [ ] `frenos-hidraulicos` · **Freno hidráulico de piso Dorma** (`freno-dorma`) → `/images/renders/frenos-hidraulicos/freno-dorma.webp`
- [ ] `pvidrio` · **Sistema Pivotante con Freno de Piso** (`pvidrio-pivotante-freno`) → `/images/renders/pvidrio/pivotante-freno.webp`
- [ ] `pvidrio` · **Puerta de vidrio templado** (`pvidrio-templado-batiente`) → `/images/renders/pvidrio/puerta-templado.webp`
- [ ] `pserie` · **Sistema Puerta Serie** (`pserie-sistema-puerta`) → `/images/renders/pserie/sistema-puerta-serie.webp`
- [ ] `pserie` · **Serie 35** (`pserie-35`) → `/images/renders/pserie/serie-35.webp`
- [ ] `pserie` · **Serie 36** (`pserie-36`) → `/images/renders/pserie/serie-36.webp`
- [ ] `baranda` · **Sistema Baranda Minimalista** (`baranda-minimalista`) → `/images/renders/baranda/baranda-minimalista.webp`

### Lote 3 (8 renders) — Barandas restantes, parapetos, balcones, celosías y techo

- [ ] `baranda` · **Sistema Baranda con Pasamanos Tubular** (`baranda-pasamanos-tubular`) → `/images/renders/baranda/pasamanos-tubular.webp`
- [ ] `baranda` · **Baranda de acero inoxidable** (`baranda-acero-inox`) → `/images/renders/baranda/acero-inox.webp`
- [ ] `parapeto` · **Sistema Parapeto Panorámico** (`parapeto-panoramico`) → `/images/renders/parapeto/panoramico.webp`
- [ ] `parapeto` · **Sistema Muro Cortina Stick (MCS-034)** (`parapeto-stick`) → `/images/renders/parapeto/muro-cortina-stick.webp`
- [ ] `parapeto` · **Sistema Muro Cortina Frame / Unitizado (MCF-034 / MCF-045)** (`parapeto-unitizado`) → `/images/renders/parapeto/muro-cortina-unitizado.webp`
- [ ] `balcones` · **Sistema Panorámico** (`balcon-panoramico`) → `/images/renders/balcones/sistema-panoramico.webp`
- [ ] `celosias` · **Sistema Celosía Fija y Móvil** (`celosia-fija-movil`) → `/images/renders/celosias/celosia-fija-movil.webp`
- [ ] `techo` · **Sistema Cobertura Aluminio** (`techo-cobertura-aluminio`) → `/images/renders/techo/cobertura-aluminio.webp`

---

## 4. Sistemas ocultos excluidos (18)

No se generan renders mientras permanezcan ocultos en `apps/web/src/entities/service/lib/sortServiceSystems.ts`:

- **`ventana` (11):** `Serie 28`, `Serie 29`, `Serie 3825`, `Serie 80`, `Corrediza VCO 031`, `Corrediza VCO 036`, `Corrediza VCO 042`, `Corrediza VCO 043`, `Serie 42`, `Proyectante VPR 036`, `Proyectante VPR 042`.
- **`mampara` (6):** `Serie 7038`, `Corrediza MCO 042`, `Corrediza MCO 043`, `Corrediza MCO 044`, `Batiente MBT 035`, `Batiente MBT 036`.
- **`ducha` (1):** `Sistema Corredizo`.

---

## 5. Flujo técnico para fidelidad y adaptación web/móvil (`sharp` + Next.js)

1. **Fidelidad a la ficha técnica:** antes de generar cada imagen en Nano Banana, consultar `systemSheets` en `docs/contenido/servicios/<servicio>.json` (tipo de apertura, espesor de vidrio, perfil/serie y herrajes) y el prompt base en `apps/web/src/screens/ImagenGenerator/serviceSystemPrompts.ts`.
2. **Optimización con `sharp` (web y móvil):**
   - El proyecto usa `sharp` en `scripts/optimize-project-photos.mjs` (1200 px web / 600 px móvil) y `scripts/optimize-storage-images.mjs` (variantes `-480w.webp` y `-960w.webp`).
   - Al exportar los renders de Nano Banana, convertirlos con `sharp` a `.webp` generando variantes responsivas (p. ej. base `1200px` + `-960w.webp` + `-480w.webp`) en `apps/web/public/images/renders/<servicio>/`.
   - **Nota sobre `imageLoader.ts`:** actualmente `apps/web/src/shared/utils/imageLoader.ts` solo aplica variantes `-480w.webp` / `-960w.webp` a `cover.webp` de Firebase Storage y a `/images/clients-*.webp`; para `/images/renders/...` devuelve el `src` directo. Cuando se generen las variantes responsivas de los renders, agregar la regla `/^\/images\/renders\/.*\.webp$/` en `gyaImageLoader` para que móvil cargue `-480w.webp` automáticamente.
3. **Registro y validación:**
   - Registrar las rutas base en `SERVICE_RENDERS` dentro de `apps/web/src/entities/system/ui/systemRenders.ts`.
   - Marcar los ítems completados en este documento y validar con `pnpm run typecheck && pnpm run lint && pnpm run build`.
