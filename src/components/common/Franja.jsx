import React from "react";
import { Box, Flex, Heading, Text, useColorModeValue, Container } from "@chakra-ui/react"; // Import Container

/**
 * @component Franja
 * @description Muestra una franja de color a lo ancho de la página con un título y un texto descriptivo.
 * Es utilizado para separar secciones de contenido de una manera visualmente atractiva.
 *
 * @param {{ title: string, text: string, headingAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }} props - Props del componente.
 * @returns {JSX.Element}
 */
const Franja = React.memo(({ title, text, headingAs = "h1" }) => {
    const bgColor = useColorModeValue("rgba(255, 255, 255, 0.1)", "rgba(0, 0, 0, 0.1)"); // More subtle background
    const headingColor = useColorModeValue("gray.900", "white");
    const textColor = useColorModeValue("gray.800", "gray.200");

    return (
        <Box
            py={8}
            // Glassmorphism effects (GlassSection rules)
            bg={bgColor}
            backdropFilter="blur(10px)" // Suave blur
            border="none" // SIN borde
            boxShadow="none" // SIN shadow
            borderRadius="2xl"
            transition="all 0.3s ease"
        >
            <Container maxW="7xl" px={{ base: 4, md: 8 }}> {/* Added Container for consistent width */}
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                >
                    <Heading
                        as={headingAs}
                        fontSize={{ base: "4xl", md: "4xl" }}
                        fontWeight="bold"
                        color={headingColor}
                    >
                        {title}
                    </Heading>
                    <Text
                        width={{ base: "90%", md: "70%" }}
                        mt={1}
                        fontSize="lg"
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