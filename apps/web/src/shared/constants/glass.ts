/**
 * @file glass.ts
 * @description Receta única de vidrio esmerilado (glassmorphism) estilo Apple para toda la web.
 * Cuatro capas: tinte translúcido + desenfoque con saturación + borde fino de luz + reflejo superior.
 * Contraste: el tinte mantiene ≥ 4,5:1 del texto aun sobre el fondo más claro u oscuro posible
 * (blanco 70 % → texto #111 ≥ 8:1; negro 60 % → texto blanco ≥ 5,7:1).
 * Con `prefers-reduced-transparency` o `prefers-contrast: more` pasa a superficie sólida (R9, a11y).
 */

/** Desenfoque + saturación: lo que da la sensación de cristal vivo. */
export const GLASS_BLUR = "blur(24px) saturate(180%)" as const;
/** Desenfoque suave para pastillas pequeñas. */
export const GLASS_BLUR_SM = "blur(14px) saturate(160%)" as const;

/** Reflejo superior de 1 px (borde de luz) sin sombra fuerte. */
export const GLASS_HIGHLIGHT = "inset 0 1px 0 {colors.whiteAlpha.400}" as const;

const REDUCED = "@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)";

/**
 * Superficie de vidrio CLARA (u oscura en modo oscuro): barras de navegación, menú, diálogos.
 * Se aplica como props de estilo de Chakra: `<Box {...glassSurface} />`.
 */
export const glassSurface = {
  // Liquid Glass Regular del mapa inmersivo: superficie 88 %, borde fino, desenfoque 24 px.
  bg: "bg.surface/88",
  borderWidth: "1px",
  borderColor: "border.default",
  css: {
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: GLASS_HIGHLIGHT,
    [REDUCED]: {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      background: "{colors.bg.paper}",
    },
  },
} as const;

/**
 * Leyenda de vidrio CLARO sobre fotografías (lenguaje del mapa inmersivo): texto negro,
 * ≥ 14:1 sobre cualquier foto (blanco 90 % sobre negro ≈ #E6E6E6 con texto #111).
 */
export const glassLightOnPhoto = {
  bg: "whiteAlpha.900",
  borderWidth: "1px",
  borderColor: "whiteAlpha.800",
  css: {
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: GLASS_HIGHLIGHT,
    [REDUCED]: {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      background: "{colors.white}",
    },
  },
} as const;

/**
 * Subtítulo/leyenda de vidrio OSCURO sobre fotografías (texto blanco, ≥ 5,7:1 en el peor caso).
 */
export const glassOnPhoto = {
  bg: "blackAlpha.600",
  borderWidth: "1px",
  borderColor: "whiteAlpha.300",
  css: {
    backdropFilter: GLASS_BLUR,
    WebkitBackdropFilter: GLASS_BLUR,
    boxShadow: GLASS_HIGHLIGHT,
    [REDUCED]: {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      background: "{colors.gray.900}",
    },
  },
} as const;

/** Control pequeño de vidrio (acción circular, chips) sobre una leyenda de vidrio. */
export const glassControl = {
  bg: "whiteAlpha.300",
  borderWidth: "1px",
  borderColor: "whiteAlpha.400",
  css: {
    backdropFilter: GLASS_BLUR_SM,
    WebkitBackdropFilter: GLASS_BLUR_SM,
    [REDUCED]: {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      background: "{colors.gray.900}",
    },
  },
} as const;
