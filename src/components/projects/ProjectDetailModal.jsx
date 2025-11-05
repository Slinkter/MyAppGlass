import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useColorModeValue,
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Spinner,
    Icon,
} from "@chakra-ui/react";
import {
    MapPinIcon,
    CalendarDaysIcon,
    BuildingOffice2Icon,
    HomeIcon,
    MapIcon,
} from "@heroicons/react/24/solid";
import ProjectDetailItem from "./ProjectDetailItem";

/**
 * @component ProjectDetailModal
 * @description Modal component to display detailed information about a project,
 * including a Google Maps embed and project specifics.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   residencial: string,
 *   name: string,
 *   address: string,
 *   year: string,
 *   g_maps: string,
 * }} props - Props for the component.
 * @param {boolean} props.isOpen - Controls the open/close state of the modal.
 * @param {() => void} props.onClose - Callback function to close the modal.
 * @param {string} props.residencial - The name of the residential project.
 * @param {string} props.name - The name of the construction company.
 * @param {string} props.address - The address/district of the project.
 * @param {string} props.year - The year the project was completed.
 * @param {string} props.g_maps - The Google Maps query string for the project location.
 * @returns {JSX.Element} The rendered project detail modal.
 */
const ProjectDetailModal = React.memo(({
    isOpen,
    onClose,
    residencial,
    name,
    address,
    year,
    g_maps,
}) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const modalContentBg = useColorModeValue("gray.50", "gray.800");
    const modalCloseButtonBg = useColorModeValue("gray.200", "gray.600");
    const modalCloseButtonHoverBg = useColorModeValue("gray.300", "gray.500");
    const spinnerContainerBg = useColorModeValue("gray.200", "gray.700");
    const detailsBoxBg = useColorModeValue("white", "gray.700");

    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
        g_maps
    )}&output=embed`;

    // Reset map loaded state when modal opens
    React.useEffect(() => {
        if (isOpen) {
            setIsMapLoaded(false);
        }
    }, [isOpen]);

    return (
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
    );
});

ProjectDetailModal.displayName = "ProjectDetailModal";

export default ProjectDetailModal;
