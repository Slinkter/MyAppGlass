import React from "react";
import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import FadingImage from "../common/FadingImage";

const ClientCard = React.memo(({ image, nameClient, descClient }) => {
    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.1)", // More subtle background
        "rgba(0, 0, 0, 0.1)" // More subtle background
    );
    const textColor = useColorModeValue("gray.800", "gray.100");
    const secondaryTextColor = useColorModeValue("gray.600", "gray.300");

    return (
        <Box
            w="full"
            maxW={{ base: "full", md: "md" }}
            h={{ base: "auto", md: "xl" }}
            p={{ base: 4, md: 6 }}
            // Glassmorphism effects (GlassSection rules)
            bg={bgColor}
            backdropFilter="blur(10px)" // Suave blur
            border="none" // SIN borde
            boxShadow="none" // SIN shadow
            borderRadius="2xl"
            color={textColor}
            textAlign="center"
            transition="all 0.3s ease"
            _hover={{
                transform: "scale(1.015)",
            }}
        >
            <FadingImage
                src={image}
                alt={`Imagen de ${nameClient}`}
                rounded="lg"
                objectFit="cover"
                shadow="lg"
                w="full"
                h={{ base: "260px", md: "375px" }}
                mb={5}
            />
            <Stack spacing={3} mt={6}>
                <Heading size="lg">{nameClient}</Heading>
                <Text mt={1} fontSize="md" color={secondaryTextColor} px={6}>
                    {descClient}
                </Text>
            </Stack>
        </Box>
    );
});

ClientCard.displayName = "ClientCard";

export default ClientCard;

