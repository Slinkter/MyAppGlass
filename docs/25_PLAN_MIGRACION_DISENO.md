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
| 3 | Tarjetas y galerías | Pendiente |
| 4 | Navegación y elementos globales | Pendiente |
| 5 | Desviaciones por área (hex, rgba, `colorPalette`, hover, degradados, emojis, px) | Pendiente |
| 6 | Página principal para constructoras y datos del negocio | Pendiente |
| 7 | `/design-system` | Pendiente |
| 8 | Cierre: eliminar documentos viejos y verificar | Pendiente |

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

- [ ] Una sola base `MediaCard`: `ServiceCard` y `ProjectCardContent` la reutilizan sin duplicar estilos.
- [ ] `ClientCard`: quitar degradado, reutilizar `MediaCard` o la leyenda de vidrio; añadir foco y enlace.
- [ ] `BlogCard`: quitar degradado y elevación de 12 px; añadir `prefers-reduced-motion`.
- [ ] Tarjeta plana en reposo: sin sombra; elevación solo en hover y foco.
- [ ] Galerías: unificar la composición `Gallery.Viewer` + `Gallery.Thumbnails` en un solo componente.
- [ ] Validación y commit de la fase.

---

## Fase 4 · Navegación y elementos globales

- [ ] Barra de escritorio: tokens nuevos y pastilla activa negra; foco explícito.
- [ ] Barra móvil y hoja del menú: tokens nuevos; vidrio solo en la barra.
- [ ] "Mi cuenta": una sola ruta coherente entre escritorio, móvil y footer.
- [ ] Entradas de navegación para constructoras (catálogo técnico, obras), según defina la Fase 6.
- [ ] Footer: usar `MOBILE_NAV_ITEMS`/`NAV_ITEMS` coherentes y datos de `companyData`.
- [ ] Botones flotantes: tokens y z-index definidos en el tema.
- [ ] Validación y commit de la fase.

---

## Fase 5 · Desviaciones por área

Migración mecánica, repartida a agentes Haiku por carpeta (archivos disjuntos). Orquestador verifica con `grep` al final.

- [ ] `screens/Admin/**`: hex, `rgba`, `colorPalette`, emojis, `_hover`.
- [ ] `screens/Auth`, `screens/Legal`, `screens/Presupuesto`, `screens/Tienda`.
- [ ] `features/**`: contacto, reclamation-book, services, home, admin.
- [ ] `shared/components/**`: mapa, imágenes, layout.
- [ ] `app/**`: `layout.tsx`, `manifest.ts`, `error.tsx`, páginas.
- [ ] `vh` sueltos → `dvh`; `px` literales → tokens.
- [ ] Peso 900 (`fontWeight="900"` y `"black"`, 27 usos) → 700.
- [ ] Anchos de página (4xl, 6xl, 7xl, 1280px, 800px, 1440px) → `sizes.pageNarrow`/`pageDefault`/`pageWide`.
- [ ] Eliminar los alias temporales de la Fase 1 (`brand.navy*`, `accent.navy*`, `bg.tintNavy`, `bg.warm`, `bg.paper`) cuando no queden usos.
- [ ] Renombrar `border.warm`/`border.warmStrong` a `line`/`line-strong`.
- [ ] Degradados → cero.
- [ ] Meta: 0 hex y `rgba` fuera del tema (salvo SVG de ilustración), 0 `colorPalette`, 0 degradados, 0 emojis, 0 `navy`.
- [ ] Validación y commit de la fase.

---

## Fase 6 · Página principal para constructoras y datos del negocio

Constructoras son la audiencia principal; hogares quedan con un camino directo de presupuesto.

- [ ] Hero con dos acciones: pedir presupuesto (WhatsApp) y ver obras.
- [ ] Corregir el texto del hero: dice "especialistas en la **fabricación**, diseño e instalación", pero la empresa compra los materiales, ensambla en taller e instala (no fabrica perfiles ni vidrio). Proponer redacción y confirmar con el dueño.
- [ ] Sección para constructoras: capacidad de suministro, plazos, catálogo técnico (series) y obras. **Los datos que falten quedan como marcador y se preguntan al dueño.**
- [ ] Reordenar secciones según la audiencia principal.
- [ ] Mostrar los 13 servicios (los 3 nuevos aunque no tengan foto).
- [ ] Garantía: 3 meses (corregir los 6 meses de la sección de beneficios y de los presupuestos).
- [ ] Horario: lunes a sábado, 08:00 a 18:00 (corregir el mapa).
- [ ] Precio mostrado con IGV incluido.
- [ ] Teléfono público: solo WhatsApp 974 278 303.
- [ ] Logo: usar el SVG vectorial.
- [ ] Validación y commit de la fase.

---

## Fase 7 · `/design-system`

- [ ] Pestaña por defecto con el estilo nuevo (sin navy ni azul).
- [ ] Montar `GalleryShowcase` e `ImageRevealShowcase`.
- [ ] Añadir showcases que faltan: `MediaCard`, `AuraHeader`, `CopyButton`, `CloseButton`, `FileUpload`, `ScrollArea`.
- [ ] Documentar tokens reales (sin la lista de tokens retirados).
- [ ] Verificación en 360, 768 y 1280 px, claro y oscuro.
- [ ] Validación y commit de la fase.

---

## Fase 8 · Cierre

- [ ] Auditoría final: `scripts/audit-design-system.mjs` y `scripts/audit-landing.mjs`.
- [ ] Repetir los conteos de la Fase 0 y comparar.
- [ ] Eliminar `DESIGN-SYSTEM.md`, `BRAND-KIT.md`, `PROMPT-REDISENO-DS.md` y `23_PLAN_DESIGN_SYSTEM_V2.md` (con confirmación del dueño).
- [ ] Actualizar `CLAUDE.md`, `AGENTS.md`, `docs/README.md` y `docs/PENDIENTES.md` para que apunten a `apps/web/DESIGN.md`.
- [ ] Registrar el cierre en `docs/05_CHANGELOG.md`.
- [ ] Commit final y decisión del dueño sobre merge o PR.
