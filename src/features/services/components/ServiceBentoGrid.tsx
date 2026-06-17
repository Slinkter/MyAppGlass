"use client";
import React from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  MessageSquareText,
  ShieldCheck,
  Wrench,
  Palette,
  Headphones,
  Award,
  Globe,
  Droplets,
  Sun,
  Ruler,
  ScanLine,
} from "lucide-react";

interface ServiceBentoGridProps {
  systemName: string;
  about?: { description: string };
}

export const BentoCTA = React.memo(({ systemName }: { systemName: string }) => (
  <Box
    bg="primary.900"
    color="white"
    w="full"
    h="full"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    borderRadius="3xl"
    px={{ base: "5", lg: "6" }}
    py="6"
    borderWidth="1px"
    borderColor="transparent"
    _dark={{ bg: "bg.subtle", borderColor: "border.subtle" }}
    boxShadow="md"
    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    cursor="pointer"
    role="group"
    _hover={{
      transform: "translateY(-2px)",
      boxShadow: "lg",
      bg: "primary.950",
      _dark: { bg: "bg.panel", borderColor: "primary.500" },
    }}
  >
    <Box 
      as={MessageSquareText} 
      boxSize={7} 
      mb="3" 
      color="primary.300" 
      _dark={{ color: "primary.500" }}
      transition="transform 0.3s ease"
      _groupHover={{ transform: "scale(1.1)" }}
    />
    <Heading size="md" mb="1.5" letterSpacing="tight">¿Iniciamos tu obra?</Heading>
    <Text opacity={0.85} mb="0" fontSize="sm" maxW="sm" mx="auto">Asesoría técnica exclusiva para tu proyecto de {systemName}.</Text>
  </Box>
));
BentoCTA.displayName = "BentoCTA";

export const AboutCard = React.memo(({ description }: { description: string }) => (
  <Box
    bg="bg.subtle"
    borderRadius="3xl"
    px={{ base: "6", lg: "8" }}
    py="8"
    h="full"
  >
    <Heading as="h3" size="sm" mb="4" letterSpacing="tight">Concepto Técnico</Heading>
    <Text color="fg.muted" fontSize="sm" lineHeight="tall">
      {description}
    </Text>
  </Box>
));
AboutCard.displayName = "AboutCard";

const featureIcons: Record<string, React.ComponentType> = {
  "Durabilidad garantizada": ShieldCheck,
  "Instalación profesional": Wrench,
  "Variedad de acabados": Palette,
  "Asesoría técnica personalizada": Headphones,
  "3 meses de garantía": Award,
  "Materiales importados": Globe,
  "Color natural, negro y madera": Droplets,
  "Vidrio crudo, templado y laminado": Sun,
  "Grosor 6mm para ventana": Ruler,
  "Sistemas: abatible, corrediza, oscilobatiente": ScanLine,
};

const allFeatures = [
  { label: "Durabilidad garantizada" },
  { label: "Instalación profesional" },
  { label: "Variedad de acabados" },
  { label: "Asesoría técnica personalizada" },
  { label: "3 meses de garantía" },
  { label: "Materiales importados" },
  { label: "Color natural, negro y madera" },
  { label: "Vidrio crudo, templado y laminado" },
  { label: "Grosor 6mm para ventana" },
  { label: "Sistemas: abatible, corrediza, oscilobatiente" },
];

export const UnifiedTechnicalCard = React.memo(({ description }: { description: string }) => (
  <Box
    bg="bg.subtle"
    borderRadius="3xl"
    borderWidth="1px"
    borderColor="border.subtle"
    px={{ base: "5", lg: "6" }}
    py="6"
    w="full"
    boxShadow="sm"
    transition="all 0.3s ease"
    _hover={{
      borderColor: "border.strong",
      boxShadow: "md",
    }}
  >
    <Heading as="h3" size="sm" mb="2.5" letterSpacing="tight">Concepto Técnico</Heading>
    <Text color="fg.muted" fontSize="sm" lineHeight="tall" mb="3">
      {description}
    </Text>

    <Box h="1px" bg="border.default" my="3.5" opacity={0.6} />

    <Heading as="h3" size="sm" mb="3" letterSpacing="tight">Ventajas Estructurales</Heading>
    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2.5">
      {allFeatures.map((feat) => {
        const IconComp = featureIcons[feat.label];
        return (
          <HStack key={feat.label} gap="2" align="start">
            {IconComp && (
              <Box as={IconComp} color="blue.500" _dark={{ color: "blue.400" }} boxSize={3.5} mt="0.5" flexShrink={0} />
            )}
            <Text fontSize="xs" fontWeight="medium" lineHeight="short">{feat.label}</Text>
          </HStack>
        );
      })}
    </SimpleGrid>
  </Box>
));
UnifiedTechnicalCard.displayName = "UnifiedTechnicalCard";

export const StructuralFeatures = React.memo(() => (
  <Box
    bg="bg.subtle"
    borderRadius="3xl"
    px={{ base: "6", lg: "8" }}
    py="6"
    w="full"
  >
    <Heading as="h3" size="sm" mb="5" letterSpacing="tight">Ventajas Estructurales</Heading>
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap="3">
      {allFeatures.map((feat) => {
        const IconComp = featureIcons[feat.label];
        return (
          <HStack key={feat.label} gap="2.5">
            {IconComp && (
              <Box as={IconComp} color="blue.500" _dark={{ color: "blue.400" }} boxSize={4} flexShrink={0} />
            )}
            <Text fontSize="sm" fontWeight="medium">{feat.label}</Text>
          </HStack>
        );
      })}
    </SimpleGrid>
  </Box>
));
StructuralFeatures.displayName = "StructuralFeatures";

const ServiceBentoGrid: React.FC<ServiceBentoGridProps> = ({ systemName, about }) => {
  return (
    <VStack gap="4" align="stretch">
      <SimpleGrid columns={{ base: 1, md: about ? 3 : 1 }} gap="4">
        {about && (
          <Box gridColumn={{ md: "span 2" }}>
            <AboutCard description={about.description} />
          </Box>
        )}
        <Box>
          <BentoCTA systemName={systemName} />
        </Box>
      </SimpleGrid>

      <StructuralFeatures />
    </VStack>
  );
};

export default ServiceBentoGrid;
