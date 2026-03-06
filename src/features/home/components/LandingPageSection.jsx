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
  VStack,
} from "@chakra-ui/react";
import { m } from "framer-motion";

import logoGYA from "@/assets/branding/LogoCompanytrans.png";

// Optimized: Use m.create() instead of the deprecated direct m() call
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
  const glowColor = useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,255,255,0.2)");

  return (
    <Flex
      w={"full"}
      minH={"100dvh"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      px={2}
      position="relative"
      overflow="hidden"
    >
      {/* Mesh Gradient Background */}
      <Box position="absolute" inset={0} zIndex={0} pointerEvents="none">
        <m.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "70%",
            height: "70%",
            background: "radial-gradient(circle, var(--chakra-colors-primary-500) 0%, transparent 70%)",
            filter: "blur(120px)",
            opacity: 0.1,
          }}
        />
        <m.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "70%",
            height: "70%",
            background: "radial-gradient(circle, var(--chakra-colors-blue-500) 0%, transparent 70%)",
            filter: "blur(120px)",
            opacity: 0.1,
          }}
        />
      </Box>

      <MotionVStack
        spacing={8}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        textAlign="center"
        maxW="5xl"
        zIndex={1}
      >
        <Box position="relative">
          <MotionImage
            src={logoGYA}
            alt="GYA Company - Vidriería Premium en La Molina | Logo"
            w={{ base: "55%", sm: "50%", md: "40%", lg: "36%" }}
            maxW="400px"
            h="auto"
            loading="eager"
            fetchpriority="high"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              rotateX: -5,
              filter: `drop-shadow(0 0 30px ${glowColor})`
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ perspective: 1000 }}
          />
        </Box>

        <Box mt={4}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "7xl" }}
            fontWeight="900"
            lineHeight="1.1"
            letterSpacing="0.25em"
            color={textColor}
            mb={10}
            textTransform="uppercase"
          >
            GLASS & ALUMINUM <br />
            COMPANY S.A.C.
          </Heading>

          <Heading
            as="h2"
            fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
            fontWeight="800"
            letterSpacing="0.4em"
            color={accentColor}
            textTransform={"uppercase"}
            mb={12}
            mt={2}
            opacity={0.9}
          >
            Vidriería Premium en La Molina
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color={subTextColor}
            fontWeight="500"
            maxW="2xl"
            mx="auto"
            lineHeight="1.8"
            letterSpacing="0.05em"
          >
            Especialistas en mamparas de vidrio templado, ventanas de aluminio
            y estructuras de vidrio. Instalación profesional con garantía.
          </Text>
        </Box>
      </MotionVStack>
    </Flex>
  );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
