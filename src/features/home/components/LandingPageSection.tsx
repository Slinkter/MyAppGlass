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
                w={"full"}
                minH={"100dvh"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                px={2}
                position="relative"
            >
                <VStack
                    gap="6"
                    textAlign="center"
                    maxW="5xl"
                >
                    <Box
                        transition="transform 0.3s ease"
                        _hover={{ transform: "scale(1.05)" }}
                        position="relative"
                        w={{
                            base: "220px",
                            sm: "240px",
                            md: "320px",
                            lg: "400px",
                        }}
                        h={{
                            base: "110px",
                            sm: "120px",
                            md: "160px",
                            lg: "200px",
                        }}
                    >
                        <Image
                            src={logoGYA}
                            alt="Glass & Aluminum Company Logo"
                            fill
                            priority
                            style={{ objectFit: "contain" }}
                        />
                    </Box>

                    <Box mt="6">
                        <Heading
                            as="h2"
                            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                            fontWeight="bold"
                            letterSpacing="widest"
                            color="text.accent"
                            textTransform={"uppercase"}
                            mb="2"
                        >
                            Vidriería La Molina
                        </Heading>

                        <Heading
                            as="h1"
                            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                            fontWeight="extrabold"
                            lineHeight="1.1"
                            color="text.body"
                        >
                            GLASS & ALUMINUM
                            <br />
                            COMPANY S.A.C.
                        </Heading>

                        <Text
                            fontSize={{ base: "md", md: "xl" }}
                            mt="8"
                            color="text.muted"
                            fontWeight="medium"
                            maxW="3xl"
                            mx="auto"
                        >
                            Empresa comercial especialista en la venta e
                            instalación de vidrio y aluminio
                        </Text>

                        <HStack
                            gap="6"
                            mt="14"
                            justify="center"
                            w="full"
                            px={4}
                            flexWrap="wrap"
                        >
                            <Button
                                as={RouterLink}
                                href="/servicios"
                                variant="aura"
                                size="lg"
                            >
                                Ver Servicios
                            </Button>
                            <Button
                                as={RouterLink}
                                href="/proyectos"
                                variant="outline"
                                size="lg"
                            >
                                Nuestros Proyectos
                            </Button>
                        </HStack>
                    </Box>
                </VStack>
            </Flex>
    );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
