import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import FadingImage from "@shared/components/common/FadingImage";

import { m } from "framer-motion";

/**
 * @component ServiceCard
 * @description Tarjeta de servicio con imagen full-body y botón flotante centrado.
 * Diseño minimalista con alta fidelidad, estandarizado con ProjectCard.
 */
const ServiceCard = React.memo(({ image, name, plink, preloaded }) => {
  // Advanced High-Fidelity Color Palette
  const glassBg = useColorModeValue(
    "rgba(255, 255, 255, 0.75)",
    "rgba(15, 15, 15, 0.70)",
  );
  const glassBorder = useColorModeValue(
    "rgba(255, 255, 255, 0.5)",
    "rgba(255, 255, 255, 0.08)",
  );
  const textColor = useColorModeValue("primary.800", "primary.200");
  const cardShadow = useColorModeValue(
    "0 10px 30px -10px rgba(0,0,0,0.1)",
    "0 20px 40px -20px rgba(0,0,0,0.5)",
  );

  return (
    <LinkBox
      as={m.article}
      position="relative"
      h={{ base: "320px", md: "520px" }}
      w="full"
      borderRadius="3xl"
      overflow="hidden"
      role="group"
      boxShadow={cardShadow}
      initial="initial"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* 1. High-Fidelity Background Image with Smooth Scale */}
      <Box
        as={m.div}
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.08 },
        }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
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
        {/* Dynamic Gradient Overlay */}
        <Box
          as={m.div}
          position="absolute"
          inset="0"
          bgGradient="linear(to-t, blackAlpha.800, transparent, transparent)"
          variants={{
            initial: { opacity: 0.4 },
            hover: { opacity: 0.6 },
          }}
        />
      </Box>

      {/* 2. Floating High-Fidelity Pill Button */}
      <Box
        position="absolute"
        bottom={8}
        left={6}
        right={6}
        zIndex={2}
        display="flex"
        justifyContent="center"
      >
        <Box
          as={m.div}
          w="full"
          maxW="240px"
          bg={glassBg}
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor={glassBorder}
          borderRadius="full"
          py={4}
          px={6}
          variants={{
            initial: { y: 0, opacity: 0.9, scale: 1 },
            hover: { y: -8, opacity: 1, scale: 1.05 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          boxShadow="2xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
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
              fontWeight="800"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="0.2em"
              noOfLines={1}
              textAlign="center"
            >
              {name}
            </Text>
          </LinkOverlay>
        </Box>
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
