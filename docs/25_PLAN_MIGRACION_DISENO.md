# Plan 25 · Migración del código al sistema de diseño único

- **Fecha de inicio:** 2026-11-09
- **Rama:** `feat/migracion-diseno`
- **Fuente de verdad:** [`apps/web/DESIGN.md`](../apps/web/DESIGN.md) (visual) y [`apps/web/PRODUCT.md`](../apps/web/PRODUCT.md) (producto). Decisiones del dueño en [`CUESTIONARIO-DISENO.md`](./CUESTIONARIO-DISENO.md).
- **Referencias temporales (se eliminan en la Fase 8):** `DESIGN-SYSTEM.md`, `BRAND-KIT.md`, `PROMPT-REDISENO-DS.md`, `23_PLAN_DESIGN_SYSTEM_V2.md`.

## Reglas de trabajo

1. Un commit al cerrar cada fase, con mensaje `tipo(diseno): fase N · resumen`. Sin push ni deploy sin orden del dueño.
2. Validación al cerrar cada fase: `pnpm run typecheck && pnpm run lint && pnpm run build`. No ejecutar `test:run` salvo pedido. No correr `build` con `pnpm run dev` activo (comparten `apps/web/.next`).
3. No se toca `apps/functions/`, `firestore.rules` ni `firebase.json`.
4. Si un dato falta (precio, plazo, catálogo técnico), se deja un marcador visible y se pregunta; no se inventa.
5. Orquestación: Claude coordina y revisa; agentes Haiku hacen migraciones mecánicas en archivos disjuntos (nunca dos agentes sobre el mismo archivo) y Claude verifica con `grep` y las pruebas de la fase.
6. El checklist de cada fase se actualiza al terminar cada tarea, antes del commit.

## Estado general

| Fase | Contenido | Estado |
|---|---|---|
| 0 | Rama, plan y línea base | Hecha |
| 1 | Tokens del tema | Hecha |
| 2 | Botones, campos y recetas base | Hecha |
| 3 | Tarjetas y galerías | Hecha |
| 4 | Navegación y elementos globales | Hecha |
| 5 | Desviaciones por área (hex, rgba, `colorPalette`, hover, degradados, emojis, px) | Hecha (con pendientes) |
| 6 | Página principal para constructoras y datos del negocio | Hecha (con datos por confirmar) |
| 7 | `/design-system` | Hecha |
| 8 | Cierre: eliminar documentos viejos y verificar | Hecha |

---

## Fase 0 · Rama, plan y línea base

Objetivo: dejar el punto de partida medido para poder comparar al final.

- [x] Crear la rama `feat/migracion-diseno`.
- [x] Escribir `apps/web/DESIGN.md` y `apps/web/.impeccable/design.json`.
- [x] Escribir este plan e indexarlo en `docs/README.md`.
- [x] Línea base: `pnpm run typecheck` limpio y `pnpm run lint` con 0 errores y 2 advertencias previas (`react-refresh/only-export-components` en `ImageReveal.tsx:42` y `Gallery.tsx:303`).
- [x] Línea base de desviaciones (conteos del 2026-11-09): 74 hex, 54 `rgba`, 38 `colorPalette`, ~69 `_hover`, 12 degradados, 3 emojis, 65 `px` literales, 107 usos de `navy`/`#002060`/`#FBF8F3`, 3 `vh`.
- [x] Commit de la fase.

---

## Fase 1 · Tokens del tema

Archivo principal: `apps/web/src/shared/providers/theme/index.ts`. Solo el orquestador edita este archivo.

