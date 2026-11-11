"use client";

/**
 * @file ImageReveal.tsx
 * @description Patrón del design system para tarjetas con fotografía: skeleton de la misma
 * medida y revelado sincronizado (foto + textos a la vez) cuando la imagen termina de cargar.
 * @module shared/components/Image
 */

import React from "react";
import type { BoxProps } from "@chakra-ui/react";
import { Skeleton } from "@/shared/ui/skeleton";

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


