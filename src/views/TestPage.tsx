"use client";
import { useColorMode } from "@/components/ui/color-mode-hooks";
/**
 * @file TestPage.tsx
 * @description Showcase page for Footer design variants (Structural Monolith, Liquid Glass, Grid Precision).
 */

import React from "react";
import { Box, Heading, Container, VStack, Text, Separator } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import FooterMonolith from "../layout/Footer/variants/FooterMonolith";
import FooterLiquid from "../layout/Footer/variants/FooterLiquid";
import FooterGrid from "../layout/Footer/variants/FooterGrid";

export interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <Container maxW="5xl" py={20} textAlign="center">
    <VStack gap={4}>
      <Heading size="2xl" textTransform="uppercase" letterSpacing="widest" color="text.accent">
        {title}
      </Heading>
      <Text fontSize="lg" color="text.muted" maxW="2xl">
        {description}
      </Text>
    </VStack>
  </Container>
);

const TestPage: React.FC = () => {
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
        size="sm"
      >
        <Box as={colorMode === "light" ? Moon : Sun} /> MODO {colorMode === "light" ? "OSCURO" : "CLARO"}
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

      <Separator my={10} borderColor="border.glass" />

      {/* OPTION 2 */}
      <SectionHeader 
        title="2. Liquid Glass" 
        description="Máxima elegancia inmersiva. El efecto de vidrio se adapta a la luz, manteniendo su profundidad y sofisticación."
      />
      <FooterLiquid />

      <Separator my={10} borderColor="border.glass" />

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
