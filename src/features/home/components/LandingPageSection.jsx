/**
 * @file LandingPageSection.jsx
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
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import logoGYA from "@/assets/branding/LogoCompanytrans.png";

/**
 * @component LandingPageSection
 * @description Premium Hero section with Aura 2.0 aesthetics.
 */
const LandingPageSection = React.memo(() => {
    return (
        <Flex
            w="full"
            minH="100dvh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            px="phi_md"
            position="relative"
            overflow="hidden"
        >
            {/* Liquid Aura Background Effect */}
            <Box
                position="absolute"
                top="-15%"
                left="-10%"
                w="600px"
                h="600px"
                bgGradient="radial(text.accent, transparent)"
                opacity={0.05}
                filter="blur(120px)"
                zIndex={0}
                _dark={{ opacity: 0.15 }}
            />

            <VStack
                as={motion.div}
                gap="phi_lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                textAlign="center"
                maxW="6xl"
                zIndex={1}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <Image
                        src={logoGYA}
                        alt="Glass & Aluminum Company Logo"
                        w={{ base: "280px", md: "400px" }}
                        h="auto"
                        loading="eager"
                        fetchPriority="high"
                    />
                </motion.div>

                <VStack gap="phi_md" mt="phi_md">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <Heading
                            as="h2"
                            fontSize={{ base: "sm", md: "lg" }}
                            fontWeight="800"
                            letterSpacing="0.4em"
                            color="text.accent"
                            textTransform="uppercase"
                            mb="phi_xs"
                        >
                            Vidriería &amp; Aluminio
                        </Heading>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <Heading
                            as="h1"
                            fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
                            fontWeight="900"
                            lineHeight="1.0"
                            color="text.heading"
                            letterSpacing="tight"
                        >
                            GLASS &amp; ALUMINUM <br />
                            <Box as="span" color="text.accent">COMPANY S.A.C.</Box>
                        </Heading>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <Text
                            fontSize={{ base: "md", md: "2xl" }}
                            mt="phi_md"
                            color="text.body"
                            fontWeight="500"
                            maxW="3xl"
                            mx="auto"
                            lineHeight="tall"
                        >
                            Diseño e ingeniería en arquitectura de cristal.
                            Espacios que transforman la luz en arte.
                        </Text>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <HStack gap="phi_md" mt="phi_xl" justify="center" w="full" flexWrap="wrap">
                            <Button as={RouterLink} to="/servicios" size="xl" borderRadius="full">
                                Explorar Servicios
                            </Button>
                            <Button as={RouterLink} to="/proyectos" variant="outline" size="xl" borderRadius="full">
                                Ver Portafolio
                            </Button>
                        </HStack>
                    </motion.div>
                </VStack>
            </VStack>
        </Flex>
    );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
