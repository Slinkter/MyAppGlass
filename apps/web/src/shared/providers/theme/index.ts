/**
 * @file index.ts
 * @description Aura Design System v2 - Chakra UI v3 Core Configuration.
 * Single source of truth for design tokens, component recipes, and semantic themes.
 * Marca v2: Source Serif 4 + Inter, Navy #002060, fondos cálidos (#F7F6F3 / #FBF8F3).
 */

import { createSystem, defineConfig, defaultConfig, defineRecipe, defineSlotRecipe } from "@chakra-ui/react";
import { EASE_SOFT, DUR_CSS } from "@/shared/constants/motion";

// ─── Component Recipes (v3 Architecture) ───────────────────────────────────

/**
 * Receta de botones del Design System v2:
 * - Variante primaria `aura`: negro de marca en claro, blanco con texto oscuro en modo oscuro (el acento navy se retiró: la marca es negra).
 * - `uppercase` por defecto (Decisión #3 aprobada por el usuario).
 * - Todos los tamaños garantizan área táctil >= 44px (`minH: "11"`, `minW: "11"`, Regla R3).
 * - `transition` restringida a 2 propiedades (Regla R5).
 */
const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "wider",
    borderRadius: "full",
    minH: "11",
    minW: "11",
    transition: `background-color ${DUR_CSS.fast} ${EASE_SOFT}, transform ${DUR_CSS.fast} ${EASE_SOFT}`,
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
      aura: {
        bg: "primary.900",
        color: "white",
        px: "8",
        _hover: {
          bg: "primary.700",
          transform: "translateY(-2px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        },
        _active: {
          bg: "primary.800",
          transform: "translateY(0)",
        },
        _dark: {
          bg: "white",
          color: "#18181b",
          _hover: {
            bg: "gray.100",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.25)",
          },
          _active: {
            bg: "gray.200",
          },
        },
      },
      navy: {
        bg: "brand.navy",
        color: "white",
        px: "8",
        _hover: {
          bg: "brand.navyHover",
          transform: "translateY(-2px)",
        },
        _active: {
          bg: "brand.navyActive",
          transform: "translateY(0)",
        },
        _dark: {
          bg: "accent.navy",
          color: "accent.navyContrast",
          _hover: {
            bg: "blue.200",
          },
          _active: {
            bg: "blue.300",
          },
        },
      },
      whatsapp: {
        // Verde accesible: blanco sobre #15803d da >= 4,5:1 (el #25D366 daba 1,98:1).
        bg: "brand.whatsappAccessible",
        color: "white",
        px: "8",
        _hover: {
          bg: "brand.whatsappAccessibleHover",
          transform: "translateY(-2px)",
          boxShadow: "md",
        },
        _active: {
          bg: "brand.whatsappAccessibleActive",
          transform: "translateY(0)",
        },
      },
      brand: {
        bg: "brand.red",
        color: "white",
        px: "8",
        _hover: {
          bg: "brand.redHover",
          transform: "translateY(-2px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        },
        _active: {
          bg: "brand.redDark",
          transform: "translateY(0)",
        },
      },
      outline: {
        borderWidth: "2px",
        borderColor: "primary.900",
        color: "primary.900",
        px: "8",
        _hover: {
          bg: "blackAlpha.50",
        },
        _dark: {
          borderColor: "white",
          color: "white",
          _hover: {
            bg: "whiteAlpha.100",
          },
        },
      },
      outlineNavy: {
        borderWidth: "2px",
        borderColor: "accent.navy",
        color: "accent.navy",
        px: "8",
        _hover: {
          bg: "bg.tintNavy",
        },
        _dark: {
          borderColor: "accent.navy",
          color: "accent.navy",
          _hover: {
            bg: "whiteAlpha.100",
          },
        },
      },
      ghost: {
        color: "text.body",
        _hover: {
          bg: "blackAlpha.50",
        },
        _dark: {
          color: "gray.300",
          _hover: {
            bg: "whiteAlpha.100",
            color: "white",
          },
        },
      },
    },
    size: {
      xs: {
        h: "11",
        minH: "11",
        minW: "11",
        px: "3",
        fontSize: "xs",
      },
      sm: {
        h: "11",
        minH: "11",
        minW: "11",
        px: "4",
        fontSize: "xs",
      },
      md: {
        h: "11",
        minH: "11",
        minW: "11",
        px: "6",
        fontSize: "sm",
      },
      lg: {
        h: "12",
        minH: "12",
        minW: "12",
        px: "8",
        fontSize: "md",
      },
      xl: {
        h: "14",
        minH: "14",
        minW: "14",
        fontSize: "lg",
        px: "14",
      },
    },
  },
  defaultVariants: {
    variant: "aura",
    size: "md",
  },
});

/**
 * Receta propia para Badge: añade variantes semánticas v2 (`neutral`, `navy`, `success`, `warning`, `danger`, `info`)
 * sin alterar las variantes por defecto de Chakra (`subtle`, `outline`, `solid`) que usan el Home y Servicios actuales.
 */
