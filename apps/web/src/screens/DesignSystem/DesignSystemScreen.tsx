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
import { Sparkles, MapPin } from "lucide-react";
import RouterLink from "next/link";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Button } from "@/components/ui/button";

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
import { ServiceCardV2Showcase } from "./sections/v2/ServiceCardV2Showcase";

export const DesignSystemScreen: React.FC = () => {
  return (
    <Box minH="100dvh" bg="bg.page" py={{ base: "4", md: "14" }}>
      <Container maxW="7xl" px={{ base: "0", sm: "2", md: "6" }}>
        {/* Header con alternador de tema */}
        <HStack justify="space-between" align="flex-start" wrap="wrap" gap={{ base: "4", md: "6" }} mb={{ base: "6", md: "10" }}>
          <VStack gap={{ base: "3", md: "4" }} align="flex-start" maxW="3xl">
            <HStack wrap="wrap" gap="2">
              <Badge colorPalette="gray" px="3" py="1" borderRadius="full">
                <Sparkles size={12} style={{ flexShrink: 0 }} />
                Aura Design System v2
              </Badge>
              <Badge variant="outline" colorPalette="gray" px="3" py="1" borderRadius="full">
                Chakra UI v3 · 360 / 768 / 1280
              </Badge>
            </HStack>
            <Heading as="h1" size={{ base: "2xl", md: "4xl" }} fontWeight="bold" letterSpacing="tight" color="text.heading">
              Aura Design System — Catálogo Canónico de Componentes
            </Heading>
            <Text color="text.muted" fontSize={{ base: "sm", md: "lg" }}>
              Showcase oficial con los componentes, modelos v2 y tokens reales de producción de <strong>Glass & Aluminum Company S.A.C.</strong> Optimizado para Móvil (360px), Tablet (768px) y Desktop (1280px) con áreas táctiles mínimas de 44×44 px.
            </Text>
          </VStack>

          <HStack gap="2" w={{ base: "full", md: "auto" }} justify={{ base: "space-between", sm: "flex-start", md: "flex-end" }}>
            <Button asChild variant="outline" size="sm" minH="11" px={{ base: "4", sm: "6" }} flex={{ base: "1", sm: "initial" }}>
              <RouterLink href="/design-system-ubicacion">
                <MapPin size={14} style={{ flexShrink: 0 }} />
                Prototipos Ubicación
              </RouterLink>
            </Button>
            <HStack px="1.5" py="0.5" bg="surface.container" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" minH="11" flexShrink={0}>
              <Text display={{ base: "none", sm: "block" }} fontSize="xs" fontWeight="medium" color="text.muted" pl="2" pr="1">Modo Claro / Oscuro:</Text>
              <ColorModeButton />
            </HStack>
          </HStack>
        </HStack>

        {/* Pestañas del Sistema */}
        <Tabs.Root defaultValue="v2" variant="line" size={{ base: "sm", md: "lg" }} lazyMount unmountOnExit>
          <Tabs.List
            mb={{ base: "5", md: "8" }}
            borderBottomWidth="1px"
            borderColor="border.default"
            overflowX="auto"
            flexWrap="nowrap"
            css={{ "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}
          >
            <Tabs.Trigger value="v2" flexShrink={0} whiteSpace="nowrap" minH="11" gap="1.5">
              <Sparkles size={14} style={{ flexShrink: 0 }} />
              Nuevos modelos v2
            </Tabs.Trigger>
            <Tabs.Trigger value="cards" flexShrink={0} whiteSpace="nowrap" minH="11">Cards Editoriales Reales</Tabs.Trigger>
            <Tabs.Trigger value="nav" flexShrink={0} whiteSpace="nowrap" minH="11">Navegación & Barras</Tabs.Trigger>
            <Tabs.Trigger value="forms" flexShrink={0} whiteSpace="nowrap" minH="11">Formularios & Botones</Tabs.Trigger>
            <Tabs.Trigger value="overlays" flexShrink={0} whiteSpace="nowrap" minH="11">Galería & Modales</Tabs.Trigger>
            <Tabs.Trigger value="data" flexShrink={0} whiteSpace="nowrap" minH="11">Tablas & Fichas Técnicas</Tabs.Trigger>
            <Tabs.Trigger value="tokens" flexShrink={0} whiteSpace="nowrap" minH="11">Tokens & Reglas Oficiales</Tabs.Trigger>
          </Tabs.List>

          {/* 1. Cards Editoriales */}
          <Tabs.Content value="cards">
            <EditorialCardsShowcase />
          </Tabs.Content>

          {/* 2. Barras de Navegación */}
          <Tabs.Content value="nav">
            <NavigationShowcase />
          </Tabs.Content>

          {/* 3. Formularios & Botones */}
          <Tabs.Content value="forms">
            <FormControlsShowcase />
          </Tabs.Content>

          {/* 4. Overlays & Multimedia */}
          <Tabs.Content value="overlays">
            <OverlaysShowcase />
          </Tabs.Content>

          {/* 5. Tablas & Fichas Técnicas */}
          <Tabs.Content value="data">
            <DataDisplayShowcase />
          </Tabs.Content>

          {/* 6. Tokens & Reglas Inmutables */}
          <Tabs.Content value="tokens">
            <TokensSection />
          </Tabs.Content>

          {/* 7. Nuevos modelos v2 (comparar con las pestañas anteriores) */}
          <Tabs.Content value="v2">
            <VStack align="stretch" gap={{ base: "8", md: "12" }}>
              <BrandModulesV2Showcase />
              <ViewportAndStatesV2Showcase />
              <ResponsiveScaleShowcase />
              <CardVariantsShowcase />
              <ServiceCardV2Showcase />
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  );
};
