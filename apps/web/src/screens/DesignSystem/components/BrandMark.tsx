"use client";

/**
 * @file BrandMark.tsx
 * @description Símbolo de la marca con sus versiones de color y lockup horizontal (propuesta del manual v1.0 §7.1).
 * Geometría idéntica a `assets/branding/logosvg.svg`; los colores salen de tokens del tema.
 * Solo se usa dentro de `/design-system` hasta que el dueño apruebe el lockup.
 */

import React from "react";
import { Box, HStack, Text, VStack, type BoxProps } from "@chakra-ui/react";

export type BrandTone = "coral" | "ink" | "white";

/** Triángulo (`color`) y figuras internas (`inner`) por versión. */
const TONES: Record<BrandTone, { color: string; inner: string }> = {
  coral: { color: "brand.coral", inner: "white" },
  ink: { color: "brand.ink", inner: "white" },
  white: { color: "white", inner: "brand.ink" },
};

export interface BrandMarkProps extends Omit<BoxProps, "color"> {
  tone?: BrandTone;
  /** Tamaño del símbolo (token de espaciado). */
  size?: BoxProps["w"];
}

export const BrandMark: React.FC<BrandMarkProps> = ({ tone = "coral", size = "12", ...rest }) => {
  const { color, inner } = TONES[tone];
  return (
    <Box w={size} h={size} flexShrink={0} color={color} {...rest}>
      <svg viewBox="0 0 500 500" fill="none" role="img" aria-label="Logo Glass & Aluminum Company" width="100%" height="100%">
        <path d="M 20 460 L 250 40 L 480 460 Z" fill="currentColor" />
        <Box as="g" color={inner}>
          <circle cx="250" cy="315" r="115" stroke="currentColor" strokeWidth="8" />
          <g transform="translate(250, 315) rotate(45)" fill="currentColor">
            <rect x="-71" y="-71" width="68" height="68" />
            <rect x="3" y="-71" width="68" height="68" />
            <rect x="-71" y="3" width="68" height="68" />
            <rect x="3" y="3" width="68" height="68" />
          </g>
        </Box>
      </svg>
    </Box>
  );
};

export interface BrandLockupProps {
  tone?: BrandTone;
  /** Color del texto: oscuro sobre fondos claros, blanco sobre oscuros. */
  onDark?: boolean;
  size?: BoxProps["w"];
}

/** Lockup horizontal propuesto: símbolo + línea superior + nombre completo. */
export const BrandLockup: React.FC<BrandLockupProps> = ({ tone = "coral", onDark = false, size = "12" }) => (
  <HStack gap="3" align="center">
    <BrandMark tone={tone} size={size} />
    <VStack align="flex-start" gap="0.5" lineHeight="1.1">
      <Text
        fontSize="xs"
        fontWeight="600"
        letterSpacing="label"
        textTransform="uppercase"
        color={onDark ? "whiteAlpha.800" : "text.muted"}
      >
        Vidriería &amp; Aluminio
      </Text>
      <Text fontFamily="heading" fontWeight="700" fontSize="lg" color={onDark ? "white" : "text.heading"}>
        Glass &amp; Aluminum Company S.A.C.
      </Text>
    </VStack>
  </HStack>
);
