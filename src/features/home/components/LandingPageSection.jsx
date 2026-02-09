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
import { m, LazyMotion, domAnimation } from "framer-motion";

import logoGYA from "@/assets/branding/LogoCompanytrans.png";

// Optimized: Use 'm' instead of 'motion' to support LazyMotion
const MotionImage = m(Image);
const MotionVStack = m(VStack);

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

  return (
    // Wrap with LazyMotion and provide the 'domAnimation' feature set (no layout animations, just standard DOM ones)
    <LazyMotion features={domAnimation}>
      <Flex
        w={"full"}
        minH={"100dvh"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        px={2}
      >
        <MotionVStack
          spacing={4}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          textAlign="center"
          maxW="5xl"
        >
          <MotionImage
            src={logoGYA}
            alt="Glass & Aluminum Company Logo"
            w={{ base: "55%", sm: "50%", md: "40%", lg: "36%" }}
            maxW="400px"
            h={{ base: "55%", sm: "50%", md: "40%", lg: "30%" }}
            loading="eager"
            fetchpriority="high"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <Box mt={4}>
            <Heading
              as="h2"
              fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
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
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              fontWeight="extrabold"
              lineHeight="1.1"
              color={textColor}
            >
              GLASS & ALUMINUM <br />
              COMPANY S.A.C.
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "2xl" }}
              mt={6}
              color={subTextColor}
              fontWeight="medium"
              maxW="3xl"
              mx="auto"
            >
              Empresa Comercial especializada en la instalación de cristales y
              aluminios.
            </Text>
          </Box>
        </MotionVStack>
      </Flex>
    </LazyMotion>
  );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
