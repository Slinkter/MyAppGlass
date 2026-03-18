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
  Icon,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

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
      boxShadow={{ base: "none", md: "lg" }}
      transition={{ base: "all 0.2s ease", md: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
      _hover={{
        transform: { md: "translateY(-6px)" },
        outline: { base: "none", md: "2px solid" },
        outlineColor: { base: "transparent", md: "primary.400" },
        boxShadow: { base: "none", md: "0 0 30px rgba(72, 132, 206, 0.4)" },
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
          bgGradient={{ base: "linear(to-t, blackAlpha.700, transparent)", md: "linear(to-t, blackAlpha.800, transparent)" }}
          opacity={{ base: 0.5, md: 0.6 }}
          transition="opacity 0.3s ease"
          _groupHover={{ opacity: { base: 0.6, md: 0.8 } }}
        />
      </Box>

      {/* 3. Badge Decorativo */}
      <Box
        position="absolute"
        top={4}
        right={4}
        zIndex={3}
        opacity={0}
        transition="opacity 0.3s ease"
        _groupHover={{ opacity: { base: 0, md: 1 } }}
      >
        <Box
          bg={useColorModeValue("whiteAlpha.900", "blackAlpha.800")}
          backdropFilter="blur(8px)"
          p={2}
          borderRadius="lg"
          boxShadow="md"
        >
          <Icon as={SparklesIcon} w={5} h={5} color="primary.500" />
        </Box>
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
            justifyContent="center"
            alignItems="center"
            borderRadius="xl"
            boxShadow={{ base: "none", md: "md" }}
            _groupHover={{
              bg: styles.buttonHoverBg,
              transform: "translateY(-4px)",
              boxShadow: { base: "none", md: "xl" },
              color: styles.textColor,
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
                display="flex"
                alignItems="center"
                gap={2}
              >
                Ver más
                <Icon as={ArrowRightIcon} w={4} h={4} transition="transform 0.3s ease" _groupHover={{ transform: "translateX(4px)" }} />
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
