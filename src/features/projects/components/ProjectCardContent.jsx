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
  Icon,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Fade,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { MapPinIcon } from "@heroicons/react/24/outline";

const ProjectCardContent = ({ image = "", residencial, address, year, onOpenModal, isLCP }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const infoBgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(20, 20, 20, 0.85)"
  );
  const headingColor = useColorModeValue("primary.800", "primary.200");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const iconColor = useColorModeValue("primary.500", "primary.400");

  return (
    <LinkBox
      as="article"
      position="relative"
      h={{ base: "280px", md: "420px" }}
      w="full"
      borderRadius="xl"
      overflow="hidden"
      role="group"
      cursor="pointer"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: { base: "none", md: "xl" },
      }}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _focusVisible={{
        outline: "none",
        ring: "2px",
        ringColor: "primary.500",
        ringOffset: "2px",
      }}
    >
      <Fade in={isLoaded} style={{ height: "100%" }}>
        <Box position="relative" h="full" w="full">
          <ResponsiveImage
            src={image}
            alt={`Proyecto ${residencial}`}
            objectFit="cover"
            w="100%"
            h="100%"
            loading={isLCP ? "eager" : "lazy"}
            decoding={isLCP ? "sync" : "async"}
            onLoad={() => setIsLoaded(true)}
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
            bg={infoBgColor}
          >
            <Heading
              size="sm"
              color={headingColor}
              textTransform="uppercase"
              fontWeight="600"
              letterSpacing="wide"
              noOfLines={1}
              textAlign="center"
              mb={2}
            >
              {residencial}
            </Heading>

            <HStack justify="center" spacing={1}>
              <Icon as={MapPinIcon} w={4} h={4} color={iconColor} />
              <Text fontSize="xs" color={textColor} fontWeight="500" noOfLines={1}>
                {address}
              </Text>
              <Text fontSize="xs" color={textColor} fontWeight="400" ml={2}>
                · {year}
              </Text>
            </HStack>
          </Box>
        </Box>
      </Fade>

      <LinkOverlay
        as="button"
        onClick={(e) => {
          e.preventDefault();
          onOpenModal();
        }}
      />
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
