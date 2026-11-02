"use client";

import React from "react";
import NextLink from "next/link";
import { Badge, Box, Container, Heading, HStack, List, Tabs, Text, VStack } from "@chakra-ui/react";
import { ArrowLeft, MapPinned } from "lucide-react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { PrototypeSplit } from "./prototypes/PrototypeSplit";
import { PrototypeImmersive } from "./prototypes/PrototypeImmersive";
import { PrototypeSedeFirst } from "./prototypes/PrototypeSedeFirst";
import { PrototypeFilters } from "./prototypes/PrototypeFilters";

interface PrototypeFrameProps {
  title: string;
  description: string;
  highlights: string[];
  children: React.ReactNode;
}

/** Marco de cada prototipo: qué resuelve y cómo se comporta en cada dispositivo. */
const PrototypeFrame: React.FC<PrototypeFrameProps> = ({ title, description, highlights, children }) => (
  <VStack align="stretch" gap={{ base: "4", md: "6" }}>
    <Box
      p={{ base: "4", md: "6" }}
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="card"
    >
      <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} color="text.heading">
        {title}
      </Heading>
      <Text color="text.muted" fontSize="sm" mt="1">
        {description}
      </Text>
      <List.Root mt="3" gap="1" ps="4" color="text.muted" fontSize="sm">
        {highlights.map((item) => (
          <List.Item key={item}>{item}</List.Item>
        ))}
      </List.Root>
    </Box>
    {children}
  </VStack>
);

const PROTOTYPES = [
  {
    value: "split",
    label: "A · Mapa + lista",
    title: "A · Mapa + lista sincronizada",
    description: "El mapa y la lista de obras se mueven juntos: tocar uno resalta el otro.",
    highlights: [
      "Escritorio y tablet: lista a la izquierda, mapa a la derecha.",
      "Móvil: mapa arriba y lista debajo, con la sede fija como primer elemento.",
    ],
    Component: PrototypeSplit,
  },
  {
    value: "immersive",
    label: "B · Inmersivo Minimalista ★",
    title: "B · Mapa inmersivo minimalista (Lente de Cristal y Aluminio)",
    description:
      "El mapa respira como protagonista (más del 80 % libre). Superficies esmeriladas de perfil fino y dock inferior compacto.",
    highlights: [
      "Móvil: cápsula superior de 1 línea y dock horizontal compacto (sin bloquear el mapa).",
      "Tablet y escritorio: ficha arquitectónica con horario en vivo, galería de fotos al seleccionar obra y retorno rápido a la sede.",
    ],
    Component: PrototypeImmersive,
  },
  {
    value: "sede",
    label: "C · Sede primero",
    title: "C · Sede primero",
    description: "Primero la empresa (horarios, dirección, contacto) y después las obras entregadas.",
    highlights: [
      "Tarjeta de la sede con «Cómo llegar» y WhatsApp, con mini-mapa.",
      "Obras en grilla filtrable; el mapa grande queda como vista secundaria.",
    ],
    Component: PrototypeSedeFirst,
  },
  {
    value: "filters",
    label: "D · Filtros",
    title: "D · Filtros y panel de detalle",
    description: "Explora las obras por año y distrito, con contador y panel de detalle.",
    highlights: [
      "Chips de año y distrito que filtran mapa y lista a la vez.",
      "Detalle de la obra en panel lateral (escritorio) o panel inferior (móvil).",
    ],
    Component: PrototypeFilters,
  },
] as const;

export const DesignSystemUbicacionScreen: React.FC = () => (
  <Box minH="100dvh" bg="bg.page" py={{ base: "8", md: "16" }}>
    <Container maxW="7xl" px={{ base: "4", md: "6" }}>
      <HStack
        justify="space-between"
        align="flex-start"
        wrap="wrap"
        gap={{ base: "4", md: "6" }}
        mb={{ base: "6", md: "10" }}
      >
        <VStack gap={{ base: "3", md: "4" }} align="flex-start" maxW="3xl">
          <HStack wrap="wrap" gap="2">
            <Badge colorPalette="gray" px="3" py="1" borderRadius="full">
              <MapPinned size={12} style={{ flexShrink: 0 }} />
              Aura Design System
            </Badge>
            <Badge variant="outline" colorPalette="gray" px="3" py="1" borderRadius="full">
              Prototipos · Sección Ubicación
            </Badge>
          </HStack>
          <Heading as="h1" size={{ base: "2xl", md: "4xl" }} fontWeight="bold" letterSpacing="tight" color="text.heading">
            Rediseño de la sección Ubicación
          </Heading>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }}>
            Cuatro propuestas con el mapa de Google, la sede de la empresa y las obras entregadas. Cambia el ancho de la
            ventana (móvil, tablet, escritorio) para ver cómo responde cada una.
          </Text>
          <NextLink href="/design-system" style={{ textDecoration: "none" }}>
            <HStack gap="1.5" color="text.muted" fontSize="sm" minH="11">
              <ArrowLeft size={14} style={{ flexShrink: 0 }} />
              <Text>Volver al catálogo del design system</Text>
            </HStack>
          </NextLink>
        </VStack>

        <HStack p="2" bg="surface.container" borderWidth="1px" borderColor="border.subtle" borderRadius="xl">
          <Text display={{ base: "none", sm: "block" }} fontSize="xs" fontWeight="medium" color="text.muted" px="2">
            Modo Claro / Oscuro:
          </Text>
          <ColorModeButton />
        </HStack>
      </HStack>

      <Tabs.Root defaultValue="immersive" variant="line" size={{ base: "sm", md: "lg" }} lazyMount unmountOnExit>
        <Tabs.List
          mb={{ base: "5", md: "8" }}
          borderBottomWidth="1px"
          borderColor="border.default"
          overflowX="auto"
          flexWrap="nowrap"
          css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
        >
          {PROTOTYPES.map((p) => (
            <Tabs.Trigger key={p.value} value={p.value} flexShrink={0} whiteSpace="nowrap">
              {p.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {PROTOTYPES.map(({ value, title, description, highlights, Component }) => (
          <Tabs.Content key={value} value={value}>
            <PrototypeFrame title={title} description={description} highlights={[...highlights]}>
              <Component />
            </PrototypeFrame>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Container>
  </Box>
);
