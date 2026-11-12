import { defineRecipe } from "@chakra-ui/react";
import { EASE_SOFT, DUR_CSS } from "@/shared/constants/motion";

/**
 * Receta de botones (apps/web/DESIGN.md): píldora, texto en oración, negro de marca.
 * - Variantes: `primary` (negro; blanco en modo oscuro), `outline`, `ghost` y `whatsapp` (verde accesible).
 * - Todos los tamaños garantizan área táctil >= 44px (`minH: "11"`, `minW: "11"`).
 * - `transition` restringida a 2 propiedades; `:active` escala 0,98 (sin sombras ni elevación).
 */
const primaryButton = {
  bg: "brand.ink",
  color: "white",
  _hover: { bg: "brand.inkHover" },
  _active: { bg: "brand.inkActive" },
  _dark: {
    bg: "white",
    color: "brand.ink",
    _hover: { bg: "gray.200" },
    _active: { bg: "gray.300" },
  },
} as const;

const outlineButton = {
  bg: "transparent",
  borderWidth: "1.5px",
  borderColor: "brand.ink",
  color: "brand.ink",
  _hover: { bg: "blackAlpha.50" },
  _dark: { borderColor: "white", color: "white", _hover: { bg: "whiteAlpha.100" } },
} as const;

const ghostButton = {
  bg: "transparent",
  color: "text.body",
  _hover: { bg: "blackAlpha.50" },
  _dark: { color: "gray.300", _hover: { bg: "whiteAlpha.100", color: "white" } },
} as const;

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "600",
    textTransform: "none",
    letterSpacing: "normal",
    borderRadius: "full",
    minH: "11",
    minW: "11",
    transition: `background-color ${DUR_CSS.fast} ${EASE_SOFT}, transform ${DUR_CSS.fast} ${EASE_SOFT}`,
    _active: { transform: "scale(0.98)" },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "ring.primary",
      outlineOffset: "2px",
    },
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },
  },
  variants: {
    variant: {
      primary: primaryButton,
      outline: outlineButton,
      ghost: ghostButton,
      whatsapp: {
        // Verde accesible: blanco sobre #15803d da >= 4,5:1 (el #25D366 daba 1,98:1).
        bg: "brand.whatsappAccessible",
        color: "white",
        _hover: { bg: "brand.whatsappAccessibleHover" },
        _active: { bg: "brand.whatsappAccessibleActive" },
      },
      /*
       * Píldora seleccionable de la barra inferior del patrón B (Lente de Cristal y Aluminio).
       * El estado activo se marca con `aria-pressed` o `aria-current`: borde negro y superficie sólida,
       * sin desenfoque propio para no apilar vidrio sobre vidrio.
       */
      pill: {
        justifyContent: "flex-start",
        gap: "2.5",
        px: "1.5",
        pr: "3",
        borderRadius: "xl",
        borderWidth: "1px",
        borderColor: "transparent",
        bg: "transparent",
        color: "text.heading",
        textAlign: "left",
        _hover: { bg: "bg.surface/70" },
        _pressed: { bg: "bg.surface", borderColor: "brand.ink", _dark: { borderColor: "white" } },
        "&[aria-current='true']": { bg: "bg.surface", borderColor: "brand.ink", _dark: { borderColor: "white" } },
      },
    },
    size: {
      xs: { h: "11", minH: "11", minW: "11", px: "3", fontSize: "sm" },
      sm: { h: "11", minH: "11", minW: "11", px: "4", fontSize: "sm" },
      md: { h: "11", minH: "11", minW: "11", px: "6", fontSize: "sm" },
      lg: { h: "12", minH: "12", minW: "12", px: "8", fontSize: "md" },
      xl: { h: "14", minH: "14", minW: "14", px: "10", fontSize: "lg" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
