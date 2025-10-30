import React from "react";
import {
    Card,
    CardBody,
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
    return (
        <Card
            w="full"
            maxW={{ base: "full", md: "sm" }} // Standardized maxW to Chakra token
            h={{ base: "auto", md: "base" }}
            p={{ base: 3, md: 6 }}
            rounded="lg"
            boxShadow={{ base: "base", md: "lg" }}
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.900")}
            _hover={{
                transform: "scale(1.015)", // Reduced scale for subtlety
                boxShadow: "xl", // Added shadow for depth
                transition: "all 0.3s ease-out", // Smoother transition
            }}
        >
            <CardBody textAlign="center">
                <Flex
                    w={24}
                    h={24}
                    mx="auto"
                    mb={4}
                    align="center"
                    justify="center"
                    rounded="full"
                    bg={useColorModeValue("gray.200", "gray.700")}
                >
                    {icon}
                </Flex>
                <Heading size="md" mb={3}>
                    {heading}
                </Heading>
                <Text mt={1} fontSize="md" color="gray.500">
                    {description}
                </Text>
            </CardBody>
        </Card>
    );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;