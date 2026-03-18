/**
 * @file ServiceCard.jsx
 * @description Minimalist service card with clean design, focus on content.
 * @module services/components
 */

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Text,
  Fade,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { Link as RouterLink } from "react-router-dom";

const ServiceCard = React.memo((props) => {
  const { image, name, plink, onLoadComplete, index } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleImageLoad = React.useCallback(() => {
    setIsLoaded(true);
    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [onLoadComplete]);

  const textColor = useColorModeValue("white", "white");
  const titleBgColor = useColorModeValue(
    "rgba(0, 0, 0, 0.6)",
    "rgba(0, 0, 0, 0.7)"
  );

  return (
    <LinkBox
      as="article"
      position="relative"
      h={{ base: "280px", md: "420px" }}
      borderRadius="xl"
      overflow="hidden"
      role="group"
      cursor="pointer"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: { base: "none", md: "xl" },
      }}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
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
            transition="transform 0.6s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />

          <Box
            position="absolute"
            inset="0"
            bgGradient="linear(to-t, blackAlpha.900 0%, blackAlpha.600 40%, transparent 100%)"
          />

          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p={6}
            bg={titleBgColor}
          >
            <Text
              color={textColor}
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight="600"
              textTransform="uppercase"
              letterSpacing="wider"
              textAlign="center"
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
