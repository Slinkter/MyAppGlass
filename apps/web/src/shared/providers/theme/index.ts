/**
 * @file index.ts
 * @description Aura Design System v2 - Chakra UI v3 Core Configuration.
 * Single source of truth for design tokens, component recipes, and semantic themes.
 * Marca v2: Lora + Inter, negro de marca (#111111), papel cálido #F7F6F3.
 */

import { createSystem, defineConfig, defaultConfig, defineRecipe, defineSlotRecipe } from "@chakra-ui/react";
import { EASE_SOFT, DUR_CSS } from "@/shared/constants/motion";

// ─── Component Recipes (v3 Architecture) ───────────────────────────────────

/**
 * Receta de botones (apps/web/DESIGN.md): píldora, texto en oración, negro de marca.
 * - Variantes: `primary` (negro; blanco en modo oscuro), `outline`, `ghost` y `whatsapp` (verde accesible).
 * - Todos los tamaños garantizan área táctil >= 44px (`minH: "11"`, `minW: "11"`).
 * - `transition` restringida a 2 propiedades; `:active` escala 0,98 (sin sombras ni elevación).
 */
const primaryButton = {
  bg: "brand.ink",
  color: "white",
  _hover: { bg: "brand.inkHover" },
  _active: { bg: "brand.inkActive" },
  _dark: {
    bg: "white",
    color: "brand.ink",
    _hover: { bg: "gray.200" },
    _active: { bg: "gray.300" },
  },
} as const;

const outlineButton = {
  bg: "transparent",
  borderWidth: "1.5px",
  borderColor: "brand.ink",
  color: "brand.ink",
  _hover: { bg: "blackAlpha.50" },
  _dark: { borderColor: "white", color: "white", _hover: { bg: "whiteAlpha.100" } },
} as const;

const ghostButton = {
  bg: "transparent",
  color: "text.body",
  _hover: { bg: "blackAlpha.50" },
  _dark: { color: "gray.300", _hover: { bg: "whiteAlpha.100", color: "white" } },
} as const;

