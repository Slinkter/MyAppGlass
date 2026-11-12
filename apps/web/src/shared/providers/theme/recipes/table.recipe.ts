import { defineSlotRecipe } from "@chakra-ui/react";

/**
 * Table slot recipe: cifras tabulares para presupuestos y fichas técnicas.
 */
export const tableRecipe = defineSlotRecipe({
  slots: ["root", "header", "body", "row", "columnHeader", "cell", "footer", "caption"],
  base: {
    root: {
      fontVariantNumeric: "tabular-nums",
    },
    columnHeader: {
      color: "text.heading",
      fontWeight: "700",
      borderColor: "border.default",
      bg: "bg.section",
    },
    cell: {
      borderColor: "border.subtle",
      color: "text.body",
    },
  },
  variants: {
    variant: {
      /* Aura Studio: cabecera en mayúscula pequeña, filas con línea fina, sin fondo en la cabecera. */
      studio: {
        columnHeader: {
          bg: "transparent",
          color: "text.muted",
          fontSize: "xs",
          fontWeight: "600",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderBottomWidth: "1px",
          py: "3",
        },
        cell: { py: "4", borderBottomWidth: "1px", borderColor: "border.subtle" },
        row: { bg: "transparent", _hover: { bg: "bg.subtle" } },
      },
    },
  },
});
