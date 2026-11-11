"use client";

import React, { useEffect, useState } from "react";
import { Box, Code, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ImageRevealSkeleton } from "@shared/components/Image/ImageReveal";
import {
  IMAGE_REVEAL_TIMEOUT_MS,
  useImageReveal,
} from "@shared/components/Image/useImageReveal";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack, SubsectionLabel } from "../components";

/** Retardo simulado de red para que el skeleton sea visible en la demo. */
const SIMULATED_LOAD_MS = 1200;

const DEMO_IMAGE = "/images/services-products-01.Ventanas-nova-a10.webp";

const rules = [
  {
    title: "Arquitectura no bloqueante",
    body: "Los textos, badges y acciones son inmediatamente visibles sobre el fondo base negro de la marca (brand.ink). La interfaz nunca bloquea contenido aunque JS o la red sean lentos.",
  },
  {
    title: "Transición suave de imagen",
    body: "La imagen se desvanece suavemente con curva cubic-bezier(0.22, 1, 0.36, 1) y una sola propiedad (opacity 0.5s) al completar su carga.",
  },
  {
    title: "Tolerancia a fallos y accesibilidad",
    body: `Si la foto tarda o falla tras el timeout (${IMAGE_REVEAL_TIMEOUT_MS / 1000}s), el contenido textual sigue disponible e interactivo sin saltos de layout (CLS = 0).`,
  },
  {
    title: "Sin degradados prohibidos",
    body: "Cumple DESIGN.md usando fondo base sólido y velo protector uniforme sin recurrir a linear-gradient ni bgGradient.",
  },
  {
    title: "Rendimiento y LCP",
    body: "Sin retrasos de montaje en listas: el texto e información técnica pintan de inmediato, optimizando First Contentful Paint y Largest Contentful Paint.",
  },
  {
    title: "Precarga inteligente",
    body: "Las portadas principales se precargan en segundo plano con useImagePrefetch para cargarse instantáneamente desde la caché del navegador.",
  },
];

const codeExample = `// Arquitectura no bloqueante: texto visible de inmediato sobre fondo base brand.ink
<Box position="relative" overflow="hidden" bg="brand.ink">
  <ImageRevealSkeleton loaded={loaded} />
  <Box
    position="absolute"
    inset={0}
    opacity={loaded ? 1 : 0}
    transition="opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
  >
    <ResponsiveImage src={src} onLoad={onLoad} ... />
  </Box>
  <Box position="absolute" inset={0} bg="overlay.glass" pointerEvents="none" />
  {/* Contenido textual inmediato: nunca se bloquea por la imagen */}
  <VStack position="absolute" bottom="0" p="6">
    <Heading>Ventanas de Aluminio</Heading>
    <Text>Aislamiento antirruido...</Text>
  </VStack>
</Box>`;

/**
 * Tarjeta de demostración. Muestra el texto de inmediato sobre el fondo de marca
 * y desvanece la imagen con cubic-bezier(0.22, 1, 0.36, 1).
 */
const DemoRevealCard: React.FC = () => {
  const { loaded, onLoad } = useImageReveal();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setFetched(true), SIMULATED_LOAD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Box
      w="full"
      maxW={{ base: "full", md: "26.25rem" }}
      h={{ base: "16.25rem", sm: "17.5rem", md: "19.375rem" }}
      borderRadius="modal"
      overflow="hidden"
      position="relative"
      bg="brand.ink"
      boxShadow="sm"
    >
      <ImageRevealSkeleton loaded={loaded} />
      <Box
        position="absolute"
        inset={0}
        opacity={loaded ? 1 : 0}
        transition="opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
      >
        {fetched && (
          <Image
            src={DEMO_IMAGE}
            alt="Ventana de aluminio Sistema Nova"
            w="full"
            h="full"
            objectFit="cover"
            onLoad={onLoad}
          />
        )}
      </Box>
      <Box
        position="absolute"
        inset={0}
        bg="overlay.glass"
        pointerEvents="none"
      />
      <VStack
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        align="flex-start"
        gap="1"
        p={{ base: "4", md: "6" }}
        minW="0"
      >
        <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} color="white" fontWeight="700" lineClamp={2}>
          Ventanas de Aluminio
        </Heading>
        <Text fontSize="xs" color="whiteAlpha.800" lineClamp={1}>
          Aislamiento antirruido y térmico con perfiles de alta hermeticidad.
        </Text>
      </VStack>
    </Box>
  );
};

export const ImageRevealShowcase: React.FC = () => {
  const [run, setRun] = useState(0);

  return (
    <ShowcaseCard
      title="Revelado no bloqueante de imagen"
      description="Patrón arquitectónico no bloqueante: MediaCard muestra los textos de inmediato sobre fondo base negro de marca (brand.ink) y desvanece la imagen con cubic-bezier(0.22, 1, 0.36, 1) sin bloquear la interfaz si JS o la red son lentos."
      badge="MediaCard"
    >
      <ShowcaseStack>
        <ShowcasePanel>
          <VStack align="stretch" gap="3">
            <SubsectionLabel>Demo interactiva (carga simulada de {SIMULATED_LOAD_MS / 1000} s)</SubsectionLabel>
            <DemoRevealCard key={run} />
            <Button
              variant="outline"
              minH="11"
              alignSelf={{ base: "stretch", md: "flex-start" }}
              onClick={() => setRun((n) => n + 1)}
            >
              <RotateCcw size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
              Repetir animación
            </Button>
          </VStack>
        </ShowcasePanel>

        <ShowcasePanel>
          <VStack align="stretch" gap="3">
            <SubsectionLabel>Reglas del patrón</SubsectionLabel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "3", md: "4" }}>
              {rules.map((rule) => (
                <Box key={rule.title} minW="0" overflowWrap="break-word">
                  <Text fontSize="sm" fontWeight="semibold" color="text.heading">
                    {rule.title}
                  </Text>
                  <Text fontSize="sm" color="text.body">
                    {rule.body}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </ShowcasePanel>

        <ShowcasePanel>
          <VStack align="stretch" gap="3">
            <SubsectionLabel>Uso</SubsectionLabel>
            <Code
              display="block"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
              p={{ base: "3", md: "4" }}
              borderRadius="lg"
              fontSize="xs"
              maxW="100%"
            >
              {codeExample}
            </Code>
          </VStack>
        </ShowcasePanel>
      </ShowcaseStack>
    </ShowcaseCard>
  );
};
