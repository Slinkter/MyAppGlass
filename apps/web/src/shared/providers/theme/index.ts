/**
 * @file index.ts
 * @description Aura Design System - Chakra UI v3 Core Configuration.
 * Single source of truth for design tokens, component recipes, and semantic themes.
 * Optimized for GYA Glass & Aluminum aesthetics: Zinc Scale, Clean surfaces.
 */

import { createSystem, defineConfig, defaultConfig, defineRecipe, defineSlotRecipe } from "@chakra-ui/react";

// ─── Component Recipes (v3 Architecture) ───────────────────────────────────

/**
 * Custom variants for the Aura system.
 */
const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "wider",
    borderRadius: "full",
    transition: "background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    // La variable real del token es `--chakra-colors-ring.primary` (con punto), no `-ring-primary`:
    // se usa la referencia de token para que el foco sea visible (WCAG 2.4.7).
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
        whatsapp: {
          bg: "brand.whatsapp",
          color: "white",
          px: "8",
          _hover: {
            bg: "brand.whatsappHover",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          },
          _active: {
            bg: "brand.whatsappActive",
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
      sm: {
        h: "11",
        minW: "11",
        px: "4",
        fontSize: "xs",
      },
      md: {
        h: "11",
        minW: "11",
        px: "6",
        fontSize: "sm",
      },
      lg: {
        h: "12",
        minW: "12",
        px: "8",
        fontSize: "md",
      },
      xl: {
        h: "14",
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
 * High-end form fields with Aura styling.
 * En Chakra v3 `input` y `textarea` son recetas simples (no slot recipes); los estilos
 * van en la variante `outline` (la predeterminada) para que no los pise el `bg`/`borderColor` de Chakra.
 */
const fieldOutline = {
  bg: "surface.container",
  borderWidth: "1px",
  borderColor: "border.default",
  borderRadius: "md",
  transition: "border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  _placeholder: { color: "text.muted" },
  _hover: { borderColor: "border.strong" },
  _focusVisible: {
    borderColor: "ring.primary",
    boxShadow: "0 0 0 1px var(--chakra-colors-ring-primary)",
  },
};

const inputRecipe = defineRecipe({
  variants: { variant: { outline: fieldOutline } },
});

const textareaRecipe = defineRecipe({
  variants: { variant: { outline: fieldOutline } },
});

/**
 * Card es una slot recipe en v3: la superficie va en el slot `root`
 * (en la variante `outline`, la predeterminada, que si no fija `bg.panel`/`border`).
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
    // Respaldo global de foco de teclado (WCAG 2.4.7). Los componentes con foco propio y `a` (arriba/abajo) mantienen sus reglas.
    [focusVisibleSelectors]: {
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "ring.primary",
        outlineOffset: "2px",
      },
    },
    a: {
      _focusVisible: {
        outline: "none",
        ring: "2px",
        ringColor: "ring.primary",
        ringOffset: "2px",
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
          red: { value: "#FF5A5F" },
          redHover: { value: "#E0484D" },
          redDark: { value: "#D9444A" },
          ink: { value: "#0f172a" },
          navy: { value: "#002060" },
          redQuote: { value: "#D62828" },
          logoCoral: { value: "#FF5A5A" },
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
        "bg.tintNavy": { value: { _light: "#F3F5F9", _dark: "rgba(0, 32, 96, 0.24)" } },

        // Brand
        "brand.primary": { value: { _light: "{colors.primary.900}", _dark: "white" } },
        "accent.navy": { value: { _light: "#002060", _dark: "#93C5FD" } },
        // Texto/icono sobre fondo accent.navy (chips seleccionados): en oscuro accent.navy es claro
        "accent.navyContrast": { value: { _light: "white", _dark: "#0f172a" } },

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

        // Status Text (contraste de texto >=4.5:1 sobre blanco en claro, WCAG 1.4.3)
        "status.dangerText": { value: { _light: "#b91c1c", _dark: "#f87171" } },
        "status.successText": { value: { _light: "#047857", _dark: "#34d399" } },

        // Focus (≥3:1 sobre el fondo en ambos temas, WCAG 1.4.11)
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
      input: inputRecipe,
      textarea: textareaRecipe,
    },
    slotRecipes: {
      card: cardRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
