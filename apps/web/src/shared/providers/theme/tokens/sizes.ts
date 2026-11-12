/**
 * @file sizes.ts
 * @description Tamaños, radios y sombras del sistema Aura v2.
 */

/* Tres anchos de página únicos (estrecho 896 px, estándar 1152 px, amplio 1280 px). */
export const sizes = {
  pageNarrow: { value: "56rem" },
  pageDefault: { value: "72rem" },
  pageWide: { value: "80rem" },
};

export const radii = {
  // Material Design 3 Shape Tokens (esquinas formales)
  xs: { value: "4px" },
  sm: { value: "8px" },
  md: { value: "12px" },
  lg: { value: "16px" },
  xl: { value: "28px" },
  full: { value: "9999px" },
  card: { value: "16px" },
  modal: { value: "24px" },
};

export const shadows = {
  navDesktop: { value: "0 8px 32px 0 rgba(0, 0, 0, 0.08)" },
  adminNav: { value: "0 10px 30px rgba(0, 0, 0, 0.06)" },
  adminCard: { value: "0 4px 20px rgba(0, 0, 0, 0.04)" },
  cardLift: { value: "0 20px 40px rgba(0, 0, 0, 0.3)" },
  elevatedLg: { value: "0 8px 32px rgba(0, 0, 0, 0.12)" },
  modalLg: { value: "0 20px 50px rgba(0, 0, 0, 0.3)" },
};
