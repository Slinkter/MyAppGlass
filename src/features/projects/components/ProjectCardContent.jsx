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
  LinkBox,
  LinkOverlay,
  Fade,
  SlideFade,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const ProjectCardContent = ({ image = "", residencial, address, year, onOpenModal, isLCP }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

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
      transition={{ base: "all 0.2s ease", md: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
      _hover={{
        boxShadow: { base: "lg", md: "2xl" },
        transform: { base: "none", md: "translateY(-6px)" },
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
        <Fade in={isLoaded} style={{ height: "100%" }}>
          <ResponsiveImage
            src={image}
            alt={`Obra ${residencial}`}
            objectFit="cover"
            w="100%"
            h="100%"
            loading={isLCP ? "eager" : "lazy"}
            decoding={isLCP ? "sync" : "async"}
            onLoad={() => setIsLoaded(true)}
            transition="opacity 0.4s ease-in"
          />
        </Fade>
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
          opacity={{ base: 0.4, md: 0.5 }}
          transition="opacity 0.3s"
          _groupHover={{ opacity: { base: 0.4, md: 0.7 } }}
        />
      </Box>

      {/* 2. Información Flotante */}
      <Box position="absolute" bottom={4} left={4} right={4} zIndex={2}>
        <SlideFade in={isLoaded} offsetY="20px">
          <VStack
            bg={styles.pillBg}
            py={{ base: 3, md: 4 }}
            px={4}
            borderRadius="xl"
            spacing={1}
            align="center"
            boxShadow="md"
            transition={{ base: "all 0.2s ease", md: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
            _groupHover={{
              bg: styles.pillHoverBg,
              transform: { base: "none", md: "translateY(-4px)" },
              boxShadow: { base: "md", md: "xl" },
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
                mb={1}
              >
                {residencial}
              </Heading>
            </LinkOverlay>

            <HStack justify="center" w="full" spacing={4} pt={0.5}>
              <HStack
                spacing={1}
                maxW={{ base: "100%", md: "65%" }}
                justify="center"
              >
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
                  lineHeight="shorter"
                >
                  {address}
                </Text>
              </HStack>

              <HStack spacing={1.5} display={{ base: "none", md: "flex" }}>
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
        </SlideFade>
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
  isLCP: PropTypes.bool,
};

export default ProjectCardContent;
