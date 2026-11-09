"use client";

/**
 * @file LandingPageSection.tsx
 * @description Hero minimalista de la home, con el lenguaje del mapa inmersivo
 * (`/design-system-ubicacion` › B): contenido centrado y limpio, y una cápsula de vidrio de perfil
 * fino (borde de 1 px, desenfoque) con los datos clave y las dos acciones. Sin fotografía, para no
 * cruzarse con la barra de navegación. Todo con tokens del tema: se adapta a claro y oscuro.
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
      minH={{ base: "calc(92dvh - 60px)", md: "92dvh" }}
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
        maxW="4xl"
        position="relative"
        zIndex={1}
      >
        {/* Marca */}
        <Box
          animation="slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
          position="relative"
          w={{ base: "120px", sm: "160px", md: "220px" }}
          h={{ base: "112px", sm: "150px", md: "206px" }}
        >
          <Image
            src={logoGYA}
            alt="Glass & Aluminum Company Logo"
            fill
            priority
            sizes="220px"
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
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="700"
            lineHeight="1.08"
            letterSpacing="tight"
            color="text.heading"
          >
            GLASS & ALUMINUM
            <Text as="span" display="block">
              COMPANY S.A.C.
            </Text>
          </Heading>

          <Text
            fontSize={{ base: "sm", sm: "md", md: "lg" }}
            mt="5"
            color="text.muted"
            maxW="2xl"
            mx="auto"
            lineHeight="relaxed"
          >
            Especialistas en la fabricación, diseño e instalación de ventanas
            antirruido, mamparas herméticas y carpintería de aluminio de alta
            resistencia.
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
          aria-label="Ver servicios"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
          }}
        >
          <Box
            as={ChevronDown}
            boxSize={{ base: 7, md: 8 }}
            color="text.muted"
            style={{ flexShrink: 0 }}
            animation="floatDown 2s ease-in-out infinite"
            _hover={{ color: "text.heading" }}
          />
        </RouterLink>
      </Box>
    </Flex>
  );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
