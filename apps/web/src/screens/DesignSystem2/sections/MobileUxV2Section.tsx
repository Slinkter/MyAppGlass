"use client";

import React, { useState } from "react";
import { Box, Heading, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Image as PhotoIcon, Map as MapIcon, MapPin } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { companyData } from "@/shared/config/company-data";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import {
  ARCH_BORDER,
  ARCH_SURFACE,
  ARCH_TEXT,
  FIREBASE_PROJECTS,
  LIMA_TOP_DISTRICTS,
} from "../components/architecturalTokens";

export const MobileUxV2Section: React.FC = () => {
  const [tab, setTab] = useState<"gallery" | "map">("gallery");
  const [selectedDistrict, setSelectedDistrict] = useState(0);

  const activeDistrict = LIMA_TOP_DISTRICTS[selectedDistrict] ?? LIMA_TOP_DISTRICTS[0];

  return (
    <VStack align="stretch" gap={6}>
      <SectionHeaderV2
        code="09 · UX Móvil Calibrada (360px)"
        title="Viewport 360 px & Targets Táctiles ≥ 44 px"
        description="El mayor volumen de cotizaciones llega desde WhatsApp en pantallas de 360 px. Controles de conmutación Galería / Ubicación con área táctil mínima de 44 px y variantes mobile (600 px)."
        spec="BREAKPOINTS: 360 / 768 / 1280"
      />

      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline}>
        {/* Left: 360px Device Chassis */}
        <Box
          gridColumn={{ lg: "span 6" }}
          p={{ base: 4, md: 8 }}
          bg={ARCH_SURFACE.graphite}
          borderBottom={{ base: "1px solid", lg: "none" }}
          borderRight={{ lg: "1px solid" }}
          borderColor={ARCH_BORDER.hairline}
        >
          <Box
            maxW="360px"
            mx="auto"
            w="full"
            bg={ARCH_SURFACE.steel}
            border="1px solid"
            borderColor={ARCH_BORDER.hairlineStrong}
          >
            {/* Device Telemetry Header */}
            <HStack
              justify="space-between"
              px={4}
              py={2.5}
              borderBottom="1px solid"
              borderColor={ARCH_BORDER.hairline}
              fontFamily="mono"
              fontSize="xs"
              color={ARCH_TEXT.onDarkMuted}
              fontVariantNumeric="tabular-nums"
            >
              <Text>VIEWPORT · 360PX</Text>
              <Text color="brand.coral">MINH 44PX</Text>
            </HStack>

            <Box p={4}>
              {/* Segmented Toggle */}
              <HStack
                gap={1}
                mb={4}
                p={1}
                bg={ARCH_SURFACE.graphite}
                border="1px solid"
                borderColor={ARCH_BORDER.hairline}
              >
                <Button
                  size="sm"
                  minH="44px"
                  flex="1"
                  borderRadius="xs"
                  variant={tab === "gallery" ? "primary" : "ghost"}
                  aria-pressed={tab === "gallery"}
                  onClick={() => setTab("gallery")}
                >
                  <PhotoIcon size={15} aria-hidden="true" /> Galería
                </Button>
                <Button
                  size="sm"
                  minH="44px"
                  flex="1"
                  borderRadius="xs"
                  variant={tab === "map" ? "primary" : "ghost"}
                  aria-pressed={tab === "map"}
                  onClick={() => setTab("map")}
                >
                  <MapIcon size={15} aria-hidden="true" /> Ubicación
                </Button>
              </HStack>

              {tab === "gallery" ? (
                <Box border="1px solid" borderColor={ARCH_BORDER.hairline} bg={ARCH_SURFACE.graphite}>
                  <Box aspectRatio="4 / 3" overflow="hidden">
                    <Image
                      src={FIREBASE_PROJECTS.palmer.mobileImage}
                      alt="Obra Palmer — variante móvil 600px"
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                  <HStack justify="space-between" px={3} py={2.5} borderTop="1px solid" borderColor={ARCH_BORDER.hairline}>
                    <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onDarkPrimary}>
                      PALMER · LA MOLINA
                    </Text>
                    <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
                      600PX WEBP
                    </Text>
                  </HStack>
                </Box>
              ) : (
                <Box border="1px solid" borderColor={ARCH_BORDER.hairline} bg={ARCH_SURFACE.graphite} p={4}>
                  <HStack gap={2} color="brand.coral" mb={2}>
                    <MapPin size={15} aria-hidden="true" />
                    <Text fontFamily="mono" fontSize="xs" fontWeight="700" fontVariantNumeric="tabular-nums">
                      {activeDistrict.coords}
                    </Text>
                  </HStack>
                  <Text fontFamily="heading" fontWeight="700" fontSize="lg" color={ARCH_TEXT.onDarkPrimary}>
                    {activeDistrict.name}
                  </Text>
                  <Text fontSize="xs" color={ARCH_TEXT.onDarkMuted} mt={1} mb={4}>
                    {activeDistrict.scope} · Sede: {companyData.direccion}
                  </Text>
                  <HStack gap={1.5} flexWrap="wrap">
                    {LIMA_TOP_DISTRICTS.map((d, idx) => (
                      <Button
                        key={d.name}
                        size="xs"
                        minH="44px"
                        variant={selectedDistrict === idx ? "primary" : "outline"}
                        onClick={() => setSelectedDistrict(idx)}
                      >
                        {d.name}
                      </Button>
                    ))}
                  </HStack>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Right: Concrete Breakpoint Spec Sheet */}
        <Box
          gridColumn={{ lg: "span 6" }}
          p={{ base: 5, md: 8 }}
          bg={ARCH_SURFACE.concrete}
          color={ARCH_TEXT.onConcretePrimary}
        >
          <HStack justify="space-between" pb={3} mb={5} borderBottom="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
            <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onConcreteMuted}>
              REGLAS DE INGENIERÍA RESPONSIVE
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted} fontVariantNumeric="tabular-nums">
              MOBILE-FIRST
            </Text>
          </HStack>

          <Heading fontFamily="heading" size="xl" mb={4}>
            Estándar de Tres Cortes
          </Heading>

          <VStack align="stretch" gap={0} border="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
            {[
              { bp: "360 px", rule: "Gutter 24 px · 1 columna · Imagen mobile/ 600 px · Targets ≥ 44 px" },
              { bp: "768 px", rule: "Gutter 56 px · Retícula 2 columnas · Barra superior adaptativa" },
              { bp: "1280 px", rule: "Grilla completa 12 columnas · Imagen web/ 1200 px · Alturas en dvh" },
            ].map((row, idx) => (
              <HStack
                key={row.bp}
                align="flex-start"
                justify="space-between"
                p={4}
                gap={4}
                borderBottom={idx < 2 ? "1px solid" : "none"}
                borderColor={ARCH_BORDER.concreteHairline}
              >
                <Text fontFamily="mono" fontSize="sm" fontWeight="700" flexShrink={0} fontVariantNumeric="tabular-nums">
                  {row.bp}
                </Text>
                <Text fontSize="xs" color={ARCH_TEXT.onConcreteMuted} lineHeight="1.5">
                  {row.rule}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};
