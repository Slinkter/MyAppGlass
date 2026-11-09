"use client";

/**
 * @file LandingPageSection.tsx
 * @description Hero de la home: fotografía a pantalla completa con un panel de vidrio esmerilado
 * que contiene la marca, el título (H1), la descripción y las llamadas a la acción.
 * Datos de contacto desde `companyData`. Animaciones solo con transform/opacity y respeto de
 * `prefers-reduced-motion`.
 * @module home/components
 */

import React from "react";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import RouterLink from "next/link";
import Image from "next/image";

import logoGYA from "@/assets/branding/logosvg.svg";
import { Button } from "@/components/ui/button";
import { companyData } from "@/shared/config/company-data";
import { glassControl, glassOnPhoto } from "@/shared/constants/glass";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
  companyData.whatsappMessage,
)}`;

/**
 * @component LandingPageSection
 * @description Sección de aterrizaje (Hero) de la página principal.
 */
const LandingPageSection: React.FC = React.memo(() => {
  return (
    <Flex
      as="section"
      w="full"
      minH={{ base: "88dvh", md: "92dvh" }}
      position="relative"
      overflow="hidden"
      borderRadius={{ base: "2xl", md: "3xl" }}
      align={{ base: "flex-end", md: "center" }}
      justify={{ base: "center", md: "flex-start" }}
      px={{ base: "3", md: "12", lg: "16" }}
      py={{ base: "3", md: "16" }}
      bg="brand.navy"
      css={{
        "@media (prefers-reduced-motion: reduce)": {
          "*": { animation: "none !important", transition: "none !important", transform: "none !important" },
        },
      }}
    >
      {/* Fotografía real de una instalación terminada */}
      <Image
        src="/images/services-general-init01.webp"
        alt="Ventana de aluminio y vidrio instalada en un dormitorio"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "60% 50%" }}
      />

      {/* Panel de vidrio con el mensaje principal */}
      <VStack
        align="flex-start"
        gap={{ base: "4", md: "6" }}
        position="relative"
        zIndex={1}
        w="full"
        maxW={{ base: "full", md: "560px" }}
        p={{ base: "5", md: "8" }}
        borderRadius={{ base: "2xl", md: "3xl" }}
        color="white"
        animation="slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both"
        {...glassOnPhoto}
      >
        <HStack gap="3">
          <Box position="relative" w="10" h="10" flexShrink={0}>
            <Image
              src={logoGYA}
              alt="Logo de Glass & Aluminum Company"
              fill
              sizes="40px"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Text fontSize="xs" fontWeight="600" letterSpacing="0.18em" textTransform="uppercase" color="whiteAlpha.900">
            VIDRIERÍA & ALUMINIO · LA MOLINA
          </Text>
        </HStack>

        <Heading
          as="h1"
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          fontWeight="700"
          lineHeight="1.08"
          letterSpacing="tight"
          color="white"
        >
          Glass & Aluminum
          <Text as="span" display="block">
            Company S.A.C.
          </Text>
        </Heading>

        <Text fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.900" lineHeight="relaxed" fontWeight="normal">
          Especialistas en la fabricación, diseño e instalación de ventanas antirruido, mamparas herméticas y
          carpintería de aluminio de alta resistencia.
        </Text>

        <Flex gap="3" wrap="wrap" w="full">
          <Button asChild variant="whatsapp" px="5" flex={{ base: "1 1 100%", sm: "0 1 auto" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
              Cotizar por WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            px="5"
            color="white"
            flex={{ base: "1 1 100%", sm: "0 1 auto" }}
            _hover={{ bg: "whiteAlpha.400" }}
            {...glassControl}
          >
            <RouterLink href="/#proyectos">Ver proyectos</RouterLink>
          </Button>
        </Flex>
      </VStack>

      {/* Indicador de scroll */}
      <Box
        display={{ base: "none", md: "block" }}
        position="absolute"
        bottom="6"
        left="50%"
        transform="translateX(-50%)"
        zIndex={1}
        animation="fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1s both"
      >
        <RouterLink
          href="/#servicios"
          aria-label="Ver servicios"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px" }}
        >
          <Box
            as={ChevronDown}
            boxSize={{ base: 7, md: 8 }}
            color="white"
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
