/**
 * @file colors.ts
 * @description Paletas y tokens de color crudos del sistema Aura v2.
 */

export const colors = {
  primary: {
    50: { value: "#fafafa" },
    100: { value: "#f4f4f5" },
    200: { value: "#e4e4e7" },
    300: { value: "#d4d4d8" },
    400: { value: "#a1a1aa" },
    500: { value: "#71717a" },
    600: { value: "#52525b" },
    700: { value: "#3f3f46" },
    800: { value: "#27272a" },
    900: { value: "#18181b" },
  },
  brand: {
    whatsapp: { value: "#25D366" },
    whatsappHover: { value: "#1DAE54" },
    whatsappActive: { value: "#178B43" },
    // Tokens accesibles v2 (>= 4.5:1 con texto blanco) para prototipos en /design-system
    whatsappAccessible: { value: "#15803d" },
    whatsappAccessibleHover: { value: "#166534" },
    whatsappAccessibleActive: { value: "#14532d" },
    /* Único acento de marca (manual v1.0): coral del logo, solo en texto grande. */
    coral: { value: "#FF5A5F" },
    /* Negro de marca (apps/web/DESIGN.md). */
    ink: { value: "#111111" },
    inkHover: { value: "#2A2A2A" },
    inkActive: { value: "#000000" },
    inkSoft: { value: "#4A4A4A" },
    /* Escala cálida de líneas (apps/web/DESIGN.md: line / line-strong). */
    line: { value: "#E6E3DE" },
    lineStrong: { value: "#D9D6D0" },
  },
  status: {
    info: { value: "#38bdf8" },
    infoSoft: { value: "rgba(56, 189, 248, 0.1)" },
    infoSubtle: { value: "rgba(56, 189, 248, 0.12)" },
    infoBorder: { value: "rgba(56, 189, 248, 0.25)" },
    danger: { value: "#f87171" },
    dangerSoft: { value: "rgba(239, 68, 68, 0.1)" },
    success: { value: "#34d399" },
    successSoft: { value: "rgba(52, 211, 153, 0.1)" },
    warning: { value: "#fbbf24" },
    warningSoft: { value: "rgba(245, 158, 11, 0.1)" },
  },
  accent: {
    violet: { value: "#a855f7" },
    violetSoft: { value: "#a78bfa" },
  },
  overlay: {
    subtle: { value: "rgba(0, 0, 0, 0.04)" },
    faint: { value: "rgba(0, 0, 0, 0.08)" },
    dim: { value: "rgba(0, 0, 0, 0.3)" },
    scrim: { value: "rgba(0, 0, 0, 0.5)" },
    glass: { value: "rgba(0, 0, 0, 0.6)" },
    strong: { value: "rgba(0, 0, 0, 0.78)" },
  },
  payment: {
    yape: { value: "#9117A0" },
  },
};
