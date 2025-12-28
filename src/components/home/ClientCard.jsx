import React from "react";
import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import FadingImage from "@/components/common/FadingImage";

/**
 * @component ClientCard
 * @description Muestra una tarjeta de cliente/testimonio con imagen y descripción.
 * Utiliza efectos de desenfoque (glassmorphism) y animaciones hover.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.image - URL de la imagen del cliente.
 * @param {string} props.nameClient - Nombre del cliente o empresa.
 * @param {string} props.descClient - Descripción o testimonio.
 * @returns {JSX.Element} Tarjeta de cliente renderizada.
 */
const ClientCard = React.memo(({ image, nameClient, descClient }) => {
  // Configuración centralizada de estilos
  const styles = {
    bg: useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)"),
    border: useColorModeValue(
      "rgba(255, 255, 255, 0.52)",
      "rgba(255, 255, 255, 0.15)"
    ),
    text: useColorModeValue("gray.800", "gray.100"),
    icon: useColorModeValue("gray.500", "gray.400"),
    heading: useColorModeValue("primary.700", "primary.300"),
    btnBg: useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(0, 0, 0, 0.4)"),
    btnHover: useColorModeValue(
      "rgba(255, 255, 255, 0.6)",
      "rgba(0, 0, 0, 0.6)"
    ),
  };

  return (
    <Box
      w="full"
      maxW={{ base: "full", md: "md" }}
      h="auto"
      mb={4}
      overflow="hidden"
      bg={styles.bg}
      backdropFilter="blur(10px)"
      borderRadius="2xl"
      boxShadow="lg"
      color={styles.text}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "xl",
      }}
    >
      <Box p={2}>
        <FadingImage
          w="full"
          h={{ base: "260px", md: "375px" }}
          src={image}
          alt={`Imagen de ${nameClient}`}
          rounded="lg"
          objectFit="cover"
          shadow="lg"
          showOverlay={false}
        />
      </Box>

      <Stack spacing={3} p={6} pt={2} textAlign="center">
        <Heading size="lg">{nameClient}</Heading>
        <Text fontSize="md" color={styles.secondaryText}>
          {descClient}
        </Text>
      </Stack>
    </Box>
  );
});

ClientCard.displayName = "ClientCard";
export default ClientCard;
