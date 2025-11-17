import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Spinner,
    useColorModeValue,
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
 * @returns {JSX.Element} The rendered project detail modal.
 */
export default React.memo(function ProjectDetailModal(
    { isOpen, onClose, residencial, name, address, year, g_maps }) {
        const [isMapLoaded, setIsMapLoaded] = useState(false);

        const bgColor = useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)");
        const borderColor = useColorModeValue("rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0.15)");
        const textColor = useColorModeValue("gray.800", "gray.100");
        const secondaryTextColor = useColorModeValue("gray.600", "gray.300");
        const headerBorderColor = useColorModeValue("whiteAlpha.400", "whiteAlpha.200");

        const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
            g_maps
        )}&output=embed`;

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
                <ModalOverlay backdropFilter={"blur(20px)"} />
                <ModalContent
                    borderRadius={{ base: 0, md: "2xl" }}
                    // Glassmorphism effects
                    bg={bgColor}
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor={borderColor}
                    boxShadow="0 4px 30px rgba(0,0,0,0.1)"
                    color={textColor}
                    transition="all 0.3s ease"
                >
                    <ModalHeader
                        p={4}
                        borderBottomWidth="1px"
                        borderColor={headerBorderColor}
                    >
                        <Heading size="lg">{residencial}</Heading>
                        <Text fontSize="md" color={secondaryTextColor}>
                            {name}
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton
                        size="lg"
                        bg={useColorModeValue("rgba(255,255,255,0.3)", "rgba(0,0,0,0.3)")}
                        _hover={{
                            bg: useColorModeValue("rgba(255,255,255,0.5)", "rgba(0,0,0,0.5)"),
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
                                        bg="transparent"
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
                                        borderRadius: "16px", // Corresponds to "2xl"
                                    }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    onLoad={() => setIsMapLoaded(true)}
                                ></iframe>
                            </Box>
                            <Box
                                flex="1"
                                p={{ base: 2, md: 4 }}
                                // Nested Glassmorphism for detail section
                                bg={useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)")}
                                backdropFilter="blur(20px)"
                                border="1px solid"
                                borderColor={useColorModeValue("rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0.15)")}
                                boxShadow="0 4px 30px rgba(0,0,0,0.1)"
                                borderRadius="2xl"
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
    }
);
