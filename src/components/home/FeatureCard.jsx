import React from "react";
import {
    Box, // Changed from Card
    Flex,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
/**
 * Componente FeatureCard
 * Tarjeta para mostrar una característica destacada.
 * @component
 * @param {Object} props
 * @param {string} props.heading - Encabezado de la característica
 * @param {string} props.description - Descripción de la característica
 * @param {React.ReactNode} props.icon - Icono a mostrar
 * @returns {JSX.Element}
 */
const FeatureCard = React.memo(({ heading, description, icon }) => {
    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.25)",
        "rgba(0, 0, 0, 0.25)"
    );
    const borderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.35)",
        "rgba(255, 255, 255, 0.15)"
    );
    const textColor = useColorModeValue("gray.800", "gray.100");
    const secondaryTextColor = useColorModeValue("gray.600", "gray.300");
    const iconBgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.3)",
        "rgba(0, 0, 0, 0.3)"
    );

    return (
        <Box
            w="full"
            maxW={{ base: "full", md: "md" }}
            h={{ base: "auto", md: "auto" }}
            p={{ base: 4, md: 6 }}
            // GlassItemCard effects
            bg={bgColor}
            backdropFilter="blur(10px)"
            border="none" // SIN borde
            boxShadow="md" // SIN shadow
            borderColor={borderColor}
            borderRadius="2xl"
            color={textColor}
            transition="all 0.3s ease"
            _hover={{
                transform: "scale(1.02)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
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
                <Heading size="md" mb={3}>
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
