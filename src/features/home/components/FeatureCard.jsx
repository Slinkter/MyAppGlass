/**
 * @file FeatureCard.jsx
 * @description UI component for displaying company value propositions (benefits) with hover effects.
 * @module home/components
 */

import React from "react";
import {
  Box, // Changed from Card
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * @component FeatureCard
 * @description Tarjeta para mostrar una característica o beneficio de la empresa.
 * Incluye un icono, un título y una descripción breve.
 * Comparte estilos visuales de glassmorphism con ClientCard.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.heading - Título de la característica.
 * @param {string} props.description - Descripción detallada.
 * @param {React.ReactNode} props.icon - Elemento de icono a renderizar.
 * @returns {JSX.Element} Tarjeta de característica.
 */
const FeatureCard = React.memo(({ heading, description, icon }) => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.25)",
    "rgba(0, 0, 0, 0.25)",
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.72)",
    "rgba(255, 255, 255, 0.15)",
  );
  const textColor = useColorModeValue("gray.800", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");
  const iconBgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.3)",
    "rgba(0, 0, 0, 0.3)",
  );

  return (
    <Box
      w="full"
      maxW={{ base: "full", md: "md" }}
      h={{ base: "265px", md: "275px" }}
      p={{ base: 4, md: 6 }}
      mb={4}
      overflow="hidden"
      bg={bgColor}
      border="lg"
      boxShadow="lg"
      borderRadius="2xl"
      borderColor={borderColor}
      color={textColor}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      style={{ willChange: "transform, opacity" }} // 🚀 Optimizacion GPU
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "xl",
      }}
    >
      <Box textAlign="center">
        <Flex
          w={24}
          h={24}
          mx="auto"
          mb={4}
          align="center"
          justify="center"
          rounded="full"
          bg={iconBgColor}
        >
          {icon}
        </Flex>
        <Heading size="md" mb={3} textTransform="uppercase">
          {heading}
        </Heading>
        <Text mt={1} fontSize="md" color={secondaryTextColor}>
          {description}
        </Text>
      </Box>
    </Box>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