- [x] Fondo blanco: `bg.page`, `bg.section`, `bg.warm` y `bg.paper` pasan a blanco en modo claro (modo oscuro sin cambio). Verificado en el navegador: el cuerpo es `rgb(255, 255, 255)`.
- [x] Nombres canónicos de marca: `brand.ink`, `inkHover`, `inkActive`, `inkSoft`, `quoteRed`, `logoCoral` y `accent.ink`/`accent.inkContrast`. Pendiente (Fase 5): renombrar `border.warm`/`border.warmStrong` a `line`/`line-strong`.
- [x] Familia `navy` convertida en alias de `ink` (`brand.navy*`, `accent.navy*`, `bg.tintNavy` → `bg.tint`, ahora neutro sin azul). Verificado en el navegador que los alias resuelven.
- [x] Rojo unificado: se eliminó `redQuote`; `quoteRed` (#D62828) es el único rojo de título. Los 3 usos se migraron.
- [x] Destino de `brand.red` (#FF5A5F): se retira junto con la variante de botón `brand` en la Fase 2 (marcado `@deprecated`).
- [x] Duplicados de valor: `surface.card` pasa a alias de `bg.surface`; `brand.ink` ahora vale #111111 (antes slate) y se eliminó `inkV2`. `bg.warm`/`bg.paper` quedan como alias `@deprecated` hasta la Fase 5.
- [x] Tokens sin uso eliminados (verificado con `rg`): `inkV2`, `paperWarm`, `paperCream`, `border.slate`, `surface.nav`, `text.subtle`, sombra `adminTable`, `GLASS_BLUR_SM`, `glassOnPhoto`, `glassControl`.
- [x] `glass.ts`: un solo `GLASS_BLUR` con `saturate(1.4)` (antes la constante decía 180 % y el código 1,4); fallback sólido usa `bg.surface`.
- [x] Tipografía: `lineHeights` y `letterSpacings` definidos según `DESIGN.md`; títulos de `Card` y `Alert` en Lora pasan de peso 500 a 700. **El peso 900 (27 usos) se migra en la Fase 5.**
- [x] Anchos de página: tokens `sizes.pageNarrow` (56rem), `pageDefault` (72rem) y `pageWide` (80rem). **Migrar los 6 anchos actuales a estos tokens en la Fase 5.**
- [x] Validación: `typecheck` limpio, `lint` 0 errores (2 advertencias previas), `build` en verde.
- [x] Commit de la fase.

Notas de la fase:
- El hook de Impeccable marcó `fontFamily: "heading"` como fuente fuera de `DESIGN.md`. Es un falso positivo (el token resuelve a Lora): se registró un `ignore-value` en `.impeccable/config.json`.
- Alias temporales a eliminar en la Fase 5: `brand.navy*`, `accent.navy*`, `bg.tintNavy`, `bg.warm`, `bg.paper`.

---

## Fase 2 · Botones, campos y recetas base

Archivos: recetas en el tema, `apps/web/src/components/ui/`.

- [x] Botones sin mayúsculas: variantes `primary`, `outline`, `ghost` y `whatsapp` (según `DESIGN.md`). Verificado en el navegador: `text-transform: none`, primario `#111111`, WhatsApp verde accesible.
- [x] Migrar usos de `aura`, `navy`, `studio`, `studioOutline`, `studioGhost` y `brand` a las variantes nuevas: 56 líneas, localizadas con el verificador de tipos (no con `sed` global, porque `studio` también existe en Badge, Input y Tabs).
- [x] Retiradas las variantes antiguas del tema (incluida `brand` roja #FF5A5F y `outlineNavy`, sin usos).
- [x] Campos: 48 px de alto, esquina de 12 px, texto de 16 px y estado deshabilitado. Verificado: 48 px y 12 px.
- [x] `Alert`: variantes de estado `success`, `warning`, `danger` e `info` con los textos accesibles.
- [x] `Badge`, `Tabs`, `Table`: alinear a tokens nuevos. Se resuelve al eliminar los alias `navy` en la Fase 5.
- [x] `CloseButton`: tamaño mínimo de 44 px.
- [x] Validación: `typecheck` limpio, `lint` 0 errores, `build` en verde.
- [x] Commit de la fase.

Pendiente detectado: los items de la barra de escritorio miden 43 px (se corrige en la Fase 4).

---

## Fase 3 · Tarjetas y galerías

- [x] `MediaCard` plana en reposo; elevación suave solo en hover y foco, con `prefers-reduced-motion`. `ServiceCard` y `ClientCard` la reutilizan.
- [x] `ClientCard` sin degradado ni rgba. `BlogCard` sin degradado, glow ni elevación de 12 px.
- [x] Una sola composición de galería (`GalleryWithThumbnails`) usada en `ServicePageLayout` y `VisualViewer`.
- [x] Validación y commit de la fase.
- Pendiente: `ClientCard` no tiene destino (no es enlace); quedan `_hover` de varias propiedades en las flechas de la galería.

## Fase 4 · Navegación y elementos globales

- [x] Barra de escritorio: items de 44 px, pastilla activa negra, foco visible y `aria-current`.
- [x] Barra móvil con vidrio y hoja del menú en blanco; z-index con tokens de Chakra.
- [x] "Mi cuenta" apunta a `/mi-cuenta` en escritorio, móvil y footer.
- [x] Footer sin teléfono secundario; botones flotantes con sombra suave. Se eliminaron `NavItemLarge` y `UtilityLink` (sin uso).
- [ ] Entrada "Obras" para constructoras: no se añadió porque "Proyectos" ya apunta a `/#proyectos`; si el dueño la quiere, es cambiar el rótulo.
- [x] Validación y commit de la fase.
- Pendiente: el horario del footer está escrito a mano porque `companyData` no tiene ese campo.

## Fase 5 · Desviaciones por área

Se hizo en dos tramos: reemplazos globales de alias y pesos (commit "parte 1") y limpieza por carpeta con cuatro agentes Haiku.

- [x] `screens/Admin`, pantallas públicas, `features`, `shared` y `app` limpiados (hex y rgba a tokens, `colorPalette` a variantes, degradados y emojis fuera, `vh` a `dvh`).
- [x] Peso 800/900/`black` a 700 en todo `src` (salvo comentarios).
- [x] Anchos de página a `pageNarrow`/`pageDefault`/`pageWide`.
- [x] Alias temporales eliminados del tema; `brand.navy`, `accent.navy`, `bg.tintNavy`, `bg.warm` y `bg.paper` ya no existen.
- [ ] Renombrar `border.warm`/`border.warmStrong` a `line`/`line-strong`: pendiente (bajo valor, muchos usos).
- [x] Validación y commit de la fase.

Conteos (apps/web/src, fuera del tema):

| Desviación | Antes (2026-11-09) | Después |
|---|---:|---:|
| hex | 74 | 26 (todos legítimos: Google Maps, logo, `manifest`, `themeColor`, comentarios) |
| `rgba` | 54 | 0 |
| `colorPalette` | 38 | 2 (infraestructura `color-mode.tsx`) |
| `_hover={{` | ~69 | 51 (varios ya de una sola propiedad) |
| degradados | 12 | 0 |
| emojis en JSX | 3 | 0 |
| `navy`/`#002060`/`#FBF8F3` | 107 | 0 |
| `vh` sueltos | 3 | 0 |
| peso 800/900 | 27+ | 0 |
| `px` literales en props | 65 | ~191 con un criterio más amplio; sin cuantificar con el criterio anterior |

Pendiente: `_hover` de varias propiedades en tarjetas del admin y de servicios; `px` literales en prototipos de `DesignSystemUbicacion`; colores crudos de paleta (`purple.400`, `blue.400`) en cinco archivos; `app/icon.svg` conserva sus hex (es un activo de marca).

## Fase 6 · Página principal para constructoras y datos del negocio

- [x] Hero con dos acciones (Pedir presupuesto por WhatsApp y Ver obras) y texto corregido: "Suministro, ensamblaje en taller e instalación…" (ya no dice que fabrican).
- [x] Nueva sección "Para constructoras e inmobiliarias" con 5 bloques y marcador visible "Capacidad, plazos y series: se confirman por proyecto".
- [x] Orden: hero, constructoras, proyectos, servicios, beneficios, clientes y ubicación (verificado en el navegador).
- [x] Garantía de 3 meses, horario 8:00 a 18:00 (también en la etiqueta "abierto"), teléfono público solo WhatsApp.
- [x] Logo vectorial: el hero ya usaba el SVG.
- [ ] Mostrar los 13 servicios: la lista sale de Firestore (hoy 10). Hay que crear los 3 servicios nuevos desde el panel de administración; no se hace en código.
- [ ] IGV: el calculador suma 18 % sobre precios base sin IGV; el total final incluye IGV, pero hay que confirmar con el dueño si los precios base ya lo incluyen.
- [x] Validación y commit de la fase.

## Fase 7 · `/design-system`

- [x] Pestaña por defecto "Tokens y reglas" con los tokens reales en claro y oscuro; ninguna de las 11 pestañas menciona navy, `#002060`, papel cálido ni Source Serif (verificado en el navegador).
- [x] Montados `GalleryShowcase` e `ImageRevealShowcase`; nuevo showcase de `MediaCard`, `AuraHeader`, `CopyButton`, `CloseButton`, `FileUpload` y `ScrollArea`.
- [x] Matriz de botones: 4 variantes por 5 estados.
- [x] Sin desborde horizontal en ninguna pestaña a 1280 px.
- [x] Validación y commit de la fase.

## Fase 8 · Cierre

- [x] Verificación con el navegador del MCP de Playwright: página principal a 360 y 1280 px (sin desborde, sin objetivos menores de 44 px, Lora 700, fondo blanco), modo oscuro y las 11 pestañas de `/design-system`. Los únicos errores de consola son 404 de precarga de Next contra un servidor local simple, no de la app.
- [ ] `scripts/audit-design-system.mjs` y `scripts/audit-landing.mjs`: no se pudieron correr; Playwright no tiene el navegador instalado para scripts (`npx playwright install`).
- [x] Conteos repetidos y comparados (tabla de la fase 5).
- [x] Eliminados `DESIGN-SYSTEM.md`, `BRAND-KIT.md`, `PROMPT-REDISENO-DS.md` y `23_PLAN_DESIGN_SYSTEM_V2.md`, por indicación del dueño ("referencia y, al terminar, eliminar").
- [x] `claude.md`, `AGENTS.md`, `docs/README.md`, `docs/PENDIENTES.md`, `docs/01_ARCHITECTURE.md` y `docs/02_AI_HANDOFF.md` apuntan a `apps/web/DESIGN.md`.
- [x] Registrado en `docs/05_CHANGELOG.md`.
- [ ] Decisión del dueño: merge a `main` o PR. No se hizo push ni deploy.
