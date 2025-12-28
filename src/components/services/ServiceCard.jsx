import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import FadingImage from "@/components/common/FadingImage";

/**
 * @component ServiceCard
 * @description Muestra una tarjeta individual de servicio con imagen, título y enlace al catálogo.
 * Utiliza estilos de glassmorphism consistentes con el resto de la aplicación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.image - URL de la imagen del servicio.
 * @param {string} props.name - Nombre del servicio.
 * @param {string} props.plink - Enlace a la página de detalle del servicio.
 * @returns {JSX.Element} Tarjeta de servicio renderizada.
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
    btnText: useColorModeValue("primary.700", "primary.300"),
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
      transition="transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "xl",
        color: "primary.500",
      }}
    >
      <FadingImage
        w="full"
        h={{ base: "320px", md: "385px" }}
        src={image}
        alt={`Servicio de ${name}`}
        objectFit="cover"
        name={name}
        plink={plink}
        styles={styles}
      />
    </Box>
  );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
