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

import { m } from "framer-motion";

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
    "rgba(255, 255, 255, 0.4)",
    "rgba(15, 15, 15, 0.6)",
  );
  const borderColor = useColorModeValue(
    "whiteAlpha.500",
    "whiteAlpha.200",
  );
  const textColor = useColorModeValue("gray.800", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");
  const iconBgColor = useColorModeValue(
    "primary.50",
    "whiteAlpha.100",
  );
  const iconColor = useColorModeValue("primary.500", "primary.300");

  return (
    <Box
      as={m.div}
      w="full"
      maxW={{ base: "full", md: "md" }}
      h={{ base: "265px", md: "275px" }}
      p={{ base: 4, md: 6 }}
      mb={4}
      overflow="hidden"
      bg={bgColor}
      backdropFilter="blur(12px)"
      border="1px solid"
      borderRadius="2xl"
      borderColor={borderColor}
      color={textColor}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { y: 0, scale: 1, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
        hover: { y: -8, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Box textAlign="center">
        <Flex
          as={m.div}
          w={20}
          h={20}
          mx="auto"
          mb={4}
          align="center"
          justify="center"
          rounded="2xl"
          bg={iconBgColor}
          color={iconColor}
          variants={{
            initial: { scale: 1, rotate: 0 },
            hover: { scale: 1.1, rotate: 5, filter: "drop-shadow(0 0 8px currentColor)" },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {icon}
        </Flex>
        <Heading 
          size="md" 
          mb={3} 
          textTransform="uppercase" 
          fontWeight="800" 
          letterSpacing="wider"
        >
          {heading}
        </Heading>
        <Text mt={1} fontSize="md" color={secondaryTextColor} fontWeight="500">
          {description}
        </Text>
      </Box>
    </Box>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
