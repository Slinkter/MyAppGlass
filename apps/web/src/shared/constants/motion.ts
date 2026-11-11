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

/** Curva de entrada de los elementos que se revelan al hacer scroll (Reveal e ItemGridLayout). */
export const EASE_REVEAL = "cubic-bezier(0.22, 1, 0.36, 1)" as const;

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

/**
 * Transición entre páginas (View Transitions API). Es la única fuente de estos valores:
 * `MotionCssVars` los publica como variables CSS y `styles/global.css` las consume.
 * Salida corta y entrada más pausada; el desplazamiento es leve y solo en la navegación
 * "hacia adelante/atrás" marcada; el resto de navegaciones es un fundido sin movimiento.
 */
export const VIEW_TRANSITION = {
  exitMs: DUR_MS.fast,
  enterMs: DUR_MS.toggle,
  moveMs: MOTION_BUDGET.maxDurationMs,
  slidePx: 30,
  easeMove: EASE_SOFT,
} as const;

/** Variables CSS globales generadas desde las constantes de este archivo. */
export const MOTION_CSS_VARS = `:root{--vt-exit:${VIEW_TRANSITION.exitMs}ms;--vt-enter:${VIEW_TRANSITION.enterMs}ms;--vt-move:${VIEW_TRANSITION.moveMs}ms;--vt-slide:${VIEW_TRANSITION.slidePx}px;--vt-ease:${VIEW_TRANSITION.easeMove};}`;
