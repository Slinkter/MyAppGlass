import { useColorMode } from "@/components/ui/color-mode-hooks";
/**
 * @file ServicesTestPage.tsx
 * @description Showcase for Services Catalog design variants.
 */
import React from "react";
import { Box, Heading, Container, VStack, Text, Button, Separator } from "@chakra-ui/react";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ServicesImmersiveFilter } from "../features/services/variants/ServicesImmersiveFilter";
import { ServicesGlassGrid } from "../features/services/variants/ServicesGlassGrid";
import { ServicesTechnicalCatalog } from "../features/services/variants/ServicesTechnicalCatalog";

const ServicesTestPage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg="bg.page" minH="100vh" pb={20}>
      <Button position="fixed" bottom={4} right={4} zIndex={1000} variant="aura" onClick={toggleColorMode}>
        <Box as={colorMode === "light" ? Moon : Sun} /> TEMA {colorMode === "light" ? "OSCURO" : "CLARO"}
      </Button>
      
      <Container maxW="7xl" pt={10}>
        <Link to="/test">
          <Button variant="ghost" mb={8}>
            <ArrowLeft size={16} /> Volver al Showcase
          </Button>
        </Link>
        <VStack gap={2} align="center" mb={16}>
          <Heading size="2xl" letterSpacing="tight">CATÁLOGO DE SERVICIOS PREMIUM</Heading>
          <Text color="text.muted" textAlign="center" maxW="2xl">Experimenta la fluidez y jerarquía de las nuevas visiones de exhibición para GYA</Text>
        </VStack>

        <Heading size="md" mb={6} color="primary.500" textTransform="uppercase" letterSpacing="0.2em">1. OPCIÓN: IMMERSIVE FILTER (Líquido)</Heading>
        <ServicesImmersiveFilter />
        
        <Separator my={20} borderColor="border.glass" />

        <Heading size="md" mb={6} color="primary.500" textTransform="uppercase" letterSpacing="0.2em">2. OPCIÓN: GLASS GRID (Enfoque)</Heading>
        <ServicesGlassGrid />

        <Separator my={20} borderColor="border.glass" />

        <Heading size="md" mb={6} color="primary.500" textTransform="uppercase" letterSpacing="0.2em">3. OPCIÓN: TECHNICAL CATALOG (Estructura)</Heading>
        <ServicesTechnicalCatalog />
      </Container>
    </Box>
  );
};

export default ServicesTestPage;
