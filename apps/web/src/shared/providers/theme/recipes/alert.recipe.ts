import { defineSlotRecipe } from "@chakra-ui/react";

/** Variante de Alert por estado: fondo suave, borde del estado y texto con contraste verificado (>= 4,5:1). */
const alertStatusVariant = (name: "success" | "warning" | "danger" | "info") => ({
  root: {
    bg: `status.${name}Soft`,
    borderColor: `status.${name}Border`,
    borderRadius: "card",
  },
  title: { color: `status.${name}Text` },
  indicator: { color: `status.${name}Text` },
});

/**
 * Alert slot recipe: variantes de estado (`success`, `warning`, `danger`, `info`) con contraste verificado.
 */
export const alertRecipe = defineSlotRecipe({
  slots: ["title", "description", "root", "indicator", "content"],
  base: {
    root: {
      borderRadius: "card",
      borderWidth: "1px",
      borderColor: "border.default",
      bg: "surface.card",
    },
    title: {
      fontWeight: "700",
      color: "text.heading",
    },
    description: {
      color: "text.body",
    },
  },
  variants: {
    variant: {
      /* Aura Studio: radio grande, título en la fuente de títulos. */
      studio: {
        root: { bg: "bg.surface", borderRadius: "2xl", borderWidth: "1px", borderColor: "border.default" },
        title: { fontFamily: "heading", fontWeight: "700", fontSize: "lg" },
      },
      success: alertStatusVariant("success"),
      warning: alertStatusVariant("warning"),
      danger: alertStatusVariant("danger"),
      info: alertStatusVariant("info"),
    },
  },
});
