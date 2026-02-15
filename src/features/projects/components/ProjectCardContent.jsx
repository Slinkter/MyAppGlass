import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Heading,
  Text,
  Flex,
  Icon,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import GlassCard from "@shared/components/common/GlassCard";
import FadingImage from "@shared/components/common/FadingImage";

/**
 * @component ProjectCardContent
 * @description Tarjeta independiente para Proyectos. Utiliza GlassCard para el contenedor
 * y define un layout específico (Imagen grande + Metadata + Botón Modal).
 */
const ProjectCardContent = ({
  image = "",
  residencial,
  address,
  year,
  onOpenModal,
  forceShow,
}) => {
  const textColor = useColorModeValue("gray.800", "gray.100");
  const iconColor = useColorModeValue("gray.500", "gray.400");
  const headingColor = useColorModeValue("primary.700", "primary.300");
  const btnBg = useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(0, 0, 0, 0.4)");
  const btnHover = useColorModeValue("rgba(255, 255, 255, 0.6)", "rgba(0, 0, 0, 0.6)");

  return (
    <GlassCard
      p={0}
      h="full"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
    >
      <Box position="relative" h={{ base: "275px", md: "375px" }}>
        <FadingImage
          w="full"
          h="full"
          src={image}
          alt={`Obra ${residencial}`}
          showOverlay={false}
          forceShow={forceShow}
          objectFit="cover"
        />
        
        {/* Overlay opcional para texto sobre imagen si se desea en el futuro */}
      </Box>

      <Stack p={4} spacing={3} flex="1" justify="space-between">
        <Box>
          <Heading
            size="md"
            color={headingColor}
            textAlign="center"
            textTransform="uppercase"
            mb={2}
            noOfLines={2}
          >
            {residencial}
          </Heading>

          <Stack direction="row" justifyContent="space-between" fontSize="sm" color={textColor}>
            <Flex alignItems="center">
              <Icon as={MapPinIcon} w={5} h={5} mr={1} color={iconColor} />
              <Text noOfLines={1} maxW="120px">{address}</Text>
            </Flex>
            <Flex alignItems="center">
              <Icon as={CalendarDaysIcon} w={5} h={5} mr={1} color={iconColor} />
              <Text>{year}</Text>
            </Flex>
          </Stack>
        </Box>

        <Button
          onClick={onOpenModal}
          width="full"
          bg={btnBg}
          color={textColor}
          _hover={{ bg: btnHover }}
          size="sm"
          variant="outline"
        >
          Ver Detalles
        </Button>
      </Stack>
    </GlassCard>
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
