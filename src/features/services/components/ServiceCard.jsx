import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import FadingImage from "@shared/components/common/FadingImage";

/**
 * @component ServiceCard
 * @description Tarjeta de servicio con imagen full-body y botón flotante centrado.
 * Diseño minimalista sin flechas, enfocado en la imagen y el título claro.
 */
const ServiceCard = React.memo(({ image, name, plink, preloaded }) => {
  // Estilos del Botón Flotante
  const buttonBg = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(20, 20, 20, 0.8)",
  );
  const buttonHoverBg = useColorModeValue("white", "black");
  const textColor = useColorModeValue("primary.800", "primary.200");

  return (
    <LinkBox
      as="article"
      position="relative"
      h={{ base: "300px", md: "480px" }}
      borderRadius="2xl"
      overflow="hidden"
      role="group"
      boxShadow="lg"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "2xl",
        transform: "translateY(-4px)",
      }}
    >
      {/* 1. Imagen de Fondo Full */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        transition="transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        _groupHover={{
          transform: "scale(1.05)",
        }}
      >
        <FadingImage
          src={image}
          alt={`${name} en La Molina - GYA Company | Instalación profesional`}
          objectFit="cover"
          w="100%"
          h="100%"
          showOverlay={false}
          forceShow={preloaded}
        />
        {/* Overlay degradado inferior para asegurar contraste del botón si la imagen es clara */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="100%"
          h="30%"
          bgGradient="linear(to-t, blackAlpha.400, transparent)"
        />
      </Box>

      {/* 2. Botón Flotante Centrado con Texto */}
      <Box
        position="absolute"
        bottom={6}
        left={4}
        right={4}
        zIndex={2}
        display="flex"
        justifyContent="center"
      >
        <Button
          w="full"
          maxW="200px" // Ancho máximo para que no se vea exagerado en desktop
          h="auto"
          py={3}
          bg={buttonBg}
          backdropFilter="blur(8px)"
          justifyContent="center"
          alignItems="center"
          borderRadius="full" // Botón píldora para estética más moderna
          boxShadow="lg"
          _groupHover={{
            bg: buttonHoverBg,
            transform: "translateY(-2px)",
            boxShadow: "xl",
          }}
          transition="all 0.3s ease"
        >
          <LinkOverlay
            as={RouterLink}
            to={plink}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="full"
          >
            <Text
              color={textColor}
              fontWeight="bold"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="widest" // Espaciado elegante
              noOfLines={1}
              textAlign="center"
            >
              {name}
            </Text>
          </LinkOverlay>
        </Button>
      </Box>
    </LinkBox>
  );
});

ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  plink: PropTypes.string.isRequired,
  preloaded: PropTypes.bool,
};

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
