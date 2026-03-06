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
  Divider,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import FadingImage from "@shared/components/common/FadingImage";

/**
 * @component ProjectCardContent
 * @description High-fidelity visual representation of a project card.
 * Features advanced glassmorphism, dynamic overlays, and fluid spring interactions.
 */
const ProjectCardContent = ({
  image = "",
  residencial,
  address,
  year,
  onOpenModal,
  forceShow,
}) => {
  // Advanced High-Fidelity Color Palette
  const glassBg = useColorModeValue(
    "rgba(255, 255, 255, 0.75)",
    "rgba(15, 15, 15, 0.70)",
  );
  const glassBorder = useColorModeValue(
    "rgba(255, 255, 255, 0.5)",
    "rgba(255, 255, 255, 0.08)",
  );
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const iconColor = useColorModeValue("primary.500", "primary.300");
  const cardShadow = useColorModeValue(
    "0 10px 30px -10px rgba(0,0,0,0.1)",
    "0 20px 40px -20px rgba(0,0,0,0.5)",
  );

  return (
    <Box
      as={m.article}
      whileHover="hover"
      initial="initial"
      onClick={onOpenModal}
      cursor="pointer"
      position="relative"
      h={{ base: "400px", md: "520px" }}
      w="full"
      borderRadius="3xl"
      overflow="hidden"
      bg="gray.900"
      boxShadow={cardShadow}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* 0. Border Beam Effect (Hover only) */}
      <Box
        as={m.div}
        position="absolute"
        inset="0"
        zIndex={5}
        pointerEvents="none"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
      >
        <Box
          as={m.div}
          position="absolute"
          inset="-2px"
          borderRadius="3xl"
          style={{
            padding: "2px",
            background: "conic-gradient(from 0deg, transparent 60%, var(--chakra-colors-primary-400) 80%, transparent 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            maskComposite: "exclude",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </Box>

      {/* 1. High-Fidelity Background Image with Smooth Scale */}
      <Box
        as={m.div}
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.1 },
        }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <FadingImage
          src={image}
          alt={`Proyecto de vidriería en ${residencial} - ${address}`}
          objectFit="cover"
          w="100%"
          h="100%"
          showOverlay={false}
          forceShow={forceShow}
        />
        {/* Dynamic Gradient Overlay */}
        <Box
          as={m.div}
          position="absolute"
          inset="0"
          bgGradient="linear(to-t, blackAlpha.900, transparent, transparent)"
          variants={{
            initial: { opacity: 0.7 },
            hover: { opacity: 0.9 },
          }}
        />
      </Box>

      {/* 2. Floating High-Fidelity Info Pill */}
      <Box
        position="absolute"
        bottom={6}
        left={6}
        right={6}
        zIndex={2}
      >
        <VStack
          as={m.div}
          bg={glassBg}
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor={glassBorder}
          py={5}
          px={6}
          borderRadius="2xl"
          spacing={3}
          align="stretch"
          variants={{
            initial: { y: 0, opacity: 0.9 },
            hover: { 
              y: -12, 
              opacity: 1,
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1)"
            },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          boxShadow="2xl"
        >
          {/* Main Title - Refined Typography */}
          <Heading
            fontSize="sm"
            color={headingColor}
            textTransform="uppercase"
            fontWeight="800"
            letterSpacing="0.15em"
            noOfLines={1}
            textAlign="center"
          >
            {residencial}
          </Heading>

          <Divider borderColor={glassBorder} opacity={0.5} />

          {/* Details Row */}
          <HStack justify="space-between" w="full">
            <HStack spacing={2} flex={1}>
              <Icon
                as={MapPinIcon}
                w={4}
                h={4}
                color={iconColor}
              />
              <Text
                fontSize="xs"
                color={textColor}
                fontWeight="700"
                noOfLines={1}
                letterSpacing="tight"
              >
                {address}
              </Text>
            </HStack>

            <HStack spacing={1.5} bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.100")} px={2} py={1} borderRadius="lg">
              <Icon
                as={CalendarDaysIcon}
                w={3.5}
                h={3.5}
                color={textColor}
              />
              <Text
                fontSize="xs"
                color={textColor}
                fontWeight="800"
              >
                {year}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

ProjectCardContent.propTypes = {
  image: PropTypes.string,
  residencial: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  forceShow: PropTypes.bool,
};

export default ProjectCardContent;
