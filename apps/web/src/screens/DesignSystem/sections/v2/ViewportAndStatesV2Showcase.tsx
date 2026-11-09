"use client";

import React, { useState } from "react";
import {
  Badge,
  Box,
  Grid,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Check,
  CheckCircle2,
  AlertCircle,
  Inbox,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ShowcaseCard,
  ShowcasePanel,
  ShowcaseStack,
  SubsectionLabel,
} from "../../components";

type ViewportMode = "360px" | "768px" | "1280px";
type ShellVariant = "narrow" | "default" | "wide";

const VIEWPORT_CONFIGS: Record<
  ViewportMode,
  { label: string; width: string; icon: React.ElementType; desc: string }
> = {
  "360px": {
    label: "360px Móvil",
    width: "360px",
    icon: Smartphone,
    desc: "Móvil ultra-compacto · 1 columna stacked · Touch targets ≥ 44px",
  },
  "768px": {
    label: "768px Tablet",
    width: "768px",
    icon: Tablet,
    desc: "Tablet vertical · 2 columnas · Acciones duales",
  },
  "1280px": {
    label: "1280px Desktop",
    width: "1280px",
    icon: Monitor,
    desc: "Escritorio editorial · 3 columnas completas · Membrete expandido",
  },
};

const SHELL_CONFIGS: Record<
  ShellVariant,
  { label: string; maxW: string; token: string; desc: string }
> = {
  narrow: {
    label: "narrow (4xl)",
    maxW: "896px",
    token: "4xl",
    desc: "Artículos, formularios centrados y fichas legales",
  },
  default: {
    label: "default (6xl)",
    maxW: "1152px",
    token: "6xl",
    desc: "Vistas de catálogo, dashboards y listados principales",
  },
  wide: {
    label: "wide (7xl)",
    maxW: "1280px",
    token: "7xl",
    desc: "Hero banners, galerías de proyectos y presupuestos complejos",
  },
};

const DIAGNOSTIC_RULES = [
  { label: "Sin scroll horizontal", detail: "overflowX controlado y chips flex" },
  { label: "Touch targets ≥ 44px", detail: "minH='11' en botones y selectores" },
  { label: "Escala tipográfica fluida", detail: "Lora + Inter normalizados" },
  { label: "Contraste WCAG AA ≥ 4.5:1", detail: "Paleta v2 probada en claro/oscuro" },
];

