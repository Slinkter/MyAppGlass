"use client";

/**
 * @file LandingPageSection.tsx
 * @description Hero section of the application, featuring the company logo and core tagline.
 * Uses semantic color tokens for consistent theme adaptation.
 * @module home/components
 */

import React from "react";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
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
                {/* Asymmetric Background Accent Blurs */}
                <Box
                    position="absolute"
                    top="-15%"
                    left="-10%"
                    w="45%"
                    h="60%"
                    bgGradient="radial(circle, primary.900, transparent)"
                    opacity={0.08}
                    filter="blur(140px)"
                    pointerEvents="none"
                    zIndex={0}
                />
                <Box
                    position="absolute"
                    bottom="-20%"
                    right="-10%"
                    w="50%"
                    h="60%"
                    bgGradient="radial(circle, text.accent, transparent)"
                    opacity={0.05}
                    filter="blur(160px)"
                    pointerEvents="none"
                    zIndex={0}
                />

                <VStack
                    gap={{ base: "6", md: "8" }}
                    textAlign="center"
                    maxW="5xl"
                    position="relative"
                    zIndex={1}
                >

                    {/* Logo con escala responsiva óptima */}
                    <Box
                        animation="slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                        transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
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

                    <Box animation="slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both">
                        <Heading
                            as="h1"
                            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                            fontWeight="900"
                            lineHeight="1.08"
                            letterSpacing="tight"
                            color="text.body"
                            mb="3"
                        >
                            GLASS & ALUMINUM
                            <Text as="span" display="block" color="primary.500" _dark={{ color: "primary.300" }}>
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

                        <HStack
                            gap={{ base: "4", sm: "6" }}
                            mt={{ base: "8", md: "10" }}
                            justify="center"
                            w="full"
                            px={2}
                            flexWrap="wrap"
                            animation="slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both"
                        >
                            <Button asChild variant="aura" size={{ base: "md", md: "lg" }} px="8" borderRadius="full" fontWeight="800">
                                <RouterLink href="/servicios">
                                    Explorar Servicios
                                </RouterLink>
                            </Button>
                            <Button asChild variant="outline" size={{ base: "md", md: "lg" }} px="8" borderRadius="full" fontWeight="700">
                                <RouterLink href="/proyectos">
                                    Ver Portafolio de Obras
                                </RouterLink>
                            </Button>
                        </HStack>
                    </Box>
                </VStack>
            </Flex>
    );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
