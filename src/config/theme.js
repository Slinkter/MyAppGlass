import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/raleway";
import "@fontsource/lora/400.css"; // Import specific weights if needed
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
            500: "#f44336", // This is a standard red, similar to the existing red.500
            600: "#e53935",
            700: "#d32f2f",
            800: "#c62828",
            900: "#b71c1c",
            accent: "#ff5757", // Moved from brand.accent
        },
        text: {
            // Semantic color for text
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
        // Custom border radii tokens
        card: "lg", // 8px
        button: "md", // 4px
        // TODO: Expand radii tokens to cover more UI elements (e.g., input, modal, avatar) for consistent styling and minimalist design.
    },
    space: {
        // Custom spacing tokens if needed, but Chakra's default is usually sufficient
        // Example: 'sectionPadding': '4rem',
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
            },
        }),
    },
    components: {
        Card: {
            variants: {
                glass: (props) => ({
                    // Styles from Navbar
                    bg:
                        props.colorMode === "dark"
                            ? "rgba(0, 0, 0, 0.1)"
                            : "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "none",
                    borderRadius: "2xl", // Matches Navbar's borderRadius
                    boxShadow: "sm", // Matches Navbar's boxShadow
                    transition: "all 0.3s ease",
                }),
            },
        },
    },
});

export default theme;
