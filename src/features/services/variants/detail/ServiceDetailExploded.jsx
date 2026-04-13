/**
 * @file ServiceDetailExploded.jsx
 * @description Option 5: Aura "Industrial Interactive" - Focus on technical highlights and hotspots.
 */
import React from "react";
import { Box, VStack, Heading, Text, Container, HStack, Icon, Circle, SimpleGrid } from "@chakra-ui/react";
import { Shield, Wind, Volume2, Sun } from "lucide-react";
import Gallery from "@shared/components/common/Gallery";

const Hotspot = ({ icon, title, desc }) => (
  <HStack align="start" spacing={4} p={6} bg="white" _dark={{ bg: "whiteAlpha.50" }} borderRadius="2xl" shadow="sm" border="1px solid" borderColor="border.glass">
    <Circle size="10" bg="primary.900" color="white" _dark={{ bg: "primary.100", color: "black" }}>
      <Icon as={icon} size={5} />
    </Circle>
    <VStack align="flex-start" spacing={1}>
      <Text fontWeight="bold" fontSize="sm" textTransform="uppercase" letterSpacing="widest">{title}</Text>
      <Text fontSize="xs" color="text.muted">{desc}</Text>
    </VStack>
  </HStack>
);

export const ServiceDetailExploded = ({ pageData }) => {
  const { seo, about, imageLists } = pageData;

  return (
    <Box py={20} bg="gray.50" _dark={{ bg: "black" }}>
      <Container maxW="7xl">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" letterSpacing="tight">{seo.title}</Heading>
            <Text maxW="2xl" color="text.muted" fontSize="lg">{about.description}</Text>
          </VStack>

          <Box w="full" borderRadius="3xl" overflow="hidden" shadow="2xl" border="8px solid" borderColor="white" _dark={{ borderColor: "whiteAlpha.100" }}>
            <Gallery images={imageLists[2] || []} />
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
            <Hotspot icon={Shield} title="Seguridad" desc="Cristal templado de alta resistencia al impacto." />
            <Hotspot icon={Volume2} title="Acústica" desc="Reducción de ruido exterior hasta en un 40%." />
            <Hotspot icon={Wind} title="Clima" desc="Hermeticidad total contra aire y humedad." />
            <Hotspot icon={Sun} title="UV" desc="Filtro solar que protege tus muebles y piel." />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};
