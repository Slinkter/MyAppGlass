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
    p={{ base: "6", lg: "6" }}
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

interface BentoAboutBenefitsProps {
  about?: { description: string };
  benefits?: ServicePageFeature[];
}

const BentoAboutBenefits = React.memo(({ about, benefits }: BentoAboutBenefitsProps) => {
  return (
    <BentoCard display="flex" flexDirection="column" justifyContent="center">
      {about && (
        <>
          <Text fontSize="sm" fontWeight="900" color="primary.500" letterSpacing="0.2em" textTransform="uppercase" mb="4">
            Concepto Técnico
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }} lineHeight="relaxed" fontWeight="medium" mb="6">
            {about.description}
          </Text>
        </>
      )}
      {benefits && benefits.length > 0 && (
        <>
          <Box h="1px" bg="border.default" mb="6" />
          <Text fontSize="sm" fontWeight="900" color="primary.500" letterSpacing="0.2em" textTransform="uppercase" mb="4">
            Ventajas Estructurales
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
            {benefits.map((benefit) => (
              <HStack key={benefit.label} align="center" gap="3" p="4" borderRadius="xl">
                <Box as={CheckCircle2} color="primary.500" boxSize={5} />
                <Text fontWeight="semibold" fontSize="sm">{benefit.label}</Text>
              </HStack>
            ))}
          </SimpleGrid>
        </>
      )}
    </BentoCard>
  );
});
BentoAboutBenefits.displayName = "BentoAboutBenefits";

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
      py="8"
    >
      <Box as={MessageSquareText} boxSize={8} mb="4" color="primary.300" _dark={{ color: "primary.500" }} />
      <Heading size="md" mb="2" letterSpacing="tight">¿Iniciamos tu obra?</Heading>
      <Text opacity={0.85} mb="0" fontSize="sm" maxW="sm" mx="auto">Asesoría técnica exclusiva para tu proyecto de {systemName}.</Text>
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
        gap={{ base: "6", lg: "6" }}
      >
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <BentoAboutBenefits about={about} benefits={benefits} />
        </GridItem>
        <GridItem colSpan={1}>
          <BentoCTA systemName={systemName} />
        </GridItem>
      </Grid>
  );
};

export default ServiceBentoGrid;
