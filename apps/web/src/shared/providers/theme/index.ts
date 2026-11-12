/**
 * @file index.ts
 * @description Aura Design System v2 - Chakra UI v3 Core Configuration.
 * Single source of truth for design tokens, component recipes, and semantic themes.
 * Marca v2: Lora + Inter, negro de marca (#111111), fondo blanco, línea cálida #E6E3DE.
 */

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { tokens } from "./tokens";
import { recipes, slotRecipes } from "./recipes";
import { semanticTokens } from "./semanticTokens";

const focusVisibleSelectors = ["a", "button", '[role="button"]', "input", "select", "textarea", "summary", "[tabindex]"]
  .map((selector) => `${selector}:focus-visible`)
  .join(", ");

const config = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  globalCss: {
    ":where(:root, :host)": {
      "--chakra-colors-surface-card": "var(--chakra-colors-surface\\.card)",
      "--chakra-colors-border-default": "var(--chakra-colors-border\\.default)",
    },
    "html, body": {
      margin: 0,
      padding: 0,
      bg: "bg.page",
      color: "text.body",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      textRendering: "optimizeLegibility",
      touchAction: "manipulation",
    },
    [focusVisibleSelectors]: {
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "ring.primary",
        outlineOffset: "2px",
      },
    },
    a: {
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "ring.primary",
        outlineOffset: "2px",
        borderRadius: "sm",
      },
    },
  },
  conditions: {
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },
  theme: {
    tokens,
    semanticTokens,
    recipes,
    slotRecipes,
  },
});

export const system = createSystem(defaultConfig, config);

export * from "./tokens";
export * from "./recipes";
export * from "./semanticTokens";
