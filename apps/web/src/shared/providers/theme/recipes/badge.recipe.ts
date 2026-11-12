import { defineRecipe } from "@chakra-ui/react";

/**
 * Receta propia para Badge: añade variantes semánticas v2 (`neutral`, `ink`, `success`, `warning`, `danger`, `info`)
 * sin alterar las variantes por defecto de Chakra (`subtle`, `outline`, `solid`) que usan el Home y Servicios actuales.
 */
const studioBadgeBase = {
  minH: "7",
  px: "3",
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "600",
  letterSpacing: "0.02em",
  textTransform: "none",
  borderWidth: "0",
} as const;

/** Chip único de DESIGN.md: píldora de 28 px, texto 12/600, solo informativo. */
const chipBase = {
  minH: "7",
  px: "3",
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "600",
  letterSpacing: "normal",
  textTransform: "none",
  borderWidth: "1px",
  borderColor: "border.warm",
} as const;

export const badgeRecipe = defineRecipe({
  variants: {
    variant: {
      chip: { ...chipBase, bg: "bg.subtle", color: "text.body" },
      chipInk: { ...chipBase, bg: "brand.ink", color: "white", borderColor: "brand.ink", _dark: { bg: "white", color: "brand.ink", borderColor: "white" } },
      chipSuccess: { ...chipBase, bg: "status.successSoft", color: "status.successText", borderColor: "status.successBorder" },
      chipWarning: { ...chipBase, bg: "status.warningSoft", color: "status.warningText", borderColor: "status.warningBorder" },
      chipDanger: { ...chipBase, bg: "status.dangerSoft", color: "status.dangerText", borderColor: "status.dangerBorder" },
      chipInfo: { ...chipBase, bg: "status.infoSoft", color: "status.infoText", borderColor: "status.infoBorder" },
      neutral: {
        bg: "bg.subtle",
        color: "text.body",
        borderWidth: "1px",
        borderColor: "border.default",
      },
      ink: {
        bg: "bg.tint",
        color: "accent.ink",
        borderWidth: "1px",
        borderColor: "border.default",
      },
      inkSolid: {
        bg: "accent.ink",
        color: "accent.inkContrast",
      },
      success: {
        bg: "status.successSoft",
        color: "status.successText",
        borderWidth: "1px",
        borderColor: "status.successBorder",
      },
      warning: {
        bg: "status.warningSoft",
        color: "status.warningText",
        borderWidth: "1px",
        borderColor: "status.warningBorder",
      },
      danger: {
        bg: "status.dangerSoft",
        color: "status.dangerText",
        borderWidth: "1px",
        borderColor: "status.dangerBorder",
      },
      info: {
        bg: "status.infoSoft",
        color: "status.infoText",
        borderWidth: "1px",
        borderColor: "status.infoBorder",
      },
      /* Aura Studio: pastilla de 28 px, texto 12/600, sin borde cuadrado. */
      studio: { ...studioBadgeBase, bg: "bg.subtle", color: "text.body" },
      studioInk: { ...studioBadgeBase, bg: "gray.900", color: "white", _dark: { bg: "white", color: "gray.900" } },
      studioSuccess: { ...studioBadgeBase, bg: "status.successSoft", color: "status.successText" },
      studioWarning: { ...studioBadgeBase, bg: "status.warningSoft", color: "orange.800", _dark: { color: "status.warningText" } },
      studioDanger: { ...studioBadgeBase, bg: "status.dangerSoft", color: "status.dangerText" },
      studioInfo: { ...studioBadgeBase, bg: "status.infoSoft", color: "status.infoText" },
    },
  },
});
