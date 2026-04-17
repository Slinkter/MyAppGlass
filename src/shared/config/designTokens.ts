/**
 * @file designTokens.ts
 * @description Design tokens críticos del proyecto MyAppGlass.
 * Define la identidad visual siguiendo el Aura Design System (Escala Fibonacci y Glassmorphism).
 */

/**
 * Interface para tokens de Glassmorphism.
 */
export interface GlassmorphismTokens {
  light: {
    bg: string;
    border: string;
  };
  dark: {
    bg: string;
    border: string;
  };
  backdropFilter: string;
  borderRadius: string;
  boxShadow: string;
}

/**
 * Tokens de Glassmorphism para superficies.
 */
export const glassmorphismTokens: GlassmorphismTokens = {
  light: {
    bg: "rgba(255, 255, 255, 0.1)",
    border: "rgba(255, 255, 255, 0.35)",
  },
  dark: {
    bg: "rgba(0, 0, 0, 0.1)",
    border: "rgba(255, 255, 255, 0.15)",
  },
  backdropFilter: "blur(10px)",
  borderRadius: "2xl",
  boxShadow: "sm",
};

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
 * Escala de Espaciado Fibonacci (Aura System).
 * Usar estos tokens para mantener la proporción áurea en el layout.
 */
export const spacingTokens = {
  phi_xs: "0.5rem",    // 8px
  phi_sm: "0.8125rem", // 13px
  phi_md: "1.3125rem", // 21px
  phi_lg: "2.125rem",  // 34px
  phi_xl: "3.4375rem", // 55px
  phi_2xl: "5.5625rem", // 89px
  phi_3xl: "9rem",     // 144px
} as const;
