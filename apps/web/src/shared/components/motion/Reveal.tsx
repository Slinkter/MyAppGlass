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
  /** Estilo de movimiento: `default` (rápido de sección) o `cine` (cinematográfico suave de 1s con EASE_CINE). */
  motion?: "default" | "cine";
  children: React.ReactNode;
}

export const Reveal: React.FC<RevealProps> = ({ index = 0, motion = "default", children, ...rest }) => {
  const { ref, hidden, level } = useRevealState<HTMLDivElement>({
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.05,
  });
  const reduced = level === "none";
  const isCine = motion === "cine" && level === "full";

  const delay = reduced ? 0 : Math.min(index, MOTION_BUDGET.maxStaggerItems) * (isCine ? 70 : REVEAL_STAGGER_MS);
  const dur = reduced ? DUR_MS.reducedFade : isCine ? 1000 : REVEAL_MS;
  const ease = isCine ? "cubic-bezier(0.16, 1, 0.3, 1)" : EASE_REVEAL;
  const offset = isCine ? 24 : REVEAL_OFFSET;

  return (
    <Box
      ref={ref}
      _motionReduce={{ transition: "none", transform: "none", opacity: 1 }}
      {...rest}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${offset}px)` : "none",
        transition: `opacity ${dur}ms ${ease} ${delay}ms, transform ${dur}ms ${ease} ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
};

export default Reveal;
