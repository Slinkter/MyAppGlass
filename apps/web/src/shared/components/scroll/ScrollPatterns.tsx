"use client";

/**
 * @file ScrollPatterns.tsx
 * @description Patrones de composición tomados de `experiments/scroll-craft` y del mapa inmersivo,
 * como componentes reutilizables del Aura Design System. Solo transform/opacity, tokens del tema,
 * claro y oscuro, `prefers-reduced-motion` y `prefers-reduced-transparency` respetados.
 * Ninguna página los usa todavía: se muestran en `/design-system`.
 *  - PhotoFrame   marco de foto con proporción fija y efecto de scroll opcional
 *  - GlassCaption leyenda de vidrio claro
 *  - SectionIntro etiqueta pequeña + título (`fonts.heading`) + descripción
 *  - StepSplit    texto + foto en dos columnas
 *  - MomentBand   foto a sangre con revelado y leyenda
 *  - CtaBand      banda de cierre con una acción primaria y una secundaria
 */

import React from "react";
import Image from "next/image";
import RouterLink from "next/link";
import { Box, Flex, Heading, Text, type BoxProps } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { glassLightOnPhoto } from "@/shared/constants/glass";
import { useScrollProgress } from "@/shared/hooks/ui/useScrollProgress";
import { Reveal } from "@/shared/components/motion/Reveal";

export type ScrollEffect = "none" | "parallax" | "zoom" | "rise";

/* ───────── PhotoFrame ───────── */

export interface PhotoFrameProps extends Omit<BoxProps, "children"> {
  src: string;
  alt: string;
  /** Proporción fija (evita saltos de diseño). */
  ratio?: string;
  effect?: ScrollEffect;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}

const effectStyle: Record<ScrollEffect, React.CSSProperties> = {
  none: {},
  parallax: { top: "-8%", height: "116%", transform: "translateY(calc((0.5 - var(--p, 0.5)) * 10%))" },
  zoom: { transform: "scale(calc(1.02 + var(--p, 0) * 0.12))" },
  rise: { top: "auto", bottom: 0, height: "128%", transform: "translateY(calc((1 - var(--p, 1)) * 18%))" },
};

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  alt,
  ratio = "4 / 5",
  effect = "none",
  priority = false,
  sizes = "(min-width: 900px) 560px, 100vw",
  children,
  ...rest
}) => {
  const ref = useScrollProgress<HTMLDivElement>(effect !== "none");
  return (
    <Box
      ref={ref}
      position="relative"
      overflow="hidden"
      borderRadius="2xl"
      bg="bg.subtle"
      style={{ aspectRatio: ratio }}
      {...rest}
    >
      <Box position="absolute" inset="0" style={{ willChange: effect === "none" ? undefined : "transform", ...effectStyle[effect] }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
      </Box>
      {children}
    </Box>
  );
};

/* ───────── GlassCaption ───────── */

export interface GlassCaptionProps extends Omit<BoxProps, "children"> {
  title?: string;
  children?: React.ReactNode;
}

export const GlassCaption: React.FC<GlassCaptionProps> = ({ title, children, ...rest }) => (
  <Box
    position="absolute"
    left={{ base: "3", md: "5" }}
    right={{ base: "3", md: "auto" }}
    bottom={{ base: "3", md: "5" }}
    maxW={{ md: "380px" }}
    p={{ base: "4", md: "5" }}
    borderRadius="2xl"
    color="gray.900"
    boxShadow="lg"
    {...glassLightOnPhoto}
    {...rest}
  >
    {title && (
      <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} lineHeight="1.15" mb={children ? "1" : "0"}>
        {title}
      </Heading>
    )}
    {children && (
      <Text fontSize="sm" color="gray.700" lineHeight="relaxed">
        {children}
      </Text>
    )}
  </Box>
);

/* ───────── SectionIntro ───────── */

export interface SectionIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
  headingAs?: "h1" | "h2";
}

