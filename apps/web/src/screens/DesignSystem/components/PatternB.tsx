"use client";

/**
 * @file PatternB.tsx
 * @description Patrón del prototipo B de ubicación (Lente de Cristal y Aluminio), definido una sola vez para `/design-system`:
 * escenario con foto a pantalla completa (`Stage`), tarjeta de vidrio flotante arriba a la izquierda (`PlaceCard`)
 * y barra inferior de vidrio con píldoras (`Dock`). Un solo vidrio por zona: las píldoras internas no llevan desenfoque.
 * Radios de DESIGN.md: escenario `modal` (24 px), tarjeta y barra `card` (16 px), píldora `xl` (12 px).
 * Vidrio: `glassSurface` (shared/constants/glass.ts); con `prefers-reduced-transparency` pasa a superficie sólida.
 */

import React from "react";
import { Box, HStack, Text, VStack, type BoxProps } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import ResponsiveImage from "@/shared/components/Image/ResponsiveImage";
import { glassSurface } from "@/shared/constants/glass";

/** Alturas del escenario: las mismas del mapa inmersivo de ubicación. */
const STAGE_H = { base: "35rem", md: "38.75rem", lg: "42.5rem" } as const;

export interface StageProps {
  /** Foto propia a pantalla completa; sin foto se muestra el marcador visible. */
  image?: string;
  imageAlt?: string;
  pendingLabel?: string;
  objectPosition?: string;
  h?: BoxProps["h"];
  children?: React.ReactNode;
}

export const Stage: React.FC<StageProps> = ({ image, imageAlt = "", pendingLabel, objectPosition = "center", h = STAGE_H, children }) => (
  <Box position="relative" overflow="hidden" h={h} borderRadius="modal" borderWidth="1px" borderColor="border.default" bg="bg.subtle">
    {image ? (
      <Box position="absolute" inset={0}>
        <ResponsiveImage src={image} alt={imageAlt} w="full" h="full" objectFit="cover" style={{ objectPosition }} sizes="(min-width: 1280px) 1200px, 100vw" />
      </Box>
    ) : (
      <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center" p="6" textAlign="center">
        <Text fontSize="xs" fontWeight="bold" letterSpacing="label" textTransform="uppercase" color="text.muted">
          {pendingLabel ?? "[PENDIENTE] Foto de la obra"}
        </Text>
      </Box>
    )}
    {children}
  </Box>
);

/** Tarjeta de vidrio flotante: arriba a la izquierda en tablet y escritorio, a lo ancho en móvil. */
export const PlaceCard: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <Box
    as="section"
    aria-label={label}
    position="absolute"
    top={{ base: "3", lg: "5" }}
    left={{ base: "3", lg: "5" }}
    right={{ base: "3", md: "auto" }}
    w={{ md: "24rem", lg: "26rem" }}
    zIndex={2}
    p={{ base: "4", md: "5" }}
    borderRadius="card"
    {...glassSurface}
  >
    {children}
  </Box>
);

/** Fila de estado con punto y texto (nunca solo por color). */
export const StatusLine: React.FC<{ label: string; meta?: string; dot?: BoxProps["bg"] }> = ({ label, meta, dot = "brand.ink" }) => (
  <HStack justify="space-between" gap="3">
    <HStack gap="1.5">
      <Box w="2" h="2" borderRadius="full" bg={dot} flexShrink={0} aria-hidden="true" />
      <Text fontSize="xs" fontWeight="700" letterSpacing="label" textTransform="uppercase" color="text.muted">
        {label}
      </Text>
    </HStack>
    {meta && (
      <Text fontSize="xs" fontWeight="600" color="text.muted">
        {meta}
      </Text>
    )}
  </HStack>
);

/** Título de la tarjeta flotante: Lora 700, mismo tamaño en todas las piezas. */
export const PlaceTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text as="h2" mt="3" fontFamily="heading" fontWeight="700" fontSize={{ base: "2xl", md: "3xl" }} lineHeight="title" letterSpacing="display" color="text.heading">
    {children}
  </Text>
);

/** Palabra destacada de un título: coral del logo, único acento (solo texto grande, manual §7.2). */
export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box as="span" color="brand.coral" whiteSpace="nowrap">
    {children}
  </Box>
);

/** Separador fino y fila de acciones: una primaria negra y una secundaria en contorno. */
export const PlaceActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <HStack gap="2" pt="4" mt="4" borderTopWidth="1px" borderColor="border.subtle" wrap="wrap">
    {children}
  </HStack>
);

/** Barra inferior de vidrio con píldoras o datos. */
export const Dock: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <Box
    position="absolute"
    left={{ base: "3", lg: "5" }}
    right={{ base: "3", lg: "5" }}
    bottom={{ base: "3", lg: "4" }}
    zIndex={2}
    p="1.5"
    borderRadius="card"
    aria-label={label}
    {...glassSurface}
  >
    <HStack gap="1" overflowX="auto" css={{ scrollSnapType: "x proximity", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
      {children}
    </HStack>
  </Box>
);

const IconBox: React.FC<{ icon: React.ElementType; active?: boolean }> = ({ icon: Icon, active = false }) => (
  <Box
    w="10"
    h="10"
    borderRadius="lg"
    flexShrink={0}
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg={active ? "brand.ink" : "bg.subtle"}
    color={active ? "white" : "text.heading"}
    _dark={{ bg: active ? "white" : "bg.subtle", color: active ? "brand.ink" : "text.heading" }}
  >
    <Icon size={17} aria-hidden="true" />
  </Box>
);

const PillText: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <VStack align="flex-start" gap="0" minW={0} flex="1">
    <Text fontSize="xs" fontWeight="700" color="text.heading" truncate maxW="full">
      {title}
    </Text>
    <Text fontSize="xs" fontWeight="400" color="text.muted" truncate maxW="full">
      {text}
    </Text>
  </VStack>
);

export interface DockPillProps {
  icon: React.ElementType;
  title: string;
  text: string;
  /** Marca la píldora seleccionada (`aria-pressed`). */
  pressed?: boolean;
  onClick?: () => void;
}

/** Píldora seleccionable: botón con la variante `pill` del tema (44 px, borde negro al activarse). */
export const DockPill: React.FC<DockPillProps> = ({ icon, title, text, pressed = false, onClick }) => (
  <Button variant="pill" aria-pressed={pressed} onClick={onClick} flexShrink={0} w={{ base: "14rem", md: "auto" }} flex={{ md: "1" }} h="auto" py="1.5">
    <IconBox icon={icon} active={pressed} />
    <PillText title={title} text={text} />
  </Button>
);

/** Dato informativo del dock: mismo aspecto que la píldora, sin interacción. */
export const DockFact: React.FC<{ icon: React.ElementType; title: string; text: string }> = ({ icon, title, text }) => (
  <HStack flexShrink={0} gap="2.5" minH="11" p="1.5" pr="3" w={{ base: "14rem", md: "auto" }} flex={{ md: "1" }}>
    <IconBox icon={icon} />
    <PillText title={title} text={text} />
  </HStack>
);
