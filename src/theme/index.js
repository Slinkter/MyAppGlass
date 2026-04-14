import { createSystem, defineConfig, defaultConfigs } from "@chakra-ui/react";

const config = defineConfig({
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
        phi_xs: { value: "8px" },
        phi_sm: { value: "13px" },
        phi_md: { value: "21px" },
        phi_lg: { value: "34px" },
        phi_xl: { value: "55px" },
        phi_2xl: { value: "89px" },
        phi_3xl: { value: "144px" },
      },
      radii: {
        phi: { value: "1.618rem" },
        card: { value: "16px" },
        modal: { value: "24px" },
      },
    },
    semanticTokens: {
      colors: {
        "bg.page": {
          value: { _light: "{colors.gray.50}", _dark: "#000000" },
        },
        "bg.section": {
          value: { _light: "white", _dark: "#121212" },
        },
        "bg.glass": {
          value: { _light: "white", _dark: "{colors.primary.900}" },
        },
        "bg.muted": {
          value: { _light: "{colors.primary.50}", _dark: "{colors.primary.800}" },
        },
        "text.body": {
          value: { _light: "{colors.gray.800}", _dark: "{colors.gray.300}" },
        },
        "text.heading": {
          value: { _light: "{colors.gray.900}", _dark: "white" },
        },
        "text.muted": {
          value: { _light: "{colors.gray.600}", _dark: "{colors.gray.400}" },
        },
        "text.accent": {
          value: { _light: "{colors.primary.600}", _dark: "{colors.primary.300}" },
        },
        "border.glass": {
          value: { _light: "{colors.gray.200}", _dark: "rgba(255, 255, 255, 0.1)" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfigs, config);
