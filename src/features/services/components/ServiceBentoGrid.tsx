"use client";
import React from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Grid,
  GridItem,
  BoxProps
} from "@chakra-ui/react";
import { CheckCircle2, MessageSquareText } from "lucide-react";

import { ServicePageFeature } from "../services/serviceService";



interface BentoCardProps extends BoxProps {
  children: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, bg, color, ...props }) => (
  <Box
    p={{ base: "6", lg: "8" }}
    h="full"
    bg={bg || "surface.card"}
    color={color || "text.body"}
    borderRadius="3xl"
    borderWidth="1px"
    borderColor="border.default"
    boxShadow="xl"
    transition="transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
    {...props}
  >
    {children}
  </Box>
);

interface BentoAboutProps {
  about?: { description: string };
}

const BentoAbout = React.memo(({ about }: BentoAboutProps) => {
  if (!about) return null;
  return (
    <BentoCard display="flex" flexDirection="column" justifyContent="center">
      <Text fontSize="sm" fontWeight="900" color="primary.500" letterSpacing="0.2em" textTransform="uppercase" mb="4">
        Concepto Técnico
      </Text>
      <Text fontSize={{ base: "lg", md: "2xl" }} lineHeight="relaxed" fontWeight="medium">
        {about.description}
      </Text>
    </BentoCard>
  );
});
BentoAbout.displayName = "BentoAbout";

interface BentoBenefitsProps {
  benefits?: ServicePageFeature[];
}

const BentoBenefits = React.memo(({ benefits }: BentoBenefitsProps) => {
  if (!benefits) return null;

  return (
    <BentoCard>
      <Text fontSize="sm" fontWeight="900" color="primary.500" letterSpacing="0.2em" textTransform="uppercase" mb="8">
        Ventajas Estructurales
      </Text>
      <SimpleGrid 
        columns={{ base: 1, sm: 2, lg: 3 }} 
        gap={{ base: "4", lg: "6" }}
      >
        {benefits.map((benefit) => (
          <HStack key={benefit.label} align="center" gap="3" p="5" borderRadius="xl">
            <Box as={CheckCircle2} color="primary.500" boxSize={5} />
            <Text fontWeight="semibold" fontSize="md">{benefit.label}</Text>
          </HStack>
        ))}
        </SimpleGrid>
    </BentoCard>
  );
});
BentoBenefits.displayName = "BentoBenefits";

interface BentoCTAProps {
  systemName: string;
}

const BentoCTA = React.memo(({ systemName }: BentoCTAProps) => {
  return (
    <Box
      bg="primary.900"
      _dark={{ bg: "black" }}
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      borderRadius="3xl"
      px={{ base: "6", lg: "8" }}
      py="10"
    >
      <Box as={MessageSquareText} boxSize={10} mb="6" color="primary.300" _dark={{ color: "primary.500" }} />
      <Heading size="lg" mb="3" letterSpacing="tight">¿Iniciamos tu obra?</Heading>
      <Text opacity={0.85} mb="8" fontSize="md" maxW="sm" mx="auto">Asesoría técnica exclusiva para tu proyecto de {systemName}.</Text>
    </Box>
  );
});
BentoCTA.displayName = "BentoCTA";

interface ServiceBentoGridProps {
  activeIndex: number;
  about?: { description: string };
  benefits?: ServicePageFeature[];
  systemName: string;
}

const ServiceBentoGrid: React.FC<ServiceBentoGridProps> = ({ activeIndex, about, benefits, systemName }) => {
  return (
      <Grid
        key={`bento-${activeIndex}`}
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        templateRows={{ base: "auto", lg: "minmax(380px, auto)" }}
        gap={{ base: "8", lg: "14" }}
      >
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <BentoAbout about={about} />
        </GridItem>
        <GridItem colSpan={1}>
          <BentoCTA systemName={systemName} />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <BentoBenefits benefits={benefits} />
        </GridItem>
      </Grid>
  );
};

export default ServiceBentoGrid;
