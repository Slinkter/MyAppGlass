/**
 * @file ProjectCardContent.jsx
 * @description Diseño premium para la tarjeta de proyecto con optimización LCP y accesibilidad.
 */

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Text,
  HStack,
  Icon,
  useColorModeValue,
  VStack,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const ProjectCardContent = ({
  image = "",
  residencial,
  address,
  year,
  onOpenModal,
}) => {
  const styles = {
    pillBg: useColorModeValue(
      "rgba(255, 255, 255, 0.95)",
      "rgba(20, 20, 20, 0.90)",
    ),
    pillHoverBg: useColorModeValue("white", "black"),
    headingColor: useColorModeValue("primary.800", "primary.200"),
    textColor: useColorModeValue("gray.600", "gray.300"),
    iconColor: useColorModeValue("primary.500", "primary.400"),
    dateColor: useColorModeValue("gray.500", "gray.400"),
  };

  return (
    <LinkBox
      as="article"
      position="relative"
      h={{ base: "280px", md: "420px" }}
      w="full"
      borderRadius="2xl"
      overflow="hidden"
      role="group"
      boxShadow="lg"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      _hover={{
        boxShadow: "2xl",
        transform: "translateY(-6px)",
      }}
      cursor="pointer"
      _focusVisible={{
        outline: "none",
        ring: "3px",
        ringColor: "primary.500",
        ringOffset: "2px",
      }}
    >
      {/* 1. Imagen Full Optimized */}
      <Box
        position="absolute"
        inset="0"
        transition="transform 0.8s ease-out"
        _groupHover={{ transform: "scale(1.1)" }}
      >
        <Image
          src={image}
          alt={`Obra ${residencial}`}
          objectFit="cover"
          w="100%"
          h="100%"
          loading="lazy"
          decoding="async"
          transition="opacity 0.4s ease-in"
        />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
          opacity={0.5}
          transition="opacity 0.3s"
          _groupHover={{ opacity: 0.7 }}
        />
      </Box>

      {/* 2. Información Flotante */}
      <Box position="absolute" bottom={4} left={4} right={4} zIndex={2}>
        <VStack
          bg={styles.pillBg}
          backdropFilter="blur(12px)"
          py={{ base: 2, md: 3 }}
          px={4}
          borderRadius="xl"
          spacing={{ base: 1, md: 2 }}
          align="stretch"
          boxShadow="md"
          transition="all 0.3s ease"
          _groupHover={{
            bg: styles.pillHoverBg,
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          <LinkOverlay
            as="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenModal();
            }}
            w="full"
          >
            <Heading
              size="xs"
              color={styles.headingColor}
              textTransform="uppercase"
              fontWeight="bold"
              letterSpacing="wider"
              noOfLines={1}
              textAlign="center"
            >
              {residencial}
            </Heading>
          </LinkOverlay>

          <HStack justify="space-around" w="full" pt={0.5}>
            <HStack spacing={1.5} maxW="65%">
              <Icon
                as={MapPinIcon}
                w={3.5}
                h={3.5}
                color={styles.iconColor}
                flexShrink={0}
              />
              <Text
                fontSize="xs"
                color={styles.textColor}
                fontWeight="semibold"
                noOfLines={1}
              >
                {address}
              </Text>
            </HStack>

            <HStack spacing={1.5}>
              <Icon
                as={CalendarDaysIcon}
                w={3.5}
                h={3.5}
                color={styles.dateColor}
                flexShrink={0}
              />
              <Text
                fontSize="xs"
                color={styles.dateColor}
                fontWeight="medium"
                whiteSpace="nowrap"
              >
                {year}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </LinkBox>
  );
};

ProjectCardContent.propTypes = {
  image: PropTypes.string,
  residencial: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ProjectCardContent;
