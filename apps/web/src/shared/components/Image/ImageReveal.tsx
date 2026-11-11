"use client";

/**
 * @file ImageReveal.tsx
 * @description Patrón del design system para tarjetas con fotografía: skeleton de la misma
 * medida y revelado sincronizado (foto + textos a la vez) cuando la imagen termina de cargar.
 * @module shared/components/Image
 *
 * @example
 * const { loaded, onLoad, reveal } = useImageReveal();
 * <Box position="relative" overflow="hidden">
 *   <ImageRevealSkeleton loaded={loaded} />
 *   <Box position="absolute" inset={0} {...reveal}>
 *     <ResponsiveImage src={src} onLoad={onLoad} ... />
 *   </Box>
 *   <Box position="absolute" bottom="0" {...reveal}>…textos…</Box>
 * </Box>
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { BoxProps } from "@chakra-ui/react";
import { Skeleton } from "@/shared/ui/skeleton";

/** Tiempo máximo esperando la foto: pasado este plazo se muestra la tarjeta igualmente. */
export const IMAGE_REVEAL_TIMEOUT_MS = 7000;

export type RevealStyleProps = Pick<BoxProps, "opacity" | "transition" | "_motionReduce">;

export interface UseImageRevealResult {
  /** `true` cuando la imagen cargó (o venció el plazo máximo). */
  loaded: boolean;
  /** Pásalo a `onLoad` de `ResponsiveImage` / `<img>`. */
  onLoad: () => void;
  /** Props de estilo (opacidad + transición de 1 propiedad) para foto, degradado y textos. */
  reveal: RevealStyleProps;
}

/**
 * Estado de revelado de una tarjeta con imagen.
 * @param timeoutMs - Plazo máximo de espera antes de mostrar la tarjeta aunque la foto no llegue.
 */
export function useImageReveal(timeoutMs: number = IMAGE_REVEAL_TIMEOUT_MS): UseImageRevealResult {
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setLoaded(true), timeoutMs);
    return () => window.clearTimeout(timer);
  }, [loaded, timeoutMs]);

  const reveal = useMemo<RevealStyleProps>(
    () => ({
      opacity: loaded ? 1 : 0,
      transition: "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      _motionReduce: { transition: "none" },
    }),
    [loaded],
  );

  return { loaded, onLoad, reveal };
}

export interface ImageRevealSkeletonProps {
  loaded: boolean;
  /** Radio del skeleton; por defecto `0` (la tarjeta padre ya recorta con `overflow="hidden"`). */
  borderRadius?: BoxProps["borderRadius"];
}

/**
 * Skeleton absoluto que cubre la tarjeta y se desvanece al cargar la imagen.
 * Requiere un padre con `position="relative"` y `overflow="hidden"`.
 */
export const ImageRevealSkeleton: React.FC<ImageRevealSkeletonProps> = ({
  loaded,
  borderRadius = "0",
}) => (
  <Skeleton
    aria-hidden
    position="absolute"
    inset={0}
    zIndex={1}
    borderRadius={borderRadius}
    pointerEvents="none"
    opacity={loaded ? 0 : 1}
    // `pulse` anima la opacidad y pisaría el desvanecido: al cargar se apaga con variant="none".
    variant={loaded ? "none" : "shine"}
    transition="opacity 0.5s ease"
    _motionReduce={{ transition: "none" }}
  />
);
