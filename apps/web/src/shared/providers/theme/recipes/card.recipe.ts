import { defineSlotRecipe } from "@chakra-ui/react";

/**
 * Card slot recipe: superficie y borde canónicos.
 */
export const cardRecipe = defineSlotRecipe({
  slots: ["root", "header", "body", "footer", "title", "description"],
  base: {
    root: { borderRadius: "card" },
  },
  variants: {
    variant: {
      outline: {
        root: { bg: "surface.card", borderColor: "border.default" },
      },
      solid: {
        root: { bg: "bg.section", borderWidth: "0" },
      },
      warm: {
        root: { bg: "bg.section", borderWidth: "1px", borderColor: "border.warm" },
      },
      /* DESIGN.md: tarjeta plana, 16 px, borde de Línea Cálida, sin sombra en reposo; título en Lora 700. */
      flat: {
        root: { bg: "bg.surface", borderWidth: "1px", borderColor: "border.warm", borderRadius: "card", boxShadow: "none" },
        title: { fontFamily: "heading", fontWeight: "700", color: "text.heading" },
        description: { color: "text.muted" },
      },
      /* Aura Studio: radio grande, borde fino, sin sombra; título en la fuente de títulos. */
      studio: {
        root: { bg: "bg.surface", borderWidth: "1px", borderColor: "border.default", borderRadius: "3xl", boxShadow: "none" },
        title: { fontFamily: "heading", fontWeight: "700", color: "text.heading" },
        description: { color: "text.muted" },
      },
    },
  },
});
