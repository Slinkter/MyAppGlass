"use client";

import React from "react";
import { Box, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import {
  ARCH_BORDER,
  ARCH_SURFACE,
  ARCH_TEXT,
  FIREBASE_PROJECTS,
} from "../components/architecturalTokens";

const MEDIA_PLATES = [
  {
    code: "01",
    project: FIREBASE_PROJECTS.palmer.name,
    district: FIREBASE_PROJECTS.palmer.district,
    coords: FIREBASE_PROJECTS.palmer.coordinates,
    src: FIREBASE_PROJECTS.palmer.webImage,
    tag: "WEB · 1200PX",
    isHero: true,
  },
  {
    code: "02",
    project: FIREBASE_PROJECTS.elenor.name,
    district: FIREBASE_PROJECTS.elenor.district,
    coords: FIREBASE_PROJECTS.elenor.coordinates,
    src: FIREBASE_PROJECTS.elenor.mobileImage,
    tag: "MOBILE · 600PX",
    isHero: false,
  },
  {
    code: "03",
    project: FIREBASE_PROJECTS.vittorie.name,
    district: FIREBASE_PROJECTS.vittorie.district,
    coords: FIREBASE_PROJECTS.vittorie.coordinates,
    src: FIREBASE_PROJECTS.vittorie.webImage,
    tag: "WEB · 1200PX",
    isHero: false,
  },
  {
    code: "04",
    project: FIREBASE_PROJECTS.ventura.name,
    district: FIREBASE_PROJECTS.ventura.district,
    coords: FIREBASE_PROJECTS.ventura.coordinates,
    src: FIREBASE_PROJECTS.ventura.mobileImage,
    tag: "MOBILE · 600PX",
    isHero: false,
  },
  {
    code: "05",
    project: FIREBASE_PROJECTS.parquePrado.name,
    district: FIREBASE_PROJECTS.parquePrado.district,
    coords: FIREBASE_PROJECTS.parquePrado.coordinates,
    src: FIREBASE_PROJECTS.parquePrado.mobileImage,
    tag: "MOBILE · 600PX",
    isHero: false,
  },
  {
    code: "06",
    project: FIREBASE_PROJECTS.maddy.name,
    district: FIREBASE_PROJECTS.maddy.district,
    coords: FIREBASE_PROJECTS.maddy.coordinates,
    src: FIREBASE_PROJECTS.maddy.mobileImage,
    tag: "MOBILE · 600PX",
    isHero: false,
  },
] as const;

export const MediaV2Section: React.FC = () => (
  <VStack align="stretch" gap={6}>
    <SectionHeaderV2
      code="08 · Galería & Hoja de Contacto"
      title="Archivo Fotográfico en Firebase Storage"
      description="Hoja de contacto arquitectónica con las 6 obras reales (Palmer, Elenor, Vittorie, Ventura, Parque Prado y Maddy), optimizada entre variantes Web 1200 px y Mobile 600 px."
      spec="6 OBRAS REALES · WEBP OPTIMIZADO"
    />

    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline} bg={ARCH_SURFACE.graphite}>
      {MEDIA_PLATES.map((item) => (
        <Box
          key={item.code}
          gridColumn={item.isHero ? { base: "span 1", sm: "span 2", lg: "span 2" } : undefined}
          gridRow={item.isHero ? { lg: "span 2" } : undefined}
          border="1px solid"
          borderColor={ARCH_BORDER.hairline}
          display="flex"
          flexDirection="column"
        >
          <Box
            position="relative"
            h={item.isHero ? { base: "220px", lg: "360px" } : { base: "170px", lg: "160px" }}
            overflow="hidden"
            bg={ARCH_SURFACE.steel}
          >
            <Image src={item.src} alt={`${item.project} — ${item.district}`} w="full" h="full" objectFit="cover" objectPosition="top" loading="lazy" />
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
              <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onDarkPrimary} fontVariantNumeric="tabular-nums">
                {item.code} · {item.tag}
              </Text>
            </Box>
          </Box>

          <HStack
            justify="space-between"
            px={3.5}
            py={2.5}
            bg={ARCH_SURFACE.steel}
            borderTop="1px solid"
            borderColor={ARCH_BORDER.hairline}
          >
            <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onDarkPrimary}>
              {item.project} · {item.district}
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
              {item.coords}
            </Text>
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  </VStack>
);
