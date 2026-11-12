"use client";

import React from "react";
import { Box, Heading, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Reveal } from "@/shared/components/motion/Reveal";
import { ARCH_BORDER, ARCH_SURFACE, ARCH_TEXT, FIREBASE_PROJECTS } from "./architecturalTokens";

export interface EditorialHeroProps {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  featuredImage: string;
  featuredLabel?: string;
  featuredTitle?: string;
  featuredLocation?: string;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  eyebrow = "INGENIERÍA EN VIDRIO Y ALUMINIO · LIMA TOP",
  titleLine1 = "Obras que",
  titleLine2 = "hablan por sí mismas.",
  subtitle = "Fabricamos e instalamos mamparas, fachadas y ventanas antirruido para constructoras, estudios de arquitectura y viviendas en La Molina, Surco, San Borja, San Isidro y Miraflores.",
  featuredImage,
  featuredLabel = "OBRA DESTACADA · 01",
  featuredTitle = "Residencial Palmer — La Molina",
  featuredLocation = FIREBASE_PROJECTS.palmer.coordinates,
}) => (
  <Box bg={ARCH_SURFACE.graphite} border="1px solid" borderColor={ARCH_BORDER.hairline}>
    {/* Top architectural telemetry bar */}
    <HStack
      justify="space-between"
      px={{ base: 4, md: 6 }}
      py={2.5}
      bg={ARCH_SURFACE.steel}
      borderBottom="1px solid"
      borderColor={ARCH_BORDER.hairline}
      flexWrap="wrap"
      gap={2}
    >
      <HStack gap={2.5}>
        <Box w="6px" h="6px" bg="brand.coral" />
        <Text
          fontFamily="mono"
          fontSize="xs"
          fontWeight="700"
          letterSpacing="0.16em"
          textTransform="uppercase"
          color={ARCH_TEXT.onDarkPrimary}
        >
          {eyebrow}
        </Text>
      </HStack>
      <Text
        fontFamily="mono"
        fontSize="xs"
        letterSpacing="0.14em"
        color={ARCH_TEXT.onDarkMuted}
        fontVariantNumeric="tabular-nums"
      >
        SERIE 62 · {featuredLocation}
      </Text>
    </HStack>

    <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0}>
      {/* Left 5 columns: Matte architectural typography + tabular datum */}
      <VStack
        align="stretch"
        justify="space-between"
        gridColumn={{ lg: "span 5" }}
        borderBottom={{ base: "1px solid", lg: "none" }}
        borderRight={{ lg: "1px solid" }}
        borderColor={ARCH_BORDER.hairline}
        gap={0}
      >
        <Box p={{ base: 5, md: 8 }}>
          <Reveal motion="cine" index={0}>
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color={ARCH_TEXT.onDarkMuted}
              mb={4}
              fontVariantNumeric="tabular-nums"
            >
              EXP. 01 · ARQUITECTURA EN ALUMINIO
            </Text>
            <Heading
              as="h2"
              fontFamily="heading"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="700"
              lineHeight="0.98"
              letterSpacing="-0.03em"
              color={ARCH_TEXT.onDarkPrimary}
            >
              {titleLine1}{" "}
              <br />
              <Box as="span" color="brand.coral">
                {titleLine2}
              </Box>
            </Heading>
          </Reveal>

          <Reveal motion="cine" index={1}>
            <Text color={ARCH_TEXT.onDarkMuted} fontSize="sm" lineHeight="1.65" mt={5} maxW="md">
              {subtitle}
            </Text>
          </Reveal>

          <HStack gap={3} flexWrap="wrap" mt={7}>
            <Button variant="primary" size="lg" minH="48px" borderRadius="full">
              Explorar proyectos <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <Button variant="outline" size="lg" minH="48px" borderRadius="full">
              Solicitar visita técnica
            </Button>
          </HStack>
        </Box>

        {/* Bottom 3-cell structural metric strip */}
        <SimpleGrid
          columns={3}
          gap={0}
          borderTop="1px solid"
          borderColor={ARCH_BORDER.hairline}
          bg={ARCH_SURFACE.steel}
        >
          <Box p={4} borderRight="1px solid" borderColor={ARCH_BORDER.hairline}>
            <Text
              fontFamily="mono"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="700"
              color={ARCH_TEXT.onDarkPrimary}
              fontVariantNumeric="tabular-nums"
            >
              659+
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} mt={0.5}>
              FOTOS DE OBRA
            </Text>
          </Box>
          <Box p={4} borderRight="1px solid" borderColor={ARCH_BORDER.hairline}>
            <Text
              fontFamily="mono"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="700"
              color={ARCH_TEXT.onDarkPrimary}
              fontVariantNumeric="tabular-nums"
            >
              05
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} mt={0.5}>
              DISTRITOS TOP
            </Text>
          </Box>
          <Box p={4}>
            <Text
              fontFamily="mono"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="700"
              color={ARCH_TEXT.onDarkPrimary}
              fontVariantNumeric="tabular-nums"
            >
              2021
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} mt={0.5}>
              FUNDACIÓN
            </Text>
          </Box>
        </SimpleGrid>
      </VStack>

      {/* Right 7 columns: Sharp architectural viewport + solid matte caption plate */}
      <VStack gridColumn={{ lg: "span 7" }} align="stretch" gap={0}>
        <Box position="relative" h={{ base: "280px", md: "440px" }} overflow="hidden">
          <Image src={featuredImage} alt={featuredTitle} w="full" h="full" objectFit="cover" objectPosition="top" />
          {/* Precision reticle crosshairs */}
          <Box
            position="absolute"
            top={3}
            left={3}
            px={2.5}
            py={1}
            bg={ARCH_SURFACE.graphite}
            border="1px solid"
            borderColor={ARCH_BORDER.hairlineStrong}
          >
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.16em"
              color={ARCH_TEXT.onDarkPrimary}
              fontVariantNumeric="tabular-nums"
            >
              {featuredLabel}
            </Text>
          </Box>
        </Box>

        <HStack
          justify="space-between"
          align="center"
          px={{ base: 4, md: 6 }}
          py={3.5}
          bg={ARCH_SURFACE.steel}
          borderTop="1px solid"
          borderColor={ARCH_BORDER.hairline}
          flexWrap="wrap"
          gap={2}
        >
          <Text fontFamily="heading" fontWeight="700" fontSize="lg" color={ARCH_TEXT.onDarkPrimary}>
            {featuredTitle}
          </Text>
          <HStack gap={1.5} color={ARCH_TEXT.onDarkMuted} fontFamily="mono" fontSize="xs" fontVariantNumeric="tabular-nums">
            <MapPin size={14} aria-hidden="true" />
            <Text>{featuredLocation}</Text>
          </HStack>
        </HStack>
      </VStack>
    </SimpleGrid>
  </Box>
);
