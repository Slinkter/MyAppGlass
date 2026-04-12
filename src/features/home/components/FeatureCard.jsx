/**
 * @file FeatureCard.jsx
 * @description UI component for displaying company value propositions (benefits) with high-elevation design.
 * Features deep shadows, large border radii, and dynamic contrast for maximum visibility.
 * @module home/components
 */

import React from "react";
import { Box, Flex, Heading, Text, ScaleFade, useColorModeValue } from "@chakra-ui/react";

/**
 * @component FeatureCard
 * @description Tarjeta de beneficios con elevación premium y diseño dimensional.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.heading - Título de la característica.
 * @param {string} props.description - Descripción detallada.
 * @param {React.ReactNode} props.icon - Elemento de icono a renderizar.
 * @returns {JSX.Element}
 */
const FeatureCard = React.memo(({ heading, description, icon }) => {
  // Enhanced contrast colors
  const cardBg = useColorModeValue("white", "primary.800");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.100");
  const shadowColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(0,0,0,0.4)");

  return (
    <Box
      role="group"
      w="full"
      h="full"
      minH={{ base: "240px", md: "280px" }}
      p={{ base: 8, md: 10 }}
      overflow="hidden"
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorder}
      borderRadius="3xl" // More pronounced rounding
      boxShadow={`0 10px 30px ${shadowColor}`}
      color="text.body"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      cursor="default"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      _hover={{ 
        boxShadow: `0 20px 50px ${shadowColor}`,
        transform: "translateY(-8px)",
        borderColor: "text.accent"
      }}
    >
      <Box w="full">
        <ScaleFade in={true} initialScale={0.8}>
          <Flex
            w={{ base: 16, md: 20 }}
            h={{ base: 16, md: 20 }}
            mx="auto"
            mb={8}
            align="center"
            justify="center"
            rounded="2xl" // Square-ish rounded for industrial look
            bg="surface.icon"
            transition="all 0.3s ease"
            color="text.accent"
            boxShadow="inner"
            _groupHover={{ 
              bg: "text.accent",
              color: "white",
              transform: "rotate(10deg) scale(1.1)"
            }}
          >
            {icon}
          </Flex>
        </ScaleFade>
        <Heading 
          size="md" 
          mb={4} 
          textTransform="uppercase" 
          color="text.heading"
          letterSpacing="widest"
          fontWeight="700"
        >
          {heading}
        </Heading>
        <Text 
          fontSize="sm" 
          color="text.muted" 
          lineHeight="tall"
          fontWeight="500"
        >
          {description}
        </Text>
      </Box>
    </Box>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
