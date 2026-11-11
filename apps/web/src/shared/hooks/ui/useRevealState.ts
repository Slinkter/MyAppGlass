"use client";

/**
 * @file useRevealState.ts
 * @description Estado de revelado al hacer scroll compartido por `Reveal` e `ItemGridLayout`.
 * Une `useScrollReveal` (observador) con `useMotionBudget` (preferencia y gama del dispositivo):
 * solo se oculta el contenido cuando hay movimiento completo y el elemento aún no entró en pantalla.
 * Sin JavaScript, con `prefers-reduced-motion` o en gama baja el contenido siempre está visible.
 */

import { useMotionBudget, type MotionLevel } from "@/shared/hooks/ui/useMotionBudget";
import { useScrollReveal, type UseScrollRevealOptions } from "@/shared/hooks/ui/useScrollReveal";

export interface RevealState<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  /** `true` mientras el elemento debe estar oculto, esperando entrar en pantalla. */
  hidden: boolean;
  level: MotionLevel;
}

export function useRevealState<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): RevealState<T> {
  const level = useMotionBudget();
  const { ref, isVisible, isArmed } = useScrollReveal<T>(options);
  return { ref, hidden: level === "full" && isArmed && !isVisible, level };
}
