"use client";

import React from "react";
import NextLink from "next/link";
import { Badge, Box, Container, Heading, HStack, List, Tabs, Text, VStack } from "@chakra-ui/react";
import { ArrowLeft, MapPinned } from "lucide-react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { PrototypeSplit } from "./prototypes/PrototypeSplit";
import { ImmersiveLocationMap as PrototypeImmersive } from "@/features/location/ImmersiveLocationMap";
import { PrototypeSedeFirst } from "./prototypes/PrototypeSedeFirst";
import { PrototypeFilters } from "./prototypes/PrototypeFilters";
import { PrototypeSheet } from "./prototypes/PrototypeSheet";
import { PrototypeTimeline } from "./prototypes/PrototypeTimeline";

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
  {
    value: "sheet",
    label: "E · Hoja inferior",
    title: "E · Mapa con hoja inferior",
    description: "El mapa ocupa todo el espacio y la información sube desde abajo en tres alturas.",
    highlights: [
      "Móvil: hoja con tres posiciones (mínima, media y completa); el asa se toca, se arrastra o se mueve con el teclado.",
      "Tablet y escritorio: la hoja pasa a panel lateral fijo con la sede y la lista de obras.",
    ],
    Component: PrototypeSheet,
  },
  {
    value: "timeline",
    label: "F · Línea de tiempo",
    title: "F · Línea de tiempo por año",
    description: "Las obras entregadas se leen año por año y el mapa acompaña la selección.",
    highlights: [
      "Encabezados de año fijos y chips para saltar entre años.",
      "Móvil: el mapa se puede plegar para leer la lista a ancho completo.",
    ],
    Component: PrototypeTimeline,
  },
] as const;

/**
 * Pestañas de prototipos. Solo se monta el prototipo activo (cada uno carga su propio mapa).
 * Se hace con estado controlado y no con `lazyMount`/`unmountOnExit` del `Tabs.Root`: esas props
 * provocaban un desajuste de hidratación en la clase CSS del `Tabs.List`.
 */
const PrototypeTabs: React.FC = () => {
  const [active, setActive] = React.useState<string>("immersive");

  return (
    <Tabs.Root
      value={active}
      onValueChange={(details) => setActive(details.value)}
      variant="line"
      size={{ base: "sm", md: "lg" }}
    >
      <Tabs.List
        mb={{ base: "5", md: "8" }}
        borderBottomWidth="1px"
        borderColor="border.default"
        overflowX="auto"
        flexWrap="nowrap"
        css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
      >
        {PROTOTYPES.map((p) => (
          <Tabs.Trigger key={p.value} value={p.value} flexShrink={0} whiteSpace="nowrap" minH="11">
            {p.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {PROTOTYPES.map(({ value, title, description, highlights, Component }) => (
        <Tabs.Content key={value} value={value}>
          {active === value && (
            <PrototypeFrame title={title} description={description} highlights={[...highlights]}>
              <Component />
            </PrototypeFrame>
          )}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

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
            Seis propuestas con el mapa de Google, la sede de la empresa y las obras entregadas. Cambia el ancho de la
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

      <PrototypeTabs />
    </Container>
  </Box>
);
