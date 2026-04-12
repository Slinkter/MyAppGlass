/**
 * @file ProjectCardContent.jsx
 * @description Minimalist project card with clean design and focus on imagery.
 */

import React from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Box,
  Heading,
  Text,
<<<<<<< HEAD
  Icon,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Fade,
  SlideFade,
  Skeleton,
=======
  HStack,
  VStack,
  Icon,
  LinkBox,
  LinkOverlay,
>>>>>>> origin/main
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { MapPinIcon } from "@heroicons/react/24/outline";

/**
 * @component ProjectCardContent
 * @description Presentational component for the project card visual structure.
 */
const ProjectCardContent = React.memo(
  ({ image = "", residencial, address, year, onOpenModal, isLCP }) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

<<<<<<< HEAD
  const styles = {
    pillBg: useColorModeValue(
      "white",
      "primary.800",
    ),
    pillHoverBg: useColorModeValue("gray.50", "primary.700"),
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
      boxShadow="md"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "xl",
        transform: { base: "none", md: "translateY(-4px)" },
      }}
      cursor="pointer"
      _focusVisible={{
        outline: "none",
        ring: "3px",
        ringColor: "primary.500",
        ringOffset: "2px",
      }}
    >
      {/* Badge Residencial / Comercial */}
      <Badge
        position="absolute"
        top={3}
        left={3}
        zIndex={2}
        colorScheme={residencial ? "blue" : "orange"}
        borderRadius="full"
        px={3}
        py={1}
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
        boxShadow="sm"
      >
        {residencial ? "Residencial" : "Comercial"}
      </Badge>

      {/* 1. Imagen Full Optimized con Skeleton */}
      <Skeleton isLoaded={isLoaded} h="full" w="full">
        <Box
          position="absolute"
          inset="0"
          transition="transform 0.8s ease-out"
          _groupHover={{ transform: "scale(1.1)" }}
        >
          <Fade in={isLoaded} style={{ height: "100%" }}>
            <ResponsiveImage
              src={image}
              alt={`Proyecto ${residencial} en ${address} - ${year}`}
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
      </Skeleton>

      {/* 2. Información Flotante */}
      <Box position="absolute" bottom={4} left={4} right={4} zIndex={2}>
        <SlideFade in={isLoaded} offsetY={{ base: "0px", md: "20px" }}>
          <Box
            bg={styles.pillBg}
            py={{ base: 3, md: 4 }}
            px={4}
            borderRadius="xl"
            boxShadow="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
            transition="all 0.3s ease"
            _groupHover={{
              bg: styles.pillHoverBg,
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
=======
    return (
      <LinkBox
        as="article"
        position="relative"
        h={{ base: "320px", md: "460px" }}
        w="full"
        borderRadius="2xl"
        overflow="hidden"
        role="group"
        cursor="pointer"
        bg="bg.subtle"
        boxShadow="sm"
        isolation="isolate"
        _hover={{
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        }}
        transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        _focusVisible={{
          outline: "none",
          ring: "3px",
          ringColor: "primary.500",
          ringOffset: "2px",
        }}
      >
        {/* Premium Image Layer - Rooted with inset to avoid layout gaps */}
        <Box
          position="absolute"
          inset={0}
          overflow="hidden"
          bg="bg.subtle"
          zIndex={0}
        >
          <ResponsiveImage
            src={image}
            alt={`Vista del proyecto: ${residencial}`}
            display="block"
            position="absolute"
            inset={0}
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center"
            loading={isLCP ? "eager" : "lazy"}
            decoding={isLCP ? "sync" : "async"}
            onLoad={() => setIsLoaded(true)}
            opacity={isLoaded ? 1 : 0}
            transition="opacity 0.6s ease-in-out, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease"
            filter="brightness(0.9)"
            transform="scale(1.02)"
            backfaceVisibility="hidden"
            willChange="transform, filter, opacity"
            _groupHover={{
              transform: "scale(1.1)",
              filter: "brightness(1.05)",
            }}
          />

          {/* Multi-layered gradient for depth */}
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
            pointerEvents="none"
            _groupHover={{ opacity: 0.9 }}
            transition="opacity 0.4s ease"
            zIndex={1}
          />
        </Box>

        {/* Content Layer (Glass) */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          m={4}
          p={5}
          bg="surface.footer"
          borderRadius="xl"
          border="1px solid"
          borderColor="border.glass"
          backdropFilter="blur(10px)"
          zIndex={2}
          transform="translateY(0)"
          transition="all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          _groupHover={{
            transform: "translateY(-12px)",
            bg: "surface.nav",
            borderColor: "primary.300",
            boxShadow: "xl",
            backdropFilter: "blur(16px)",
          }}
        >
          <VStack spacing={2} align="center">
            <Heading
              size="md"
              color="text.heading"
              textTransform="capitalize"
              fontWeight="700"
              letterSpacing="tight"
              noOfLines={1}
              textAlign="center"
              transition="color 0.3s ease"
              _groupHover={{ color: "text.accent" }}
>>>>>>> origin/main
            >
              {residencial}
            </Heading>

<<<<<<< HEAD
            <Box display="flex" justifyContent="center" w="full" gap={4} pt={0.5}>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                maxW={{ base: "100%", md: "65%" }}
              >
                <Icon
                  as={MapPinIcon}
                  w={3.5}
                  h={3.5}
                  color={styles.iconColor}
                  flexShrink={0}
                />
=======
            <HStack justify="center" spacing={2} w="full">
              <HStack spacing={1}>
                <Icon as={MapPinIcon} w={3.5} h={3.5} color="text.accent" />
>>>>>>> origin/main
                <Text
                  fontSize="xs"
                  color="text.muted"
                  fontWeight="600"
                  noOfLines={1}
                >
                  {address}
                </Text>
<<<<<<< HEAD
              </Box>

              <Box display={{ base: "none", md: "flex" }} alignItems="center" gap={1.5}>
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
              </Box>
            </Box>
          </Box>
        </SlideFade>
      </Box>
    </LinkBox>
  );
};
=======
              </HStack>
              <Box w="1px" h="3" bg="border.strong" opacity={0.5} />
              <HStack spacing={1}>
                <Text fontSize="xs" color="text.muted" fontWeight="500">
                  {year}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>

        {/* A11Y Link Overlay - Spans the entire card */}
        <LinkOverlay
          as="button"
          position="absolute"
          inset={0}
          zIndex={3}
          aria-label={`Ver detalles del proyecto ${residencial}`}
          onClick={(e) => {
            e.preventDefault();
            onOpenModal();
          }}
          _focusVisible={{
            outline: "none",
          }}
        />
      </LinkBox>
    );
  },
);
>>>>>>> origin/main

ProjectCardContent.propTypes = {
  image: PropTypes.string,
  residencial: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onOpenModal: PropTypes.func.isRequired,
  isLCP: PropTypes.bool,
};

ProjectCardContent.displayName = "ProjectCardContent";

export default ProjectCardContent;
