import React from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import FadingImage from "@/components/common/FadingImage";
import ProjectDetailModal from "./ProjectDetailModal";

/**
 * @component ProjectCard
 * @description Tarjeta individual de proyecto que muestra una imagen, título, dirección y año.
 * Incluye funcionalidad para abrir un modal con más detalles y botón a Google Maps.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.image - URL de la imagen principal del proyecto.
 * @param {string} props.residencial - Nombre de la residencial o proyecto.
 * @param {string} props.address - Dirección del proyecto.
 * @param {string|number} props.year - Año de realización.
 * @param {string} props.g_maps - URL de Google Maps.
 * @param {string} props.name - Nombre interno o adicional del proyecto.
 * @param {Array<string>} [props.photosObra] - Array de fotos adicionales para el modal.
 * @returns {JSX.Element} Tarjeta del proyecto.
 */
const ProjectCard = React.memo((props) => {
  /*  */
  const {
    image,
    residencial,
    address,
    year,
    g_maps,
    name,
    photosObra = [],
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const styles = {
    bg: useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)"),
    border: useColorModeValue(
      "rgba(255, 255, 255, 0.72)",
      "rgba(255, 255, 255, 0.15)"
    ),
    text: useColorModeValue("gray.800", "gray.100"),
    icon: useColorModeValue("gray.500", "gray.400"),
    heading: useColorModeValue("primary.700", "primary.300"),
    btnBg: useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(0, 0, 0, 0.4)"),
    btnHover: useColorModeValue(
      "rgba(255, 255, 255, 0.6)",
      "rgba(0, 0, 0, 0.6)"
    ),
  };

  return (
    <>
      <Box
        w="full"
        maxW={{ base: "full", md: "md" }}
        h="auto"
        mb={4}
        overflow="hidden"
        bg={styles.bg}
        backdropFilter="blur(10px)"
        borderRadius="2xl"
        boxShadow="lg"
        color={styles.text}
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        borderWidth="1px"
        borderColor={styles.border}
        _hover={{
          transform: "scale(1.02)",
          boxShadow: "xl",
        }}
      >
        <FadingImage
          w="full"
          h={{ base: "320px", md: "325px" }}
          src={image}
          alt={`Obra ${residencial}`}
          objectFit="cover"
          showOverlay={false}
        />

        <Stack p={4} spacing={3}>
          <Heading
            size="md"
            textTransform="uppercase"
            color={styles.heading}
            fontWeight="bold"
            textAlign="center"
          >
            {residencial}
          </Heading>

          <Stack spacing={2} fontSize="sm">
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

          <Button
            onClick={onOpen}
            rightIcon={<ArrowForwardIcon />}
            variant="solid"
            width="full"
            bg={styles.btnBg}
            color={styles.text}
            _hover={{ bg: styles.btnHover }}
            mt={2}
          >
            Google Maps
          </Button>
        </Stack>
      </Box>
      {/* modal */}
      <ProjectDetailModal
        isOpen={isOpen}
        onClose={onClose}
        residencial={residencial}
        name={name}
        address={address}
        year={year}
        g_maps={g_maps}
        photos={photosObra}
      />
    </>
  );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
