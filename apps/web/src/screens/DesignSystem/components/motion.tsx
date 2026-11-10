"use client";

/**
 * @file motion.tsx
 * @description Movimientos ligeros del catálogo `/design-system` (solo aquí). Documentados en
 * `sections/v2/TransitionsV2Showcase.tsx`. Todos: solo `transform` y `opacity`, una sola vez por elemento,
 * sin bucles, y sin animación cuando `useMotionBudget` devuelve "lite" o "none".
 */

import React from "react";
import { Box, type BoxProps } from "@chakra-ui/react";
import { DUR_MS, EASE_SOFT, EASE_TEXT } from "@/shared/constants/motion";
import { useMotionBudget } from "@/shared/hooks/ui/useMotionBudget";

/** Fundido corto al montar el contenido de una pestaña (solo `opacity`, 150 ms, una vez). */
export const TabFade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const level = useMotionBudget();
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    if (level !== "full") return;
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, [level]);
  const skip = level !== "full";
  return (
    <Box
      style={{
        opacity: skip || on ? 1 : 0,
        transition: skip ? undefined : `opacity ${DUR_MS.reducedFade}ms ${EASE_SOFT}`,
      }}
    >
      {children}
    </Box>
  );
};

/** Línea fina que se dibuja con `scaleX` (0 a 1) la primera vez que entra en pantalla. */
export const DrawLine: React.FC<BoxProps> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const level = useMotionBudget();
  const skip = level !== "full";
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (skip || !el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setShown(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [skip]);
  return (
    <Box
      ref={ref}
      aria-hidden="true"
      h="0.5"
      w="10"
      bg="brand.ink"
      _dark={{ bg: "accent.ink" }}
      {...props}
      style={{
        transformOrigin: "left center",
        transform: skip || shown ? "scaleX(1)" : "scaleX(0)",
        transition: skip ? undefined : `transform ${DUR_MS.textIn}ms ${EASE_TEXT} 200ms`,
      }}
    />
  );
};
