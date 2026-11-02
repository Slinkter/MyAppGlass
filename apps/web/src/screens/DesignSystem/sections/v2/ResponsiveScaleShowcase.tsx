"use client";

import React from "react";
import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  ShowcaseCard,
  ShowcasePanel,
  ShowcaseStack,
  SubsectionLabel,
} from "../../components";

const MODES = [
  {
    name: "Móvil",
    bp: "base · <768px",
    cardPad: "4",
    subPad: "3",
    columns: "1",
    touch: "44px",
  },
  {
    name: "Tablet",
    bp: "md · ≥768px",
    cardPad: "6",
    subPad: "5",
    columns: "2 (sm ≥480px)",
    touch: "44px",
  },
  {
    name: "Escritorio",
    bp: "lg · ≥1024px",
    cardPad: "6",
    subPad: "5",
    columns: "3",
    touch: "44px",
  },
] as const;

const SPACE_TOKENS = [
  "space.1",
  "space.2",
  "space.3",
  "space.4",
  "space.6",
  "space.8",
  "space.12",
  "space.16",
] as const;

const DEMO_ITEMS = [1, 2, 3, 4, 5, 6];

export const ResponsiveScaleShowcase: React.FC = () => {
  return (
    <ShowcaseStack>
      {/* 1. Modos de diseño */}
      <ShowcaseCard
        title="Modos de diseño responsive"
        description="Valores mobile-first: el valor base aplica desde 0 y md/lg lo sobrescriben al crecer el viewport."
        badge="Breakpoints"
      >
        <ShowcasePanel p={{ base: "3", md: "5" }} borderRadius="xl" minW="0">
          <Box maxW="100%" overflowX="auto">
            <Box minW="520px">
              <Grid
                templateColumns="1.4fr 1fr 1fr 1fr 1fr"
                gap="3"
                pb="2"
                borderBottomWidth="1px"
                borderColor="border.default"
              >
                <SubsectionLabel>Modo</SubsectionLabel>
                <SubsectionLabel>Card p</SubsectionLabel>
                <SubsectionLabel>Sub-panel p</SubsectionLabel>
                <SubsectionLabel>Columnas</SubsectionLabel>
                <SubsectionLabel>Táctil minH</SubsectionLabel>
              </Grid>
              {MODES.map((mode) => (
                <Grid
                  key={mode.name}
                  templateColumns="1.4fr 1fr 1fr 1fr 1fr"
                  gap="3"
                  py="3"
                  alignItems="center"
                  borderBottomWidth="1px"
                  borderColor="border.subtle"
                >
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="text.heading">
                      {mode.name}
                    </Text>
                    <Text fontSize="xs" color="text.muted">
                      {mode.bp}
                    </Text>
                  </Box>
                  <Text fontSize="sm" color="text.heading">
                    {mode.cardPad}
                  </Text>
                  <Text fontSize="sm" color="text.heading">
                    {mode.subPad}
                  </Text>
                  <Text fontSize="sm" color="text.heading">
                    {mode.columns}
                  </Text>
                  <Text fontSize="sm" color="text.heading">
                    {mode.touch} (minH=&quot;11&quot;)
                  </Text>
                </Grid>
              ))}
            </Box>
          </Box>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* 2. Escala de espaciado */}
      <ShowcaseCard
        title="Escala de espaciado (space.*)"
        description="Tokens nativos de Chakra v3. Cada barra tiene el ancho exacto del token."
        badge="Tokens"
      >
        <ShowcasePanel p={{ base: "3", md: "5" }} borderRadius="xl" minW="0">
          <VStack align="stretch" gap="3">
            {SPACE_TOKENS.map((token) => (
              <HStack key={token} gap="3" align="center" minW="0">
                <Text
                  fontSize="xs"
                  color="text.muted"
                  minW="72px"
                  flexShrink={0}
                  fontFamily="mono"
                >
                  {token}
                </Text>
                <Box
                  h="3"
                  w={token}
                  minW="space.1"
                  bg="accent.solid"
                  borderRadius="sm"
                  flexShrink={0}
                  style={{ flexShrink: 0 }}
                />
                <Text fontSize="xs" color="text.muted" whiteSpace="nowrap">
                  {token}
                </Text>
              </HStack>
            ))}
          </VStack>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* 3. Demo de grid responsive */}
      <ShowcaseCard
        title="Grid responsive { base: 1, sm: 2, lg: 3 }"
        description="Las tarjetas pasan de 1 columna a 2 desde sm y a 3 desde lg."
        badge="Grid"
      >
        <ShowcasePanel p={{ base: "3", md: "5" }} borderRadius="xl" minW="0">
          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }}
            gap={{ base: "3", md: "4" }}
          >
            {DEMO_ITEMS.map((n) => (
              <Box
                key={n}
                p={{ base: "3", md: "5" }}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="border.default"
                bg="bg.surface"
                minW="0"
              >
                <Text fontSize="sm" fontWeight="semibold" color="text.heading">
                  Tarjeta {n}
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Sub-panel p 3 / 5
                </Text>
              </Box>
            ))}
          </Grid>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* 4. Objetivo táctil */}
      <ShowcaseCard
        title="Objetivo táctil"
        description="Compara un control de 44px con uno de 28px. Según accessibility.md de Apple, 44 pt es el tamaño por defecto recomendado en iOS/iPadOS y 28 pt el mínimo absoluto."
        badge="Accesibilidad"
      >
        <ShowcasePanel p={{ base: "3", md: "5" }} borderRadius="xl" minW="0">
          <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="4">
            <VStack align="stretch" gap="2">
              <SubsectionLabel>Mínimo recomendado · 44px</SubsectionLabel>
              <Button variant="outline" minH="11" minW="11" w="full">
                Ver proyectos
              </Button>
              <Text fontSize="xs" color="text.muted">
                minH=&quot;11&quot; (44px). Ideal para acciones principales en móvil.
              </Text>
            </VStack>
            <VStack align="stretch" gap="2">
              <SubsectionLabel>Mínimo absoluto · 28px</SubsectionLabel>
              <Button variant="ghost" h="28px" minW="28px" px="2" w="full" fontSize="xs">
                Ver más
              </Button>
              <Text fontSize="xs" color="text.muted">
                28px solo como último recurso; deja más separación alrededor.
              </Text>
            </VStack>
          </Grid>
        </ShowcasePanel>
      </ShowcaseCard>
    </ShowcaseStack>
  );
};
