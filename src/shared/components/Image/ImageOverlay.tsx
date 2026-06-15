import React from "react";
import {
  Box,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";
import { LuArrowRight } from "react-icons/lu";
import RouterLink from "next/link";

interface ImageOverlayProps {
  name: string;
  plink: string;
}

/**
 * @component ImageOverlay
 * @description Overlay interactivo que aparece al pasar el ratón sobre imagen
 */
const ImageOverlay: React.FC<ImageOverlayProps> = React.memo(({ name, plink }) => {
  const overlayBg = useColorModeValue(
    "linear-gradient(to top, rgba(240, 240, 240, 0.95), rgba(255,255,255,0))",
    "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))",
  );
  
  // Note: Standard text colors now typically use semantic tokens from theme: text.body, text.heading
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
        p={{ base: "6", md: "6" }}
        gap="4"
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
          {...({ href: plink } as any)}
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
          <LuArrowRight style={{ marginLeft: "8px" }} />
        </Button>
      </Stack>
    </>
  );
});

ImageOverlay.displayName = "ImageOverlay";

export default ImageOverlay;
