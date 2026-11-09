"use client";

import React from "react";
import { Badge, Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Building2, Layers, Ruler, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ShowcaseCard,
  ShowcaseStack,
  SubsectionLabel,
} from "../../components";

/* Datos de ejemplo (solo sistemas oficiales) */
const COMPACT_ITEMS = [
  {
    id: "c1",
    title: "Mampara de baño templada",
    detail: "Templado · Incoloro",
    icon: Layers,
  },
  {
    id: "c2",
    title: "Ventana Serie 35 Corrediza",
    detail: "Aluminio · Negro",
    icon: Ruler,
  },
  {
    id: "c3",
    title: "Fachada de vidrio laminado",
    detail: "Laminado · Gris",
    icon: Building2,
  },
] as const;

const HORIZONTAL_ITEMS = [
  {
    id: "h1",
    badge: "Serie 25",
    title: "Ventana Serie 25 Batiente",
    description:
      "Aislamiento antirruido y térmico con perfiles de aluminio de alta hermeticidad.",
  },
  {
    id: "h2",
    badge: "Sistema Nova",
    title: "Mampara de ducha Sistema Nova",
    description:
      "Apertura corrediza con vidrio templado y herrajes de acabado mate.",
  },
  {
    id: "h3",
    badge: "Serie 62",
    title: "Puerta de vidrio Serie 62",
    description:
      "Perfilería de aluminio champagne con vidrio laminado para uso residencial y comercial.",
  },
] as const;

const FEATURED_ITEMS = [
  {
    id: "f1",
    system: "Serie 35",
    badge: "Serie 35",
    title: "Fachada de vidrio laminado",
    description:
      "Muro cortina con vidrio laminado y aluminio anodizado para proyectos corporativos.",
  },
  {
    id: "f2",
    system: "Sistema Nova",
    badge: "Sistema Nova",
    title: "Ventanas de vidrio y aluminio",
    description:
      "Solución integral de vidrio y aluminio con sellado de alta hermeticidad.",
  },
  {
    id: "f3",
    system: "Serie 62",
    badge: "Serie 62",
    title: "Ventana corrediza de aluminio blanco",
    description:
      "Sistema de gran formato con vidrio templado y aislamiento acústico.",
  },
] as const;

/* Estilos compartidos de interacción (máx. 2 propiedades de transición) */
const interactiveFocus = {
  outline: "2px solid",
  outlineColor: "primary.500",
  outlineOffset: "2px",
} as const;

