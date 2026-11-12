"use client";

import React from "react";
import { Box, Heading, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowUpRight, Compass, Layers, Phone } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import { EditorialHero } from "../components/EditorialHero";
import { SelectedWorksGrid } from "../components/SelectedWorksGrid";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import {
  ARCH_BORDER,
  ARCH_SURFACE,
  ARCH_TEXT,
  ARCH_TRANSITION,
  FIREBASE_PROJECTS,
} from "../components/architecturalTokens";

const SAMPLE_PROJECTS = [
  {
    code: FIREBASE_PROJECTS.palmer.code,
    name: FIREBASE_PROJECTS.palmer.name,
    location: `${FIREBASE_PROJECTS.palmer.district}, Lima`,
    year: FIREBASE_PROJECTS.palmer.year,
    system: FIREBASE_PROJECTS.palmer.system,
    image: FIREBASE_PROJECTS.palmer.webImage,
    coordinates: FIREBASE_PROJECTS.palmer.coordinates,
  },
  {
    code: FIREBASE_PROJECTS.elenor.code,
    name: FIREBASE_PROJECTS.elenor.name,
    location: `${FIREBASE_PROJECTS.elenor.district}, Lima`,
    year: FIREBASE_PROJECTS.elenor.year,
    system: FIREBASE_PROJECTS.elenor.system,
    image: FIREBASE_PROJECTS.elenor.webImage,
    coordinates: FIREBASE_PROJECTS.elenor.coordinates,
  },
  {
    code: FIREBASE_PROJECTS.vittorie.code,
    name: FIREBASE_PROJECTS.vittorie.name,
    location: `${FIREBASE_PROJECTS.vittorie.district}, Lima`,
    year: FIREBASE_PROJECTS.vittorie.year,
    system: FIREBASE_PROJECTS.vittorie.system,
    image: FIREBASE_PROJECTS.vittorie.webImage,
    coordinates: FIREBASE_PROJECTS.vittorie.coordinates,
  },
];

const SECONDARY_PLATES = [
  FIREBASE_PROJECTS.ventura,
  FIREBASE_PROJECTS.parquePrado,
  FIREBASE_PROJECTS.maddy,
] as const;

