/**
 * @file theme.js
 * @description Application-wide Chakra UI theme extension.
 * Single source of truth for: typography, palette colors, semantic tokens, and component variants.
 *
 * ## Semantic Token Convention
 * All components should use semantic tokens (e.g. `color="text.body"`) instead of
 * calling `useColorModeValue()` for base palette lookups. This ensures a single
 * point of truth for light/dark adaptation.
 *
 * @module config
 */

import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/lora";

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
  // Only for use in semanticTokens below, NOT directly in components.
  colors: {
    primary: {
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
    },
  },

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
  },

  // ─── Color Mode Config ────────────────────────────────────────────────────
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },

  // ─── Global Styles ────────────────────────────────────────────────────────
  styles: {
    global: {
      body: {
        bg: "bg.page",
        color: "text.body",
      },
      "*:focus-visible": {
        outline: "3px solid",
        outlineColor: "primary.500",
        outlineOffset: "2px",
        borderRadius: "md",
      },
    },
  },

  // ─── Component Variants ───────────────────────────────────────────────────
  components: {
    Card: {
      variants: {
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
      },
    },
  },
});

export default theme;
