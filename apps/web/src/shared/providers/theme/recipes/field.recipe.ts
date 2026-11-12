import { defineRecipe, defineSlotRecipe } from "@chakra-ui/react";
import { EASE_SOFT, DUR_CSS } from "@/shared/constants/motion";

/**
 * Campos de formulario (`input`, `textarea`, `nativeSelect`): 48 px de alto (`minH: "12"`), esquina de 12 px y texto de 16 px (evita el zoom de iOS).
 * Usa el token `ring.primary` directamente en lugar de `var(--chakra-colors-ring-primary)` (Regla R8).
 */
const fieldOutline = {
  minH: "12",
  px: "4",
  fontSize: "md",
  bg: "surface.container",
  borderWidth: "1px",
  borderColor: "border.default",
  borderRadius: "xl",
  transition: `border-color ${DUR_CSS.fast} ${EASE_SOFT}, background-color ${DUR_CSS.fast} ${EASE_SOFT}`,
  _placeholder: { color: "text.muted" },
  _hover: { borderColor: "border.strong" },
  _focusVisible: {
    borderColor: "ring.primary",
    outline: "2px solid",
    outlineColor: "ring.primary",
    outlineOffset: "0px",
  },
  _invalid: {
    borderColor: "status.dangerText",
  },
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

/** Aura Studio: 48 px de alto, radio suave, borde fino y foco con contorno. */
const fieldStudio = {
  ...fieldOutline,
  minH: "12",
  bg: "bg.surface",
  borderRadius: "xl",
  px: "4",
  fontSize: "md",
};

/**
 * Campo de DESIGN.md: 48 px, esquina de 12 px, borde de 1 px en Línea Cálida.
 * Un solo anillo de foco (`ring.primary`) y el estado inválido también lleva anillo, no solo borde.
 */
const fieldClean = {
  ...fieldOutline,
  bg: "bg.surface",
  borderColor: "border.warm",
  _hover: { borderColor: "border.warmStrong" },
  _invalid: {
    borderColor: "status.dangerText",
    outline: "2px solid",
    outlineColor: "status.dangerText",
    outlineOffset: "0px",
  },
};

export const inputRecipe = defineRecipe({
  variants: { variant: { outline: fieldOutline, studio: fieldStudio, field: fieldClean } },
});

export const textareaRecipe = defineRecipe({
  variants: { variant: { outline: fieldOutline, studio: { ...fieldStudio, py: "3" }, field: { ...fieldClean, py: "3" } } },
});

export const nativeSelectRecipe = defineSlotRecipe({
  slots: ["root", "field", "indicator"],
  variants: {
    variant: {
      outline: {
        field: fieldOutline,
      },
      studio: {
        field: fieldStudio,
      },
      field: {
        field: fieldClean,
      },
    },
  },
});
