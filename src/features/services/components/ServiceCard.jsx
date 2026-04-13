/**
 * @file ServiceCard.jsx
 * @description Responsive service card that becomes fully clickable on mobile devices.
 * Features a full-body image, dark overlay, and bottom-centered text.
 * @module services/components
 */

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  LinkBox,
  LinkOverlay,
  Text,
  Skeleton,
  useBreakpointValue,
  Button,
  VStack,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { Link as RouterLink } from "react-router-dom";

/**
 * @component ServiceCard
 * @description Service card that adapts its clickable area for mobile vs. desktop.
 * On mobile, the entire card is a link. On desktop, only the title is the primary link.
 */
const ServiceCard = React.memo((props) => {
  const { image, name, description, plink, onLoadComplete, index, loading = "lazy" } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Expands the clickable area on mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleImageLoad = React.useCallback(() => {
    setIsLoaded(true);
    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [onLoadComplete]);

  // Presentational gradient — intentionally hardcoded dark overlay (not mode-dependent)
  const bgOverlay =
    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)";

  return (
    <LinkBox
      as="article"
      role="group"
      cursor="pointer"
      position="relative"
      h={{ base: "320px", md: "500px" }}
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
            alt={`Servicio de ${name} - GYA Glass & Aluminum`}
            objectFit="cover"
            w="100%"
            h="100%"
            loading={loading}
            decoding="async"
            onLoad={handleImageLoad}
            isLCP={index < 3}
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
          >
            <Text
              color={isHovered ? "primary.300" : "white"}
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="600"
              textTransform="uppercase"
              letterSpacing="wider"
              textAlign="center"
              position="relative"
              zIndex={1} // Ensure title is above the mobile overlay
              transition="color 0.3s ease"
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
              {isMobile ? (
                 name 
              ) : (
                <LinkOverlay as={RouterLink} to={plink}>
                  {name}
                </LinkOverlay>
              )}
            </Text>

            <VStack
              mt={6}
              spacing={4}
              opacity={isHovered ? 1 : (isMobile ? 1 : 0)}
              transform={isHovered ? "translateY(0)" : (isMobile ? "translateY(0)" : "translateY(10px)")}
              transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              w="full"
            >
              <Button
                as={RouterLink}
                to={plink}
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
                fontSize="xs"
                letterSpacing="widest"
                px={8}
                borderRadius="full"
              >
                Ver Catálogo
              </Button>
            </VStack>
          </Box>
        </Box>
      </Skeleton>
      
      {/* Mobile-only full-card link overlay */}
      {isMobile && <LinkOverlay as={RouterLink} to={plink} aria-label={`Ver servicio ${name}`} />}
    </LinkBox>
  );
});

ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  plink: PropTypes.string.isRequired,
  index: PropTypes.number,
  onLoadComplete: PropTypes.func,
  loading: PropTypes.string,
};

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
