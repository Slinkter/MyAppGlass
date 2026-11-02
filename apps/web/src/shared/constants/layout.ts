/**
 * @file layout.ts
 * @description Constantes de layout responsive y accesibilidad táctil.
 */

/** Tamaño mínimo táctil (44px) como token de espacio de Chakra (`space.11`). */
export const TOUCH_MIN = "11" as const;

/** Columnas responsivas de `SimpleGrid` por tipo de contenido (móvil primero). */
export const RESPONSIVE_GRIDS = {
  cards: { base: 1, sm: 2, lg: 3 },
  tokens: { base: 2, sm: 3, md: 5 },
} as const;

/**
 * Fallback de vidrio (Liquid Glass): con `prefers-reduced-transparency` o `prefers-contrast: more`
 * el `backdrop-filter` se desactiva y la superficie pasa a opaca.
 * Se aplica con `css={GLASS_FALLBACK_CSS}` junto al `backdropFilter` de cada superficie.
 */
export const GLASS_FALLBACK_CSS = {
  "@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)": {
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
    background: "var(--chakra-colors-bg-surface)",
  },
} as const;
