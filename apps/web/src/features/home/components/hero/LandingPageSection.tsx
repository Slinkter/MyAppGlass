"use client";

/**
 * @file LandingPageSection.tsx
 * @description Hero section of the application, featuring the company logo and core tagline.
 * Uses semantic color tokens for consistent theme adaptation.
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
 * Muestra el logotipo animado, el nombre de la empresa y una breve descripción.
 *
 * @returns {JSX.Element} Sección Hero renderizada.
 */
const LandingPageSection: React.FC = React.memo(() => {
    // En Chakra v3, las animaciones se manejan preferiblemente vía motion directamente
    // o consultando el estado de movimiento reducido si es necesario.

    return (
            <Flex
                w="full"
                minH="92dvh"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                px={{ base: 4, sm: 6, md: 8, lg: 12 }}
                py={{ base: 12, md: 16 }}
                position="relative"
                overflow="hidden"
                css={{
                    '@media (prefers-reduced-motion: reduce)': {
                        '*': { animation: 'none !important', transition: 'none !important', transform: 'none !important' }
                    }
                }}
            >
                <VStack
                    gap={{ base: "6", md: "8" }}
                    textAlign="center"
                    maxW="5xl"
                    position="relative"
                    zIndex={1}
                >

                    {/* Logo con escala responsiva óptima */}
                    <Box
                        animation="slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
                        transition="transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
                        _hover={{ transform: "scale(1.03)" }}
                        position="relative"
                        w={{
                            base: "210px",
                            sm: "260px",
                            md: "340px",
                            lg: "420px",
                        }}
                        h={{
                            base: "100px",
                            sm: "130px",
                            md: "170px",
                            lg: "210px",
                        }}
                    >
                        <Image
                            src={logoGYA}
                            alt="Glass & Aluminum Company Logo"
                            fill
                            priority
                            sizes="210px"
                            style={{ objectFit: "contain" }}
                        />
                    </Box>

                    <Box animation="slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both">
                        <Text
                            fontSize="xs"
                            fontWeight="600"
                            letterSpacing="0.18em"
                            textTransform="uppercase"
                            color="#002060"
                            _dark={{ color: "primary.300" }}
                            mb="2"
                        >
                            VIDRIERÍA & ALUMINIO · LA MOLINA
                        </Text>

                        <Heading
                            as="h1"
                            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                            fontWeight="700"
                            lineHeight="1.08"
                            letterSpacing="tight"
                            color="text.body"
                            mb="3"
                        >
                            GLASS & ALUMINUM
                            <Text as="span" display="block" color="#002060" _dark={{ color: "primary.200" }}>
                                COMPANY S.A.C.
                            </Text>
                        </Heading>

                        <Text
                            fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
                            mt="4"
                            color="text.muted"
                            fontWeight="500"
                            maxW="2xl"
                            mx="auto"
                            lineHeight="relaxed"
                        >
                            Especialistas en la fabricación, diseño e instalación de ventanas antirruido, mamparas herméticas y carpintería de aluminio de alta resistencia.
                        </Text>

                    </Box>
                </VStack>

                {/* Indicador de scroll: chevron flotante que invita a seguir bajando */}
                <Box
                    position="absolute"
                    bottom={{ base: "4", md: "6" }}
                    left="0"
                    right="0"
                    display="flex"
                    justifyContent="center"
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
                            color="text.muted"
                            style={{ flexShrink: 0 }}
                            animation="floatDown 2s ease-in-out infinite"
                            transition="color 0.2s cubic-bezier(0.22, 1, 0.36, 1)"
                            _hover={{ color: "text.heading" }}
                        />
                    </RouterLink>
                </Box>
            </Flex>
    );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
