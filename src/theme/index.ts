import { createSystem, defaultConfig, defineSemanticTokens, defineTokens, defineRecipe } from '@chakra-ui/react';

const auraSpacing = defineTokens.spacing({
  phi_xs: { value: '8px' },
  phi_sm: { value: '13px' },
  phi_md: { value: '21px' },
  phi_lg: { value: '34px' },
  phi_xl: { value: '55px' },
  phi_2xl: { value: '89px' },
  phi_3xl: { value: '144px' },
});

const auraColors = defineTokens.colors({
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
  }
});

const semanticColors = defineSemanticTokens.colors({
  "bg.page": { value: { _light: "{colors.gray.50}", _dark: "#000000" } },
  "bg.section": { value: { _light: "white", _dark: "#09090b" } },
  "bg.panel": { value: { _light: "white", _dark: "{colors.primary.900}" } },
  "bg.muted": { value: { _light: "{colors.gray.100}", _dark: "whiteAlpha.100" } },
  
  "border.glass": { value: { _light: "{colors.gray.200}", _dark: "whiteAlpha.100" } },
  
  "text.body": { value: { _light: "{colors.primary.800}", _dark: "{colors.primary.300}" } },
  "text.heading": { value: { _light: "{colors.primary.900}", _dark: "white" } },
  "text.muted": { value: { _light: "{colors.primary.600}", _dark: "{colors.primary.400}" } },
  "text.accent": { value: { _light: "{colors.primary.700}", _dark: "{colors.primary.300}" } },
});

// Porting Button Recipe from v2 Aura theme
const buttonRecipe = defineRecipe({
    base: {
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "wider",
        transition: "all 0.3s cubic-bezier(.08,.52,.52,1)",
    },
    variants: {
        variant: {
            solid: {
                bg: "primary.900",
                color: "white",
                borderRadius: "full",
                _hover: {
                    bg: "primary.700",
                    transform: "translateY(-2px)",
                    boxShadow: "xl",
                },
                _dark: {
                    bg: "primary.100",
                    color: "primary.900",
                    _hover: {
                        bg: "white",
                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                    },
                }
            },
            outline: {
                border: "2px solid",
                borderColor: "primary.900",
                color: "primary.900",
                borderRadius: "full",
                _hover: {
                    bg: "primary.50",
                },
                _dark: {
                    borderColor: "primary.100",
                    color: "primary.100",
                    _hover: {
                        bg: "whiteAlpha.100",
                    },
                }
            }
        }
    },
    defaultVariants: {
        variant: "solid",
    }
});

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      spacing: auraSpacing,
      colors: auraColors,
      fonts: {
          heading: { value: 'Lora, serif' },
          body: { value: 'Lora, serif' },
      }
    },
    semanticTokens: {
      colors: semanticColors,
    },
    recipes: {
        button: buttonRecipe,
    },
    breakpoints: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  globalCss: {
      body: {
          bg: "bg.page",
          color: "text.body",
          WebkitFontSmoothing: "antialiased",
      }
  }
});
