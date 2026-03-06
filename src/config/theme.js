/**
 * @file theme.js
 * @description Application-wide Chakra UI theme extension, defining typography, colors, and global styles.
 * @module config
 */

import { extendTheme } from "@chakra-ui/react";
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/600.css";
import "@fontsource/lora/700.css";

const theme = extendTheme({
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
    text: {
      secondary: "#6c757d",
    },
    franja: {
      bg: {
        light: "rgba(255, 255, 255, 0.1)",
        dark: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  radii: {
    card: "2xl",
    button: "xl",
    input: "xl",
    modal: "3xl",
    avatar: "full",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.950" : "white",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
        lineHeight: "tall",
      },
      "h1, h2, h3, h4": {
        letterSpacing: "0.05em",
        fontWeight: "700",
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Lora, serif",
        fontWeight: "700",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "wider",
      },
    },
    Card: {
      variants: {
        glass: (props) => ({
          bg:
            props.colorMode === "dark"
              ? "rgba(10, 10, 10, 0.15)"
              : "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid",
          borderColor: props.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
          borderRadius: "3xl",
          boxShadow: "2xl",
          transition: "all 0.3s ease",
        }),
      },
    },
  },
});

export default theme;
