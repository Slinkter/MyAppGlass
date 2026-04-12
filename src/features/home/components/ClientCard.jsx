/**
 * @file ClientCard.jsx
 * @description Ultra-minimal card for client segments with image and centered name.
 * Hover accent color uses the text.accent semantic token.
 * @module home/components
 */

import React from "react";
import {
  Box,
  Text,
  LinkBox,
  LinkOverlay,
  Fade,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";

/**
 * @component ClientCard
 * @description Tarjeta de cliente con imagen de fondo y nombre superpuesto.
 * @param {Object} props
 * @param {string} props.image - URL de la imagen de fondo.
 * @param {string} props.nameClient - Nombre del cliente.
 * @param {string} props.descClient - Descripción breve del cliente.
 * @returns {JSX.Element}
 */
const ClientCard = React.memo(({ image, nameClient, descClient }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Presentational gradient — intentionally hardcoded dark overlay (not mode-dependent)
  const bgOverlay =
    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)";

  return (
    <LinkBox
      as="article"
      role="group"
      cursor="pointer"
      position="relative"
      h={{ base: "300px", md: "400px" }}
      borderRadius="xl"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={{
        boxShadow: { md: "2xl" },
      }}
      transition="box-shadow 0.4s ease"
    >
      <Fade in={isLoaded} style={{ height: "100%" }}>
        <Box position="relative" h="full" w="full" overflow="hidden">
          <ResponsiveImage
            src={image}
            alt={nameClient}
            objectFit="cover"
            w="100%"
            h="100%"
            loading="eager"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            transform="scale(1.02)"
            transition="transform 0.6s ease"
            _groupHover={{ transform: "scale(1.06)" }}
          />

          <Box position="absolute" inset="0" bgGradient={bgOverlay} />

          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Text
              color={isHovered ? "text.accent" : "white"}
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="600"
              textTransform="uppercase"
              letterSpacing="wider"
              textAlign="center"
              position="relative"
              transition="color 0.3s ease"
              _after={{
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: isLoaded ? "40px" : "0",
                height: "2px",
                bg: isHovered ? "text.accent" : "white",
                transition: "width 0.4s ease, background 0.3s ease",
              }}
            >
              {nameClient}
            </Text>

            <Text
              color="whiteAlpha.800"
              fontSize="xs"
              textAlign="center"
              mt={4}
              opacity={isHovered ? 1 : 0}
              transition="opacity 0.3s ease"
              noOfLines={2}
            >
              {descClient}
            </Text>
          </Box>
        </Box>
      </Fade>

      <LinkOverlay />
    </LinkBox>
  );
});

ClientCard.displayName = "ClientCard";

export default ClientCard;
