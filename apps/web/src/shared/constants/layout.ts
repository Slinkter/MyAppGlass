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