export const CardVariantsShowcase: React.FC = () => {
  return (
    <ShowcaseStack>
      {/* 1. Compacta */}
      <Box minW="0" maxW="100%">
        <ShowcaseCard
          title="Tarjeta compacta"
          description="Fila de una línea para listas móviles. Alto mínimo de 44px para toque."
          badge="v2 · compacta"
        >
          <SubsectionLabel mb="2">Lista compacta</SubsectionLabel>
          <Flex direction="column" gap="2">
            {COMPACT_ITEMS.map(({ id, title, detail, icon: Icon }) => (
              <Box
                as="button"
                key={id}
                display="flex"
                alignItems="center"
                gap="3"
                w="100%"
                minH="11"
                px="3"
                py="2"
                textAlign="left"
                bg="bg.subtle"
                border="1px solid"
                borderColor="border.default"
                borderRadius="xl"
                transition="border-color 0.2s ease, background-color 0.2s ease"
                transform="translateZ(0)"
                _hover={{ borderColor: "text.muted" }}
                _focusVisible={interactiveFocus}
              >
                <Flex
                  align="center"
                  justify="center"
                  boxSize="8"
                  borderRadius="lg"
                  bg="bg.surface"
                  flexShrink={0}
                >
                  <Icon size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
                </Flex>
                <Box flex="1" minW="0">
                  <Text fontSize="sm" fontWeight="semibold" lineClamp={1}>
                    {title}
                  </Text>
                  <Text fontSize="xs" color="text.muted" lineClamp={1}>
                    {detail}
                  </Text>
                </Box>
                <ChevronRight size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
              </Box>
            ))}
          </Flex>
        </ShowcaseCard>
      </Box>

      {/* 2. Horizontal */}
      <Box minW="0" maxW="100%">
        <ShowcaseCard
          title="Tarjeta horizontal"
          description="Miniatura adaptable (superior en móvil 360px / lateral en escritorio), descripción y botón de cotización."
          badge="v2 · horizontal"
        >
          <SubsectionLabel mb="2">Catálogo horizontal</SubsectionLabel>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }}
            gap={{ base: "3", md: "4" }}
          >
            {HORIZONTAL_ITEMS.map((it) => (
              <Stack
                key={it.id}
                direction={{ base: "column", sm: "row" }}
                align="stretch"
                gap="0"
                bg="bg.subtle"
                border="1px solid"
                borderColor="border.default"
                borderRadius="xl"
                overflow="hidden"
                transition="border-color 0.2s ease, box-shadow 0.2s ease"
                transform="translateZ(0)"
                _hover={{ borderColor: "text.muted" }}
                minW="0"
              >
                <Box
                  w={{ base: "full", sm: "140px" }}
                  h={{ base: "120px", sm: "auto" }}
                  minH={{ sm: "132px" }}
                  flexShrink={0}
                  bg="bg.tintNavy"
                  borderBottomWidth={{ base: "1px", sm: "0" }}
                  borderRightWidth={{ base: "0", sm: "1px" }}
                  borderColor="border.subtle"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p="3"
                  textAlign="center"
                >
                  <Text fontSize="xs" fontWeight="semibold" color="accent.navy">
                    Vista técnica · {it.badge}
                  </Text>
                </Box>
                <Flex direction="column" gap="2" p={{ base: "3", md: "4" }} flex="1" minW="0" justify="space-between">
                  <Box minW="0">
                    <Text fontSize="sm" fontWeight="semibold" lineClamp={1}>
                      {it.title}
                    </Text>
                    <Text fontSize="sm" color="text.body" lineClamp={2}>
                      {it.description}
                    </Text>
                  </Box>
                  <Box>
                    <Button variant="primary" size="sm" minH="11" px="4">
                      Cotizar
                    </Button>
                  </Box>
                </Flex>
              </Stack>
            ))}
          </Grid>
        </ShowcaseCard>
      </Box>

      {/* 3. Destacada */}
      <Box minW="0" maxW="100%">
        <ShowcaseCard
          title="Tarjeta destacada"
          description="Imagen superior 16/9 con fondo arquitectónico plano, etiqueta de sistema y acción secundaria."
          badge="v2 · destacada"
        >
          <SubsectionLabel mb="2">Proyectos destacados</SubsectionLabel>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }}
            gap={{ base: "4", md: "6" }}
          >
            {FEATURED_ITEMS.map((it) => (
              <Flex
                key={it.id}
                direction="column"
                minW="0"
                overflow="hidden"
                bg="bg.surface"
                border="1px solid"
                borderColor="border.default"
                borderRadius="xl"
                transition="border-color 0.2s ease, box-shadow 0.2s ease"
                transform="translateZ(0)"
                _hover={{ borderColor: "text.muted" }}
              >
                <Box
                  position="relative"
                  w="100%"
                  aspectRatio="16 / 9"
                  bg="bg.tintNavy"
                  borderBottomWidth="1px"
                  borderColor="border.warm"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p="4"
                  textAlign="center"
                >
                  <Badge
                    position="absolute"
                    top="3"
                    left="3"
                    colorPalette="gray"
                    variant="solid"
                    px="3"
                    py="1"
                    borderRadius="full"
                  >
                    {it.system}
                  </Badge>
                  <Text fontSize="xs" fontWeight="semibold" color="accent.navy">
                    Vista técnica · {it.badge}
                  </Text>
                </Box>
                <Flex direction="column" gap="2" p={{ base: "4", md: "6" }} flex="1">
                  <Heading as="h3" size="sm" lineClamp={2}>
                    {it.title}
                  </Heading>
                  <Text fontSize="sm" color="text.body" lineClamp={3}>
                    {it.description}
                  </Text>
                  <Box mt="auto" pt="2">
                    <Button
                      variant="outline"
                      minH="11"
                      w={{ base: "100%", sm: "auto" }}
                      _focusVisible={interactiveFocus}
                    >
                      Ver detalles
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            ))}
          </Grid>
        </ShowcaseCard>
      </Box>
    </ShowcaseStack>
  );
};
