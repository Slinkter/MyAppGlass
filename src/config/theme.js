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
      solid: "#ffffff",
      solidDark: "#0f172a", // Slate.900
    }
  },
  space: auraSpacing,
  radii: {
    phi: "1.618rem", 
    card: "16px",
    modal: "24px",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "primary.900" : "gray.50",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
        WebkitFontSmoothing: "antialiased",
      },
      "*:focus-visible": {
        outline: "3px solid",
        outlineColor: "primary.400",
        outlineOffset: "3px",
        borderRadius: "4px",
      },
    }),
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "1440px",
      }
    },
    // Flat Design Components
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
