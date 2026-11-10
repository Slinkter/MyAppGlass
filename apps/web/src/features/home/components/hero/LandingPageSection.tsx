"use client";

/**
 * @file LandingPageSection.tsx
 * @description Hero de la home: marca, título y descripción, sin botones de acción (decisión del dueño,
 * 2026-11-09: rompían la interfaz). El indicador de scroll lleva a Servicios. Sin fotografía, para no
 * cruzarse con la barra de navegación.
 * Todo con tokens del tema: se adapta a claro y oscuro.
 * @module home/components
 */

import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import RouterLink from "next/link";
import Image from "next/image";

import logoGYA from "@/assets/branding/logosvg.svg";

/**
 * @component LandingPageSection
 * @description Sección de aterrizaje (Hero) de la página principal.
 */
const LandingPageSection: React.FC = React.memo(() => {
  return (
    <Flex
      as="section"
      w="full"
      minH={{ base: "calc(92dvh - 3.75rem)", md: "92dvh" }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={{ base: 4, sm: 6, md: 8, lg: 12 }}
      pt={{ base: 12, md: 28 }}
      pb={{ base: 16, md: 20 }}
      position="relative"
      overflow="hidden"
      css={{
        "@media (prefers-reduced-motion: reduce)": {
          "*": {
            animation: "none !important",
            transition: "none !important",
            transform: "none !important",
          },
        },
      }}
    >
      <VStack
        gap={{ base: "6", md: "8" }}
        textAlign="center"
        maxW="pageNarrow"
        position="relative"
        zIndex={1}
      >
        {/* Marca */}
        <Box
          animation="slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
          position="relative"
          w={{ base: "28", sm: "40", md: "56" }}
          h={{ base: "28", sm: "36", md: "52" }}
        >
          <Image
            src={logoGYA}
            alt="Glass & Aluminum Company Logo"
            unoptimized
            fill
            priority
            sizes="(min-width: 768px) 224px, 160px"
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* Título */}
        <Box animation="slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both">
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="text.muted"
            mb="3"
          >
            Vidriería & Aluminio
          </Text>

          <Heading
            as="h1"
            fontFamily="heading"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="700"
            lineHeight="1.08"
            letterSpacing="-0.025em"
            color="text.heading"
          >
            GLASS & ALUMINUM
            <Text as="span" display="block">
              COMPANY S.A.C.
            </Text>
          </Heading>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            mt="5"
            color="text.muted"
            maxW="2xl"
            mx="auto"
            lineHeight="relaxed"
          >
            Suministro, ensamblaje en taller e instalación de ventanas antirruido, mamparas y
            carpintería de aluminio en Lima.
          </Text>
        </Box>

        <Text
          fontSize="xs"
          fontWeight="700"
          letterSpacing="0.14em"
          textTransform="uppercase"
          color="text.muted"
        >
          La Molina
        </Text>
      </VStack>

      {/* Indicador de scroll */}
      <Box
        position="absolute"
        bottom={{ base: "4", md: "6" }}
        left="0"
        right="0"
        display={{ base: "none", sm: "flex" }}
        justifyContent="center"
        zIndex={1}
        animation="fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1s both"
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
          }}
        >
          <Box
            as={ChevronDown}
            boxSize={{ base: 7, md: 8 }}
            color="text.muted"
            style={{ flexShrink: 0 }}
            animation="floatDown 2s ease-in-out infinite"
          />
        </RouterLink>
      </Box>
    </Flex>
  );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
