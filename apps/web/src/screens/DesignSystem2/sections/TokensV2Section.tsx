"use client";

import React from "react";
import { Box, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import { ARCH_BORDER, ARCH_SURFACE, ARCH_TEXT, LIMA_TOP_DISTRICTS } from "../components/architecturalTokens";

const MATERIAL_SWATCHES = [
  {
    code: "MAT-01",
    name: "Grafito Profundo",
    token: "#0B0C0E",
    ratio: "55%",
    role: "Lienzo principal y fondos estructurales mate",
    bg: ARCH_SURFACE.graphite,
    lightText: true,
  },
  {
    code: "MAT-02",
    name: "Acero Anodizado",
    token: "#121417",
    ratio: "20%",
    role: "Cabezales, matrices de datos y paneles técnicos",
    bg: ARCH_SURFACE.steel,
    lightText: true,
  },
  {
    code: "MAT-03",
    name: "Concreto Claro",
    token: "#F3F2EE",
    ratio: "15%",
    role: "Monolitos de alto contraste y fichas de lectura",
    bg: ARCH_SURFACE.concrete,
    lightText: false,
  },
  {
    code: "OPT-10",
    name: "Vidrio Óptico",
    token: "rgba(11,12,14,0.72) · blur(16px)",
    ratio: "10%",
    role: "Solo en Pill Navbar, GlassSystemCard y Lightbox HUD",
    bg: "rgba(18, 20, 23, 0.72)",
    lightText: true,
    isOptical: true,
  },
  {
    code: "ACC-01",
    name: "Coral de Marca",
    token: "brand.coral (#FF5A5F)",
    ratio: "<1%",
    role: "Único acento oficial: índice activo y palabra de display",
    bg: "brand.coral",
    lightText: true,
  },
  {
    code: "ACT-WA",
    name: "WhatsApp Accesible",
    token: "brand.whatsappAccessible (#15803D)",
    ratio: "CTA",
    role: "Exclusivo para botón directo a WhatsApp (5.0:1)",
    bg: "brand.whatsappAccessible",
    lightText: true,
  },
] as const;

export const TokensV2Section: React.FC = () => (
  <VStack align="stretch" gap={6}>
    <SectionHeaderV2
      code="01 · Tokens & Arquitectura de Superficie"
      title="Proporción 90 / 10: Materia Mate & Óptica"
      description="Sistema inspirado en la escuela Bauhaus, Dieter Rams y grillas arquitectónicas holandesas: 90% superficies sólidas de grafito, acero y concreto con retícula de 1 px; 10% vidrio óptico calibrado."
      spec="RATIO 90:10 · HAIRLINE 1PX"
    />

    {/* Material Ratio Bar */}
    <Box bg={ARCH_SURFACE.steel} border="1px solid" borderColor={ARCH_BORDER.hairline} p={{ base: 4, md: 6 }}>
      <HStack justify="space-between" mb={3} flexWrap="wrap" gap={2}>
        <Text fontFamily="mono" fontSize="xs" letterSpacing="0.16em" textTransform="uppercase" color={ARCH_TEXT.onDarkPrimary}>
          DISTRIBUCIÓN ESTRICTA DE MATERIALES
        </Text>
        <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
          90% SÓLIDO ARQUITECTÓNICO · 10% VIDRIO ÓPTICO
        </Text>
      </HStack>

      <HStack gap={0} h="14px" w="full" border="1px solid" borderColor={ARCH_BORDER.hairlineStrong} overflow="hidden">
        <Box w="55%" h="full" bg={ARCH_SURFACE.graphite} title="55% Grafito Mate" />
        <Box w="20%" h="full" bg={ARCH_SURFACE.panel} borderLeft="1px solid" borderColor={ARCH_BORDER.hairline} title="20% Acero" />
        <Box w="15%" h="full" bg={ARCH_SURFACE.concrete} title="15% Concreto Claro" />
        <Box
          w="9%"
          h="full"
          bg="rgba(255, 255, 255, 0.22)"
          borderLeft="1px solid"
          borderColor={ARCH_BORDER.hairlineStrong}
          title="10% Vidrio Óptico"
        />
        <Box w="1%" minW="4px" h="full" bg="brand.coral" title="Acento Coral Único" />
      </HStack>
    </Box>

    {/* Color Specimen Matrix (1px hairline grid) */}
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3 }}
      gap={0}
      border="1px solid"
      borderColor={ARCH_BORDER.hairline}
      bg={ARCH_SURFACE.graphite}
    >
      {MATERIAL_SWATCHES.map((item, idx) => (
        <Box
          key={item.code}
          p={5}
          borderBottom="1px solid"
          borderRight={{ sm: idx % 2 === 0 ? "1px solid" : "none", lg: (idx + 1) % 3 !== 0 ? "1px solid" : "none" }}
          borderColor={ARCH_BORDER.hairline}
        >
          <HStack justify="space-between" mb={3} fontFamily="mono" fontSize="xs" fontVariantNumeric="tabular-nums">
            <Text color={ARCH_TEXT.onDarkMuted}>{item.code}</Text>
            <Text color={ARCH_TEXT.onDarkPrimary} fontWeight="700">
              {item.ratio}
            </Text>
          </HStack>

          <Box
            h="76px"
            bg={item.bg}
            backdropFilter={"isOptical" in item && item.isOptical ? "blur(16px)" : undefined}
            border="1px solid"
            borderColor={item.lightText ? ARCH_BORDER.hairlineStrong : ARCH_BORDER.concreteStrong}
            mb={4}
            p={3}
            display="flex"
            alignItems="flex-end"
          >
            <Text
              fontFamily="mono"
              fontSize="xs"
              fontWeight="700"
              color={
                item.code === "ACC-01"
                  ? ARCH_TEXT.onConcretePrimary
                  : item.code === "ACT-WA"
                    ? "#FFFFFF"
                    : item.lightText
                      ? ARCH_TEXT.onDarkPrimary
                      : ARCH_TEXT.onConcretePrimary
              }
              fontVariantNumeric="tabular-nums"
            >
              {item.token}
            </Text>
          </Box>

          <Text fontWeight="700" fontSize="sm" color={ARCH_TEXT.onDarkPrimary}>
            {item.name}
          </Text>
          <Text fontSize="xs" color={ARCH_TEXT.onDarkMuted} mt={1} lineHeight="1.5">
            {item.role}
          </Text>
        </Box>
      ))}
    </SimpleGrid>

    {/* Contrast Block: Concrete Light Monolith + Dark Graphite Engineering */}
    <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline}>
      {/* Concrete Light Contrast Block (7 cols) */}
      <Box
        gridColumn={{ lg: "span 7" }}
        bg={ARCH_SURFACE.concrete}
        color={ARCH_TEXT.onConcretePrimary}
        p={{ base: 5, md: 8 }}
        borderBottom={{ base: "1px solid", lg: "none" }}
        borderRight={{ lg: "1px solid" }}
        borderColor={ARCH_BORDER.concreteHairline}
      >
        <HStack justify="space-between" pb={3} mb={5} borderBottom="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
          <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onConcreteMuted}>
            ESCALA TIPOGRÁFICA · LORA 700 + MONOSPACE
          </Text>
          <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted} fontVariantNumeric="tabular-nums">
            CONCRETO #F3F2EE
          </Text>
        </HStack>

        <Heading
          fontFamily="heading"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="700"
          lineHeight="0.98"
          letterSpacing="-0.03em"
          mb={4}
          color={ARCH_TEXT.onConcretePrimary}
        >
          Precisión en vidrio y aluminio
        </Heading>

        <Text fontSize="sm" color={ARCH_TEXT.onConcreteMuted} lineHeight="1.65" maxW="xl" mb={6}>
          Tratamiento formal de <strong>usted</strong>, ortografía estricta (<strong>antirruido</strong> con doble r,{" "}
          <strong>vidrio y aluminio</strong> en singular) y cifras alineadas con{" "}
          <code>tabular-nums</code> junto a su unidad técnica (mm, m², dB, S/).
        </Text>

        <SimpleGrid columns={3} gap={0} border="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
          <Box p={3} borderRight="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted}>DISPLAY</Text>
            <Text fontFamily="mono" fontSize="sm" fontWeight="700" fontVariantNumeric="tabular-nums">60 px / 700</Text>
          </Box>
          <Box p={3} borderRight="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted}>TÁCTIL MÍN.</Text>
            <Text fontFamily="mono" fontSize="sm" fontWeight="700" fontVariantNumeric="tabular-nums">44 × 44 px</Text>
          </Box>
          <Box p={3}>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted}>VIEWPORT</Text>
            <Text fontFamily="mono" fontSize="sm" fontWeight="700" fontVariantNumeric="tabular-nums">100 dvh</Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Dark Graphite Telemetry Block (5 cols) */}
      <Box gridColumn={{ lg: "span 5" }} bg={ARCH_SURFACE.steel} p={{ base: 5, md: 8 }}>
        <HStack justify="space-between" pb={3} mb={5} borderBottom="1px solid" borderColor={ARCH_BORDER.hairline}>
          <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onDarkPrimary}>
            COBERTURA LIMA TOP
          </Text>
          <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
            05 DISTRITOS
          </Text>
        </HStack>

        <VStack align="stretch" gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline}>
          {LIMA_TOP_DISTRICTS.map((dist, idx) => (
            <HStack
              key={dist.name}
              justify="space-between"
              px={3.5}
              py={2.5}
              borderBottom={idx < LIMA_TOP_DISTRICTS.length - 1 ? "1px solid" : "none"}
              borderColor={ARCH_BORDER.hairline}
              fontFamily="mono"
              fontSize="xs"
              fontVariantNumeric="tabular-nums"
            >
              <Text fontWeight="700" color={ARCH_TEXT.onDarkPrimary}>{dist.name}</Text>
              <Text color={ARCH_TEXT.onDarkMuted}>{dist.coords}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </SimpleGrid>
  </VStack>
);
