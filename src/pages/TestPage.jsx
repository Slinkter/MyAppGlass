/**
 * @file TestPage.jsx
 * @description Showcase page for Footer design variants (Structural Monolith, Liquid Glass, Grid Precision).
 */

import React from "react";
import { Box, Heading, Container, VStack, Text, Divider, Button, useColorMode, Icon } from "@chakra-ui/react";
import { Sun, Moon } from "lucide-react";
import FooterMonolith from "../layout/Footer/variants/FooterMonolith";
import FooterLiquid from "../layout/Footer/variants/FooterLiquid";
import FooterGrid from "../layout/Footer/variants/FooterGrid";

const SectionHeader = ({ title, description }) => (
  <Container maxW="5xl" py={20} textAlign="center">
    <VStack spacing={4}>
      <Heading size="2xl" textTransform="uppercase" letterSpacing="widest" color="text.accent">
        {title}
      </Heading>
      <Text fontSize="lg" color="text.muted" maxW="2xl">
        {description}
      </Text>
    </VStack>
  </Container>
);

const TestPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Box bg="bg.page" minH="100vh">
      {/* PERSISTENT THEME TOGGLE FOR TESTING */}
      <Button
        position="fixed"
        top={4}
        right={4}
        zIndex={1000}
        variant="aura"
        onClick={toggleColorMode}
        leftIcon={<Icon as={colorMode === "light" ? Moon : Sun} />}
        size="sm"
      >
        MODO {colorMode === "light" ? "OSCURO" : "CLARO"}
      </Button>

      <Box bg="primary.900" _dark={{ bg: "black" }} py={12} textAlign="center" color="white">
        <Heading size="md" letterSpacing="0.3em">UX/UI ARCHITECT - FOOTER SHOWCASE</Heading>
        <Text mt={2} fontSize="xs" opacity={0.7}>PRUEBA DE ADAPTABILIDAD CROMÁTICA</Text>
      </Box>

      {/* OPTION 1 */}
      <SectionHeader 
        title="1. Structural Monolith" 
        description="Fuerza bruta y autoridad. Diseñado para ser un bloque sólido e imperturbable que transmite confianza total."
      />
      <FooterMonolith />

      <Divider my={10} borderColor="border.glass" />

      {/* OPTION 2 */}
      <SectionHeader 
        title="2. Liquid Glass" 
        description="Máxima elegancia inmersiva. El efecto de vidrio se adapta a la luz, manteniendo su profundidad y sofisticación."
      />
      <FooterLiquid />

      <Divider my={10} borderColor="border.glass" />

      {/* OPTION 3 */}
      <SectionHeader 
        title="3. Grid Precision" 
        description="El rigor técnico de un plano arquitectónico. Su cuadrícula se vuelve sutil en la oscuridad, guiando la lectura con precisión."
      />
      <FooterGrid />

      <Box py={20} textAlign="center">
        <Text fontSize="sm" fontWeight="bold" color="text.subtle">
          FIN DE LA EXHIBICIÓN - ¿CUÁL ES EL ELEGIDO?
        </Text>
      </Box>
    </Box>
  );
};

export default TestPage;
