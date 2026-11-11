"use client";

import { GLASS_FALLBACK_CSS } from "@/shared/constants/layout";

/**
 * Superficie Liquid Glass Regular (`liquid-glass.md › Cross-platform translation`):
 * - `blur(24px) saturate(1.4)` con relleno translúcido y borde de 1px.
 * - Respeta `prefers-reduced-transparency` y `prefers-contrast: more` cayendo a superficie opaca.
 */
export const liquidGlassRegular = {
  bg: "bg.surface/88",
  backdropFilter: "blur(24px) saturate(1.4)",
  borderWidth: "1px",
  borderColor: "border.default",
  borderRadius: "2xl",
  boxShadow: "xl",
  css: {
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    ...GLASS_FALLBACK_CSS,
  },
} as const;

/** Posicionamiento Place Card (`maps.md › Place cards` y `layout.md › Visual hierarchy`). */
export const placeCardAnchor = {
  position: "absolute",
  top: { base: "3", lg: "5" },
  left: { base: "3", lg: "5" },
  right: { base: "16", md: "auto" },
  w: { md: "336px", lg: "356px" },
  zIndex: 2,
} as const;
