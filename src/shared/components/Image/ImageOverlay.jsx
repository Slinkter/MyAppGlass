import React from "react";
import {
  Box,
  Heading,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

/**
 * @component ImageOverlay
 * @description Overlay interactivo que aparece al pasar el ratón sobre imagen
 * @param {Object} props - Props del componente
 * @param {string} props.name - Nombre/título a mostrar
 * @param {string} props.plink - Path del link
 */
const ImageOverlay = React.memo(({ name, plink }) => {
  const overlayBg = useColorModeValue(
    "linear-gradient(to top, rgba(240, 240, 240, 0.95), rgba(255,255,255,0))",
    "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))",
  );
  const headingColor = useColorModeValue("gray.800", "white");
  const buttonStyles = {
    bg: useColorModeValue("whiteAlpha.900", "whiteAlpha.200"),
    color: useColorModeValue("primary.600", "primary.300"),
    _hover: {
      bg: useColorModeValue("primary.600", "primary.500"),
      color: "white",
    },
  };

  return (
    <>
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg={overlayBg}
        zIndex={1}
        opacity={0}
        transition="opacity 0.3s ease-in-out"
        _groupHover={{ opacity: 0.9 }}
      />

      <Stack
        p={{ base: 4, md: 6 }}
        spacing={3}
        textAlign="center"
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        zIndex={2}
      >
        <Heading
          as="h3"
          size="md"
          fontWeight="600"
          textTransform="uppercase"
          color={headingColor}
          opacity={0}
          transform="translateY(20px)"
          transition="all 0.3s ease-out"
          _groupHover={{
            opacity: 1,
            transform: "translateY(0)",
          }}
        >
          {name}
        </Heading>

        <Button
          as={RouterLink}
          to={plink}
          rightIcon={<ArrowForwardIcon />}
          aria-label={`Ver catálogo de ${name}`}
          width="full"
          opacity={0}
          transform="translateY(20px)"
          transition="all 0.3s ease-out 0.1s"
          bg={buttonStyles.bg}
          color={buttonStyles.color}
          _hover={buttonStyles._hover}
          _groupHover={{
            opacity: 1,
            transform: "translateY(0)",
          }}
        >
          Catálogo
        </Button>
      </Stack>
    </>
  );
});

ImageOverlay.displayName = "ImageOverlay";

export default ImageOverlay;