const badgeRecipe = defineRecipe({
  variants: {
    variant: {
      neutral: {
        bg: "bg.subtle",
        color: "text.body",
        borderWidth: "1px",
        borderColor: "border.default",
      },
      navy: {
        bg: "bg.tintNavy",
        color: "accent.navy",
        borderWidth: "1px",
        borderColor: "border.default",
      },
      navySolid: {
        bg: "accent.navy",
        color: "accent.navyContrast",
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
    },
  },
});

/**
 * Campos de formulario (`input`, `textarea`, `nativeSelect`) con altura mínima táctil de 44px (`minH: "11"`).
 * Usa el token `ring.primary` directamente en lugar de `var(--chakra-colors-ring-primary)` (Regla R8).
 */
const fieldOutline = {
  minH: "11",
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
};

const inputRecipe = defineRecipe({
  variants: { variant: { outline: fieldOutline } },
});

const textareaRecipe = defineRecipe({
  variants: { variant: { outline: fieldOutline } },
});

const nativeSelectRecipe = defineSlotRecipe({
  slots: ["root", "field", "indicator"],
  variants: {
    variant: {
      outline: {
        field: fieldOutline,
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
        root: { bg: "bg.warm", borderWidth: "1px", borderColor: "border.warm" },
      },
    },
  },
});

/**
 * Tabs slot recipe: añade variante `navyLine` para v2 sin cambiar el color de las pestañas existentes del sitio.
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
      bg: "bg.warm",
    },
    cell: {
      borderColor: "border.subtle",
      color: "text.body",
    },
  },
});

/**
 * Alert slot recipe: estados semánticos con contraste verificado.
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
        heading: { value: `var(--font-source-serif), Georgia, serif` },
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
          red: { value: "#FF5A5F" },
          redHover: { value: "#E0484D" },
          /* Rojo de marca (#D62828): solo para la palabra PRESUPUESTO. Contraste 5,0:1 sobre blanco. */
          quoteRed: { value: "#D62828" },
          redDark: { value: "#D9444A" },
          ink: { value: "#0f172a" },
          inkV2: { value: "#111111" },
          inkSoft: { value: "#4A4A4A" },
          /* Dirección 2026-11-09: la marca es NEGRA. Los tokens "navy" se mantienen por compatibilidad pero resuelven a negro de marca (#111111); el azul queda solo en foco y enlaces. */
          navy: { value: "#111111" },
          navyHover: { value: "#2A2A2A" },
          navyActive: { value: "#000000" },
          redQuote: { value: "#D62828" },
          logoCoral: { value: "#FF5A5A" },
          paperWarm: { value: "#F7F6F3" },
          paperCream: { value: "#FBF8F3" },
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
        adminTable: { value: "0 8px 30px rgba(0, 0, 0, 0.04)" },
        cardLift: { value: "0 20px 40px rgba(0, 0, 0, 0.3)" },
        elevatedLg: { value: "0 8px 32px rgba(0, 0, 0, 0.12)" },
        modalLg: { value: "0 20px 50px rgba(0,0,0,0.3)" },
      },
    },
    semanticTokens: {
      colors: {
        "bg.page": { value: { _light: "{colors.gray.50}", _dark: "#09090b" } },
        "bg.section": { value: { _light: "white", _dark: "#121215" } },
        "bg.surface": { value: { _light: "white", _dark: "rgba(24, 24, 27, 0.8)" } },
        "bg.subtle": { value: { _light: "rgba(0,0,0,0.04)", _dark: "rgba(255,255,255,0.04)" } },
        "bg.warm": { value: { _light: "#F7F6F3", _dark: "#161614" } },
        "bg.paper": { value: { _light: "#FBF8F3", _dark: "#161614" } },
        "bg.tintNavy": { value: { _light: "#F3F5F9", _dark: "rgba(0, 32, 96, 0.24)" } },

        // Brand
        "brand.primary": { value: { _light: "{colors.primary.900}", _dark: "white" } },
        "accent.navy": { value: { _light: "#111111", _dark: "#FFFFFF" } },
        "accent.navyContrast": { value: { _light: "white", _dark: "#111111" } },

        "surface.card": { value: { _light: "white", _dark: "rgba(24, 24, 27, 0.8)" } },
        "surface.nav": { value: { _light: "rgba(255, 255, 255, 0.95)", _dark: "rgba(0, 0, 0, 0.9)" } },
        "surface.container": { value: { _light: "white", _dark: "rgba(255,255,255,0.04)" } },
        "surface.icon": { value: { _light: "{colors.primary.50}", _dark: "rgba(255,255,255,0.04)" } },
        "surface.iconHover": { value: { _light: "{colors.primary.100}", _dark: "rgba(255,255,255,0.08)" } },

        // Borders
        "border.default": { value: { _light: "{colors.gray.200}", _dark: "rgba(255,255,255,0.08)" } },
        "border.subtle": { value: { _light: "rgba(0,0,0,0.06)", _dark: "rgba(255,255,255,0.08)" } },
        "border.strong": { value: { _light: "{colors.gray.300}", _dark: "rgba(255,255,255,0.12)" } },
        "border.warm": { value: { _light: "#E6E3DE", _dark: "rgba(255,255,255,0.08)" } },
        "border.warmStrong": { value: { _light: "#D9D6D0", _dark: "rgba(255,255,255,0.14)" } },
        // @deprecated: solo fallback en ProjectServiceSelect.tsx
        "border.slate": { value: "#e2e8f0" },

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
        "text.subtle": { value: { _light: "{colors.gray.500}", _dark: "{colors.gray.400}" } },
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
