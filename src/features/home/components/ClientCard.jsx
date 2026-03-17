/**
 * @file ClientCard.jsx
 * @description Presentational component for displaying client segments with a glassmorphism aesthetic.
 * @module home/components
 */

import React from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * @component ClientCard
 * @description Muestra una tarjeta de cliente con imagen y descripción.
 *
 * @param {Object} props
 * @param {string} props.image - URL de la imagen
 * @param {string} props.nameClient - Nombre del cliente
 * @param {string} props.descClient - Descripción del cliente
 * @returns {JSX.Element}
 */
const ClientCard = React.memo(({ image, nameClient, descClient }) => {
  const styles = {
    bg: useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)"),
    border: useColorModeValue(
      "rgba(255, 255, 255, 0.52)",
      "rgba(255, 255, 255, 0.15)",
    ),
    text: useColorModeValue("gray.800", "gray.100"),
    secondaryText: useColorModeValue("gray.600", "gray.300"),
  };

  return (
    <Box
      role="group"
      w="full"
      h="full"
      minH={{ base: "220px", md: "260px" }}
      p={{ base: 4, md: 6 }}
      mb={4}
      overflow="hidden"
      bg={styles.bg}
      borderRadius="2xl"
      boxShadow="xl"
      color={styles.text}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      cursor="default"
      _hover={{
        boxShadow: "lg",
      }}
      _focus={{
        boxShadow: "0 0 0 3px var(--chakra-colors-primary-50)",
      }}
    >
      <Box w="full">
        <Image
          w="full"
          h={{ base: "260px", md: "280px" }}
          src={image}
          alt={`Imagen de ${nameClient}`}
          borderRadius="lg"
          objectFit="cover"
          boxShadow="base"
        />
      </Box>

      <Stack
        spacing={2}
        pt={{ base: 4, md: 6 }}
        px={{ base: 4, md: 6 }}
        textAlign="center"
      >
        <Heading size={{ base: "md", md: "lg" }} textTransform="uppercase">
          {nameClient}
        </Heading>

        <Text fontSize={{ base: "sm", md: "md" }} color={styles.secondaryText}>
          {descClient}
        </Text>
      </Stack>
    </Box>
  );
});

ClientCard.displayName = "ClientCard";

export default ClientCard;