const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "600",
    textTransform: "none",
    letterSpacing: "normal",
    borderRadius: "full",
    minH: "11",
    minW: "11",
    transition: `background-color ${DUR_CSS.fast} ${EASE_SOFT}, transform ${DUR_CSS.fast} ${EASE_SOFT}`,
    _active: { transform: "scale(0.98)" },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "ring.primary",
      outlineOffset: "2px",
    },
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },
  },
  variants: {
    variant: {
      primary: primaryButton,
      outline: outlineButton,
      ghost: ghostButton,
      whatsapp: {
        // Verde accesible: blanco sobre #15803d da >= 4,5:1 (el #25D366 daba 1,98:1).
        bg: "brand.whatsappAccessible",
        color: "white",
        _hover: { bg: "brand.whatsappAccessibleHover" },
        _active: { bg: "brand.whatsappAccessibleActive" },
      },
      /*
       * Píldora seleccionable de la barra inferior del patrón B (Lente de Cristal y Aluminio).
       * El estado activo se marca con `aria-pressed` o `aria-current`: borde negro y superficie sólida,
       * sin desenfoque propio para no apilar vidrio sobre vidrio.
       */
      pill: {
        justifyContent: "flex-start",
        gap: "2.5",
        px: "1.5",
        pr: "3",
        borderRadius: "xl",
        borderWidth: "1px",
        borderColor: "transparent",
        bg: "transparent",
        color: "text.heading",
        textAlign: "left",
        _hover: { bg: "bg.surface/70" },
        _pressed: { bg: "bg.surface", borderColor: "brand.ink", _dark: { borderColor: "white" } },
        "&[aria-current='true']": { bg: "bg.surface", borderColor: "brand.ink", _dark: { borderColor: "white" } },
      },
    },
    size: {
      xs: { h: "11", minH: "11", minW: "11", px: "3", fontSize: "sm" },
      sm: { h: "11", minH: "11", minW: "11", px: "4", fontSize: "sm" },
      md: { h: "11", minH: "11", minW: "11", px: "6", fontSize: "sm" },
      lg: { h: "12", minH: "12", minW: "12", px: "8", fontSize: "md" },
      xl: { h: "14", minH: "14", minW: "14", px: "10", fontSize: "lg" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

/**
 * Receta propia para Badge: añade variantes semánticas v2 (`neutral`, `ink`, `success`, `warning`, `danger`, `info`)
 * sin alterar las variantes por defecto de Chakra (`subtle`, `outline`, `solid`) que usan el Home y Servicios actuales.
 */
const studioBadgeBase = {
  minH: "7",
  px: "3",
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "600",
  letterSpacing: "0.02em",
  textTransform: "none",
  borderWidth: "0",
} as const;

/** Chip único de DESIGN.md: píldora de 28 px, texto 12/600, solo informativo. */
const chipBase = {
  minH: "7",
  px: "3",
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "600",
  letterSpacing: "normal",
  textTransform: "none",
  borderWidth: "1px",
  borderColor: "border.warm",
} as const;

const badgeRecipe = defineRecipe({
  variants: {
    variant: {
      chip: { ...chipBase, bg: "bg.subtle", color: "text.body" },
      chipInk: { ...chipBase, bg: "brand.ink", color: "white", borderColor: "brand.ink", _dark: { bg: "white", color: "brand.ink", borderColor: "white" } },
      chipSuccess: { ...chipBase, bg: "status.successSoft", color: "status.successText", borderColor: "status.successBorder" },
      chipWarning: { ...chipBase, bg: "status.warningSoft", color: "status.warningText", borderColor: "status.warningBorder" },
      chipDanger: { ...chipBase, bg: "status.dangerSoft", color: "status.dangerText", borderColor: "status.dangerBorder" },
      chipInfo: { ...chipBase, bg: "status.infoSoft", color: "status.infoText", borderColor: "status.infoBorder" },
      neutral: {
        bg: "bg.subtle",
        color: "text.body",
        borderWidth: "1px",
        borderColor: "border.default",
      },
      ink: {
        bg: "bg.tint",
        color: "accent.ink",
        borderWidth: "1px",
        borderColor: "border.default",
      },
      inkSolid: {
        bg: "accent.ink",
        color: "accent.inkContrast",
      },
      success: {
        bg: "status.successSoft",
        color: "status.successText",
        borderWidth: "1px",
        borderColor: "status.successBorder",
      },
      warning: {
        bg: "status.warningSoft",
        color: "status.warningText",
        borderWidth: "1px",
        borderColor: "status.warningBorder",
      },
      danger: {
        bg: "status.dangerSoft",
        color: "status.dangerText",
        borderWidth: "1px",
        borderColor: "status.dangerBorder",
      },
      info: {
        bg: "status.infoSoft",
        color: "status.infoText",
        borderWidth: "1px",
        borderColor: "status.infoBorder",
      },
      /* Aura Studio: pastilla de 28 px, texto 12/600, sin borde cuadrado. */
      studio: { ...studioBadgeBase, bg: "bg.subtle", color: "text.body" },
      studioInk: { ...studioBadgeBase, bg: "gray.900", color: "white", _dark: { bg: "white", color: "gray.900" } },
      studioSuccess: { ...studioBadgeBase, bg: "status.successSoft", color: "status.successText" },
      studioWarning: { ...studioBadgeBase, bg: "status.warningSoft", color: "orange.800", _dark: { color: "status.warningText" } },
      studioDanger: { ...studioBadgeBase, bg: "status.dangerSoft", color: "status.dangerText" },
      studioInfo: { ...studioBadgeBase, bg: "status.infoSoft", color: "status.infoText" },
    },
  },
});

/**
 * Campos de formulario (`input`, `textarea`, `nativeSelect`): 48 px de alto (`minH: "12"`), esquina de 12 px y texto de 16 px (evita el zoom de iOS).
 * Usa el token `ring.primary` directamente en lugar de `var(--chakra-colors-ring-primary)` (Regla R8).
 */
const fieldOutline = {
  minH: "12",
  px: "4",
  fontSize: "md",
  bg: "surface.container",
  borderWidth: "1px",
  borderColor: "border.default",
  borderRadius: "xl",
  transition: `border-color ${DUR_CSS.fast} ${EASE_SOFT}, background-color ${DUR_CSS.fast} ${EASE_SOFT}`,
  _placeholder: { color: "text.muted" },
  _hover: { borderColor: "border.strong" },
  _focusVisible: {
    borderColor: "ring.primary",
    outline: "2px solid",
    outlineColor: "ring.primary",
    outlineOffset: "0px",
  },
  _invalid: {
    borderColor: "status.dangerText",
  },
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

/** Aura Studio: 48 px de alto, radio suave, borde fino y foco con contorno. */
const fieldStudio = {
  ...fieldOutline,
  minH: "12",
  bg: "bg.surface",
  borderRadius: "xl",
  px: "4",
  fontSize: "md",
};

/**
 * Campo de DESIGN.md: 48 px, esquina de 12 px, borde de 1 px en Línea Cálida.
 * Un solo anillo de foco (`ring.primary`) y el estado inválido también lleva anillo, no solo borde.
 */
const fieldClean = {
  ...fieldOutline,
  bg: "bg.surface",
  borderColor: "border.warm",
  _hover: { borderColor: "border.warmStrong" },
  _invalid: {
    borderColor: "status.dangerText",
    outline: "2px solid",
    outlineColor: "status.dangerText",
    outlineOffset: "0px",
  },
};

const inputRecipe = defineRecipe({
  variants: { variant: { outline: fieldOutline, studio: fieldStudio, field: fieldClean } },
});

const textareaRecipe = defineRecipe({
  variants: { variant: { outline: fieldOutline, studio: { ...fieldStudio, py: "3" }, field: { ...fieldClean, py: "3" } } },
});

const nativeSelectRecipe = defineSlotRecipe({
  slots: ["root", "field", "indicator"],
  variants: {
    variant: {
      outline: {
        field: fieldOutline,
      },
      studio: {
        field: fieldStudio,
      },
      field: {
        field: fieldClean,
      },
    },
  },
});

/**
 * Card slot recipe: superficie y borde canónicos.
 */
const cardRecipe = defineSlotRecipe({
  slots: ["root", "header", "body", "footer", "title", "description"],
  base: {
    root: { borderRadius: "card" },
  },
  variants: {
    variant: {
      outline: {
        root: { bg: "surface.card", borderColor: "border.default" },
      },
      solid: {
        root: { bg: "bg.section", borderWidth: "0" },
      },
      warm: {
        root: { bg: "bg.section", borderWidth: "1px", borderColor: "border.warm" },
      },
      /* DESIGN.md: tarjeta plana, 16 px, borde de Línea Cálida, sin sombra en reposo; título en Lora 700. */
      flat: {
        root: { bg: "bg.surface", borderWidth: "1px", borderColor: "border.warm", borderRadius: "card", boxShadow: "none" },
        title: { fontFamily: "heading", fontWeight: "700", color: "text.heading" },
        description: { color: "text.muted" },
      },
      /* Aura Studio: radio grande, borde fino, sin sombra; título en la fuente de títulos. */
      studio: {
        root: { bg: "bg.surface", borderWidth: "1px", borderColor: "border.default", borderRadius: "3xl", boxShadow: "none" },
        title: { fontFamily: "heading", fontWeight: "700", color: "text.heading" },
        description: { color: "text.muted" },
      },
    },
  },
});

/**
 * Tabs slot recipe: añade variantes para v2 sin cambiar el color de las pestañas existentes del sitio.
 */
const tabsRecipe = defineSlotRecipe({
  slots: ["root", "trigger", "list", "content", "contentGroup", "indicator"],
  base: {
    trigger: {
      minH: "11",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "ring.primary",
        outlineOffset: "-2px",
      },
    },
  },
  variants: {
    variant: {
      /* Aura Studio: subrayado de 2 px con indicador deslizante (usar Tabs.Indicator). */
      studio: {
        list: { borderBottomWidth: "1px", borderColor: "border.default", gap: "6", position: "relative" },
        trigger: {
          px: "1",
          fontWeight: "600",
          color: "text.muted",
          transition: `color ${DUR_CSS.fast} ${EASE_SOFT}`,
          _hover: { color: "text.heading" },
          _selected: { color: "text.heading" },
        },
        indicator: { height: "2px", bottom: "-1px", bg: "text.heading", borderRadius: "full" },
      },
    },
  },
});

/**
 * Table slot recipe: cifras tabulares para presupuestos y fichas técnicas.
 */
const tableRecipe = defineSlotRecipe({
  slots: ["root", "header", "body", "row", "columnHeader", "cell", "footer", "caption"],
  base: {
    root: {
      fontVariantNumeric: "tabular-nums",
    },
    columnHeader: {
      color: "text.heading",
      fontWeight: "700",
      borderColor: "border.default",
      bg: "bg.section",
    },
    cell: {
      borderColor: "border.subtle",
      color: "text.body",
    },
  },
  variants: {
    variant: {
      /* Aura Studio: cabecera en mayúscula pequeña, filas con línea fina, sin fondo en la cabecera. */
      studio: {
        columnHeader: {
          bg: "transparent",
          color: "text.muted",
          fontSize: "xs",
          fontWeight: "600",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderBottomWidth: "1px",
          py: "3",
        },
        cell: { py: "4", borderBottomWidth: "1px", borderColor: "border.subtle" },
        row: { bg: "transparent", _hover: { bg: "bg.subtle" } },
      },
    },
  },
});

/** Variante de Alert por estado: fondo suave, borde del estado y texto con contraste verificado (>= 4,5:1). */
const alertStatusVariant = (name: "success" | "warning" | "danger" | "info") => ({
  root: {
    bg: `status.${name}Soft`,
    borderColor: `status.${name}Border`,
    borderRadius: "card",
  },
  title: { color: `status.${name}Text` },
  indicator: { color: `status.${name}Text` },
});

/**
 * Alert slot recipe: variantes de estado (`success`, `warning`, `danger`, `info`) con contraste verificado.
 */
const alertRecipe = defineSlotRecipe({
  slots: ["title", "description", "root", "indicator", "content"],
  base: {
    root: {
      borderRadius: "card",
      borderWidth: "1px",
      borderColor: "border.default",
      bg: "surface.card",
    },
    title: {
      fontWeight: "700",
      color: "text.heading",
    },
    description: {
      color: "text.body",
    },
  },
  variants: {
    variant: {
      /* Aura Studio: radio grande, título en la fuente de títulos. */
      studio: {
        root: { bg: "bg.surface", borderRadius: "2xl", borderWidth: "1px", borderColor: "border.default" },
        title: { fontFamily: "heading", fontWeight: "700", fontSize: "lg" },
      },
      success: alertStatusVariant("success"),
      warning: alertStatusVariant("warning"),
      danger: alertStatusVariant("danger"),
      info: alertStatusVariant("info"),
    },
  },
});

/**
 * Dialog slot recipe: modal accesible con `dvh` y scrim oficial.
 */
const dialogRecipe = defineSlotRecipe({
  slots: [
    "trigger",
    "backdrop",
    "positioner",
    "content",
    "title",
    "description",
    "closeTrigger",
    "header",
    "body",
    "footer",
  ],
  base: {
    backdrop: {
      bg: "overlay.scrim",
    },
    content: {
      bg: "surface.card",
      borderRadius: "modal",
      borderWidth: "1px",
      borderColor: "border.default",
      boxShadow: "modalLg",
      maxH: "90dvh",
    },
    title: {
      fontFamily: "heading",
      fontWeight: "700",
      color: "text.heading",
    },
    closeTrigger: {
      minH: "11",
      minW: "11",
    },
  },
  variants: {
    variant: {
      /* Aura Studio: radio 3xl y título con peso 500. */
      studio: {
        content: { borderRadius: "3xl", boxShadow: "xl" },
        title: { fontWeight: "500" },
      },
    },
  },
});

// ─── System Configuration ──────────────────────────────────────────────────

const focusVisibleSelectors = ["a", "button", '[role="button"]', "input", "select", "textarea", "summary", "[tabindex]"]
  .map((selector) => `${selector}:focus-visible`)
  .join(", ");

const config = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  globalCss: {
    ":where(:root, :host)": {
      "--chakra-colors-surface-card": "var(--chakra-colors-surface\\.card)",
      "--chakra-colors-border-default": "var(--chakra-colors-border\\.default)",
    },
    "html, body": {
      margin: 0,
      padding: 0,
      bg: "bg.page",
      color: "text.body",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      textRendering: "optimizeLegibility",
      touchAction: "manipulation",
    },
    [focusVisibleSelectors]: {
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "ring.primary",
        outlineOffset: "2px",
      },
    },
    a: {
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "ring.primary",
        outlineOffset: "2px",
        borderRadius: "sm",
      },
    },
  },
  conditions: {
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `var(--font-lora), Georgia, serif` },
        body: { value: `var(--font-inter), system-ui, -apple-system, sans-serif` },
        mono: {
          value: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
        },
      },
      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
        "5xl": { value: "3rem" },
        "6xl": { value: "3.75rem" },
      },
      /* Jerarquía tipográfica de apps/web/DESIGN.md. */
      lineHeights: {
        display: { value: "1.08" },
        headline: { value: "1.1" },
        title: { value: "1.2" },
        body: { value: "1.625" },
      },
      letterSpacings: {
        display: { value: "-0.025em" },
        headline: { value: "-0.02em" },
        label: { value: "0.14em" },
      },
      /* Tres anchos de página únicos (estrecho 896 px, estándar 1152 px, amplio 1280 px). */
      sizes: {
        pageNarrow: { value: "56rem" },
        pageDefault: { value: "72rem" },
        pageWide: { value: "80rem" },
      },
      colors: {
        primary: {
          50: { value: "#fafafa" },
          100: { value: "#f4f4f5" },
          200: { value: "#e4e4e7" },
          300: { value: "#d4d4d8" },
          400: { value: "#a1a1aa" },
          500: { value: "#71717a" },
          600: { value: "#52525b" },
          700: { value: "#3f3f46" },
          800: { value: "#27272a" },
          900: { value: "#18181b" },
        },
        brand: {
          whatsapp: { value: "#25D366" },
          whatsappHover: { value: "#1DAE54" },
          whatsappActive: { value: "#178B43" },
          // Tokens accesibles v2 (>= 4.5:1 con texto blanco) para prototipos en /design-system
          whatsappAccessible: { value: "#15803d" },
          whatsappAccessibleHover: { value: "#166534" },
          whatsappAccessibleActive: { value: "#14532d" },
          /* Único acento de marca (manual v1.0): coral del logo, solo en texto grande. */
          coral: { value: "#FF5A5F" },
          /* Negro de marca (apps/web/DESIGN.md). */
          ink: { value: "#111111" },
          inkHover: { value: "#2A2A2A" },
          inkActive: { value: "#000000" },
          inkSoft: { value: "#4A4A4A" },
        },
        status: {
          info: { value: "#38bdf8" },
          infoSoft: { value: "rgba(56, 189, 248, 0.1)" },
          infoSubtle: { value: "rgba(56, 189, 248, 0.12)" },
          infoBorder: { value: "rgba(56, 189, 248, 0.25)" },
          danger: { value: "#f87171" },
          dangerSoft: { value: "rgba(239, 68, 68, 0.1)" },
          success: { value: "#34d399" },
          successSoft: { value: "rgba(52, 211, 153, 0.1)" },
          warning: { value: "#fbbf24" },
          warningSoft: { value: "rgba(245, 158, 11, 0.1)" },
        },
        accent: {
          violet: { value: "#a855f7" },
          violetSoft: { value: "#a78bfa" },
        },
        overlay: {
          subtle: { value: "rgba(0, 0, 0, 0.04)" },
          faint: { value: "rgba(0, 0, 0, 0.08)" },
          dim: { value: "rgba(0, 0, 0, 0.3)" },
          scrim: { value: "rgba(0, 0, 0, 0.5)" },
          glass: { value: "rgba(0, 0, 0, 0.6)" },
          strong: { value: "rgba(0, 0, 0, 0.78)" },
        },
      },
      radii: {
        card: { value: "16px" },
        modal: { value: "24px" },
      },
      shadows: {
        navDesktop: { value: "0 8px 32px 0 rgba(0, 0, 0, 0.08)" },
        adminNav: { value: "0 10px 30px rgba(0, 0, 0, 0.06)" },
        adminCard: { value: "0 4px 20px rgba(0, 0, 0, 0.04)" },
        cardLift: { value: "0 20px 40px rgba(0, 0, 0, 0.3)" },
        elevatedLg: { value: "0 8px 32px rgba(0, 0, 0, 0.12)" },
        modalLg: { value: "0 20px 50px rgba(0,0,0,0.3)" },
      },
    },
    semanticTokens: {
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

        // Borders
        "border.default": { value: { _light: "{colors.gray.200}", _dark: "rgba(255,255,255,0.08)" } },
        "border.subtle": { value: { _light: "rgba(0,0,0,0.06)", _dark: "rgba(255,255,255,0.08)" } },
        "border.strong": { value: { _light: "{colors.gray.300}", _dark: "rgba(255,255,255,0.12)" } },
        "border.warm": { value: { _light: "#E6E3DE", _dark: "rgba(255,255,255,0.08)" } },
        "border.warmStrong": { value: { _light: "#D9D6D0", _dark: "rgba(255,255,255,0.14)" } },

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

        // Text
        "text.body": { value: { _light: "{colors.gray.800}", _dark: "{colors.gray.300}" } },
        "text.heading": { value: { _light: "{colors.gray.900}", _dark: "white" } },
        "text.muted": { value: { _light: "{colors.gray.600}", _dark: "{colors.gray.400}" } },
        "text.accent": { value: { _light: "{colors.primary.600}", _dark: "{colors.primary.300}" } },
      },
    },
    recipes: {
      button: buttonRecipe,
      badge: badgeRecipe,
      input: inputRecipe,
      textarea: textareaRecipe,
    },
    slotRecipes: {
      card: cardRecipe,
      nativeSelect: nativeSelectRecipe,
      tabs: tabsRecipe,
      table: tableRecipe,
      alert: alertRecipe,
      dialog: dialogRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