export const ViewportAndStatesV2Showcase: React.FC = () => {
  const [viewportMode, setViewportMode] = useState<ViewportMode>("768px");
  const [shellVariant, setShellVariant] = useState<ShellVariant>("default");

  // Ancho efectivo del marco de previsualización
  const getPreviewMaxWidth = (): string => {
    if (viewportMode === "360px") return VIEWPORT_CONFIGS["360px"].width;
    if (viewportMode === "768px") return VIEWPORT_CONFIGS["768px"].width;
    return SHELL_CONFIGS[shellVariant].maxW;
  };

  const previewWidth = getPreviewMaxWidth();

  return (
    <ShowcaseStack>
      {/* SECCIÓN A: Simulador Responsivo en Vivo & PageShell */}
      <ShowcaseCard
        title="Simulador Responsivo en Vivo (360px · 768px · 1280px) & PageShell"
        description="Comprobación interactiva en los anchos canónicos móviles, tablets y escritorios combinados con las variantes de PageShell (narrow, default, wide)."
        badge="Responsive §3 & §5.1"
      >
        <ShowcasePanel p={{ base: "3", md: "6" }} borderRadius="xl">
          <VStack align="stretch" gap={{ base: "5", md: "6" }}>
            {/* Toolbar interactiva con botones minH="11" (44px) */}
            <VStack align="stretch" gap="4">
              {/* Selector de Viewport */}
              <Box>
                <SubsectionLabel mb="2">
                  1. Viewport Simulado (Resoluciones Críticas)
                </SubsectionLabel>
                <Box
                  overflowX="auto"
                  pb="1"
                  css={{
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                  }}
                >
                  <HStack gap="2" flexWrap={{ base: "nowrap", md: "wrap" }}>
                    {(
                      Object.keys(VIEWPORT_CONFIGS) as ViewportMode[]
                    ).map((mode) => {
                      const cfg = VIEWPORT_CONFIGS[mode];
                      const isSelected = viewportMode === mode;
                      const IconComp = cfg.icon;
                      return (
                        <Box
                          as="button"
                          key={mode}
                          onClick={() => setViewportMode(mode)}
                          minH="11"
                          px="4"
                          borderRadius="full"
                          borderWidth="1px"
                          borderColor={
                            isSelected ? "accent.navy" : "border.warmStrong"
                          }
                          bg={isSelected ? "accent.navy" : "bg.surface"}
                          color={isSelected ? "accent.navyContrast" : "text.heading"}
                          fontSize="sm"
                          fontWeight={isSelected ? "bold" : "medium"}
                          display="inline-flex"
                          alignItems="center"
                          gap="2"
                          flexShrink={0}
                          cursor="pointer"
                          transition="background-color 0.2s ease, border-color 0.2s ease"
                          _hover={{
                            borderColor: "accent.navy",
                          }}
                        >
                          <IconComp size={15} style={{ flexShrink: 0 }} />
                          {cfg.label}
                        </Box>
                      );
                    })}
                  </HStack>
                </Box>
                <Text fontSize="xs" color="text.muted" mt="1.5">
                  {VIEWPORT_CONFIGS[viewportMode].desc}
                </Text>
              </Box>

              {/* Selector de PageShell */}
              <Box>
                <SubsectionLabel mb="2">
                  2. Variante de PageShell (Anchos de Contenedor Oficiales)
                </SubsectionLabel>
                <Box
                  overflowX="auto"
                  pb="1"
                  css={{
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                  }}
                >
                  <HStack gap="2" flexWrap={{ base: "nowrap", md: "wrap" }}>
                    {(
                      Object.keys(SHELL_CONFIGS) as ShellVariant[]
                    ).map((variant) => {
                      const cfg = SHELL_CONFIGS[variant];
                      const isSelected = shellVariant === variant;
                      return (
                        <Box
                          as="button"
                          key={variant}
                          onClick={() => setShellVariant(variant)}
                          minH="11"
                          px="4"
                          borderRadius="full"
                          borderWidth="1px"
                          borderColor={
                            isSelected ? "accent.navy" : "border.warmStrong"
                          }
                          bg={isSelected ? "accent.navy" : "bg.surface"}
                          color={isSelected ? "accent.navyContrast" : "text.heading"}
                          fontSize="sm"
                          fontWeight={isSelected ? "bold" : "medium"}
                          display="inline-flex"
                          alignItems="center"
                          gap="2"
                          flexShrink={0}
                          cursor="pointer"
                          transition="background-color 0.2s ease, border-color 0.2s ease"
                          _hover={{
                            borderColor: "accent.navy",
                          }}
                        >
                          <Maximize2 size={13} style={{ flexShrink: 0 }} />
                          {cfg.label}
                        </Box>
                      );
                    })}
                  </HStack>
                </Box>
                <Text fontSize="xs" color="text.muted" mt="1.5">
                  {SHELL_CONFIGS[shellVariant].desc}
                </Text>
              </Box>
            </VStack>

            {/* Checklist de Diagnóstico WCAG & Mobile-First */}
            <Box
              p="3"
              borderRadius="lg"
              bg="bg.surface"
              borderWidth="1px"
              borderColor="border.warm"
            >
              <SubsectionLabel mb="2">
                Verificación Diagnóstica para {viewportMode} / Shell {shellVariant}
              </SubsectionLabel>
              <HStack gap="2" wrap="wrap">
                {DIAGNOSTIC_RULES.map((rule) => (
                  <Badge
                    key={rule.label}
                    bg="bg.tintNavy"
                    color="accent.navy"
                    borderWidth="1px"
                    borderColor="accent.navy"
                    px="3"
                    py="1.5"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="semibold"
                    display="inline-flex"
                    alignItems="center"
                    gap="1.5"
                  >
                    <Check size={12} style={{ flexShrink: 0 }} />
                    {rule.label}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {/* Marco de Previsualización Responsiva con animación fluida */}
            <Box
              w="full"
              py="4"
              px={{ base: "0", md: "2" }}
              bg="bg.subtle"
              borderRadius="xl"
              overflowX="auto"
            >
              <Box
                maxW={previewWidth}
                w="full"
                mx="auto"
                borderWidth="1px"
                borderColor="border.warmStrong"
                bg="bg.warm"
                borderRadius="xl"
                p={{ base: "3", md: "5" }}
                transition="max-width 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
                boxShadow="sm"
              >
                {/* Cabecera del Marco Simulado */}
                <HStack
                  justify="space-between"
                  align="center"
                  pb="3"
                  mb="3"
                  borderBottomWidth="1px"
                  borderColor="border.warmStrong"
                >
                  <HStack gap="2" align="center">
                    <Box
                      w="3"
                      h="3"
                      borderRadius="full"
                      bg="accent.navy"
                      style={{ flexShrink: 0 }}
                    />
                    <Text fontSize="xs" fontWeight="bold" color="text.heading">
                      Marco Simulado: {previewWidth}
                    </Text>
                  </HStack>
                  <Badge
                    fontSize="xs"
                    bg="bg.tintNavy"
                    color="accent.navy"
                    borderRadius="full"
                    px="2"
                    py="0.5"
                  >
                    {viewportMode} · {shellVariant}
                  </Badge>
                </HStack>

                {/* Tarjeta Arquitectónica Adaptativa según el modo simulado */}
                {viewportMode === "360px" ? (
                  /* Modo Móvil (360px): 1 columna apilada, full-width CTA */
                  <VStack align="stretch" gap="3">
                    <Box>
                      <Badge
                        bg="bg.tintNavy"
                        color="accent.navy"
                        borderWidth="1px"
                        borderColor="accent.navy"
                        px="2.5"
                        py="1"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="bold"
                        mb="2"
                      >
                        -70% antirruido
                      </Badge>
                      <Text
                        fontFamily="heading"
                        fontSize="lg"
                        fontWeight="bold"
                        color="text.heading"
                        lineHeight="tight"
                      >
                        Ventana Serie 62 Antirruido
                      </Text>
                      <Text fontSize="xs" color="text.muted" mt="1">
                        Perfilería pesada para atenuación de ruido de avenidas.
                      </Text>
                    </Box>

                    <VStack
                      align="stretch"
                      gap="1"
                      p="2.5"
                      bg="bg.surface"
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor="border.warm"
                      fontSize="xs"
                    >
                      <HStack justify="space-between">
                        <Text color="text.muted">Vidrio:</Text>
                        <Text fontWeight="semibold" color="text.heading">
                          Laminado
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="text.muted">Aluminio:</Text>
                        <Text fontWeight="semibold" color="text.heading">
                          Negro
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="text.muted">Apertura:</Text>
                        <Text fontWeight="semibold" color="text.heading">
                          Corrediza
                        </Text>
                      </HStack>
                    </VStack>

                    <Box pt="1">
                      <Button
                        variant="aura"
                        w="full"
                        minH="11"
                        fontSize="xs"
                      >
                        Solicitar Cotización Móvil
                      </Button>
                    </Box>
                  </VStack>
                ) : viewportMode === "768px" ? (
                  /* Modo Tablet (768px): 2 columnas equilibradas */
                  <Grid
                    templateColumns="1.2fr 1fr"
                    gap="4"
                    alignItems="center"
                  >
                    <VStack align="start" gap="2">
                      <Badge
                        bg="bg.tintNavy"
                        color="accent.navy"
                        borderWidth="1px"
                        borderColor="accent.navy"
                        px="3"
                        py="1"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        -70% antirruido certificado
                      </Badge>
                      <Text
                        fontFamily="heading"
                        fontSize="xl"
                        fontWeight="bold"
                        color="text.heading"
                      >
                        Ventana Serie 62 Batiente & Corrediza
                      </Text>
                      <Text fontSize="xs" color="text.muted">
                        Solución recomendada para dormitorios y salas frente a vías principales en La Molina y Lima Metropolitana.
                      </Text>
                      <HStack gap="2" pt="1" wrap="wrap">
                        <Badge variant="outline" fontSize="xs">
                          Vidrio Laminado
                        </Badge>
                        <Badge variant="outline" fontSize="xs">
                          Aluminio Negro
                        </Badge>
                        <Badge variant="outline" fontSize="xs">
                          Garantía 6 meses
                        </Badge>
                      </HStack>
                    </VStack>

                    <VStack
                      align="stretch"
                      gap="3"
                      p="4"
                      bg="bg.surface"
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor="border.warmStrong"
                    >
                      <Box>
                        <Text fontSize="xs" color="text.muted">
                          Presupuesto de referencia
                        </Text>
                        <Text
                          fontFamily="heading"
                          fontSize="2xl"
                          fontWeight="bold"
                          color="text.heading"
                        >
                          S/ 1,420.00
                        </Text>
                      </Box>
                      <VStack align="stretch" gap="2">
                        <Button variant="aura" minH="11" w="full" fontSize="xs">
                          Cotizar por WhatsApp
                        </Button>
                        <Button
                          variant="outline"
                          minH="11"
                          w="full"
                          fontSize="xs"
                        >
                          Ficha Técnica PDF
                        </Button>
                      </VStack>
                    </VStack>
                  </Grid>
                ) : (
                  /* Modo Desktop (1280px): 3 columnas editoriales */
                  <Grid
                    templateColumns="1.4fr 1.2fr 1fr"
                    gap="6"
                    alignItems="center"
                  >
                    {/* Columna 1: Título y descripción de marca */}
                    <VStack align="start" gap="2">
                      <Badge
                        bg="bg.tintNavy"
                        color="accent.navy"
                        borderWidth="1px"
                        borderColor="accent.navy"
                        px="3"
                        py="1"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        -70% antirruido oficial
                      </Badge>
                      <Text
                        fontFamily="heading"
                        fontSize="2xl"
                        fontWeight="bold"
                        color="text.heading"
                        lineHeight="tight"
                      >
                        Ventana Serie 62 Antirruido
                      </Text>
                      <Text fontSize="sm" color="text.muted">
                        Perfilería de alta hermeticidad diseñada con doble contacto perimetral y cámara acústica despresurizada.
                      </Text>
                      <Text fontSize="xs" color="text.body" fontWeight="medium">
                        Fabricación y ensamble en taller propio · Av. Los Fresnos 1250, La Molina.
                      </Text>
                    </VStack>

                    {/* Columna 2: Ficha técnica detallada */}
                    <Box
                      p="4"
                      bg="bg.surface"
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor="border.warmStrong"
                    >
                      <SubsectionLabel mb="2">
                        Especificación Homologada
                      </SubsectionLabel>
                      <VStack align="stretch" gap="1.5" fontSize="xs">
                        <HStack justify="space-between">
                          <Text color="text.muted">Sistema:</Text>
                          <Text fontWeight="bold">Serie 62</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="text.muted">Vidrio:</Text>
                          <Text fontWeight="semibold">Laminado de seguridad</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="text.muted">Acabado:</Text>
                          <Text fontWeight="semibold">Aluminio Negro Anodizado</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text color="text.muted">Apertura:</Text>
                          <Text fontWeight="semibold">Corrediza / Batiente</Text>
                        </HStack>
                      </VStack>
                    </Box>

                    {/* Columna 3: Monto y botones paralelos */}
                    <VStack
                      align="stretch"
                      gap="3"
                      p="4"
                      bg="bg.tintNavy"
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor="border.warmStrong"
                    >
                      <Box>
                        <Text fontSize="xs" color="text.muted">
                          Total Referencial
                        </Text>
                        <Text
                          fontFamily="heading"
                          fontSize="3xl"
                          fontWeight="bold"
                          color="text.heading"
                          lineHeight="none"
                          my="1"
                        >
                          S/ 1,420.00
                        </Text>
                        <Text fontSize="xs" color="text.muted">
                          Visita técnica sin costo
                        </Text>
                      </Box>
                      <Button variant="aura" minH="11" w="full" fontSize="xs">
                        Solicitar Visita
                      </Button>
                      <Button
                        variant="whatsapp"
                        minH="11"
                        w="full"
                        fontSize="xs"
                      >
                        Cotizar por WhatsApp
                      </Button>
                    </VStack>
                  </Grid>
                )}
              </Box>
            </Box>
          </VStack>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* SECCIÓN B: Matriz Canónica de los 9 Estados de UI */}
      <ShowcaseCard
        title="Matriz Canónica de los 9 Estados de UI"
        description="Comportamiento sistemático de componentes en todos los ciclos de interacción conforme a DESIGN-SYSTEM.md §3.6 y directrices WCAG AA."
        badge="Estados §3.6"
      >
        <ShowcasePanel p={{ base: "3", md: "6" }} borderRadius="xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
            {/* 1. Default (Reposo) */}
            <Box
              bg="bg.surface"
              p={{ base: "4", md: "5" }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="4"
            >
              <Box>
                <HStack justify="space-between" mb="2">
                  <Badge
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    bg="bg.tintNavy"
                    color="accent.navy"
                    fontSize="xs"
                  >
                    Estado 1/9
                  </Badge>
                  <Text fontSize="xs" color="text.muted">
                    Reposo
                  </Text>
                </HStack>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  fontWeight="bold"
                  color="text.heading"
                  mb="1"
                >
                  1. Default (Reposo)
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Estado base sin interacción activa. Borde border.warmStrong y contraste accesible &gt;= 4.5:1.
                </Text>
              </Box>

              <VStack align="stretch" gap="2">
                <Button variant="outline" minH="11" w="full" fontSize="xs">
                  Consultar Proyecto
                </Button>
              </VStack>
            </Box>

            {/* 2. Hover (Elevación sutil -2px) */}
            <Box
              bg="bg.surface"
              p={{ base: "4", md: "5" }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="4"
            >
              <Box>
                <HStack justify="space-between" mb="2">
                  <Badge
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    bg="bg.tintNavy"
                    color="accent.navy"
                    fontSize="xs"
                  >
                    Estado 2/9
                  </Badge>
                  <Text fontSize="xs" color="text.muted">
                    Elevación
                  </Text>
                </HStack>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  fontWeight="bold"
                  color="text.heading"
                  mb="1"
                >
                  2. Hover (Elevación -2px)
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Elevación controlada con translateY(-2px), sombra suave adminCard y transición máxima de 2 propiedades.
                </Text>
              </Box>

              <Box
                p="3"
                borderRadius="lg"
                bg="bg.warm"
                borderWidth="1px"
                borderColor="accent.navy"
                transform="translateY(-2px)"
                boxShadow="adminCard"
                transition="transform 0.2s ease, border-color 0.2s ease"
              >
                <HStack justify="space-between">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Tarjeta en Hover
                  </Text>
                  <Text fontSize="xs" fontWeight="semibold" color="accent.navy">
                    -2px
                  </Text>
                </HStack>
                <Text fontSize="xs" color="text.muted" mt="1">
                  Elevación conforme a reglas de marca v2.
                </Text>
              </Box>
            </Box>

            {/* 3. Focus-Visible (Anillo WCAG >= 3:1) */}
            <Box
              bg="bg.surface"
              p={{ base: "4", md: "5" }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="4"
            >
              <Box>
                <HStack justify="space-between" mb="2">
                  <Badge
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    bg="bg.tintNavy"
                    color="accent.navy"
                    fontSize="xs"
                  >
                    Estado 3/9
                  </Badge>
                  <Text fontSize="xs" color="text.muted">
                    Accesibilidad
                  </Text>
                </HStack>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  fontWeight="bold"
                  color="text.heading"
                  mb="1"
                >
                  3. Focus-Visible (Ring ≥ 3:1)
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Anillo de foco de alto contraste con token ring.primary garantizando ratio ≥ 3:1 (WCAG 1.4.11).
                </Text>
              </Box>

              <Box
                as="button"
                minH="11"
                w="full"
                px="4"
                borderRadius="full"
                bg="bg.surface"
                borderWidth="2px"
                borderColor="accent.navy"
                outline="2px solid"
                outlineColor="ring.primary"
                outlineOffset="2px"
                color="text.heading"
                fontWeight="bold"
                fontSize="xs"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Control con Enfoque Activo
              </Box>
            </Box>

            {/* 4. Active / Seleccionado (brand.navy) */}
            <Box
              bg="bg.surface"
              p={{ base: "4", md: "5" }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="4"
            >
              <Box>
                <HStack justify="space-between" mb="2">
                  <Badge
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    bg="bg.tintNavy"
                    color="accent.navy"
                    fontSize="xs"
                  >
                    Estado 4/9
                  </Badge>
                  <Text fontSize="xs" color="text.muted">
                    Selección
                  </Text>
                </HStack>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  fontWeight="bold"
                  color="text.heading"
                  mb="1"
                >
                  4. Active / Seleccionado
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Token brand.navy (#002060) para elementos activos, píldoras y tabs seleccionados.
                </Text>
              </Box>

              <HStack gap="2">
                <Box
                  as="button"
                  minH="11"
                  flex="1"
                  px="3"
                  borderRadius="full"
                  bg="brand.navy"
                  color="white"
                  fontWeight="bold"
                  fontSize="xs"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  Activo
                </Box>
                <Box
                  as="button"
                  minH="11"
                  flex="1"
                  px="3"
                  borderRadius="full"
                  bg="bg.warm"
                  color="text.body"
                  borderWidth="1px"
                  borderColor="border.warmStrong"
                  fontSize="xs"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  Inactivo
                </Box>
              </HStack>
            </Box>

            {/* 5. Disabled (Opacidad 0.5, sin eventos) */}
            <Box
              bg="bg.surface"
              p={{ base: "4", md: "5" }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="4"
            >
              <Box>
                <HStack justify="space-between" mb="2">
                  <Badge
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    bg="bg.tintNavy"
                    color="accent.navy"
                    fontSize="xs"
                  >
                    Estado 5/9
                  </Badge>
                  <Text fontSize="xs" color="text.muted">
                    Inhabilitado
                  </Text>
                </HStack>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  fontWeight="bold"
                  color="text.heading"
                  mb="1"
                >
                  5. Disabled (Inactivo)
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Opacidad al 0.5, pointer-events: none y sin elevación ni disparadores de foco.
                </Text>
              </Box>

              <Button
                variant="aura"
                minH="11"
                w="full"
                disabled
                opacity={0.5}
                cursor="not-allowed"
                fontSize="xs"
              >
                Acción No Permitida
              </Button>
            </Box>

            {/* 6. Loading (Spinner + Skeleton no bloqueante) */}
            <Box
              bg="bg.surface"
              p={{ base: "4", md: "5" }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="4"
            >
              <Box>
                <HStack justify="space-between" mb="2">
                  <Badge
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    bg="bg.tintNavy"
                    color="accent.navy"
                    fontSize="xs"
                  >
                    Estado 6/9
                  </Badge>
                  <Text fontSize="xs" color="text.muted">
                    Carga
                  </Text>
                </HStack>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  fontWeight="bold"
                  color="text.heading"
                  mb="1"
                >
                  6. Loading (No Bloqueante)
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Spinner sutil con Skeleton estructurado preservando el layout sin saltos visuales.
                </Text>
              </Box>

              <VStack align="stretch" gap="2">
                <Button
                  variant="aura"
                  minH="11"
                  w="full"
                  loading
                  loadingText="Calculando medidas..."
                  fontSize="xs"
                />
                <HStack
                  gap="2"
                  p="2"
                  bg="bg.warm"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="border.warmStrong"
                  align="center"
                >
                  <Spinner
                    size="sm"
                    color="accent.navy"
                    style={{ flexShrink: 0 }}
                  />
                  <Box flex="1">
                    <Skeleton height="2.5" borderRadius="sm" mb="1" />
                    <Skeleton height="2.5" width="70%" borderRadius="sm" />
                  </Box>
                </HStack>
              </VStack>
            </Box>

            {/* 7. Error (Validación semántica + rol alert) */}
            <Box
              bg="bg.surface"
              p={{ base: "4", md: "5" }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="4"
            >
              <Box>
                <HStack justify="space-between" mb="2">
                  <Badge
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    bg="status.dangerSoft"
                    color="status.dangerText"
                    fontSize="xs"
                  >
                    Estado 7/9
                  </Badge>
                  <Text fontSize="xs" color="status.dangerText">
                    Error
                  </Text>
                </HStack>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  fontWeight="bold"
                  color="text.heading"
                  mb="1"
                >
                  7. Error Semántico
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Borde status.danger y fondo status.dangerSoft con rol alert para lectores de pantalla.
                </Text>
              </Box>

              <Box
                borderWidth="1px"
                borderColor="status.danger"
                bg="status.dangerSoft"
                borderRadius="lg"
                p="3"
              >
                <HStack gap="2" align="start">
                  <Box
                    as="span"
                    color="status.dangerText"
                    display="inline-flex"
                    flexShrink={0}
                    mt="0.5"
                  >
                    <AlertCircle size={16} />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="xs" fontWeight="bold" color="status.dangerText">
                      Medida fuera de norma técnica
                    </Text>
                    <Text
                      fontSize="xs"
                      color="status.dangerText"
                      role="alert"
                      mt="0.5"
                    >
                      El ancho mínimo para mamparas Serie 35 es de 900 mm.
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Box>

            {/* 8. Empty (Estado vacío con acción) */}
            <Box
              bg="bg.surface"
              p={{ base: "4", md: "5" }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="4"
            >
              <Box>
                <HStack justify="space-between" mb="2">
                  <Badge
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    bg="bg.tintNavy"
                    color="accent.navy"
                    fontSize="xs"
                  >
                    Estado 8/9
                  </Badge>
                  <Text fontSize="xs" color="text.muted">
                    Vacío
                  </Text>
                </HStack>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  fontWeight="bold"
                  color="text.heading"
                  mb="1"
                >
                  8. Empty State (Accionable)
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Mensaje ilustrativo con llamada a la acción clara cuando no hay registros guardados.
                </Text>
              </Box>

              <VStack
                align="center"
                textAlign="center"
                p="3"
                bg="bg.warm"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="border.warmStrong"
                gap="2"
              >
                <Box as="span" color="text.muted" display="inline-flex">
                  <Inbox size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
                </Box>
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Sin presupuestos guardados
                </Text>
                <Button
                  variant="outline"
                  minH="11"
                  px="4"
                  w="full"
                  fontSize="xs"
                >
                  Iniciar Primera Cotización
                </Button>
              </VStack>
            </Box>

            {/* 9. Success (Confirmación de registro) */}
            <Box
              bg="bg.surface"
              p={{ base: "4", md: "5" }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="4"
            >
              <Box>
                <HStack justify="space-between" mb="2">
                  <Badge
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    bg="status.successSoft"
                    color="status.successText"
                    fontSize="xs"
                  >
                    Estado 9/9
                  </Badge>
                  <Text fontSize="xs" color="status.successText">
                    Confirmado
                  </Text>
                </HStack>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  fontWeight="bold"
                  color="text.heading"
                  mb="1"
                >
                  9. Success (Confirmación)
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Borde status.success y fondo status.successSoft para confirmaciones de registro y despacho.
                </Text>
              </Box>

              <Box
                borderWidth="1px"
                borderColor="status.success"
                bg="status.successSoft"
                borderRadius="lg"
                p="3"
              >
                <HStack gap="2" align="start">
                  <Box
                    as="span"
                    color="status.successText"
                    display="inline-flex"
                    flexShrink={0}
                    mt="0.5"
                  >
                    <CheckCircle2 size={16} />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="xs" fontWeight="bold" color="status.successText">
                      Presupuesto Generado con Éxito
                    </Text>
                    <Text fontSize="xs" color="text.body" mt="0.5">
                      Código GYA-2026-081 guardado conforme a los estándares de marca v2.
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Box>
          </SimpleGrid>
        </ShowcasePanel>
      </ShowcaseCard>
    </ShowcaseStack>
  );
};
