/**
 * @file motion.ts
 * @description Constantes canónicas de animación y transición para el Design System v2.
 * Regla R5: máximo 2 propiedades en `transition`; animaciones solo con `transform` y `opacity`.
 * Regla R11: respetar siempre `prefers-reduced-motion: reduce`.
 */

/** Curva in-out marcada del panel del menú móvil a pantalla completa (spec Alternativa A: 0.76, 0, 0.24, 1). */
export const EASE_PANEL = "cubic-bezier(0.76, 0, 0.24, 1)" as const;

/** Curva para revelación de texto con máscara (translateY 105% -> 0). */
export const EASE_TEXT = "cubic-bezier(0.16, 1, 0.3, 1)" as const;

/** Curva de salida larga y suave de los títulos cinematográficos (hero y secciones de la home). */
export const EASE_CINE = "cubic-bezier(0.16, 1, 0.3, 1)" as const;

/** Curva suave estándar para micro-interacciones (botones, tarjetas, controles). */
export const EASE_SOFT = "cubic-bezier(0.4, 0, 0.2, 1)" as const;

/** Duraciones en milisegundos (para lógica JS / timers). */
export const DUR_MS = {
  reducedFade: 150,
  fast: 200,
  toggle: 300,
  panelOut: 450,
  textIn: 500,
  panelIn: 650,
  textDelayAfterPanel: 200,
  staggerMenu: 60,
} as const;

/** Duraciones CSS listas para interpolar en `transition`. */
export const DUR_CSS = {
  reducedFade: "150ms",
  fast: "200ms",
  toggle: "300ms",
  panelOut: "450ms",
  textIn: "500ms",
  panelIn: "650ms",
} as const;

/** Transiciones preconfiguradas de máximo 2 propiedades (Regla R5). */
export const TRANSITIONS = {
  interactive: `background-color ${DUR_CSS.fast} ${EASE_SOFT}, transform ${DUR_CSS.fast} ${EASE_SOFT}`,
  surface: `border-color ${DUR_CSS.fast} ${EASE_SOFT}, background-color ${DUR_CSS.fast} ${EASE_SOFT}`,
  fadeTransform: `opacity ${DUR_CSS.fast} ${EASE_SOFT}, transform ${DUR_CSS.fast} ${EASE_SOFT}`,
  reducedOnly: `opacity ${DUR_CSS.reducedFade} ease`,
} as const;

/**
 * Presupuesto de movimiento (plan de animaciones ligeras). Todo movimiento de la web lo respeta:
 * - solo `transform` y `opacity`; nunca `blur`, `backdrop-filter` ni sombras grandes animadas;
 * - una sola vez por elemento; sin bucles infinitos en secciones de contenido;
 * - máximo 1–2 elementos animándose por pantalla;
 * - cascada máxima de 5 elementos, con paso de `staggerMs`.
 */
export const MOTION_BUDGET = {
  maxStaggerItems: 5,
  staggerMs: 40,
  maxDurationMs: 500,
} as const;
