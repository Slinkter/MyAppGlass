/**
 * @file ServiceCard.jsx
 * @description Ultra-minimal card with image and centered name overlay.
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

  const bgOverlay = useColorModeValue(
    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)"
  );
  const textColor = "white";
  const hoverColor = useColorModeValue("red.500", "red.400");
  const hoverUnderlineColor = useColorModeValue("red.500", "red.400");

  return (
    <LinkBox
      as="article"
      role="group"
      cursor="pointer"
      position="relative"
      h={{ base: "300px", md: "400px" }}
      borderRadius="lg"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={{
        boxShadow: { md: "2xl" },
      }}
      transition="box-shadow 0.4s ease"
    >
      <Fade in={isLoaded} style={{ height: "100%" }}>
        <Box position="relative" h="full" w="full" overflow="hidden">
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
            transform="scale(1.02)"
            transition="transform 0.6s ease"
            _groupHover={{ transform: "scale(1.06)" }}
          />

          <Box position="absolute" inset="0" bgGradient={bgOverlay} />

          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color={isHovered ? hoverColor : textColor}
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="600"
              textTransform="uppercase"
              letterSpacing="wider"
              textAlign="center"
              position="relative"
              transition="color 0.3s ease"
              _after={{
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: isLoaded ? "40px" : "0",
                height: "2px",
                bg: isHovered ? hoverUnderlineColor : "white",
                transition: "width 0.4s ease, background 0.3s ease",
              }}
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
