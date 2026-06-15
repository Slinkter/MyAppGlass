/**
 * @file designTokens.ts
 * @description Design tokens críticos del proyecto MyAppGlass.
 * Define la identidad visual siguiendo el Aura Design System (Escala Fibonacci).
 */

/**
 * Interface para tokens de color.
 */
export interface ColorTokens {
  primary: {
    500: string;
    600: string;
    700: string;
    accent: string;
  };
}

/**
 * Tokens de color (Acento y Primary Legacy).
 */
export const colorTokens: ColorTokens = {
  primary: {
    500: "#f44336",
    600: "#e53935",
    700: "#d32f2f",
    accent: "#ff5757",
  },
};

/**
 * Tokens de espaciado estándar (Chakra UI v3).
 */
export const spacingTokens = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1.25rem",
  lg: "2rem",
  xl: "3.5rem",
  "2xl": "5rem",
  "3xl": "9rem",
} as const;
