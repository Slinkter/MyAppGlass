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
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
  usePrefersReducedMotion,
  VStack,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link as RouterLink } from "react-router-dom";

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
            w={{ base: "55%", sm: "50%", md: "40%", lg: "36%" }}
            maxW="400px"
            h={{ base: "55%", sm: "50%", md: "40%", lg: "30%" }}
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
              Empresa Comercial especializada en la instalación de cristales y
              aluminios.
            </Text>

            {/* CTAs */}
            <m.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
            >
              <HStack spacing={4} mt={8} justify="center" flexWrap="wrap">
                <Button
                  as={RouterLink}
                  to="/servicios"
                  colorScheme="primary"
                  size={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                  px={{ base: 8, md: 12 }}
                  borderRadius="full"
                  boxShadow="lg"
                  transition="all 0.2s ease"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                >
                  Ver Servicios
                </Button>
                <Button
                  as={RouterLink}
                  to="/proyectos"
                  variant="outline"
                  colorScheme="primary"
                  size={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                  px={{ base: 8, md: 12 }}
                  borderRadius="full"
                  transition="all 0.2s ease"
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  Ver Proyectos
                </Button>
              </HStack>
            </m.div>
          </Box>
        </MotionVStack>

        {/* Scroll indicator */}
        {!prefersReducedMotion && (
          <Box
            position="absolute"
            bottom={8}
            left="50%"
            transform="translateX(-50%)"
            as={m.div}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <Icon as={ChevronDownIcon} boxSize={8} color="primary.400" opacity={0.65} />
          </Box>
        )}
      </Flex>
    </>
  );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
