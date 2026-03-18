/**
 * @file ServiceCard.jsx
 * @description Full-bleed image card with bottom overlay for service names.
 */

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Text,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Fade,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { Link as RouterLink } from "react-router-dom";

const ServiceCard = React.memo((props) => {
  const { image, name, plink, onLoadComplete, index } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleImageLoad = React.useCallback(() => {
    setIsLoaded(true);
    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [onLoadComplete]);

  const overlayBg = useColorModeValue(
    "linear(to-t, rgba(0,0,0,0.85), rgba(0,0,0,0.6), transparent)",
    "linear(to-t, rgba(0,0,0,0.9), rgba(0,0,0,0.7), transparent)"
  );
  const titleColor = "white";
  const borderAccent = useColorModeValue("primary.400", "primary.300");

  return (
    <LinkBox
      as="article"
      role="group"
      cursor="pointer"
      position="relative"
      h={{ base: "280px", md: "380px" }}
      borderRadius="xl"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={{
        boxShadow: { md: "xl" },
      }}
      transition="box-shadow 0.3s ease"
    >
      <Fade in={isLoaded} style={{ height: "100%" }}>
        <Box position="relative" h="full" w="full">
          <ResponsiveImage
            src={image}
            alt={name}
            objectFit="cover"
            w="100%"
            h="100%"
            loading={index < 3 ? "eager" : "lazy"}
            decoding={index < 3 ? "sync" : "async"}
            onLoad={handleImageLoad}
            isLCP={index < 3}
            transition="transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            _groupHover={{ transform: "scale(1.06)" }}
          />

          <Box
            position="absolute"
            inset="0"
            bgGradient={overlayBg}
            transition="opacity 0.3s ease"
          />

          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            h="40%"
            bgGradient={overlayBg}
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={{ base: 4, md: 6 }}
          >
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              h="3px"
              bg={borderAccent}
              transform={isHovered ? "scaleX(1)" : "scaleX(0)"}
              transformOrigin="left"
              transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            />

            <Text
              color={titleColor}
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="wider"
              lineHeight="tall"
            >
              {name}
            </Text>
          </Box>
        </Box>
      </Fade>

      <LinkOverlay as={RouterLink} to={plink} />
    </LinkBox>
  );
});

ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  plink: PropTypes.string.isRequired,
  preloaded: PropTypes.bool,
  index: PropTypes.number,
};

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
