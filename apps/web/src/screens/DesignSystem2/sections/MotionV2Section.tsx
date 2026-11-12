"use client";

import React from "react";
import { Box, Heading, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Reveal } from "@/shared/components/motion/Reveal";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import {
  ARCH_BORDER,
  ARCH_SURFACE,
  ARCH_TEXT,
  ARCH_TRANSITION,
  FIREBASE_PROJECTS,
} from "../components/architecturalTokens";

const MOTION_RULES = [
  {
    index: "01",
    title: "Entrada Cine (Reveal)",
    spec: "1000ms · cubic-bezier(0.16, 1, 0.3, 1)",
    detail: "Uso moderado en encabezados y láminas de obra: solo opacity + transform una sola vez.",
  },
  {
    index: "02",
    title: "Límite de 2 Propiedades",
    spec: "transform + border-color (200ms)",
    detail: "Prohibido animar backdrop-filter, blur o sombras extensas; transiciones contenidas y deterministas.",
  },
  {
    index: "03",
    title: "Accesibilidad _motionReduce",
    spec: "transition: none · transform: none",
    detail: "Respeta prefers-reduced-motion en cada Reveal, tab y tarjeta interactiva del sistema.",
  },
] as const;

export const MotionV2Section: React.FC = () => (
  <VStack align="stretch" gap={6}>
    <SectionHeaderV2
      code="10 · Motion Arquitectónico"
      title="Behind The Build & Presupuesto de Movimiento"
      description="Coreografía sobria y medida sobre fotografía real de obra usando Reveal de @/shared/components/motion/Reveal, máximo 2 propiedades en transition y soporte explícito _motionReduce."
      spec="REVEAL CINE · MAX 2 PROPS"
    />

    {/* Architectural Motion Plate */}
    <Box
      position="relative"
      overflow="hidden"
      h={{ base: "22rem", md: "30rem" }}
      border="1px solid"
      borderColor={ARCH_BORDER.hairline}
      bg={ARCH_SURFACE.graphite}
    >
      <Image
        src={FIREBASE_PROJECTS.vittorie.webImage}
        alt="Behind The Build — Obra Vittorie en San Borja"
        w="full"
        h="full"
        objectFit="cover"
      />
      <Box position="absolute" inset="0" bg="rgba(11, 12, 14, 0.58)" />

      <Box position="absolute" top={{ base: 5, md: 8 }} left={{ base: 5, md: 8 }} maxW="sm">
        <Reveal motion="cine" index={0}>
          <Box
            p={4}
            bg={ARCH_SURFACE.graphite}
            border="1px solid"
            borderColor={ARCH_BORDER.hairlineStrong}
          >
            <Heading as="h3" fontFamily="heading" size={{ base: "2xl", md: "3xl" }} color={ARCH_TEXT.onDarkPrimary} letterSpacing="-0.03em">
              BEHIND
            </Heading>
            <Text fontFamily="mono" fontSize="xs" letterSpacing="0.14em" color={ARCH_TEXT.onDarkMuted} textTransform="uppercase" mt={1}>
              INGENIERÍA DETRÁS DE CADA OBRA
            </Text>
          </Box>
        </Reveal>
      </Box>

      <Box position="absolute" bottom={{ base: 5, md: 8 }} right={{ base: 5, md: 8 }} textAlign="right">
        <Reveal motion="cine" index={1}>
          <Box
            p={4}
            bg={ARCH_SURFACE.graphite}
            border="1px solid"
            borderColor={ARCH_BORDER.hairlineStrong}
          >
            <Heading as="h3" fontFamily="heading" size={{ base: "2xl", md: "3xl" }} color={ARCH_TEXT.onDarkPrimary} letterSpacing="-0.03em">
              THE BUILD
            </Heading>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkPrimary} fontWeight="700" letterSpacing="0.14em" textTransform="uppercase" mt={1}>
              VITTORIE · {FIREBASE_PROJECTS.vittorie.coordinates}
            </Text>
          </Box>
        </Reveal>
      </Box>
    </Box>

    {/* 3-Column Motion Spec Grid */}
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline} bg={ARCH_SURFACE.steel}>
      {MOTION_RULES.map((rule, idx) => (
        <Reveal key={rule.index} motion="cine" index={idx}>
          <Box
            p={6}
            h="full"
            borderRight={{ md: idx < MOTION_RULES.length - 1 ? "1px solid" : "none" }}
            borderBottom={{ base: idx < MOTION_RULES.length - 1 ? "1px solid" : "none", md: "none" }}
            borderColor={ARCH_BORDER.hairline}
            transition={ARCH_TRANSITION.transformBorder}
            _hover={{ transform: "translateY(-3px)", borderColor: ARCH_BORDER.hairlineStrong }}
            _motionReduce={{ transition: "none", transform: "none" }}
          >
            <HStack justify="space-between" mb={4} fontFamily="mono" fontSize="xs" fontVariantNumeric="tabular-nums">
              <Text color={ARCH_TEXT.onDarkPrimary} fontWeight="700">{rule.index}</Text>
              <Text color={ARCH_TEXT.onDarkMuted}>{rule.spec}</Text>
            </HStack>
            <Text fontWeight="700" fontSize="md" color={ARCH_TEXT.onDarkPrimary} mb={2}>
              {rule.title}
            </Text>
            <Text fontSize="xs" color={ARCH_TEXT.onDarkMuted} lineHeight="1.6">
              {rule.detail}
            </Text>
          </Box>
        </Reveal>
      ))}
    </SimpleGrid>
  </VStack>
);
