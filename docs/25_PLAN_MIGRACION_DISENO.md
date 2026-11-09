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
| 1 | Tokens del tema | En curso |
| 2 | Botones, campos y recetas base | Pendiente |
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

- [ ] Fondo blanco: `bg.page`, `bg.section`, `bg.warm`, `bg.paper` y `surface.*` pasan a blanco en modo claro (modo oscuro sin cambio).
- [ ] Definir nombres canónicos: `ink`, `ink-soft`, `line`, `line-strong`, `quote-red`, `logo-coral`, `whatsapp` (según `DESIGN.md`).
- [ ] Renombrar la familia `navy` (`brand.navy`, `brand.navyHover`, `brand.navyActive`, `accent.navy`, `accent.navyContrast`, `bg.tintNavy`) a nombres que describan su valor, dejando alias temporal hasta la Fase 5.
- [ ] Unificar el rojo de título en `quote-red` (#D62828): quitar `redQuote` duplicado.
- [ ] Decidir el destino de `brand.red` (#FF5A5F) y de la variante de botón `brand`.
- [ ] Quitar duplicados de valor: `bg.paper`/`bg.warm`, `bg.surface`/`surface.card`, `inkV2`/`navy`.
- [ ] Eliminar tokens sin uso en todo el repo (verificar con `grep` antes de borrar).
- [ ] Corregir `glass.ts`: `saturate` coherente y retirar variantes sin uso.
- [ ] Tipografía: documentar `lineHeights` y `letterSpacings`; quitar el peso 900.
- [ ] Anchos de página: tres valores únicos (estrecho, estándar, amplio) como tokens.
- [ ] Validación: `typecheck`, `lint`, `build`.
- [ ] Commit de la fase.

---

## Fase 2 · Botones, campos y recetas base

Archivos: recetas en el tema, `apps/web/src/components/ui/`.

- [ ] Botones sin mayúsculas: variantes `primary`, `outline`, `ghost`, `whatsapp` (según `DESIGN.md`).
- [ ] Migrar usos de `aura`, `navy`, `outlineNavy`, `studio*` y `brand` a las variantes nuevas.
- [ ] Retirar las variantes antiguas del tema cuando ya no tengan uso.
- [ ] Campos: un solo alto (48 px) y radio de 12 px; estado deshabilitado definido.
- [ ] `Alert`: variantes de estado (éxito, aviso, peligro, información) con los textos accesibles.
- [ ] `Badge`, `Tabs`, `Table`: alinear a tokens nuevos.
- [ ] `CloseButton`: tamaño mínimo de 44 px.
- [ ] Validación y commit de la fase.

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
- [ ] Degradados → cero.
- [ ] Meta: 0 hex y `rgba` fuera del tema (salvo SVG de ilustración), 0 `colorPalette`, 0 degradados, 0 emojis, 0 `navy`.
- [ ] Validación y commit de la fase.

---

## Fase 6 · Página principal para constructoras y datos del negocio

Constructoras son la audiencia principal; hogares quedan con un camino directo de presupuesto.

- [ ] Hero con dos acciones: pedir presupuesto (WhatsApp) y ver obras.
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
