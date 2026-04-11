/**
 * @file theme.js
 * @description Application-wide Chakra UI theme extension, defining the Aura Design System.
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
  fonts: {
    heading: `"Lora", serif`,
    body: `"Lora", serif`,
  },
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
    // Aura Accent: Translucent Cyan for Interactive Glass
    accent: {
      base: "rgba(6, 182, 212, 0.5)", // Cyan.500 with alpha
      hover: "rgba(6, 182, 212, 0.7)",
      solid: "#06b6d4",
    },
    surface: {
      glass: "rgba(255, 255, 255, 0.08)",
      glassDark: "rgba(15, 23, 42, 0.15)",
    }
  },
  space: auraSpacing,
  radii: {
    phi: "1.618rem", // Custom Golden Radius
    card: "20px",
    modal: "32px",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
        // Performance optimization for animations
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      "*:focus-visible": {
        outline: "2px solid",
        outlineColor: "accent.solid",
        outlineOffset: "2px",
      },
    }),
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "1440px", // Master width for Aura Layout
      }
    },
    Button: {
      baseStyle: {
        borderRadius: "phi_sm",
        fontWeight: "600",
        transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
      },
    },
    // Glassmorphism as a component variant
    Box: {
      variants: {
        glass: (props) => ({
          bg: props.colorMode === "dark" ? "surface.glassDark" : "surface.glass",
          backdropFilter: "blur(12px)",
          border: "1px solid",
          borderColor: props.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
          borderRadius: "card",
          boxShadow: "xl",
          willChange: "backdrop-filter, background-color",
        }),
      },
    },
  },
});

export default theme;
