/**
 * @file fonts.ts
 * @description Tipografía y espaciado del sistema Aura v2.
 */

export const fonts = {
  heading: { value: `var(--font-lora), Georgia, serif` },
  body: { value: `var(--font-inter), system-ui, -apple-system, sans-serif` },
  mono: {
    value: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  },
};

export const fontSizes = {
  xs: { value: "0.75rem" },
  sm: { value: "0.875rem" },
  md: { value: "1rem" },
  lg: { value: "1.125rem" },
  xl: { value: "1.25rem" },
  "2xl": { value: "1.5rem" },
  "3xl": { value: "1.875rem" },
  "4xl": { value: "2.25rem" },
  "5xl": { value: "3rem" },
  "6xl": { value: "3.75rem" },
};

/* Jerarquía tipográfica de apps/web/DESIGN.md. */
export const lineHeights = {
  display: { value: "1.08" },
  headline: { value: "1.1" },
  title: { value: "1.2" },
  body: { value: "1.625" },
};

export const letterSpacings = {
  display: { value: "-0.025em" },
  headline: { value: "-0.02em" },
  label: { value: "0.14em" },
};
