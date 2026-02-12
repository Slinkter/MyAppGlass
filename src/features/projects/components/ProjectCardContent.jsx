import React from "react";
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
import FadingImage from "@shared/components/common/FadingImage";

/**
 * @component ProjectCardContent
 * @description Presentational component para el contenido de la tarjeta de proyecto
 */
const ProjectCardContent = ({
  image = "",
  residencial,
  address,
  year,
  onOpenModal,
  forceShow,
}) => {
  const styles = {
    bg: useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)"),
    border: useColorModeValue(
      "rgba(255, 255, 255, 0.52)",
      "rgba(255, 255, 255, 0.15)",
    ),
    text: useColorModeValue("gray.800", "gray.100"),
    icon: useColorModeValue("gray.500", "gray.400"),
    heading: useColorModeValue("primary.700", "primary.300"),
  };

  return (
    <Box
      w="full"
      maxW={{ base: "full", md: "md" }}
      bg={styles.bg}
      borderRadius="2xl"
      boxShadow="lg"
      transition="transform 0.3s ease"
      _hover={{ transform: "scale(1.02)" }}
    >
      <Box p={2}>
        <FadingImage
          w="full"
          h={{ base: "275px", md: "375px" }}
          src={image}
          alt={`Obra ${residencial}`}
          showOverlay={false}
          forceShow={forceShow}
        />

        <Stack p={4} spacing={2} opacity={1} transition="opacity 0.4s">
          <Heading
            size="md"
            color={styles.heading}
            textAlign="center"
            textTransform="uppercase"
          >
            {residencial}
          </Heading>

          <Stack direction="row" justifyContent="space-between" fontSize="sm">
            <Flex alignItems="center">
              <Icon as={MapPinIcon} w={5} h={5} mr={2} color={styles.icon} />
              <Text noOfLines={1}>{address}</Text>
            </Flex>
            <Flex alignItems="center">
              <Icon
                as={CalendarDaysIcon}
                w={5}
                h={5}
                mr={2}
                color={styles.icon}
              />
              <Text>{year}</Text>
            </Flex>
          </Stack>

          <Button onClick={onOpenModal} /* ... estilos del botón ... */>
            Google Maps
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectCardContent;
