"use client";

/**
 * @file Reveal.tsx
 * @description Revelado de sección al entrar en pantalla (transición entre secciones).
 * Solo `opacity` y `transform` (R5), una sola vez, con cascada configurable.
 * Con `prefers-reduced-motion` o en gama baja el contenido aparece directo (R11).
 * El contenido es visible en el HTML inicial y solo se oculta cuando el observador está listo.
 */

import React from "react";
import { Box, type BoxProps } from "@chakra-ui/react";
import { DUR_MS, EASE_REVEAL, MOTION_BUDGET } from "@/shared/constants/motion";
import { useRevealState } from "@/shared/hooks/ui/useRevealState";

/** Duración del revelado de sección (ms). */
export const REVEAL_MS = 450;
/** Cascada entre elementos: 40 ms (pauta UX: 30–50 ms). */
export const REVEAL_STAGGER_MS = 40;
/** Desplazamiento inicial vertical (px). */
const REVEAL_OFFSET = 16;

export interface RevealProps extends Omit<BoxProps, "transition"> {
  /** Orden en la cascada; cada paso suma `REVEAL_STAGGER_MS` de retraso (máximo `MOTION_BUDGET.maxStaggerItems`). */
  index?: number;
  children: React.ReactNode;
}

export const Reveal: React.FC<RevealProps> = ({ index = 0, children, ...rest }) => {
  const { ref, hidden, level } = useRevealState<HTMLDivElement>({
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.05,
  });
  const reduced = level === "none";

  const delay = reduced ? 0 : Math.min(index, MOTION_BUDGET.maxStaggerItems) * REVEAL_STAGGER_MS;
  const dur = reduced ? DUR_MS.reducedFade : REVEAL_MS;

  return (
    <Box
      ref={ref}
      {...rest}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${REVEAL_OFFSET}px)` : "none",
        transition: `opacity ${dur}ms ${EASE_REVEAL} ${delay}ms, transform ${dur}ms ${EASE_REVEAL} ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
};

export default Reveal;
