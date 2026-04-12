/**
 * @file FeatureCard.jsx
 * @description UI component for displaying company value propositions (benefits) with hover effects.
 * Uses semantic color tokens — no useColorModeValue required.
 * @module home/components
 */

import React from "react";
import { Box, Flex, Heading, Text, ScaleFade } from "@chakra-ui/react";

/**
 * @component FeatureCard
 * @description Tarjeta para mostrar una característica o beneficio de la empresa.
 * Incluye un icono, un título y una descripción breve.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.heading - Título de la característica.
 * @param {string} props.description - Descripción detallada.
 * @param {React.ReactNode} props.icon - Elemento de icono a renderizar.
 * @returns {JSX.Element} Tarjeta de característica.
 */
const FeatureCard = React.memo(({ heading, description, icon }) => (
  <Box
    role="group"
    w="full"
    h="full"
    minH={{ base: "220px", md: "260px" }}
    p={{ base: 4, md: 6 }}
    mb={4}
    overflow="hidden"
    bg="surface.card"
    borderRadius="2xl"
    boxShadow="xl"
    color="text.body"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    cursor="default"
    _hover={{ boxShadow: "lg" }}
    _focus={{ boxShadow: "0 0 0 3px var(--chakra-colors-primary-50)" }}
  >
    <Box w="full">
      <ScaleFade in={true} initialScale={0.8} delay={0.2}>
        <Flex
          w={{ base: 14, md: 20 }}
          h={{ base: 14, md: 20 }}
          mx="auto"
          mb={4}
          align="center"
          justify="center"
          rounded="full"
          bg="surface.icon"
          transition="background 0.3s ease"
          color="text.accent"
          _groupHover={{ bg: "surface.iconHover" }}
        >
          {icon}
        </Flex>
      </ScaleFade>
      <Heading size="md" mb={2} textTransform="uppercase">
        {heading}
      </Heading>
      <Text fontSize="md" color="text.muted">
        {description}
      </Text>
    </Box>
  </Box>
));

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
