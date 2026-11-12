import { defineSlotRecipe } from "@chakra-ui/react";
import { EASE_SOFT, DUR_CSS } from "@/shared/constants/motion";

/**
 * Tabs slot recipe: añade variantes para v2 sin cambiar el color de las pestañas existentes del sitio.
 */
export const tabsRecipe = defineSlotRecipe({
  slots: ["root", "trigger", "list", "content", "contentGroup", "indicator"],
  base: {
    trigger: {
      minH: "11",
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "ring.primary",
        outlineOffset: "-2px",
      },
    },
  },
  variants: {
    variant: {
      /* Aura Studio: subrayado de 2 px con indicador deslizante (usar Tabs.Indicator). */
      studio: {
        list: { borderBottomWidth: "1px", borderColor: "border.default", gap: "6", position: "relative" },
        trigger: {
          px: "1",
          fontWeight: "600",
          color: "text.muted",
          transition: `color ${DUR_CSS.fast} ${EASE_SOFT}`,
          _hover: { color: "text.heading" },
          _selected: { color: "text.heading" },
        },
        indicator: { height: "2px", bottom: "-1px", bg: "text.heading", borderRadius: "full" },
      },
    },
  },
});
