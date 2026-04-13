/**
 * @file ProjectCardContent.jsx
 * @description Refactored project card content to match the unified design of ClientCard and ServiceCard.
 * Features a full-body image, dark overlay, and bottom-centered text for visual coherence.
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Text,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Button,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { MapPin } from "lucide-react";

/**
 * @component ProjectCardContent
 * @description Presentational component for the project card visual structure.
 */
const ProjectCardContent = React.memo(
  ({ image = "", residencial, address, year, onOpenModal, isLCP }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Determines if we should force visibility on mobile
    const isMobile = useBreakpointValue({ base: true, md: false });

    // Presentational gradient — intentionally hardcoded dark overlay (not mode-dependent)
    const bgOverlay =
      "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)";

    return (
      <LinkBox
        as="article"
        role="group"
        cursor="pointer"
        position="relative"
        h={{ base: "320px", md: "500px" }}
        w="full"
        borderRadius="xl"
        overflow="hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        _hover={{
          boxShadow: { md: "2xl" },
          transform: { base: "none", md: "translateY(-4px)" },
        }}
        transition="all 0.4s ease"
      >
        <Skeleton isLoaded={isLoaded} h="full" w="full">
          <Box position="relative" h="full" w="full" overflow="hidden">
            <ResponsiveImage
              src={image}
              alt={`Vista del proyecto: ${residencial}`}
              objectFit="cover"
              w="100%"
              h="100%"
              loading={isLCP ? "eager" : "lazy"}
              decoding={isLCP ? "sync" : "async"}
              onLoad={() => setIsLoaded(true)}
              transform={isHovered ? "scale(1.06)" : "scale(1.02)"}
              transition="transform 0.6s ease"
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
              zIndex={2}
            >
              <Heading
                as="h3"
                color={isHovered ? "primary.300" : "white"}
                fontSize={{ base: "md", md: "xl" }}
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
                textAlign="center"
                position="relative"
                transition="color 0.3s ease"
                noOfLines={1}
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: isLoaded ? "40px" : "0",
                  height: "2px",
                  bg: isHovered ? "primary.300" : "white",
                  transition: "width 0.4s ease, background 0.3s ease",
                }}
              >
                <LinkOverlay
                  as="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenModal();
                  }}
                  _focusVisible={{
                    outline: "none",
                  }}
                >
                  {residencial}
                </LinkOverlay>
              </Heading>

              <VStack
                spacing={4}
                w="full"
                mt={6}
                opacity={isHovered ? 1 : (isMobile ? 1 : 0)}
                transform={isHovered ? "translateY(0)" : (isMobile ? "translateY(0)" : "translateY(10px)")}
                transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                <HStack justify="center" spacing={3} w="full">
                  <HStack spacing={1}>
                    <Icon as={MapPin} w={3.5} h={3.5} color="primary.300" />
                    <Text
                      fontSize="xs"
                      color="whiteAlpha.900"
                      fontWeight="500"
                      noOfLines={1}
                    >
                      {address}
                    </Text>
                  </HStack>
                  <Box w="1px" h="3" bg="whiteAlpha.400" />
                  <Text fontSize="xs" color="whiteAlpha.900" fontWeight="500">
                    {year}
                  </Text>
                </HStack>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenModal();
                  }}
                  variant="outline"
                  size="sm"
                  color="white"
                  borderColor="whiteAlpha.400"
                  _hover={{ 
                    bg: "white", 
                    color: "primary.900",
                    borderColor: "white"
                  }}
                  textTransform="uppercase"
                  fontSize="10px"
                  fontWeight="bold"
                  letterSpacing="widest"
                  px={8}
                  borderRadius="full"
                >
                  Detalles Obra
                </Button>
              </VStack>
            </Box>
          </Box>
        </Skeleton>
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
