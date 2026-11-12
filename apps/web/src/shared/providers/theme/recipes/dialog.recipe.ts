import { defineSlotRecipe } from "@chakra-ui/react";

/**
 * Dialog slot recipe: modal accesible con `dvh` y scrim oficial.
 */
export const dialogRecipe = defineSlotRecipe({
  slots: [
    "trigger",
    "backdrop",
    "positioner",
    "content",
    "title",
    "description",
    "closeTrigger",
    "header",
    "body",
    "footer",
  ],
  base: {
    backdrop: {
      bg: "overlay.scrim",
    },
    content: {
      bg: "surface.card",
      borderRadius: "modal",
      borderWidth: "1px",
      borderColor: "border.default",
      boxShadow: "modalLg",
      maxH: "90dvh",
    },
    title: {
      fontFamily: "heading",
      fontWeight: "700",
      color: "text.heading",
    },
    closeTrigger: {
      minH: "11",
      minW: "11",
    },
  },
  variants: {
    variant: {
      /* Aura Studio: radio 3xl y título con peso 500. */
      studio: {
        content: { borderRadius: "3xl", boxShadow: "xl" },
        title: { fontWeight: "500" },
      },
    },
  },
});
