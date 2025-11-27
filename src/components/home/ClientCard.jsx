import React from "react";
import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import FadingImage from "../common/FadingImage";

const ClientCard = React.memo(({ image, nameClient, descClient }) => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.25)",
    "rgba(0, 0, 0, 0.25)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.72)",
    "rgba(255, 255, 255, 0.15)"
  );
  const textColor = useColorModeValue("gray.800", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      w="full"
      maxW={{ base: "full", md: "md" }}
      h={{ base: "auto", md: "auto" }}
      maxH={{ base: "452px", md: "512px" }}
      mb={4}
      p={{ base: 4, md: 6 }}
      overflow="hidden"
      // GlassItemCard effects
      bg={bgColor}
      backdropFilter="blur(10px)" // Suave blur
      border="lg" // SIN borde
      boxShadow="lg" // Subtle shadow
      borderRadius="2xl"
      borderColor={borderColor}
      color={textColor}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "xl",
      }}
    >
      <Box textAlign="center" p={2}>
        <FadingImage
          w="full"
          h={{ base: "260px", md: "375px" }}
          src={image}
          alt={`Imagen de ${nameClient}`}
          rounded="lg"
          objectFit="cover"
          shadow="lg"
        />
        <Stack spacing={3} mt={6}>
          <Heading size="lg">{nameClient}</Heading>
          <Text mt={1} fontSize="md" color={secondaryTextColor} px={6}>
            {descClient}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
});

ClientCard.displayName = "ClientCard";

export default ClientCard;
