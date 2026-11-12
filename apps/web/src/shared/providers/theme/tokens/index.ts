/**
 * @file index.ts
 * @description Exportación unificada de tokens de diseño para Chakra UI v3.
 */

import { fonts, fontSizes, lineHeights, letterSpacings } from "./fonts";
import { colors } from "./colors";
import { sizes, radii, shadows } from "./sizes";

export const tokens = {
  fonts,
  fontSizes,
  lineHeights,
  letterSpacings,
  sizes,
  colors,
  radii,
  shadows,
};

export * from "./fonts";
export * from "./colors";
export * from "./sizes";
