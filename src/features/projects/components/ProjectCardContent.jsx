/**
 * @file ProjectCardContent.jsx
 * @description Minimalist project card with clean design and focus on imagery.
 */

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Icon,
  LinkBox,
  LinkOverlay,
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
            >
              {residencial}
            </Heading>

            <HStack justify="center" spacing={2} w="full">
              <HStack spacing={1}>
                <Icon as={MapPinIcon} w={3.5} h={3.5} color="text.accent" />
                <Text
                  fontSize="xs"
                  color="text.muted"
                  fontWeight="600"
                  noOfLines={1}
                >
                  {address}
                </Text>
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