export const CardsV2Section: React.FC = () => (
  <VStack align="stretch" gap={6}>
    <SectionHeaderV2
      code="02 · Hero & Tarjetas Editoriales"
      title="Composición Asimétrica de 12 Columnas"
      description="Retícula arquitectónica expuesta con uniones hairline de 1 px, bloque de concreto claro de contraste (#F3F2EE), tarjetas numeradas en tabular-nums y fotografía real de Firebase Storage."
      spec="GRID 12 COL · ASYMMETRIC BENTO"
    />

    <EditorialHero featuredImage={FIREBASE_PROJECTS.palmer.webImage} />

    <SelectedWorksGrid projects={SAMPLE_PROJECTS} />

    {/* Asymmetric 12-col Architectural Bento Trio (Concrete + Steel + Graphite) */}
    <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline}>
      {/* Block 1: Concrete Light Contrast Monolith (5 cols) */}
      <Box
        gridColumn={{ lg: "span 5" }}
        p={{ base: 5, md: 7 }}
        bg={ARCH_SURFACE.concrete}
        color={ARCH_TEXT.onConcretePrimary}
        borderBottom={{ base: "1px solid", lg: "none" }}
        borderRight={{ lg: "1px solid" }}
        borderColor={ARCH_BORDER.concreteHairline}
        transition={ARCH_TRANSITION.transformBorder}
        _hover={{ transform: "translateY(-2px)" }}
        _motionReduce={{ transition: "none", transform: "none" }}
      >
        <HStack justify="space-between" mb={10}>
          <Box
            w="44px"
            h="44px"
            bg={ARCH_SURFACE.graphite}
            color={ARCH_TEXT.onDarkPrimary}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Compass size={18} aria-hidden="true" />
          </Box>
          <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onConcreteMuted} fontVariantNumeric="tabular-nums">
            MÓDULO 01 / OBRA
          </Text>
        </HStack>
        <Heading as="h3" fontFamily="heading" size="xl" mb={2}>
          Portafolio en Lima Top
        </Heading>
        <Text fontSize="sm" color={ARCH_TEXT.onConcreteMuted} lineHeight="1.6">
          Obras ejecutadas en La Molina, Surco, San Borja, San Isidro y Miraflores con archivo fotográfico verificable.
        </Text>
      </Box>

      {/* Block 2: Brushed Steel (4 cols) */}
      <Box
        gridColumn={{ lg: "span 4" }}
        p={{ base: 5, md: 7 }}
        bg={ARCH_SURFACE.steel}
        color={ARCH_TEXT.onDarkPrimary}
        borderBottom={{ base: "1px solid", lg: "none" }}
        borderRight={{ lg: "1px solid" }}
        borderColor={ARCH_BORDER.hairline}
        transition={ARCH_TRANSITION.transformBorder}
        _hover={{ transform: "translateY(-2px)" }}
        _motionReduce={{ transition: "none", transform: "none" }}
      >
        <HStack justify="space-between" mb={10}>
          <Box
            w="44px"
            h="44px"
            border="1px solid"
            borderColor={ARCH_BORDER.hairlineStrong}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Layers size={18} aria-hidden="true" />
          </Box>
          <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
            MÓDULO 02 / SISTEMAS
          </Text>
        </HStack>
        <Heading as="h3" fontFamily="heading" size="xl" mb={2}>
          6 Sistemas Oficiales
        </Heading>
        <Text fontSize="sm" color={ARCH_TEXT.onDarkMuted} lineHeight="1.6">
          Sistema Nova, Serie 25, Serie 35, Serie 62, Acústica y PVC abatible ensamblados en taller propio.
        </Text>
      </Box>

      {/* Block 3: Deep Graphite + Coral Datum (3 cols) */}
      <Box
        gridColumn={{ lg: "span 3" }}
        p={{ base: 5, md: 7 }}
        bg={ARCH_SURFACE.graphite}
        color={ARCH_TEXT.onDarkPrimary}
        transition={ARCH_TRANSITION.transformBorder}
        _hover={{ transform: "translateY(-2px)" }}
        _motionReduce={{ transition: "none", transform: "none" }}
      >
        <HStack justify="space-between" mb={10}>
          <Box
            w="44px"
            h="44px"
            bg="brand.coral"
            color={ARCH_SURFACE.graphite}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Phone size={18} aria-hidden="true" />
          </Box>
          <ArrowUpRight size={18} color="#9BA1AB" aria-hidden="true" />
        </HStack>
        <Heading as="h3" fontFamily="heading" size="xl" mb={2}>
          Visita Técnica
        </Heading>
        <Text fontFamily="mono" fontSize="sm" color="brand.coral" fontWeight="700" fontVariantNumeric="tabular-nums">
          {companyData.whatsappDisplay}
        </Text>
        <Text fontSize="xs" color={ARCH_TEXT.onDarkMuted} mt={1}>
          {companyData.direccion}
        </Text>
      </Box>
    </SimpleGrid>

    {/* Secondary Architectural Plates (Ventura, Parque Prado, Maddy) */}
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline}>
      {SECONDARY_PLATES.map((item, idx) => (
        <Box
          key={item.code}
          borderRight={{ md: idx < SECONDARY_PLATES.length - 1 ? "1px solid" : "none" }}
          borderBottom={{ base: idx < SECONDARY_PLATES.length - 1 ? "1px solid" : "none", md: "none" }}
          borderColor={ARCH_BORDER.hairline}
          bg={ARCH_SURFACE.graphite}
        >
          <Box position="relative" h="230px" overflow="hidden" bg={ARCH_SURFACE.steel}>
            <Image src={item.mobileImage} alt={`${item.name} — ${item.district}`} w="full" h="full" objectFit="cover" />
            <Box
              position="absolute"
              top={3}
              right={3}
              px={2.5}
              py={1}
              bg={ARCH_SURFACE.graphite}
              border="1px solid"
              borderColor={ARCH_BORDER.hairlineStrong}
            >
              <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onDarkPrimary} fontVariantNumeric="tabular-nums">
                {item.code}/06
              </Text>
            </Box>
          </Box>
          <HStack
            justify="space-between"
            px={4}
            py={3.5}
            bg={ARCH_SURFACE.steel}
            borderTop="1px solid"
            borderColor={ARCH_BORDER.hairline}
          >
            <Box>
              <Text fontFamily="heading" fontWeight="700" fontSize="md" color={ARCH_TEXT.onDarkPrimary}>
                {item.name}
              </Text>
              <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted}>
                {item.system}
              </Text>
            </Box>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkSubtle} fontVariantNumeric="tabular-nums">
              {item.district}
            </Text>
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  </VStack>
);
