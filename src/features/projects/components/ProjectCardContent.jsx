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
} from "@chakra-ui/react";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import FadingImage from "@shared/components/common/FadingImage";

const ProjectCardContent = ({
  image = "",
  residencial,
  address,
  year,
  onOpenModal,
  forceShow,
}) => {
  // Colores y Estilos
  const pillBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(20, 20, 20, 0.90)",
  );
  const pillHoverBg = useColorModeValue("white", "black");
  const headingColor = useColorModeValue("primary.800", "primary.200");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const iconColor = useColorModeValue("primary.500", "primary.400");
  const dateColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      as="article"
      onClick={onOpenModal}
      cursor="pointer"
      position="relative"
      h={{ base: "380px", md: "480px" }}
      w="full"
      borderRadius="2xl"
      overflow="hidden"
      role="group"
      boxShadow="lg"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        boxShadow: "2xl",
        transform: "translateY(-4px)",
      }}
    >
      {/* 1. Imagen Full (Hero) */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        transition="transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        _groupHover={{
          transform: "scale(1.05)",
        }}
      >
        <FadingImage
          src={image}
          alt={`Obra ${residencial}`}
          objectFit="cover"
          w="100%"
          h="100%"
          showOverlay={false}
          forceShow={forceShow}
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="100%"
          h="40%"
          bgGradient="linear(to-t, blackAlpha.500, transparent)"
          opacity={0.6}
        />
      </Box>

      {/* 2. Píldora de Información Flotante */}
      <Box
        position="absolute"
        bottom={4} // Un poco más pegado al borde inferior
        left={4}
        right={4}
        zIndex={2}
      >
        <VStack
          bg={pillBg}
          backdropFilter="blur(10px)"
          py={3} // Padding vertical más compacto
          px={4} // Padding horizontal estándar
          borderRadius="xl"
          spacing={2} // Espaciado entre filas reducido para cohesión
          align="stretch"
          boxShadow="md"
          transition="all 0.3s ease"
          _groupHover={{
            bg: pillHoverBg,
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          {/* Fila 1: Nombre (Centrado) */}
          <Heading
            size="xs" // Tamaño más controlado
            color={headingColor}
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="wider"
            noOfLines={1}
            textAlign="center"
          >
            {residencial}
          </Heading>

          {/* Fila 2: Ubicación (Izq) y Fecha (Der) */}
          <HStack justify="space-around" w="full" pt={0.5}>
            {/* Ubicación */}
            <HStack spacing={1.5} maxW="65%">
              <Icon
                as={MapPinIcon}
                w={3.5}
                h={3.5}
                color={iconColor}
                flexShrink={0}
              />
              <Text
                fontSize="xs"
                color={textColor}
                fontWeight="semibold"
                noOfLines={1}
              >
                {address}
              </Text>
            </HStack>

            {/* Fecha */}
            <HStack spacing={1.5}>
              <Icon
                as={CalendarDaysIcon}
                w={3.5}
                h={3.5}
                color={dateColor}
                flexShrink={0}
              />
              <Text
                fontSize="xs"
                color={dateColor}
                fontWeight="medium"
                whiteSpace="nowrap"
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
