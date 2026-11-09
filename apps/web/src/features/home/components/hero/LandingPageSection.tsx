"use client";

/**
 * @file LandingPageSection.tsx
 * @description Hero de la home en el lenguaje del mapa inmersivo (`/design-system-ubicacion` › B):
 * la fotografía es la protagonista y sobre ella flota una «place card» de vidrio claro con
 * etiqueta pequeña, nombre en negrita, datos con íconos y dos acciones (negro relleno + borde negro).
 * Marca negra: sin azul. Datos de contacto desde `companyData`. Solo transform/opacity y respeto de
 * `prefers-reduced-motion`.
 * @module home/components
 */

import React from "react";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { ChevronDown, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import RouterLink from "next/link";
import Image from "next/image";

import logoGYA from "@/assets/branding/logosvg.svg";
import { Button } from "@/components/ui/button";
import { companyData } from "@/shared/config/company-data";
import { glassLightOnPhoto } from "@/shared/constants/glass";

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
      bg="gray.900"
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

      {/* Place card de vidrio claro */}
      <VStack
        align="stretch"
        gap={{ base: "4", md: "5" }}
        position="relative"
        zIndex={1}
        w="full"
        maxW={{ base: "full", md: "440px" }}
        p={{ base: "5", md: "6" }}
        borderRadius="2xl"
        color="gray.900"
        boxShadow="xl"
        animation="slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both"
        {...glassLightOnPhoto}
      >
        <HStack justify="space-between" align="center" gap="3">
          <HStack gap="2.5" minW={0}>
            <Box position="relative" w="8" h="8" flexShrink={0}>
              <Image
                src={logoGYA}
                alt="Logo de Glass & Aluminum Company"
                fill
                sizes="32px"
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="gray.700" truncate>
              Vidriería & Aluminio
            </Text>
          </HStack>
          <Text display={{ base: "none", sm: "block" }} fontSize="xs" fontWeight="600" color="gray.700" flexShrink={0}>
            La Molina
          </Text>
        </HStack>

        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="800"
          lineHeight="1.08"
          letterSpacing="tight"
          color="gray.900"
        >
          Glass & Aluminum
          <Text as="span" display="block">
            Company S.A.C.
          </Text>
        </Heading>

        <Text fontSize={{ base: "sm", md: "md" }} color="gray.700" lineHeight="relaxed">
          Especialistas en la fabricación, diseño e instalación de ventanas antirruido, mamparas herméticas y
          carpintería de aluminio de alta resistencia.
        </Text>

        <VStack align="stretch" gap="2" pt="4" borderTopWidth="1px" borderColor="blackAlpha.200">
          <HStack gap="2" color="gray.700" fontSize="sm">
            <MapPin size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
            <Text>{companyData.direccion}</Text>
          </HStack>
          <HStack gap="2" color="gray.700" fontSize="sm">
            <ShieldCheck size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
            <Text>Visita técnica sin costo</Text>
          </HStack>
        </VStack>

        <Flex gap="3" wrap="wrap">
          <Button asChild variant="aura" px="5" whiteSpace="nowrap" flex={{ base: "1 1 100%", sm: "1 1 auto" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
              Cotizar por WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" px="5" whiteSpace="nowrap" flex={{ base: "1 1 100%", sm: "1 1 auto" }}>
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
