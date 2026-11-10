"use client";

/**
 * @file LandingPageSection.tsx
 * @description Hero de la home a pantalla completa (100dvh). Marca, título, una línea que se dibuja,
 * descripción. Atención solo en La Molina. Sin botones de acción (decisión del dueño, 2026-11-09).
 * Movimiento cinematográfico (~2,2 s, una sola vez, solo transform y opacity): el conjunto se asienta con un
 * zoom lento, el logo entra con escala, el título se revela línea por línea con máscara y la línea fina se
 * dibuja. Son animaciones CSS (keyframes `hero*` en global.css) con `fill-mode: both`: corren desde el primer
 * pintado sin esperar a JavaScript, así el texto no queda invisible en teléfonos lentos.
 * Con `prefers-reduced-motion`, o si `useMotionBudget` detecta un teléfono de gama baja, no hay animación.
 * Todo con tokens del tema: se adapta a claro y oscuro.
 * @module home/components
 */

import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import RouterLink from "next/link";
import Image from "next/image";

import logoGYA from "@/assets/branding/logosvg.svg";
import { useMotionBudget } from "@/shared/hooks/ui/useMotionBudget";

/** Curva de salida larga y suave, típica de títulos de cine. */
const EASE_CINE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Valor de la propiedad `animation` de un bloque, o undefined si no se anima. */
function anim(on: boolean, name: string, durationMs: number, delayMs = 0): string | undefined {
  return on ? `${name} ${durationMs}ms ${EASE_CINE} ${delayMs}ms both` : undefined;
}

/** Línea del título con máscara: el texto sube desde abajo del recorte (translateY 105% a 0). */
function MaskLine({ animated, delayMs, children }: { animated: boolean; delayMs: number; children: React.ReactNode }) {
  return (
    <Box overflow="hidden" py="0.5">
      <Box animation={anim(animated, "heroMask", 1100, delayMs)}>{children}</Box>
    </Box>
  );
}

/**
 * @component LandingPageSection
 * @description Hero de aterrizaje: ocupa toda la pantalla y centra el contenido en vertical.
 */
const LandingPageSection: React.FC = React.memo(() => {
  // En SSR el nivel es "full": la animación arranca en el primer pintado. Si luego se detecta gama baja
  // o reducción de movimiento, se retira y queda el estado final.
  const animated = useMotionBudget() === "full";

  return (
    <Flex
      as="section"
      aria-labelledby="hero-titulo"
      w="full"
      minH="100dvh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={{ base: 5, sm: 6, md: 10, lg: 14 }}
      pt={{ base: 10, md: 16 }}
      pb={{ base: 20, md: 24 }}
      position="relative"
      overflow="hidden"
      css={{
        "@media (prefers-reduced-motion: reduce)": {
          "&, & *": { animation: "none !important", transition: "none !important" },
        },
      }}
    >
      <VStack
        gap={{ base: "6", md: "8" }}
        textAlign="center"
        maxW="pageNarrow"
        w="full"
        position="relative"
        zIndex={1}
        animation={anim(animated, "heroSettle", 2200)}
      >
        {/* Marca */}
        <Box
          position="relative"
          w={{ base: "36", sm: "48", md: "64" }}
          h={{ base: "36", sm: "48", md: "64" }}
          animation={anim(animated, "heroLogo", 1100)}
        >
          <Image
            src={logoGYA}
            alt="Glass & Aluminum Company Logo"
            unoptimized
            fill
            priority
            loading="eager"
            sizes="(min-width: 768px) 256px, (min-width: 480px) 192px, 144px"
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* Título */}
        <Box>
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="text.muted"
            mb="3"
            animation={anim(animated, "heroRise", 700, 200)}
          >
            Vidriería &amp; Aluminio
          </Text>

          <Heading
            id="hero-titulo"
            as="h1"
            fontFamily="heading"
            fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl" }}
            fontWeight="700"
            lineHeight="1.04"
            letterSpacing="-0.03em"
            color="text.heading"
          >
            <MaskLine animated={animated} delayMs={300}>
              GLASS &amp; ALUMINUM
            </MaskLine>
            <MaskLine animated={animated} delayMs={450}>
              COMPANY S.A.C.
            </MaskLine>
          </Heading>

          {/* Línea fina que se dibuja bajo el título */}
          <Box
            mx="auto"
            mt={{ base: "5", md: "6" }}
            h="1px"
            w={{ base: "16", md: "24" }}
            bg="text.heading"
            aria-hidden="true"
            transformOrigin="center"
            animation={anim(animated, "heroLine", 1000, 900)}
          />
        </Box>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="text.muted"
          maxW="2xl"
          mx="auto"
          lineHeight="relaxed"
          animation={anim(animated, "heroRise", 800, 1100)}
        >
          Suministro, ensamblaje en taller e instalación de ventanas antirruido, mamparas y carpintería de
          aluminio en Lima.
        </Text>
      </VStack>

      {/* Indicador de scroll: aparece una vez y lleva a Servicios (sin rebote en bucle) */}
      <Box
        position="absolute"
        bottom={{ base: "5", md: "7" }}
        left="0"
        right="0"
        display="flex"
        justifyContent="center"
        zIndex={1}
        animation={anim(animated, "heroFade", 800, 1700)}
      >
        <RouterLink
          href="/#servicios"
          aria-label="Ir a servicios"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.75rem",
            height: "2.75rem",
            borderRadius: "9999px",
          }}
        >
          <Box as={ChevronDown} boxSize={{ base: 7, md: 8 }} color="text.muted" style={{ flexShrink: 0 }} />
        </RouterLink>
      </Box>
    </Flex>
  );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
