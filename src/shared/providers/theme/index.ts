/**
 * @file index.ts
 * @description Aura Design System - Chakra UI v3 Core Configuration.
 * Single source of truth for design tokens, component recipes, and semantic themes.
 * Optimized for GYA Glass & Aluminum aesthetics: Zinc Scale, Fibonacci Spacing, Glassmorphism.
 */

import { createSystem, defineConfig, defaultConfig, defineRecipe, defineSlotRecipe } from "@chakra-ui/react";

// ─── Component Recipes (v3 Architecture) ───────────────────────────────────

/**
 * Custom variants for the Aura system with Fibonacci spacing.
 */
const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "wider",
    borderRadius: "full",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
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
          bg: "primary.100",
          color: "primary.900",
          _hover: {
            bg: "white",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
          },
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
          borderColor: "primary.100",
          color: "primary.100",
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
          _hover: {
            bg: "whiteAlpha.100",
          },
        },
      },
    },
    size: {
      sm: {
        h: "8",
        px: "3",
        fontSize: "xs",
      },
      md: {
        h: "10",
        px: "6",
        fontSize: "sm",
      },
      lg: {
        h: "12",
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
 */
const inputRecipe = defineSlotRecipe({
  slots: ["root", "content", "field"],
  base: {
    field: {
      bg: "surface.container",
      borderWidth: "1px",
      borderColor: "border.glass",
      borderRadius: "md",
      px: "3",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      _placeholder: { color: "text.muted" },
      _hover: { borderColor: "border.strong" },
      _focus: {
        borderColor: "ring.primary",
        boxShadow: "0 0 0 1px var(--chakra-colors-ring-primary)",
      },
    },
  },
  variants: {
    variant: {
      aura: {
        field: {
          backdropFilter: "blur(8px)",
        },
      },
    },
  },
  defaultVariants: {
    variant: "aura",
  },
});

// ─── System Configuration ──────────────────────────────────────────────────

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
        heading: { value: `'Lora', serif` },
        body: { value: `'Lora', serif` },
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
        },
      },
      spacing: {
        "18": { value: "4.5rem" },
        "22": { value: "5.5rem" },
        "30": { value: "7.5rem" },
        "34": { value: "8.5rem" },
        "38": { value: "9.5rem" },
        "42": { value: "10.5rem" },
        "46": { value: "11.5rem" },
      },
      radii: {
        phi: { value: "1.618rem" },
        card: { value: "16px" },
        modal: { value: "24px" },
      },
      shadows: {
        glass: { value: "0 8px 32px 0 rgba(0, 0, 0, 0.08)" },
        glassHover: { value: "0 12px 40px 0 rgba(0, 0, 0, 0.12)" },
      },
    },
    semanticTokens: {
      colors: {
        "bg.page": { value: { _light: "{colors.gray.50}", _dark: "#09090b" } },
        "bg.section": { value: { _light: "white", _dark: "#121215" } },
        "bg.glass": { value: { _light: "white", _dark: "{colors.primary.900}" } },
        "bg.subtle": { value: { _light: "rgba(0,0,0,0.04)", _dark: "rgba(255,255,255,0.04)" } },

        // Glass surfaces
        "glass.bg": { value: { _light: "rgba(255, 255, 255, 0.25)", _dark: "rgba(24, 24, 27, 0.4)" } },
        "glass.border": { value: { _light: "rgba(0, 0, 0, 0.08)", _dark: "rgba(255, 255, 255, 0.06)" } },
        "glass.textShadow": { value: { _light: "0 2px 4px rgba(0,0,0,0.05)", _dark: "0 2px 4px rgba(0,0,0,0.5)" } },
        
        "surface.card": { value: "{colors.glass.bg}" },
        "surface.nav": { value: { _light: "rgba(255, 255, 255, 0.95)", _dark: "rgba(0, 0, 0, 0.9)" } },
        "surface.container": { value: { _light: "white", _dark: "rgba(255,255,255,0.04)" } },
        "surface.icon": { value: { _light: "{colors.primary.50}", _dark: "rgba(255,255,255,0.04)" } },
        "surface.iconHover": { value: { _light: "{colors.primary.100}", _dark: "rgba(255,255,255,0.08)" } },

        // Borders
        "border.default": { value: { _light: "{colors.gray.200}", _dark: "rgba(255,255,255,0.08)" } },
        "border.strong": { value: { _light: "{colors.gray.300}", _dark: "rgba(255,255,255,0.12)" } },
        "border.glass": { value: "{colors.glass.border}" },

        // Focus
        "ring.primary": { value: { _light: "{colors.primary.400}", _dark: "{colors.primary.500}" } },

        // Text
        "text.body": { value: { _light: "{colors.gray.800}", _dark: "{colors.gray.300}" } },
        "text.heading": { value: { _light: "{colors.gray.900}", _dark: "white" } },
        "text.muted": { value: { _light: "{colors.gray.600}", _dark: "{colors.gray.400}" } },
        "text.subtle": { value: { _light: "{colors.gray.500}", _dark: "{colors.gray.500}" } },
        "text.accent": { value: { _light: "{colors.primary.600}", _dark: "{colors.primary.300}" } },
      },
    },
    recipes: {
      button: buttonRecipe,
      glass: defineRecipe({
        base: {
          bg: "glass.bg",
          backdropFilter: "blur(12px)",
          borderWidth: "1px",
          borderColor: "glass.border",
          borderRadius: "card",
          boxShadow: "glass",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        variants: {
          variant: {
            interactive: {
              _hover: {
                bg: { _light: "rgba(255,255,255,0.35)", _dark: "rgba(24,24,27,0.5)" },
                boxShadow: "glassHover",
                transform: "translateY(-2px)",
              }
            },
            strong: {
              backdropFilter: "blur(20px)",
              bg: { _light: "rgba(255,255,255,0.45)", _dark: "rgba(24,24,27,0.6)" },
            }
          }
        }
      }),
      card: defineRecipe({
        base: {
          bg: "surface.card",
          borderWidth: "1px",
          borderColor: "border.glass",
          borderRadius: "card",
          backdropFilter: "blur(12px)",
          boxShadow: "sm",
          p: "6",
        },
        variants: {
          variant: {
            glass: {
              bg: "surface.card",
              backdropFilter: "blur(16px)",
            },
            solid: {
              bg: "bg.section",
              borderWidth: "0",
            }
          }
        }
      })
    },
    slotRecipes: {
      input: inputRecipe,
      select: inputRecipe,
      textarea: inputRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
