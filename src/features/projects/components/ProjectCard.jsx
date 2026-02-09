import React, { useCallback, lazy, Suspense } from "react"; // Added lazy, Suspense
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
// import ProjectDetailModal from "./ProjectDetailModal"; // Removed this line
import ModalSkeleton from "./modal/ModalSkeleton"; // New import

const LazyProjectDetailModal = lazy(() => import('./ProjectDetailModal')); // Moved here

// Re-using the Project typedef from projectService.js
/**
 * @typedef {Object} Project - Representa la estructura de un proyecto individual.
 * @property {number} id - Identificador único del proyecto.
 * @property {string} image - Ruta de la imagen principal del proyecto.
 * @property {string} residencial - Nombre del edificio o residencial.
 * @property {string} name - Nombre de la empresa o cliente.
 * @property {string} address - Dirección del proyecto.
 * @property {string} numdpto - Número de departamentos asociados al proyecto.
 * @property {string} year - Año de ejecución del proyecto.
 * @property {string} g_maps - Enlace o dirección de Google Maps del proyecto.
 * @property {Array<Object>} photosObra - Array de objetos de imagen de la obra.
 */

/**
 * @component ProjectCard
 * @description Tarjeta individual que muestra un resumen de un proyecto, incluyendo una imagen,
 * el nombre de la residencial, dirección y año. Ofrece la funcionalidad para ver más detalles
 * en un modal y navegar a la ubicación en Google Maps.
 *
 * @param {Project} props - Objeto completo del proyecto a mostrar.
 * @returns {JSX.Element} Un componente de tarjeta que representa un proyecto.
 *
 * @example
 * // Ejemplo de uso en un componente padre
 * import { Box } from "@chakra-ui/react";
 * import ProjectCard from "./ProjectCard";
 *
 * const sampleProject = {
 *   id: 1,
 *   image: "/assets/projects/sample.jpg",
 *   residencial: "Residencial Ejemplo",
 *   name: "Desarrollos Modernos S.A.C.",
 *   address: "Av. Siempre Viva 123",
 *   numdpto: "10",
 *   year: "2023",
 *   g_maps: "https://maps.google.com/?q=Av.+Siempre+Viva+123",
 *   photosObra: [{ id: 1, image: "/assets/gallery/sample1.jpg" }]
 * };
 *
 * function ProjectList() {
 *   return (
 *     <Box p={4}>
 *       <ProjectCard {...sampleProject} />
 *     </Box>
 *   );
 * }
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
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);
    const handleImageLoad = useCallback(() => setIsImageLoaded(true), []);

    const styles = {
        bg: useColorModeValue(
            "rgba(255, 255, 255, 0.25)",
            "rgba(0, 0, 0, 0.25)"
        ),
        border: useColorModeValue(
            "rgba(255, 255, 255, 0.52)",
            "rgba(255, 255, 255, 0.15)"
        ),
        text: useColorModeValue("gray.800", "gray.100"),
        icon: useColorModeValue("gray.500", "gray.400"),
        heading: useColorModeValue("primary.700", "primary.300"),
        btnBg: useColorModeValue(
            "rgba(255, 255, 255, 0.4)",
            "rgba(0, 0, 0, 0.4)"
        ),
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
                /*  backdropFilter="blur(10px)" */
                borderRadius="2xl"
                boxShadow="lg"
                color={styles.text}
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                style={{ willChange: "transform, opacity" }}
                _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "xl",
                }}
            >
                <Box p={2}>
                    <FadingImage
                        w="full"
                        h={{ base: "275px", md: "375px" }}
                        src={image}
                        alt={`Obra ${residencial}`}
                        objectFit="cover"
                        showOverlay={false}
                        onLoad={handleImageLoad}
                    />

                    <Stack
                        p={4}
                        spacing={2}
                        opacity={isImageLoaded ? 1 : 0}
                        transition="opacity 0.4s ease-in-out"
                    >
                        <Heading
                            size="md"
                            textTransform="uppercase"
                            color={styles.heading}
                            fontWeight="bold"
                            textAlign="center"
                        >
                            {residencial}
                        </Heading>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            fontSize="sm"
                        >
                            <Flex alignItems="center">
                                <Icon
                                    as={MapPinIcon}
                                    w={5}
                                    h={5}
                                    mr={2}
                                    color={styles.icon}
                                />
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
            </Box>
            {/* modal */}
            {isOpen && ( // Only render Suspense and Lazy component if modal is open
                <Suspense fallback={<ModalSkeleton />}>
                    <LazyProjectDetailModal
                        isOpen={isOpen}
                        onClose={onClose}
                        residencial={residencial}
                        name={name}
                        address={address}
                        year={year}
                        g_maps={g_maps}
                        photos={photosObra}
                    />
                </Suspense>
            )}
        </>
    );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
