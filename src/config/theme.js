/**
 * @file theme.js
 * @description Application-wide Chakra UI theme extension, defining the Aura Design System.
 * Single source of truth for: typography, palette colors, semantic tokens, and component variants.
 * @module config
 * @remarks
 * - Spacing: Golden Ratio (Fibonacci-based) for natural harmony.
 * - Colors: Zinc-based palette for metal and glass aesthetics. (Pure Neutral)
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
  colors: {
    // Aura Color System: Zinc Scale (Absolutely neutral grays)
    primary: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b", // Deep Zinc
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
      info: "#71717a", // Zinc.500 instead of blue
    },
    surface: {
      solid: "#ffffff",
      solidDark: "#09090b", // Absolute Zinc dark
    }
  },

  // ─── Semantic Tokens ───────────────────────────────────────────────────────
  semanticTokens: {
    colors: {
      "bg.page":    { default: "gray.50",    _dark: "#000000" },
      "bg.section": { default: "white",      _dark: "#09090b" },
      "bg.glass":   { default: "white",      _dark: "primary.900" },
      "bg.subtle":  { default: "blackAlpha.50", _dark: "whiteAlpha.50" },

      // Glass surfaces
      "surface.card":     { default: "rgba(255, 255, 255, 0.25)", _dark: "rgba(24, 24, 27, 0.4)" },
      "surface.nav":      { default: "rgba(255, 255, 255, 0.95)", _dark: "rgba(0, 0, 0, 0.9)" },
      "surface.icon":     { default: "primary.50", _dark: "whiteAlpha.100" },
      "surface.iconHover": { default: "primary.100", _dark: "whiteAlpha.200" },

      // Borders
      "border.default": { default: "gray.200",        _dark: "whiteAlpha.100" },
      "border.strong":  { default: "gray.300",        _dark: "whiteAlpha.200" },
      "border.glass":   { default: "gray.200",        _dark: "whiteAlpha.100" },

      // Text
      "text.body":    { default: "gray.800", _dark: "gray.300" },
      "text.heading": { default: "gray.900", _dark: "white"    },
      "text.muted":   { default: "gray.600", _dark: "gray.400" },
      "text.subtle":  { default: "gray.500", _dark: "gray.500" },
      "text.accent":  { default: "primary.600", _dark: "primary.300" },
    },
  },

  space: auraSpacing,
  radii: {
    phi: "1.618rem", 
    card: "16px",
    modal: "24px",
  },

  // ─── Color Mode Config ────────────────────────────────────────────────────
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },

  // ─── Global Styles ────────────────────────────────────────────────────────
  styles: {
    global: {
      body: {
        bg: "bg.page",
        color: "text.body",
        WebkitFontSmoothing: "antialiased",
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
    Box: {
      variants: {
        glass: {
          bg: "bg.glass",
          border: "1px solid",
          borderColor: "border.glass",
          borderRadius: "card",
          boxShadow: "sm",
        },
      },
    },
  },
});

export default theme;
