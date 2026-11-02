"use client";

import React, { useEffect, useState } from "react";
import { Box, Code, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOUCH_MIN } from "@/shared/constants/layout";
import {
  IMAGE_REVEAL_TIMEOUT_MS,
  ImageRevealSkeleton,
  useImageReveal,
} from "@shared/components/Image/ImageReveal";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack, SubsectionLabel } from "../components";

/** Retardo simulado de red para que el skeleton sea visible en la demo. */
const SIMULATED_LOAD_MS = 1200;

const DEMO_IMAGE = "/images/services-products-01.Ventanas-nova-a10.webp";

const rules = [
  {
    title: "Estados",
    body: `Cargando: skeleton visible. Cargada: foto, degradado y textos aparecen a la vez. Timeout ${IMAGE_REVEAL_TIMEOUT_MS / 1000} s: se muestra la tarjeta aunque la foto no llegue.`,
  },
  {
    title: "Qué se revela junto",
    body: "Foto, degradado, badge y textos comparten el mismo objeto `reveal`; nada aparece antes que la imagen.",
  },
  {
    title: "Animación",
    body: "Solo `opacity` (1 propiedad, 0.5 s). Con `prefers-reduced-motion` no hay transición.",
  },
  {
    title: "Accesibilidad",
    body: "El skeleton es `aria-hidden` y no captura eventos; la tarjeta mantiene su medida final.",
  },
  {
    title: "Listas",
    body: "Sin `delay` de montaje en `ItemGridLayout.Item`: cada tarjeta se revela cuando su foto llega.",
  },
  {
    title: "Precarga",
    body: "Las portadas se precargan con `useImagePrefetch` para que lleguen del caché.",
  },
];

const codeExample = `const { loaded, onLoad, reveal } = useImageReveal();
<Box position="relative" overflow="hidden">
  <ImageRevealSkeleton loaded={loaded} />
  <Box position="absolute" inset={0} {...reveal}>
    <ResponsiveImage src={src} onLoad={onLoad} ... />
  </Box>
  <Box position="absolute" bottom="0" {...reveal}>…textos…</Box>
</Box>`;

/**
 * Tarjeta de demostración. Usa el hook real; solo la red se simula montando
 * la <img> tras un retardo, de modo que `onLoad` dispara el revelado.
 */
const DemoRevealCard: React.FC = () => {
  const { loaded, onLoad, reveal } = useImageReveal();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setFetched(true), SIMULATED_LOAD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Box
      w="full"
      maxW={{ base: "full", md: "420px" }}
      h={{ base: "260px", sm: "280px", md: "310px" }}
      borderRadius="3xl"
      overflow="hidden"
      position="relative"
      bg="black"
      boxShadow="sm"
    >
      <ImageRevealSkeleton loaded={loaded} />
      <Box position="absolute" inset={0} {...reveal}>
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
        background="linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.05) 100%)"
        pointerEvents="none"
        {...reveal}
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
        {...reveal}
      >
        <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} color="white" fontWeight="800" lineClamp={2}>
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
      title="Revelado sincronizado de imagen"
      description="Patrón para tarjetas con fotografía: skeleton de la misma medida y revelado simultáneo de foto, degradado y textos al cargar la imagen."
      badge="shared/components/Image"
    >
      <ShowcaseStack>
        <ShowcasePanel>
          <VStack align="stretch" gap="3">
            <SubsectionLabel>Demo interactiva (carga simulada de {SIMULATED_LOAD_MS / 1000} s)</SubsectionLabel>
            <DemoRevealCard key={run} />
            <Button
              variant="outline"
              minH={TOUCH_MIN}
              alignSelf={{ base: "stretch", md: "flex-start" }}
              onClick={() => setRun((n) => n + 1)}
            >
              <RotateCcw size={16} style={{ flexShrink: 0 }} aria-hidden />
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
