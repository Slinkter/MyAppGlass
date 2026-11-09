"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Tabs,
} from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import RouterLink from "next/link";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Button } from "@/components/ui/button";
import { companyData } from "@/shared/config/company-data";

// Secciones del Sistema de Diseño
import { TokensSection } from "./sections/TokensSection";
import { NavigationShowcase } from "./sections/NavigationShowcase";
import { EditorialCardsShowcase } from "./sections/EditorialCardsShowcase";
import { FormControlsShowcase } from "./sections/FormControlsShowcase";
import { OverlaysShowcase } from "./sections/OverlaysShowcase";
import { DataDisplayShowcase } from "./sections/DataDisplayShowcase";
import { ResponsiveScaleShowcase } from "./sections/v2/ResponsiveScaleShowcase";
import { CardVariantsShowcase } from "./sections/v2/CardVariantsShowcase";
import { BrandModulesV2Showcase } from "./sections/v2/BrandModulesV2Showcase";
import { ViewportAndStatesV2Showcase } from "./sections/v2/ViewportAndStatesV2Showcase";
import { MobileNavV2Showcase } from "./sections/v2/MobileNavV2Showcase";
import { TransitionsV2Showcase } from "./sections/v2/TransitionsV2Showcase";
import { GalleryShowcase } from "./sections/GalleryShowcase";
import { ImageRevealShowcase } from "./sections/ImageRevealShowcase";
import { ComponentsExtraShowcase } from "./sections/ComponentsExtraShowcase";
import { ScrollPatternsShowcase } from "./sections/v2/ScrollPatternsShowcase";

export const DesignSystemScreen: React.FC = () => {
  return (
    <Box minH="dvh" bg="bg.page" py={{ base: "4", md: "14" }}>
      <Container maxW="pageWide" px={{ base: "4", md: "6" }}>
        {/* Header con alternador de tema */}
        <HStack justify="space-between" align="flex-start" wrap="wrap" gap={{ base: "4", md: "6" }} mb={{ base: "6", md: "10" }}>
          <VStack gap={{ base: "3", md: "4" }} align="flex-start" maxW="3xl">
            <HStack wrap="wrap" gap="2">
              <Badge variant={"inkSolid" as never}>Sistema de diseño</Badge>
              <Badge variant={"neutral" as never}>
                Chakra UI v3 · 360 / 768 / 1280
              </Badge>
            </HStack>
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="display" letterSpacing="display" color="text.heading">
              Sistema de diseño: catálogo de componentes
            </Heading>
            <Text color="text.muted" fontSize={{ base: "sm", md: "lg" }}>
              Componentes y tokens reales del sitio de <strong>{companyData.razonSocial}</strong>: fondo blanco, negro de marca y Lora 700 para títulos. Se revisa en 360, 768 y 1280 px, con áreas táctiles mínimas de 44 px.
            </Text>
          </VStack>

          <HStack gap="2" w={{ base: "full", md: "auto" }} justify={{ base: "space-between", sm: "flex-start", md: "flex-end" }}>
            <Button asChild variant="outline" size="sm" minH="11" flex={{ base: "1", sm: "initial" }}>
              <RouterLink href="/design-system-ubicacion">
                <MapPin size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                Prototipos de ubicación
              </RouterLink>
            </Button>
            <HStack px="1.5" py="0.5" bg="surface.container" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" minH="11" flexShrink={0}>
              <Text display={{ base: "none", sm: "block" }} fontSize="xs" fontWeight="medium" color="text.muted" pl="2" pr="1">Modo Claro / Oscuro:</Text>
              <ColorModeButton />
            </HStack>
          </HStack>
        </HStack>

        {/* Pestañas del Sistema */}
        <Tabs.Root defaultValue="tokens" variant="line" size={{ base: "sm", md: "lg" }} lazyMount unmountOnExit w="full" minW="0">
          <Tabs.List
            mb={{ base: "5", md: "8" }}
            w="full"
            maxW="full"
            overflowX="auto"
            flexWrap="nowrap"
            css={{ "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}
          >
            <Tabs.Trigger value="tokens" flexShrink={0} whiteSpace="nowrap" minH="11">Tokens y reglas</Tabs.Trigger>
            <Tabs.Trigger value="cards" flexShrink={0} whiteSpace="nowrap" minH="11">Tarjetas editoriales</Tabs.Trigger>
            <Tabs.Trigger value="nav" flexShrink={0} whiteSpace="nowrap" minH="11">Navegación y barras</Tabs.Trigger>
            <Tabs.Trigger value="forms" flexShrink={0} whiteSpace="nowrap" minH="11">Formularios y botones</Tabs.Trigger>
            <Tabs.Trigger value="overlays" flexShrink={0} whiteSpace="nowrap" minH="11">Modales y diálogos</Tabs.Trigger>
            <Tabs.Trigger value="data" flexShrink={0} whiteSpace="nowrap" minH="11">Tablas y fichas técnicas</Tabs.Trigger>
            <Tabs.Trigger value="status" flexShrink={0} whiteSpace="nowrap" minH="11">Estados y utilidades</Tabs.Trigger>
            <Tabs.Trigger value="media" flexShrink={0} whiteSpace="nowrap" minH="11">Galería e imágenes</Tabs.Trigger>
            <Tabs.Trigger value="v2" flexShrink={0} whiteSpace="nowrap" minH="11">Modelos v2</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>

          {/* 1. Tarjetas editoriales */}
          <Tabs.Content value="cards">
            <EditorialCardsShowcase />
          </Tabs.Content>

          {/* 2. Navegación */}
          <Tabs.Content value="nav">
            <NavigationShowcase />
          </Tabs.Content>

          {/* 3. Formularios y botones */}
          <Tabs.Content value="forms">
            <FormControlsShowcase />
          </Tabs.Content>

          {/* 4. Modales y diálogos */}
          <Tabs.Content value="overlays">
            <OverlaysShowcase />
          </Tabs.Content>

          {/* 5. Tablas y fichas técnicas */}
          <Tabs.Content value="data">
            <DataDisplayShowcase />
          </Tabs.Content>

          {/* 6. Tokens y reglas */}
          <Tabs.Content value="tokens">
            <TokensSection />
          </Tabs.Content>

          {/* 7. Estados, MediaCard y utilidades */}
          <Tabs.Content value="status">
            <ComponentsExtraShowcase />
          </Tabs.Content>

          {/* 8. Galería e imágenes */}
          <Tabs.Content value="media">
            <VStack align="stretch" gap={{ base: "8", md: "12" }}>
              <GalleryShowcase />
              <ImageRevealShowcase />
            </VStack>
          </Tabs.Content>

          {/* 7. Modelos v2 */}
          <Tabs.Content value="v2">
            <VStack align="stretch" gap={{ base: "8", md: "12" }}>
              <MobileNavV2Showcase />
              <BrandModulesV2Showcase />
              <ViewportAndStatesV2Showcase />
              <ResponsiveScaleShowcase />
              <CardVariantsShowcase />
              <ScrollPatternsShowcase />
              <TransitionsV2Showcase />
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  );
};
