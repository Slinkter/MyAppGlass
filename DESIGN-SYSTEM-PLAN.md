# Plan: Pulir y definir el Aura Design System

> Plan para retomar en futuras sesiones. Creado el 2026-10-30 en la rama `feat/ux-ui`.

## Context

Antes de trabajar UX/UI en las pantallas, hay que dejar el design system como **fuente única de verdad**.
La página `/design-system` (`apps/web/src/screens/DesignSystem/`) y el tema
(`apps/web/src/shared/providers/theme/index.ts`) se contradicen entre sí y con producción.

**Decisiones tomadas por el usuario:**
- **Botón primario oficial: `aura` (zinc).** Negro en modo claro, blanco en modo oscuro. `blue` y `cyan` dejan de ser colores de marca.
- **Alcance de esta etapa: tema + página.** La migración de pantallas va en una etapa posterior.

## Problemas detectados (auditoría)

1. **Botones:** la página muestra `colorPalette="blue"` y nunca la variante `aura` del tema.
   En producción hay mezcla: `cyan` ×7, `blue` ×7, `red` ×2, `purple`, `green`, `primary` ×1, y `variant="aura"` solo ×4.
2. **WhatsApp y Red GYA armados a mano** (`bg`, `color` y `_hover` sueltos) en
   `widgets/FloatingActions/FloatingWhatsApp.tsx`, `widgets/Footer/Footer.tsx` y `widgets/Navbar/MobileNav.tsx`.
3. **Las etiquetas de tipografía no coinciden con los valores reales** (`TokensSection.tsx`). Valores reales según los tokens:
   `4xl` = 2.25rem/36px, `3xl` = 1.875rem/30px, `2xl` = 1.5rem/24px, `xl` = 1.25rem/20px, `md` = 1rem/16px.
4. **Tokens:**
   - Sin uso, se pueden borrar: `border.slate`, `border.slateStrong`, `text.slate`, `text.slateStrong`.
   - Alias heredados con uso: `border.glass` (16 archivos), `text.primary` (5), `bg.canvas` (1), `surface.muted` (1), `bg.glass` (1, `shared/components/aura/AuraSurface.tsx`).
   - Los tokens `status.*` no tienen variante para claro y oscuro (26 usos).
5. **Contenido que rompe las reglas de `AGENTS.md`:**
   - "DVH Templado 6mm + Laminado 4+4mm" (`OverlaysShowcase.tsx`): los tipos de vidrio no llevan grosor.
   - "Serie 62 Antirruido" usado como nombre del sistema (`EditorialCardsShowcase.tsx`, `TokensSection.tsx`, `DataDisplayShowcase.tsx`, `FormControlsShowcase.tsx`): el nombre oficial es "Serie 62".
   - "Acero Inox" no existe en el catálogo.
   - "Doble vidriado hermético (DVH)" es una especificación inventada.
6. **Componentes base sin mostrar:** Badge/Tag (variantes), Tabs, Tooltip, Toast, Drawer, Textarea, y los estados de botón (loading, disabled, focus).
7. **`<Toaster />` no está montado** en `app/Providers.tsx` ni en `app/layout.tsx`: `toaster.create()` no muestra nada.

## Pasos

### 1. Tema (`apps/web/src/shared/providers/theme/index.ts`)
- `buttonRecipe`:
  - Agregar las variantes `whatsapp` (`brand.whatsapp` / `whatsappHover` / `whatsappActive`) y `brand` (`brand.red` / `redHover` / `redDark`).
  - Agregar `_focusVisible` con el anillo `ring.primary` y `_disabled` (opacidad y sin transform).
  - Respetar la regla de máximo 2 propiedades en `transition`.
- Borrar los tokens sin uso: `border.slate`, `border.slateStrong`, `text.slate`, `text.slateStrong`.
- Marcar con un comentario `// @deprecated` los alias heredados (`border.glass`, `text.primary`, `bg.canvas`, `surface.muted`, `bg.glass`). No se borran en esta etapa.
- Opcional: convertir `status.*` a semantic tokens con `_light` y `_dark`. Primero revisar cómo afecta a sus 26 usos.

### 2. Página `/design-system` (`apps/web/src/screens/DesignSystem/`)
- `DesignSystemScreen.tsx`: badge del encabezado en `gray` en lugar de `purple`.
- `FormControlsShowcase.tsx`:
  - Sección de botones con las variantes reales `aura` / `outline` / `ghost` / `whatsapp` / `brand`.
  - Tamaños `sm` / `md` / `lg` / `xl`.
  - Estados `loading` y `disabled`.
  - IconButton con `aura`.
  - Agregar Textarea.
  - Quitar todos los `colorPalette="blue"`.
- `OverlaysShowcase.tsx`:
  - Botones del Dialog con `aura` y `outline`.
  - Especificaciones sin grosores (Sistema: Serie 62 · Vidrio: Templado · Color: Incoloro · Aluminio: Negro).
  - Agregar ejemplos de Tooltip (`components/ui/tooltip.tsx`), Drawer (`components/ui/drawer.tsx`) y Toast (`components/ui/toaster-instance.ts`, que requiere el paso 3).
- `EditorialCardsShowcase.tsx`: categorías oficiales ("Serie 62", "Templado"); quitar DVH y "Acero Inox".
- `DataDisplayShowcase.tsx`:
  - "Serie 62" y badges neutros (`gray`).
  - Agregar un catálogo de Badge (variantes `solid` / `subtle` / `outline` y estados success / warning / error).
- `TokensSection.tsx`:
  - Corregir las etiquetas de tamaños (ver punto 3 de la auditoría).
  - Badge "Serie 62".
  - Agregar swatches de `text.heading`, `text.body`, `text.muted` y `ring.primary`.
  - Quitar `primary.700` si sobra.
- Agregar un ejemplo de Tabs, aunque la página ya usa Tabs.

### 3. Toaster
- Montar `<Toaster />` (`components/ui/toaster.tsx`) en `app/Providers.tsx`.

### 4. Etapa posterior (fuera de este alcance)
- Migrar las pantallas: `colorPalette` cyan/blue/red/purple/green en Buttons → `aura` / `outline` / `ghost` / `brand` / `whatsapp`.
- Reemplazar los botones de WhatsApp armados a mano por `variant="whatsapp"`.
- Reemplazar los alias heredados por los tokens canónicos y después borrar los alias.

## Reglas a respetar (de `AGENTS.md`)
- Chakra UI v3 con tokens nativos. En Lucide, `style={{ flexShrink: 0 }}`.
- Transiciones con máximo 2 propiedades.
- Catálogo: 4 sistemas (Sistema Nova, Serie 25, Serie 35, Serie 62); vidrios Crudo / Laminado / Templado (sin grosor);
  colores de vidrio Incoloro / Bronce / Gris; aluminio Negro / Mate / Blanco / Madera / Champagne.
- Ortografía: "antirruido", "vidrio y aluminio".

## Verificación
- `pnpm run typecheck && pnpm run build`
- `pnpm run lint`
- `pnpm run dev` → revisar `/design-system` en modo claro y oscuro, en todas las pestañas.
  Probar el foco con teclado (Tab), los estados de botón, el Toast, el Drawer y el Tooltip.
