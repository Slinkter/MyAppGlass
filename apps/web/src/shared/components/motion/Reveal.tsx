"use client";

/**
 * @file Reveal.tsx
 * @description Revelado de sección al entrar en pantalla (transición entre secciones).
 * Solo `opacity` y `transform` (R5), una sola vez, con cascada configurable.
 * Con `prefers-reduced-motion` solo hace un fundido corto (R11).
 */

import React from "react";
import { Box, type BoxProps } from "@chakra-ui/react";
import { DUR_MS, EASE_TEXT } from "@/shared/constants/motion";

/** Duración del revelado de sección (ms). */
export const REVEAL_MS = 450;
/** Cascada entre elementos: 40 ms (pauta UX: 30–50 ms). */
export const REVEAL_STAGGER_MS = 40;
/** Desplazamiento inicial vertical (px). */
const REVEAL_OFFSET = 16;

export interface RevealProps extends Omit<BoxProps, "transition"> {
  /** Orden en la cascada; cada paso suma `DUR_MS.staggerMenu` de retraso. */
  index?: number;
  children: React.ReactNode;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export const Reveal: React.FC<RevealProps> = ({ index = 0, children, ...rest }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delay = reduced ? 0 : index * REVEAL_STAGGER_MS;
  const dur = reduced ? DUR_MS.reducedFade : REVEAL_MS;

  return (
    <Box
      ref={ref}
      {...rest}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown || reduced ? "none" : `translateY(${REVEAL_OFFSET}px)`,
        transition: `opacity ${dur}ms ${EASE_TEXT} ${delay}ms, transform ${dur}ms ${EASE_TEXT} ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
};

export default Reveal;
