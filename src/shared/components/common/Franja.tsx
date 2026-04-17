import { useColorModeValue } from "@/components/ui/color-mode-hooks";
/**
 * @file Franja.tsx
 * @description Full-width banner component used as a section header or separator with a custom title and text.
 * @module shared/components
 */

import React from "react";
import { Box, Flex, Heading, Text, Container } from "@chakra-ui/react";

interface FranjaProps {
  title: string;
  text: string;
  headingAs?: React.ElementType;
}

/**
 * @component Franja
 * @description Muestra una franja de color a lo ancho de la página con un título y un texto descriptivo.
 */
const Franja: React.FC<FranjaProps> = React.memo(({ title, text, headingAs = "h1" }) => {
  const headingColor = useColorModeValue("gray.900", "white");
  const textColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Box py={8}>
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <Flex justifyContent="center" alignItems="center" direction="column">
          <Heading
            as={headingAs}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color={headingColor}
            borderBottom="1px solid"
          >
            {title}
          </Heading>
          <Text
            width={{ base: "90%", md: "70%" }}
            mt={2}
            fontSize={{ base: "md", md: "lg" }}
            color={textColor}
            textAlign="center"
          >
            {text}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
});

Franja.displayName = "Franja";

export default Franja;
