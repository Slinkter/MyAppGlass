/**
 * @file theme.js
 * @description Application-wide Chakra UI theme extension, defining the Aura Design System.
 * Single source of truth for: typography, palette colors, semantic tokens, and component variants.
 * @module config
 * @remarks
 * - Spacing: Golden Ratio (Fibonacci-based) for natural harmony.
 * - Colors: Slate-based palette for metal and glass aesthetics.
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
    // Aura Color System: Slate for Aluminum/Metal
    primary: {
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
    },
    surface: {
      solid: "#ffffff",
      solidDark: "#0f172a", // Slate.900
    }
  },

  // ─── Semantic Tokens ───────────────────────────────────────────────────────
  semanticTokens: {
    colors: {
      "bg.page":    { default: "gray.50",    _dark: "primary.900" },
      "bg.section": { default: "white",      _dark: "primary.800" },
      "bg.subtle":  { default: "blackAlpha.50", _dark: "whiteAlpha.50" },

      // Glass surfaces
      "surface.card":     { default: "rgba(255, 255, 255, 0.25)", _dark: "rgba(15, 23, 42, 0.25)" },
      "surface.nav":      { default: "rgba(255, 255, 255, 0.95)", _dark: "rgba(15, 23, 42, 0.95)" },

      // Borders
      "border.default": { default: "gray.200",        _dark: "whiteAlpha.100" },
      "border.strong":  { default: "gray.300",        _dark: "whiteAlpha.200" },
      "border.glass":   { default: "rgba(255, 255, 255, 0.35)", _dark: "rgba(255, 255, 255, 0.15)" },

      // Text
      "text.body":    { default: "gray.800", _dark: "gray.100" },
      "text.heading": { default: "gray.900", _dark: "white"    },
      "text.muted":   { default: "gray.600", _dark: "gray.300" },
      "text.subtle":  { default: "gray.500", _dark: "gray.400" },
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
    initialColorMode: "system",
    useSystemColorMode: true,
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
        glass: (props) => ({
          bg: props.colorMode === "dark" ? "primary.800" : "white",
          border: "1px solid",
          borderColor: props.colorMode === "dark" ? "whiteAlpha.100" : "gray.200",
          borderRadius: "card",
          boxShadow: "sm",
        }),
      },
    },
  },
});

export default theme;
