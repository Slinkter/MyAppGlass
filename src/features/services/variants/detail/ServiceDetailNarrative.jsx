/**
 * @file ServiceDetailNarrative.jsx
 * @description Option 4: Aura "Narrative Scroll" - Cinematic storytelling with parallax effects.
 */
import React from "react";
import { Box, VStack, Heading, Text, Container, Flex, Image } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionBox = motion.create(Box);

export const ServiceDetailNarrative = ({ pageData }) => {
  const { seo, about, imageLists } = pageData;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <Box bg="black" color="white" overflow="hidden">
      {/* SECTION 1: THE REVEAL */}
      <Box h="100vh" position="relative" display="flex" alignItems="center" justifyContent="center">
        <MotionBox 
          style={{ y }} 
          position="absolute" inset={0} zIndex={0} opacity={0.6}
        >
          <Image src={imageLists[0][0]} w="full" h="full" objectFit="cover" />
        </MotionBox>
        <VStack zIndex={1} gap={6} textAlign="center" maxW="4xl" px={6}>
          <Text fontSize="sm" fontWeight="bold" letterSpacing="0.5em" color="primary.400" textTransform="uppercase">Excelencia en Cristal</Text>
          <Heading size="4xl" letterSpacing="tighter" lineHeight="0.9">{seo.title}</Heading>
          <Text fontSize="xl" opacity={0.8} fontWeight="medium">{about.description}</Text>
        </VStack>
      </Box>

      {/* SECTION 2: THE VISION */}
      <Container maxW="7xl" py={32}>
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={20}>
          <Box flex={1}>
            <Image src={imageLists[1][0]} borderRadius="3xl" shadow="2xl" />
          </Box>
          <VStack flex={1} align="flex-start" gap={8}>
            <Heading size="2xl">Claridad sin límites</Heading>
            <Text fontSize="lg" color="whiteAlpha.800" lineHeight="tall">
              Diseñamos cada ventana pensando en la luz. El aluminio estructural permite perfiles más delgados, 
              maximizando el área de cristal para una vista ininterrumpida.
            </Text>
          </VStack>
        </Flex>
      </Container>

      {/* SECTION 3: THE CONTACT */}
      <Box h="60vh" bgGradient="linear(to-b, transparent, primary.900)" display="flex" alignItems="center" justifyContent="center">
        <VStack gap={10}>
          <Heading size="3xl" textAlign="center">¿Construimos tu visión?</Heading>
          <Box as="button" px={12} py={5} bg="white" color="black" borderRadius="full" fontWeight="bold" fontSize="lg" transition="all 0.3s" _hover={{ transform: "scale(1.05)", shadow: "0 0 30px white" }}>
            HABLEMOS DE TU PROYECTO
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
