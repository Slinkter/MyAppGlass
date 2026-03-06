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

// Re-using the Client typedef from clientService.js
/**
 * @typedef {object} Client
 * @property {number} id - Unique identifier for the client.
 * @property {string} imgClient - The imported image URL for the client.
 * @property {string} nameClient - The name of the client category (e.g., "Constructoras").
 * @property {string} descClient - A description of the client category.
 */

import { m } from "framer-motion";

/**
 * @component ClientCard
 * @description Muestra una tarjeta de cliente/testimonio con imagen y descripción.
 * Utiliza efectos de desenfoque (glassmorphism) y animaciones hover.
 *
 * @param {Client} props - Objeto de cliente a mostrar en la tarjeta.
 * @returns {JSX.Element} Tarjeta de cliente renderizada.
 */
const ClientCard = React.memo(({ image, nameClient, descClient }) => {
  // Configuración centralizada de estilos
  const styles = {
    bg: useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(15, 15, 15, 0.6)"),
    border: useColorModeValue(
      "whiteAlpha.500",
      "whiteAlpha.200",
    ),
    text: useColorModeValue("gray.800", "gray.100"),
    secondaryText: useColorModeValue("gray.600", "gray.400"),
    heading: useColorModeValue("primary.700", "primary.300"),
  };

  return (
    <Box
      as={m.div}
      w="full"
      maxW={{ base: "full", md: "md" }}
      h="auto"
      mb={4}
      overflow="hidden"
      bg={styles.bg}
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor={styles.border}
      borderRadius="3xl"
      boxShadow="xl"
      color={styles.text}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { y: 0 },
        hover: { y: -10 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Box p={3} position="relative" overflow="hidden">
        <Image
          as={m.img}
          w="full"
          h={{ base: "260px", md: "375px" }}
          src={image}
          alt={`Imagen de ${nameClient}`}
          borderRadius="2xl"
          objectFit="cover"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        {/* Refined Image Overlay */}
        <Box
          position="absolute"
          inset={3}
          borderRadius="2xl"
          bgGradient="linear(to-t, blackAlpha.600, transparent)"
          opacity={0.4}
        />
      </Box>

      <Stack spacing={3} p={6} pt={2} textAlign="center">
        <Heading 
          size="lg" 
          fontWeight="800" 
          letterSpacing="wider" 
          color={styles.heading}
        >
          {nameClient}
        </Heading>
        <Text fontSize="md" color={styles.secondaryText} fontWeight="500">
          {descClient}
        </Text>
      </Stack>
    </Box>
  );
});

ClientCard.displayName = "ClientCard";
export default ClientCard;
