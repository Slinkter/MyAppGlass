import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    MapPinIcon,
    CalendarDaysIcon,
    BuildingOffice2Icon,
    HomeIcon,
    MapIcon,
} from "@heroicons/react/24/solid";
import {
    Card,
    CardBody,
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Icon,
    Spinner,
} from "@chakra-ui/react";
import FadingImage from "../common/FadingImage";
import ProjectDetailItem from "./ProjectDetailItem";
import React from "react";

/**
 * Componente ItemProject
 * Renderiza la tarjeta y modal de un proyecto con detalles y mapa.
 * @component
 * @param {Object} props
 * @param {string} props.image - URL de la imagen del proyecto
 * @param {string} props.residencial - Nombre del residencial
 * @param {string} props.address - Dirección del proyecto
 * @param {string} props.year - Año del proyecto
 * @param {string} props.g_maps - Dirección para Google Maps
 * @param {string} props.name - Nombre de la constructora
 * @returns {JSX.Element}
 */
const ProjectCard = React.memo((props) => {
    const { image, residencial, address, year, g_maps, name } = props;
    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure();
    const [isMapLoaded, setIsMapLoaded] = React.useState(false);

    const bg = useColorModeValue("gray.200", "gray.700"); // Adjusted for better dark mode contrast
    const modalContentBg = useColorModeValue("gray.50", "gray.800");
    const modalCloseButtonBg = useColorModeValue("gray.200", "gray.600");
    const modalCloseButtonHoverBg = useColorModeValue("gray.300", "gray.500");
    const spinnerContainerBg = useColorModeValue("gray.200", "gray.700");
    const detailsBoxBg = useColorModeValue("white", "gray.700");

    const onOpen = () => {
        setIsMapLoaded(false);
        onOpenModal();
    };

    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
        g_maps
    )}&output=embed`;

    return (
        <>
            <Card
                w="375px"
                maxW={{ base: "full", md: "375px" }}
                mb={4}
                boxShadow={"md"}
                rounded="xl"
                bg={bg}
                overflow="hidden"
                _hover={{
                    boxShadow: "lg", // Slightly more pronounced hover effect
                    borderColor: "primary.300", // Use primary color for border on hover
                    transform: {
                        base: "",
                        md: "scale(1.02)",
                    },
                }}
            >
                <CardBody textAlign="center">
                    <FadingImage
                        w="full"
                        h={{ base: "320px", md: "325px" }}
                        src={image}
                        alt={`Obra ${residencial}`}
                        borderRadius="lg"
                        objectFit="cover"
                        boxShadow={"base"}
                    />

                    <Stack mt="4" spacing="2">
                        <Flex
                            direction={"column"}
                            textAlign={"left"}
                            justifyContent={"center"}
                            gap={2}
                        >
                            <Heading
                                size="md"
                                textTransform={"uppercase"}
                                color="primary.500"
                            >
                                {residencial}
                            </Heading>
                        </Flex>
                        <Flex alignItems={"center"}>
                            <Icon
                                as={MapPinIcon}
                                w={5}
                                h={5}
                                mr={2}
                                color="gray.500"
                            />
                            <Text fontSize="sm">{address}</Text>
                        </Flex>
                        <Flex alignItems={"center"}>
                            <Icon
                                as={CalendarDaysIcon}
                                w={5}
                                h={5}
                                mr={2}
                                color="gray.500"
                            />
                            <Text fontSize="sm">{year}</Text>
                        </Flex>

                        <Button
                            onClick={onOpen}
                            rightIcon={<ArrowForwardIcon />}
                            colorScheme="primary"
                            variant="solid"
                            mt={1}
                        >
                            Ver en Google Maps
                        </Button>
                    </Stack>
                </CardBody>
            </Card>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="slideInBottom"
                size={{ base: "full", md: "6xl" }}
                scrollBehavior="inside"
            >
                <ModalOverlay backdropFilter={"blur(10px)"} />
                <ModalContent
                    shadow="xl"
                    rounded={{ base: 0, md: "lg" }}
                    bg={modalContentBg}
                >
                    <ModalHeader p={4} borderBottomWidth="1px">
                        <Heading size="lg">{residencial}</Heading>
                        <Text fontSize="md" color="gray.500">
                            {name}
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton
                        size="lg"
                        bg={modalCloseButtonBg}
                        _hover={{
                            bg: modalCloseButtonHoverBg,
                        }}
                        rounded="full"
                        position="absolute"
                        top={{ base: 4, md: 3 }}
                        right={{ base: 4, md: 3 }}
                    />
                    <ModalBody p={{ base: 4, md: 6 }}>
                        <Flex
                            w="full"
                            h="full"
                            flexDirection={{ base: "column", md: "row" }}
                            gap={4}
                        >
                            <Box
                                flex="2"
                                h={{ base: "300px", md: "500px" }}
                                position="relative"
                            >
                                {!isMapLoaded && (
                                    <Flex
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        right="0"
                                        bottom="0"
                                        align="center"
                                        justify="center"
                                        bg={spinnerContainerBg}
                                        borderRadius="md"
                                    >
                                        <Spinner size="xl" />
                                    </Flex>
                                )}
                                <iframe
                                    src={googleMapsUrl}
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: 0,
                                        borderRadius: "8px",
                                    }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    onLoad={() => setIsMapLoaded(true)}
                                ></iframe>
                            </Box>
                            <Box
                                flex="1"
                                p={{ base: 2, md: 4 }}
                                bg={detailsBoxBg}
                                borderRadius="lg"
                                boxShadow="sm"
                            >
                                <Heading size="md" mb={4}>
                                    Detalles del Proyecto
                                </Heading>
                                <Stack spacing={4}>
                                    <ProjectDetailItem
                                        icon={HomeIcon}
                                        label="Residencial"
                                        value={residencial}
                                    />
                                    <ProjectDetailItem
                                        icon={BuildingOffice2Icon}
                                        label="Constructora"
                                        value={name}
                                    />
                                    <ProjectDetailItem
                                        icon={MapIcon}
                                        label="Direccion"
                                        value={g_maps}
                                    />
                                    <ProjectDetailItem
                                        icon={MapPinIcon}
                                        label="Distrito"
                                        value={address}
                                    />
                                    <ProjectDetailItem
                                        icon={CalendarDaysIcon}
                                        label="Año"
                                        value={year}
                                    />
                                </Stack>
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
