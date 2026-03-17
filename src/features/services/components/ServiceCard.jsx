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
  Fade,
  SlideFade,
  ScaleFade,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

/**
 * @component ServiceCard
 * @description Tarjeta de servicio con imagen full-body, descripción y botón flotante centrado.
 * Diseño minimalista sin flechas, enfocado en la imagen, título y descripción clara.
 */
const ServiceCard = React.memo((props) => {
  /*  */

  const { image, name, plink } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);

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
      borderRadius="2xl"
      overflow="hidden"
      role="group"
      boxShadow="lg"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      _hover={{
        boxShadow: "2xl",
        transform: "translateY(-6px)",
      }}
    >
      {/* 1. Imagen de Fondo Full */}
      <Box
        position="absolute"
        inset="0"
        transition="transform 0.8s ease-in-out"
        _groupHover={{ transform: "scale(1.1)" }}
      >
        <Fade in={isLoaded} style={{ height: "100%" }}>
          <Image
            src={image}
            alt={name}
            objectFit="cover"
            w="100%"
            h="100%"
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
          />
        </Fade>

        {/* Gradiente sutil para profundidad */}
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-t, blackAlpha.800, transparent)"
          opacity={0.6}
          transition="opacity 0.3s ease"
          _groupHover={{ opacity: 0.8 }}
        />
      </Box>

      {/* 2. Botón Flotante Centrado con Texto Animado */}
      <Box
        position="absolute"
        bottom={4}
        left={4}
        right={4}
        zIndex={2}
        display="flex"
        justifyContent="center"
      >
        <SlideFade in={isLoaded} offsetY="20px">
          <Button
            w="full"
            maxW="240px"
            h="auto"
            py={{ base: 3, md: 4 }}
            px={8}
            bg={styles.buttonBg}
            backdropFilter="blur(12px)"
            justifyContent="center"
            alignItems="center"
            borderRadius="xl"
            boxShadow="md"
            _groupHover={{
              bg: styles.buttonHoverBg,
              transform: "translateY(-4px)",
              boxShadow: "xl",
            }}
            transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
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
        </SlideFade>
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
