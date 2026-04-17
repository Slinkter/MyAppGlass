/**
 * @file LandingPageSection.tsx
 * @description Hero section of the application, featuring the company logo and core tagline.
 * Uses semantic color tokens for consistent theme adaptation.
 * @module home/components
 * @remarks
 * Uses `LazyMotion` to reduce the main bundle size by asynchronously loading framer-motion's animation engine.
 */

import React from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import RouterLink from "next/link";

import logoGYA from "@/assets/branding/logosvg.svg";

const MotionImage = m.create(Image);
const MotionVStack = m.create(VStack);

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
    
    const animationConfig = { opacity: 0, y: 30 };

    return (
        <LazyMotion features={domAnimation}>
            <Flex
                w={"full"}
                minH={"100dvh"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                px={2}
                position="relative"
            >
                <MotionVStack
                    gap="phi_md"
                    initial={animationConfig}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                    textAlign="center"
                    maxW="5xl"
                >
                    <MotionImage
                        src={logoGYA}
                        alt="Glass & Aluminum Company Logo"
                        w={{ base: "55%", sm: "50%", md: "40%", lg: "36%" }}
                        maxW="400px"
                        h="auto"
                        loading="eager"
                        fetchpriority="high"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />

                    <Box mt="phi_md">
                        <Heading
                            as="h2"
                            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                            fontWeight="bold"
                            letterSpacing="widest"
                            color="text.accent"
                            textTransform={"uppercase"}
                            mb="phi_xs"
                        >
                            Vidriería &amp; Aluminio
                        </Heading>

                        <Heading
                            as="h1"
                            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                            fontWeight="extrabold"
                            lineHeight="1.1"
                            color="text.body"
                        >
                            GLASS &amp; ALUMINUM <br />
                            COMPANY S.A.C.
                        </Heading>

                        <Text
                            fontSize={{ base: "md", md: "xl" }}
                            mt="phi_lg"
                            color="text.muted"
                            fontWeight="medium"
                            maxW="3xl"
                            mx="auto"
                        >
                            Empresa Comercial especializada en la instalación de
                            cristales y aluminios.
                        </Text>

                        <HStack gap="phi_md" mt="phi_xl" justify="center" w="full" px={4} flexWrap="wrap">
                            <Button as={RouterLink} to="/servicios" variant="aura" size="lg">
                                Ver Servicios
                            </Button>
                            <Button as={RouterLink} to="/proyectos" variant="outline" size="lg">
                                Nuestros Proyectos
                            </Button>
                        </HStack>
                    </Box>
                </MotionVStack>
            </Flex>
        </LazyMotion>
    );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
