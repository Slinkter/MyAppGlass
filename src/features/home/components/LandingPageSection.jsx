/**
 * @file LandingPageSection.jsx
 * @description Hero section of the application, featuring the company logo and core tagline.
 * @module home/components
 * @remarks
 * Uses `LazyMotion` to reduce the main bundle size by asynchronously loading framer-motion's animation engine.
 */

import React from "react";
import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    useColorModeValue,
    usePrefersReducedMotion,
    VStack,
} from "@chakra-ui/react";
import { m } from "framer-motion";

import logoGYA from "@/assets/branding/LogoCompanytrans.png";

// Optimized: Use 'm.create' instead of 'm()' to support LazyMotion v11+
const MotionImage = m.create(Image);
const MotionVStack = m.create(VStack);

/**
 * @component LandingPageSection
 * @description Sección de aterrizaje (Hero) de la página principal.
 * Muestra el logotipo animado, el nombre de la empresa y una breve descripción.
 *
 * OPTIMIZATION NOTE:
 * Uses <LazyMotion> implementation. This significantly reduces the
 * initial JS bundle size by ensuring animation logic is split out
 * from the main thread code.
 *
 * @returns {JSX.Element} Sección Hero renderizada.
 */
const LandingPageSection = React.memo(() => {
    const accentColor = useColorModeValue("primary.600", "primary.300");
    const textColor = useColorModeValue("gray.800", "white");
    const subTextColor = useColorModeValue("gray.600", "gray.400");
    const prefersReducedMotion = usePrefersReducedMotion();

    const animationConfig = prefersReducedMotion
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 30 };

    return (
        <>
            <Flex
                w={"full"}
                minH={"100dvh"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                px={2}
                pb={{ base: 28, md: 0 }} // Resuelve superposición con BottomNav
                position="relative"
            >
                <MotionVStack
                    spacing={4}
                    initial={animationConfig}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        ease: "easeOut",
                    }}
                    textAlign="center"
                    maxW="5xl"
                >
                    <MotionImage
                        src={logoGYA}
                        alt="Glass & Aluminum Company Logo"
                        w={{ base: "45%", sm: "40%", md: "35%", lg: "30%" }}
                        maxW="280px"
                        loading="eager"
                        fetchpriority="high"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />

                    <Box mt={4}>
                        <Heading
                            as="h2"
                            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                            fontWeight="bold"
                            letterSpacing="widest"
                            color={accentColor}
                            textTransform={"uppercase"}
                            mb={2}
                        >
                            Vidriería & Aluminio
                        </Heading>

                        <Heading
                            as="h1"
                            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                            fontWeight="extrabold"
                            lineHeight="1.1"
                            color={textColor}
                        >
                            GLASS & ALUMINUM <br />
                            COMPANY S.A.C.
                        </Heading>

                        <Text
                            fontSize={{ base: "md", md: "xl" }}
                            mt={6}
                            color={subTextColor}
                            fontWeight="medium"
                            maxW="3xl"
                            mx="auto"
                        >
                            Empresa Comercial especializada en la instalación de
                            cristales y aluminios.
                        </Text>
                    </Box>
                </MotionVStack>
            </Flex>
        </>
    );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
