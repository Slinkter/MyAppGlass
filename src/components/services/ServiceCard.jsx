import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import FadingImage from "@/components/common/FadingImage";

/**
 * ServiceCard Component
 * Muestra una tarjeta de servicio con imagen, título y enlace al catálogo.
 */
const ServiceCard = React.memo(({ image, name, plink }) => {
  // Configuración de colores y estilos para Glassmorphism
  const styles = {
    border: useColorModeValue(
      "rgba(255, 255, 255, 0.25)",
      "rgba(0, 0, 0, 0.25)"
    ),
    bg: useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)"),
    text: useColorModeValue("gray.800", "gray.100"),
    btnBg: useColorModeValue(
      "rgba(193, 20, 20, 0.13)",
      "rgba(193, 20, 20, 0.13)"
    ),
    btnText: useColorModeValue("red.700", "red.300"),
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
      borderColor={styles.border}
      boxShadow="lg"
      color={styles.text}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "xl",
        color: "red.500",
      }}
    >
      <FadingImage
        w="full"
        h={{ base: "320px", md: "385px" }}
        src={image}
        alt={`Servicio de ${name}`}
        objectFit="cover"
      />

      <Stack p={{ base: 4, md: 6 }} spacing={3} textAlign="left">
        <Heading as="h3" size="md" fontWeight="600" textTransform="uppercase">
          {name}
        </Heading>

        <Button
          as={RouterLink}
          to={plink}
          rightIcon={<ArrowForwardIcon />}
          bg={styles.btnBg}
          color={styles.btnText}
          aria-label={`Ver catálogo de ${name}`}
          width="full"
          _hover={{
            bg: "red.600",
            color: "white",
          }}
        >
          Catálogo
        </Button>
      </Stack>
    </Box>
  );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
