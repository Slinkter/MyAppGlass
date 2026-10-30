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
import { Sparkles } from "lucide-react";
import { ColorModeButton } from "@/components/ui/color-mode";

// Secciones del Sistema de Diseño
import { TokensSection } from "./sections/TokensSection";
import { NavigationShowcase } from "./sections/NavigationShowcase";
import { EditorialCardsShowcase } from "./sections/EditorialCardsShowcase";
import { FormControlsShowcase } from "./sections/FormControlsShowcase";
import { OverlaysShowcase } from "./sections/OverlaysShowcase";
import { DataDisplayShowcase } from "./sections/DataDisplayShowcase";

export const DesignSystemScreen: React.FC = () => {
  return (
    <Box minH="100vh" bg="bg.page" py={{ base: "8", md: "16" }}>
      <Container maxW="7xl">
        {/* Header con alternador de tema */}
        <HStack justify="space-between" align="flex-start" wrap="wrap" gap="6" mb="12">
          <VStack gap="4" align="flex-start" maxW="3xl">
            <HStack gap="2">
              <Badge colorPalette="purple" px="3" py="1" borderRadius="full">
                <Sparkles size={12} style={{ flexShrink: 0 }} />
                Aura Design System
              </Badge>
              <Badge variant="outline" colorPalette="gray" px="3" py="1" borderRadius="full">
                Chakra UI v3 Oficial
              </Badge>
            </HStack>
            <Heading as="h1" size={{ base: "3xl", md: "4xl" }} fontWeight="bold" letterSpacing="tight" color="text.heading">
              Aura Design System — Catálogo Canónico de Componentes
            </Heading>
            <Text color="text.muted" fontSize="lg">
              Showcase oficial con los componentes y tokens reales de producción de <strong>Glass & Aluminum Company S.A.C.</strong> Todos los elementos utilizan arquitectura de tokens de Chakra UI v3 sin estilos hardcodeados.
            </Text>
          </VStack>

          <HStack p="2" bg="surface.container" borderWidth="1px" borderColor="border.subtle" borderRadius="xl">
            <Text fontSize="xs" fontWeight="medium" color="text.muted" px="2">Modo Claro / Oscuro:</Text>
            <ColorModeButton />
          </HStack>
        </HStack>

        {/* Pestañas del Sistema */}
        <Tabs.Root defaultValue="cards" variant="line" size="lg">
          <Tabs.List mb="8" borderBottomWidth="1px" borderColor="border.default" overflowX="auto">
            <Tabs.Trigger value="cards">Cards Editoriales Reales</Tabs.Trigger>
            <Tabs.Trigger value="nav">Navegación & Barras</Tabs.Trigger>
            <Tabs.Trigger value="forms">Formularios & Botones</Tabs.Trigger>
            <Tabs.Trigger value="overlays">Galería & Modales</Tabs.Trigger>
            <Tabs.Trigger value="data">Tablas & Fichas Técnicas</Tabs.Trigger>
            <Tabs.Trigger value="tokens">Tokens & Reglas Oficiales</Tabs.Trigger>
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
        </Tabs.Root>
      </Container>
    </Box>
  );
};
