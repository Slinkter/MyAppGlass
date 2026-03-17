import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

/**
 * @component ServiceCard
 * @description Tarjeta de servicio con imagen full-body, descripción y botón flotante centrado.
 * Diseño minimalista sin flechas, enfocado en la imagen, título y descripción clara.
 */
const ServiceCard = React.memo((props) => {
  /*  */

  const { image, name, plink, preloaded } = props;

  const styles = {
    buttonBg: useColorModeValue(
      "rgba(255, 255, 255, 0.95)",
      "rgba(20, 20, 20, 0.85)",
    ),
    buttonHoverBg: useColorModeValue("white", "black"),
    textColor: useColorModeValue("primary.800", "primary.200"),
  };

  return (
    <LinkBox
      as="article"
      position="relative"
      h={{ base: "280px", md: "420px" }}
      borderRadius="xl"
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
        <Image
          src={image}
          alt={`Servicio de ${name}`}
          objectFit="cover"
          w="100%"
          h="100%"
          // Optimizaciones nativas: carga directa para imágenes locales
          loading={props.loading || "lazy"}
          decoding="async"
          fallbackStrategy="beforeLoadOrError"
          transition="opacity 0.4s ease-in"
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
          bg={styles.buttonBg}
          backdropFilter="blur(8px)"
          justifyContent="center"
          alignItems="center"
          borderRadius="full" // Botón píldora para estética más moderna
          boxShadow="lg"
          _groupHover={{
            bg: styles.buttonHoverBg,
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
              color={styles.textColor}
              fontWeight="bold"
              fontSize={{ base: "xs", md: "sm" }}
              textTransform="uppercase"
              letterSpacing="widest"
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
  description: PropTypes.string,
  plink: PropTypes.string.isRequired,
  preloaded: PropTypes.bool,
};

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
