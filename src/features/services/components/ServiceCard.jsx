/**
 * @file ServiceCard.jsx
 * @description Minimal card with accent border on hover.
 */

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Text,
  VStack,
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

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const accentColor = useColorModeValue("primary.500", "primary.400");
  const titleColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.500", "gray.400");

  return (
    <LinkBox
      as="article"
      role="group"
      cursor="pointer"
      position="relative"
      h={{ base: "280px", md: "320px" }}
      borderRadius="xl"
      overflow="hidden"
      bg={cardBg}
      border="2px solid"
      borderColor={isHovered ? accentColor : borderColor}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition="border-color 0.25s ease"
      _hover={{
        borderColor: accentColor,
      }}
    >
      <Fade in={isLoaded} style={{ height: "100%" }}>
        <Box position="relative" h="65%" overflow="hidden">
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
            transition="transform 0.5s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />

          <Box
            position="absolute"
            inset="0"
            bgGradient="linear(to-t, blackAlpha.400, transparent 40%)"
          />
        </Box>

        <VStack
          h="35%"
          p={4}
          spacing={1}
          justify="center"
          align="flex-start"
        >
          <Text
            color={titleColor}
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="wide"
            noOfLines={1}
          >
            {name}
          </Text>

          <Text
            color={textColor}
            fontSize="xs"
            letterSpacing="normal"
            textTransform="uppercase"
          >
            {isHovered ? "Ver servicio →" : ""}
          </Text>
        </VStack>
      </Fade>

      <Box
        position="absolute"
        top={0}
        left={0}
        w="4px"
        h="100%"
        bg={accentColor}
        transform={isHovered ? "scaleY(1)" : "scaleY(0)"}
        transformOrigin="top"
        transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      />

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