export const SectionIntro: React.FC<SectionIntroProps> = ({ eyebrow, title, description, headingAs = "h2" }) => (
  <Box maxW="3xl">
    <Text fontSize="xs" fontWeight="700" letterSpacing="0.14em" textTransform="uppercase" color="text.muted" mb="3">
      {eyebrow}
    </Text>
    <Heading as={headingAs} fontSize={{ base: "3xl", md: "5xl" }} fontWeight="500" lineHeight="1.1" letterSpacing="-0.01em" color="text.heading">
      {title}
    </Heading>
    {description && (
      <Text mt="4" fontSize={{ base: "md", md: "lg" }} color="text.muted" maxW="2xl" lineHeight="relaxed">
        {description}
      </Text>
    )}
  </Box>
);

/* ───────── StepSplit ───────── */

export interface StepSplitProps {
  step: string;
  title: string;
  text: string;
  image: { src: string; alt: string };
  effect?: ScrollEffect;
  reverse?: boolean;
}

export const StepSplit: React.FC<StepSplitProps> = ({ step, title, text, image, effect = "parallax", reverse = false }) => (
  <Flex
    direction={{ base: "column", md: reverse ? "row-reverse" : "row" }}
    align="center"
    gap={{ base: "6", md: "16" }}
  >
    <Reveal>
      <Box flex="1" minW="0">
        <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="text.muted" mb="2">
          {step}
        </Text>
        <Heading as="h3" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="500" lineHeight="1.15" color="text.heading" mb="3">
          {title}
        </Heading>
        <Text color="text.muted" maxW="42ch" lineHeight="relaxed">
          {text}
        </Text>
      </Box>
    </Reveal>
    <PhotoFrame src={image.src} alt={image.alt} effect={effect} flex="1" w="full" minW="0" maxW={{ md: "520px" }} />
  </Flex>
);

/* ───────── MomentBand ───────── */

export interface MomentBandProps {
  image: { src: string; alt: string };
  caption: string;
  ratio?: string;
}

export const MomentBand: React.FC<MomentBandProps> = ({ image, caption, ratio = "4 / 5" }) => (
  <PhotoFrame src={image.src} alt={image.alt} ratio={ratio} effect="rise" maxW="640px" mx="auto" w="full">
    <GlassCaption left={{ base: "3", md: "5" }} right={{ base: "3", md: "5" }} maxW="none">
      <Text as="span" fontFamily="heading" fontSize={{ base: "lg", md: "xl" }} color="gray.900" lineHeight="1.25" display="block">
        {caption}
      </Text>
    </GlassCaption>
  </PhotoFrame>
);

/* ───────── CtaBand ───────── */

export interface CtaBandProps {
  title: string;
  primary: { label: string; href: string; external?: boolean; icon?: React.ReactNode };
  secondary?: { label: string; href: string };
}

export const CtaBand: React.FC<CtaBandProps> = ({ title, primary, secondary }) => (
  <Box
    p={{ base: "6", md: "10" }}
    borderRadius="3xl"
    textAlign="center"
    color="gray.900"
    boxShadow="lg"
    {...glassLightOnPhoto}
  >
    <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="500" lineHeight="1.15" mb="6">
      {title}
    </Heading>
    <Flex gap="3" justify="center" direction={{ base: "column", sm: "row" }} maxW="md" mx="auto">
      <Button
        asChild
        variant="aura"
        px="6"
        flex="1"
        whiteSpace="nowrap"
        _dark={{ bg: "gray.900", color: "white", _hover: { bg: "gray.800" } }}
      >
        <a href={primary.href} {...(primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {primary.icon}
          {primary.label}
        </a>
      </Button>
      {secondary && (
        <Button
          asChild
          variant="outline"
          px="6"
          flex="1"
          whiteSpace="nowrap"
          _dark={{ bg: "transparent", color: "gray.900", borderColor: "gray.900", _hover: { bg: "blackAlpha.100" } }}
        >
          <RouterLink href={secondary.href}>{secondary.label}</RouterLink>
        </Button>
      )}
    </Flex>
  </Box>
);
