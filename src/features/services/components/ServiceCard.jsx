import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Button,
  Text,
  Fade,
  SlideFade,
  Skeleton,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { Link as RouterLink } from "react-router-dom";

/**
 * @component ServiceCard
 * @description Tarjeta de servicio con imagen full-body, descripción y botón flotante centrado.
 * Diseño minimalista sin flechas, enfocado en la imagen, título y descripción clara.
 */
const ServiceCard = React.memo((props) => {
  const { image, name, plink, onLoadComplete, index } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleImageLoad = React.useCallback(() => {
    setIsLoaded(true);
    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [onLoadComplete]);

  const styles = {
    buttonBg: useColorModeValue(
      "white",
      "primary.800",
    ),
    buttonHoverBg: useColorModeValue("gray.50", "primary.700"),
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
      boxShadow="md"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "xl",
        transform: { base: "none", md: "translateY(-4px)" },
      }}
    >
      {/* 1. Imagen de Fondo Full con Skeleton */}
      <Skeleton isLoaded={isLoaded} h="full" w="full">
        <Box
          position="absolute"
          inset="0"
          transition="transform 0.8s ease-in-out"
          _groupHover={{ transform: "scale(1.1)" }}
        >
          <Fade in={isLoaded} style={{ height: "100%" }}>
            <ResponsiveImage
              src={image}
              alt={name}
              objectFit="cover"
              w="100%"
              h="100%"
              loading="lazy"
              decoding="async"
              onLoad={handleImageLoad}
              isLCP={index < 3}
            />
          </Fade>

          {/* Gradiente sutil para profundidad */}
          <Box
            position="absolute"
            inset="0"
            bgGradient="linear(to-t, blackAlpha.700, transparent)"
            opacity={{ base: 0.5, md: 0.6 }}
            transition="opacity 0.3s ease"
            _groupHover={{ opacity: { base: 0.6, md: 0.8 } }}
          />
        </Box>
      </Skeleton>

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
        <SlideFade in={isLoaded} offsetY={{ base: "0px", md: "20px" }}>
          <Button
            w="full"
            maxW="240px"
            h="auto"
            py={{ base: 3, md: 4 }}
            px={8}
            bg={styles.buttonBg}
            justifyContent="center"
            alignItems="center"
            borderRadius="xl"
            boxShadow="md"
            _groupHover={{
              bg: styles.buttonHoverBg,
              boxShadow: "lg",
              color: styles.textColor,
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
  index: PropTypes.number,
};

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
