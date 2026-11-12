/**
 * @file semanticTokens.ts
 * @description Tokens semánticos dependientes del tema (claro/oscuro) para Aura v2.
 */

export const semanticTokens = {
  colors: {
    /* Fondo blanco decidido por el dueño (2026-11-09); el papel cálido #F7F6F3 se retiró. */
    "bg.page": { value: { _light: "white", _dark: "#09090b" } },
    "bg.section": { value: { _light: "white", _dark: "#121215" } },
    "bg.surface": { value: { _light: "white", _dark: "rgba(24, 24, 27, 0.8)" } },
    "bg.subtle": { value: { _light: "rgba(0,0,0,0.04)", _dark: "rgba(255,255,255,0.04)" } },
    /* Bloque destacado neutro (sin azul). */
    "bg.tint": { value: { _light: "{colors.primary.100}", _dark: "rgba(255,255,255,0.06)" } },

    // Brand
    "brand.primary": { value: { _light: "{colors.primary.900}", _dark: "white" } },
    "accent.ink": { value: { _light: "{colors.brand.ink}", _dark: "white" } },
    "accent.inkContrast": { value: { _light: "white", _dark: "{colors.brand.ink}" } },

    "surface.card": { value: "{colors.bg.surface}" },
    "surface.container": { value: { _light: "white", _dark: "rgba(255,255,255,0.04)" } },
    "surface.icon": { value: { _light: "{colors.primary.50}", _dark: "rgba(255,255,255,0.04)" } },
    "surface.iconHover": { value: { _light: "{colors.primary.100}", _dark: "rgba(255,255,255,0.08)" } },

    // Borders (escala cálida line / line-strong según apps/web/DESIGN.md)
    "border.default": { value: { _light: "{colors.brand.line}", _dark: "rgba(255,255,255,0.08)" } },
    "border.subtle": { value: { _light: "rgba(0,0,0,0.06)", _dark: "rgba(255,255,255,0.08)" } },
    "border.strong": { value: { _light: "{colors.brand.lineStrong}", _dark: "rgba(255,255,255,0.14)" } },
    "border.warm": { value: { _light: "{colors.brand.line}", _dark: "rgba(255,255,255,0.08)" } },
    "border.warmStrong": { value: { _light: "{colors.brand.lineStrong}", _dark: "rgba(255,255,255,0.14)" } },
    "border.line": { value: { _light: "{colors.brand.line}", _dark: "rgba(255,255,255,0.08)" } },
    "border.lineStrong": { value: { _light: "{colors.brand.lineStrong}", _dark: "rgba(255,255,255,0.14)" } },
    "border.line-strong": { value: { _light: "{colors.brand.lineStrong}", _dark: "rgba(255,255,255,0.14)" } },
    line: { value: { _light: "{colors.brand.line}", _dark: "rgba(255,255,255,0.08)" } },
    "line-strong": { value: { _light: "{colors.brand.lineStrong}", _dark: "rgba(255,255,255,0.14)" } },
    lineStrong: { value: { _light: "{colors.brand.lineStrong}", _dark: "rgba(255,255,255,0.14)" } },

    // Status Borders
    "status.dangerBorder": { value: "rgba(248, 113, 113, 0.25)" },
    "status.warningBorder": { value: "rgba(245, 158, 11, 0.3)" },
    "status.successBorder": { value: "rgba(52, 211, 153, 0.3)" },

    // Status Text (contraste >= 4.5:1 sobre blanco y fondos Soft en claro y oscuro, WCAG 1.4.3)
    "status.dangerText": { value: { _light: "#b91c1c", _dark: "#f87171" } },
    "status.successText": { value: { _light: "#047857", _dark: "#34d399" } },
    "status.warningText": { value: { _light: "#b45309", _dark: "#fbbf24" } },
    "status.infoText": { value: { _light: "#0369a1", _dark: "#38bdf8" } },
    // Texto de error de Field/Input: el rojo por defecto de Chakra (red.500) da 3,76:1 sobre blanco
    fg: { error: { value: "{colors.status.dangerText}" } },

    // Focus (>= 3:1 sobre el fondo en ambos temas, WCAG 1.4.11)
    "ring.primary": { value: { _light: "{colors.primary.700}", _dark: "{colors.primary.300}" } },

    // Material Design 3 State Layers (capas tonales sobre superficie: hover 8%, focus 10%, pressed 10%)
    "state.hover": { value: { _light: "rgba(17, 17, 17, 0.08)", _dark: "rgba(255, 255, 255, 0.08)" } },
    "state.focus": { value: { _light: "rgba(17, 17, 17, 0.10)", _dark: "rgba(255, 255, 255, 0.10)" } },
    "state.pressed": { value: { _light: "rgba(17, 17, 17, 0.10)", _dark: "rgba(255, 255, 255, 0.10)" } },
    "state.drag": { value: { _light: "rgba(17, 17, 17, 0.16)", _dark: "rgba(255, 255, 255, 0.16)" } },

    // Text (apps/web/DESIGN.md: ink #111111 y inkSoft #4A4A4A)
    "text.body": { value: { _light: "{colors.brand.inkSoft}", _dark: "{colors.gray.300}" } },
    "text.heading": { value: { _light: "{colors.brand.ink}", _dark: "white" } },
    "text.muted": { value: { _light: "{colors.gray.600}", _dark: "{colors.gray.400}" } },
    "text.accent": { value: { _light: "{colors.primary.600}", _dark: "{colors.primary.300}" } },

    // Payment
    payment: {
      yape: { value: "{colors.payment.yape}" },
    },
  },
};
