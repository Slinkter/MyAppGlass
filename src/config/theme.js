/**
 * @file theme.js
<<<<<<< HEAD
 * @description Application-wide Chakra UI theme extension, defining the Aura Design System.
=======
 * @description Application-wide Chakra UI theme extension.
 * Single source of truth for: typography, palette colors, semantic tokens, and component variants.
 *
 * ## Semantic Token Convention
 * All components should use semantic tokens (e.g. `color="text.body"`) instead of
 * calling `useColorModeValue()` for base palette lookups. This ensures a single
 * point of truth for light/dark adaptation.
 *
>>>>>>> origin/main
 * @module config
 * @remarks
 * - Spacing: Golden Ratio (Fibonacci-based) for natural harmony.
 * - Colors: Slate-based palette for metal and glass aesthetics.
 * - Glassmorphism: Enhanced blur with GPU optimization.
 */

import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/lora";

const auraSpacing = {
  phi_xs: "4px",    // 1
  phi_sm: "8px",    // 2
  phi_md: "12px",   // 3
  phi_lg: "20px",   // 5
  phi_xl: "32px",   // 8
  phi_2xl: "52px",  // 13
  phi_3xl: "84px",  // 21
};

const theme = extendTheme({
  // ─── Typography ────────────────────────────────────────────────────────────
  fonts: {
    heading: `"Lora", serif`,
    body: `"Lora", serif`,
  },
<<<<<<< HEAD
=======
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },

  // ─── Raw Palette Colors ────────────────────────────────────────────────────
  // Only for use in semanticTokens below, NOT directly in components.
>>>>>>> origin/main
  colors: {
    // Aura Color System: Slate for Aluminum/Metal
    primary: {
<<<<<<< HEAD
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a", // Slate.900: Pure Metal
    },
    // Aura Accent: Translucent Cyan for Interactive Glass
    accent: {
      base: "rgba(6, 182, 212, 0.5)", // Cyan.500 with alpha
      hover: "rgba(6, 182, 212, 0.7)",
      solid: "#06b6d4",
=======
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
      accent: "#ff5757",
    },
    brand: {
      whatsapp: "#25D366",
      whatsappHover: "#1DAE54",
      whatsappActive: "#178B43",
    },
    // State colors (semantic helpers)
    state: {
      success: "green.500",
      warning: "orange.500",
      error: "red.500",
      info: "blue.500",
>>>>>>> origin/main
    },
    surface: {
      solid: "#ffffff",
      solidDark: "#0f172a", // Slate.900
    }
  },
<<<<<<< HEAD
  space: auraSpacing,
  radii: {
    phi: "1.618rem", 
    card: "16px",
    modal: "24px",
=======

  // ─── Semantic Tokens ───────────────────────────────────────────────────────
  // THIS is what components should reference. Add new tokens here, never in components.
  semanticTokens: {
    colors: {
      // Page & section backgrounds
      "bg.page":    { default: "gray.100",   _dark: "gray.900" },
      "bg.section": { default: "gray.50",    _dark: "gray.800" },
      "bg.subtle":  { default: "blackAlpha.50", _dark: "whiteAlpha.50" },

      // Glass / frosted surfaces
      // card glass: main cards (FeatureCard, GlassCard base)
      "surface.card":     { default: "rgba(255, 255, 255, 0.25)", _dark: "rgba(0, 0, 0, 0.25)" },
      // container glass: slightly less opaque (services sections, wrappers)
      "surface.container":{ default: "rgba(255, 255, 255, 0.15)", _dark: "rgba(0, 0, 0, 0.15)" },
      // nav glass: nearly opaque (Navbar, Footer, BottomNav)
      "surface.nav":      { default: "rgba(255, 255, 255, 0.95)", _dark: "rgba(15, 15, 15, 0.95)" },
      "surface.footer":   { default: "rgba(255, 255, 255, 0.98)", _dark: "rgba(10, 10, 10, 0.98)" },
      "surface.bottomNav":{ default: "rgba(255, 255, 255, 0.98)", _dark: "rgba(20, 20, 20, 0.98)" },
      // icon circle background
      "surface.icon":     { default: "rgba(255, 255, 255, 0.30)", _dark: "rgba(0, 0, 0, 0.30)" },
      "surface.iconHover":{ default: "rgba(255, 255, 255, 0.50)", _dark: "rgba(0, 0, 0, 0.50)" },

      // Borders
      "border.default": { default: "gray.200",        _dark: "whiteAlpha.100" },
      "border.strong":  { default: "gray.300",        _dark: "whiteAlpha.200" },
      "border.glass":   { default: "rgba(255, 255, 255, 0.35)", _dark: "rgba(255, 255, 255, 0.15)" },
      "border.nav":     { default: "gray.200",        _dark: "whiteAlpha.100" },

      // Text
      "text.body":    { default: "gray.800", _dark: "gray.100" },
      "text.heading": { default: "gray.900", _dark: "white"    },
      "text.muted":   { default: "gray.600", _dark: "gray.300" },
      "text.subtle":  { default: "gray.500", _dark: "gray.400" },
      "text.inverse": { default: "white",    _dark: "gray.800" },
      "text.accent":  { default: "primary.600", _dark: "primary.300" },

      // Interactive action states
      "action.hoverBg":     { default: "blackAlpha.100", _dark: "whiteAlpha.200" },
      "action.activeBg":    { default: "primary.600",    _dark: "primary.500"    },
      "action.activeColor": { default: "white",          _dark: "white"          },
      "action.inactiveBg":  { default: "whiteAlpha.400", _dark: "whiteAlpha.100" },

      // Sidebar / navigation items
      "nav.activeBg":     { default: "primary.50",      _dark: "whiteAlpha.200" },
      "nav.activeColor":  { default: "primary.900",     _dark: "primary.300"   },
      "nav.hoverBg":      { default: "primary.50",      _dark: "whiteAlpha.100" },
      "nav.inactiveColor":{ default: "gray.700",        _dark: "gray.300"      },

      // Skeleton / placeholder
      "skeleton.base":  { default: "gray.100", _dark: "gray.700" },
      "skeleton.start": { default: "gray.200", _dark: "gray.600" },
    },
  },

  // ─── Border Radii ─────────────────────────────────────────────────────────
  radii: {
    card:   "lg",   // 8px
    button: "md",   // 4px
    input:  "md",   // 4px
    modal:  "2xl",  // 16px
    avatar: "full", // circular
>>>>>>> origin/main
  },

  // ─── Color Mode Config ────────────────────────────────────────────────────
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },

  // ─── Global Styles ────────────────────────────────────────────────────────
  styles: {
    global: {
      body: {
<<<<<<< HEAD
        bg: props.colorMode === "dark" ? "primary.900" : "gray.50",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
        WebkitFontSmoothing: "antialiased",
=======
        bg: "bg.page",
        color: "text.body",
>>>>>>> origin/main
      },
      "*:focus-visible": {
        outline: "3px solid",
        outlineColor: "primary.400",
        outlineOffset: "3px",
        borderRadius: "4px",
      },
    },
  },

  // ─── Component Variants ───────────────────────────────────────────────────
  components: {
    Container: {
      baseStyle: {
        maxW: "1440px",
      }
    },
    // Flat Design Components
    Box: {
      variants: {
<<<<<<< HEAD
        glass: (props) => ({
          bg: props.colorMode === "dark" ? "primary.800" : "white",
          border: "1px solid",
          borderColor: props.colorMode === "dark" ? "whiteAlpha.100" : "gray.200",
          borderRadius: "card",
          boxShadow: "sm",
        }),
=======
        /**
         * glass — frosted glass card.
         * Used by GlassCard, FeatureCard, BentoCTA, etc.
         */
        glass: {
          container: {
            bg: "surface.card",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid",
            borderColor: "border.glass",
            borderRadius: "2xl",
            boxShadow: "sm",
            transition: "all 0.3s ease",
          },
        },
        /**
         * solid — standard card with opaque background.
         * For sections that do not need glassmorphism.
         */
        solid: {
          container: {
            bg: "bg.section",
            border: "1px solid",
            borderColor: "border.default",
            borderRadius: "xl",
            boxShadow: "sm",
          },
        },
>>>>>>> origin/main
      },
    },
  },
});

export default theme;
