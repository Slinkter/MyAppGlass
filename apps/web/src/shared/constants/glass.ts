/**
 * @file glass.ts
 * @description Receta única de vidrio esmerilado (glassmorphism) de la web.
 * Cuatro capas: tinte translúcido + desenfoque con saturación + borde fino de luz + reflejo superior.
 * Uso permitido (apps/web/DESIGN.md): leyendas sobre fotos y barra de navegación; nunca sobre fondo blanco.
 * Contraste: el tinte mantiene ≥ 4,5:1 del texto aun sobre el fondo más claro u oscuro posible
 * (blanco 90 % → texto #111 ≥ 14:1).
 * Con `prefers-reduced-transparency` o `prefers-contrast: more` pasa a superficie sólida (R9, a11y).
 */

/** Desenfoque + saturación: lo que da la sensación de cristal vivo (lenguaje del mapa inmersivo). */
export const GLASS_BLUR = "blur(24px) saturate(1.4)" as const;

/** Reflejo superior de 1 px (borde de luz) sin sombra fuerte. */
export const GLASS_HIGHLIGHT = "inset 0 1px 0 {colors.whiteAlpha.400}" as const;

const REDUCED = "@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)";

/**
 * Superficie de vidrio CLARA (u oscura en modo oscuro): barras de navegación, menú, diálogos.
 * Se aplica como props de estilo de Chakra: `<Box {...glassSurface} />`.
 */
export const glassSurface = {
  bg: "bg.surface/88",
  borderWidth: "1px",
  borderColor: "border.default",
  css: {
    backdropFilter: GLASS_BLUR,
    WebkitBackdropFilter: GLASS_BLUR,
    boxShadow: GLASS_HIGHLIGHT,
    [REDUCED]: {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      background: "{colors.bg.surface}",
    },
  },
} as const;

/**
 * Leyenda de vidrio CLARO sobre fotografías: texto negro,
 * ≥ 14:1 sobre cualquier foto (blanco 90 % sobre negro ≈ #E6E6E6 con texto #111).
 */
export const glassLightOnPhoto = {
  bg: "whiteAlpha.900",
  borderWidth: "1px",
  borderColor: "whiteAlpha.800",
  css: {
    backdropFilter: GLASS_BLUR,
    WebkitBackdropFilter: GLASS_BLUR,
    boxShadow: GLASS_HIGHLIGHT,
    [REDUCED]: {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      background: "{colors.white}",
    },
  },
} as const;
