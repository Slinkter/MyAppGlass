"use client";

import React from "react";
import RouterLink from "next/link";
import {
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { companyData } from "@/shared/config/company-data";
import {
  ARCH_BORDER,
  ARCH_SURFACE,
  ARCH_TEXT,
} from "./components/architecturalTokens";
import { TabFadeV2 } from "./components/TabFadeV2";
import { TokensV2Section } from "./sections/TokensV2Section";
import { CardsV2Section } from "./sections/CardsV2Section";
import { NavV2Section } from "./sections/NavV2Section";
import { FormsV2Section } from "./sections/FormsV2Section";
import { OverlaysV2Section } from "./sections/OverlaysV2Section";
import { DataV2Section } from "./sections/DataV2Section";
import { StatusV2Section } from "./sections/StatusV2Section";
import { MediaV2Section } from "./sections/MediaV2Section";
import { MobileUxV2Section } from "./sections/MobileUxV2Section";
import { MotionV2Section } from "./sections/MotionV2Section";

const TABS = [
  { id: "tokens", code: "01", label: "Tokens y reglas" },
  { id: "cards", code: "02", label: "Tarjetas editoriales" },
  { id: "nav", code: "03", label: "Navegación y barras" },
  { id: "forms", code: "04", label: "Formularios y botones" },
  { id: "overlays", code: "05", label: "Modales y diálogos" },
  { id: "data", code: "06", label: "Tablas y fichas técnicas" },
  { id: "status", code: "07", label: "Estados y utilidades" },
  { id: "media", code: "08", label: "Galería e imágenes" },
  { id: "mobile-ux", code: "09", label: "UX móvil" },
  { id: "motion", code: "10", label: "Motion v2" },
] as const;

export default function DesignSystem2View() {
  return (
    <Box data-theme="dark" minH="dvh" bg={ARCH_SURFACE.graphite} color={ARCH_TEXT.onDarkPrimary} py={{ base: 6, md: 10 }}>
      <Container maxW="pageWide" px={{ base: 4, md: 6 }}>
        {/* Architectural Monograph Header (Exposed 1px Structural Grid) */}
        <Box border="1px solid" borderColor={ARCH_BORDER.hairline} bg={ARCH_SURFACE.steel} mb={{ base: 6, md: 8 }}>
          {/* Top Specification Datum Strip */}
          <HStack
            justify="space-between"
            px={{ base: 4, md: 6 }}
            py={2.5}
            borderBottom="1px solid"
            borderColor={ARCH_BORDER.hairline}
            flexWrap="wrap"
            gap={2}
          >
            <HStack gap={2.5}>
              <Box w="8px" h="8px" bg="brand.coral" flexShrink={0} />
              <Text
                fontFamily="mono"
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.16em"
                textTransform="uppercase"
                color={ARCH_TEXT.onDarkPrimary}
              >
                {companyData.razonSocial} · MANUAL ARQUITECTÓNICO V2
              </Text>
            </HStack>
            <Text
              fontFamily="mono"
              fontSize="xs"
              color={ARCH_TEXT.onDarkMuted}
              fontVariantNumeric="tabular-nums"
            >
              RUC {companyData.ruc} · 12°04&apos;48&quot;S 76°56&apos;52&quot;W · CHAKRA UI V3
            </Text>
          </HStack>

          <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0}>
            <VStack
              align="flex-start"
              gap={4}
              gridColumn={{ lg: "span 8" }}
              p={{ base: 5, md: 8 }}
              borderBottom={{ base: "1px solid", lg: "none" }}
              borderRight={{ lg: "1px solid" }}
              borderColor={ARCH_BORDER.hairline}
            >
              <Heading
                as="h1"
                fontFamily="heading"
                fontWeight="700"
                fontSize={{ base: "3xl", md: "5xl" }}
                lineHeight="1.0"
                letterSpacing="-0.03em"
                color={ARCH_TEXT.onDarkPrimary}
              >
                Sistema de Diseño{" "}
                <Box as="span" color="brand.coral">
                  v2
                </Box>
              </Heading>

              <Text color={ARCH_TEXT.onDarkMuted} fontSize={{ base: "sm", md: "md" }} maxW="2xl" lineHeight="1.6">
                Arquitectura web para constructoras, estudios de arquitectura y clientes en La Molina, Surco, San Borja,
                San Isidro y Miraflores. 90% superficies mate de alta precisión y 10% glassmorphism óptico sobre Chakra UI v3 y{" "}
                <code>Reveal</code>.
              </Text>
            </VStack>

            <VStack
              align="stretch"
              justify="space-between"
              gridColumn={{ lg: "span 4" }}
              p={{ base: 5, md: 8 }}
              bg={ARCH_SURFACE.graphite}
              gap={4}
            >
              <VStack align="flex-start" gap={1} fontFamily="mono" fontSize="xs" fontVariantNumeric="tabular-nums">
                <Text color={ARCH_TEXT.onDarkSubtle}>SEDE TALLER & SHOWROOM</Text>
                <Text color={ARCH_TEXT.onDarkPrimary} fontWeight="700">{companyData.direccion}</Text>
                <Text color={ARCH_TEXT.onDarkMuted}>TEL. {companyData.whatsappDisplay} · {companyData.contactEmail}</Text>
              </VStack>

              <Button asChild variant="outline" size="sm" minH="44px" alignSelf="flex-start">
                <RouterLink href="/design-system">
                  <ArrowLeft size={16} aria-hidden="true" />
                  Ver Design System v1
                </RouterLink>
              </Button>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* 10 Tabs equivalentes a /design-system */}
        <Tabs.Root
          defaultValue="tokens"
          variant="line"
          size={{ base: "sm", md: "lg" }}
          lazyMount
          unmountOnExit
          w="full"
          minW="0"
        >
          <Tabs.List
            aria-label="Secciones del sistema de diseño"
            mb={{ base: 6, md: 8 }}
            w="full"
            maxW="full"
            overflowX="auto"
            flexWrap="nowrap"
            borderBottom="1px solid"
            borderColor={ARCH_BORDER.hairline}
            bg={ARCH_SURFACE.steel}
            px={2}
            position="relative"
            css={{ "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}
          >
            {TABS.map((t) => (
              <Tabs.Trigger
                key={t.id}
                value={t.id}
                flexShrink={0}
                whiteSpace="nowrap"
                minH="44px"
                px={3.5}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.06em"
                color={ARCH_TEXT.onDarkMuted}
                _selected={{ color: ARCH_TEXT.onDarkPrimary }}
              >
                <Box as="span" color={ARCH_TEXT.onDarkSubtle} mr={1.5} fontVariantNumeric="tabular-nums">
                  {t.code}
                </Box>
                {t.label}
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator h="2px" bottom="0" top="auto" bg="brand.coral" />
          </Tabs.List>

          <Tabs.Content value="tokens"><TabFadeV2><TokensV2Section /></TabFadeV2></Tabs.Content>
          <Tabs.Content value="cards"><TabFadeV2><CardsV2Section /></TabFadeV2></Tabs.Content>
          <Tabs.Content value="nav"><TabFadeV2><NavV2Section /></TabFadeV2></Tabs.Content>
          <Tabs.Content value="forms"><TabFadeV2><FormsV2Section /></TabFadeV2></Tabs.Content>
          <Tabs.Content value="overlays"><TabFadeV2><OverlaysV2Section /></TabFadeV2></Tabs.Content>
          <Tabs.Content value="data"><TabFadeV2><DataV2Section /></TabFadeV2></Tabs.Content>
          <Tabs.Content value="status"><TabFadeV2><StatusV2Section /></TabFadeV2></Tabs.Content>
          <Tabs.Content value="media"><TabFadeV2><MediaV2Section /></TabFadeV2></Tabs.Content>
          <Tabs.Content value="mobile-ux"><TabFadeV2><MobileUxV2Section /></TabFadeV2></Tabs.Content>
          <Tabs.Content value="motion"><TabFadeV2><MotionV2Section /></TabFadeV2></Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  );
}
