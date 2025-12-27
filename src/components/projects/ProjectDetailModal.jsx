import React, { useState, useMemo } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Box,
    Flex,
    Heading,
    Stack,
    Spinner,
    useColorModeValue,
    Button,
    ButtonGroup,
    Icon,
} from "@chakra-ui/react";
import {
    MapPinIcon,
    CalendarDaysIcon,
    BuildingOffice2Icon,
    HomeIcon,
    MapIcon,
    PhotoIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import ProjectDetailItem from "./ProjectDetailItem";
import GlassCard from "@/components/common/GlassCard";
import Gallery from "@/components/common/Gallery";

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
 *   image?: string,
 * }} props - Props for the component.
 * @returns {JSX.Element} The rendered project detail modal.
 */
export default React.memo(function ProjectDetailModal({
    isOpen,
    onClose,
    residencial,
    name,
    address,
    year,
    g_maps,
    photos,
}) {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [googleMapsUrl, setGoogleMapsUrl] = useState("");
    const [viewMode, setViewMode] = useState("map"); // 'map' | 'gallery'

    const modalBg = useColorModeValue(
        "rgba(255, 255, 255, 0.92)",
        "rgba(20, 20, 20, 0.95)"
    );
    const borderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.35)",
        "rgba(255, 255, 255, 0.15)"
    );
    const textColor = useColorModeValue("gray.800", "gray.100");

    const spinnerBg = useColorModeValue("gray.100", "gray.800");

    // Generate mock gallery images since data source is currently single image
    // In a real scenario, this would come from props.images

    React.useEffect(() => {
        if (isOpen) {
            setIsMapLoaded(false);
            setViewMode("map"); // Reset to map on open
            setGoogleMapsUrl(
                `https://www.google.com/maps?q=${encodeURIComponent(
                    g_maps
                )}&output=embed`
            );
        }
    }, [isOpen, g_maps]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInBottom"
            size={{ base: "full", md: "5xl", lg: "6xl" }}
            scrollBehavior="inside"
            isCentered
            preserveScrollBarGap
        >
            <ModalOverlay backdropFilter={"blur(10px)"} />
            <ModalContent
                borderRadius={{ base: 0, md: "2xl" }}
                bg={modalBg}
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="2xl"
                color={textColor}
            >
                <ModalBody p={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }}>
                    <Flex
                        w="full"
                        h="full"
                        flexDirection={{ base: "column", lg: "row" }}
                        gap={{ base: 6, lg: 8 }}
                    >
                        {/* Visual Section: Map or Gallery */}
                        <Box
                            flex="3"
                            h={{
                                base: "380px",
                                sm: "420px",
                                md: "450px",
                                lg: "auto",
                            }}
                            position="relative"
                            borderRadius="2xl"
                            overflow="hidden"
                            boxShadow="lg"
                            bg={spinnerBg}
                        >
                            <Box
                                position="absolute"
                                top="0"
                                left="0"
                                w="100%"
                                h="100%"
                            >
                                {viewMode === "map" ? (
                                    <>
                                        {!isMapLoaded && (
                                            <Flex
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                right="0"
                                                bottom="0"
                                                align="center"
                                                justify="center"
                                                bg={spinnerBg}
                                                zIndex={1}
                                            >
                                                <Spinner
                                                    size="xl"
                                                    color="primary.500"
                                                    thickness="4px"
                                                />
                                            </Flex>
                                        )}
                                        <iframe
                                            src={googleMapsUrl}
                                            width="100%"
                                            height="100%"
                                            style={{
                                                border: 0,
                                                opacity: isMapLoaded ? 1 : 0,
                                                transition:
                                                    "opacity 0.5s ease-in-out",
                                            }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            onLoad={() => setIsMapLoaded(true)}
                                        ></iframe>
                                    </>
                                ) : (
                                    <Gallery images={photos} />
                                )}
                            </Box>
                        </Box>

                        {/* Details Section using GlassCard */}
                        <GlassCard
                            flex="2"
                            p={{ base: 5, md: 6 }}
                            minH={{ lg: "450px" }}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            gap={6}
                        >
                            {/* View Switcher */}
                            <ButtonGroup w="full" isAttached variant="outline">
                                <Button
                                    w="full"
                                    leftIcon={<Icon as={MapIcon} />}
                                    onClick={() => setViewMode("map")}
                                    isActive={viewMode === "map"}
                                    bg={
                                        viewMode === "map"
                                            ? "primary.500"
                                            : "transparent"
                                    }
                                    color={
                                        viewMode === "map" ? "white" : "inherit"
                                    }
                                    _hover={{
                                        bg:
                                            viewMode === "map"
                                                ? "primary.600"
                                                : "whiteAlpha.200",
                                    }}
                                    _active={{
                                        bg: "primary.600",
                                    }}
                                >
                                    Ubicación
                                </Button>
                                <Button
                                    w="full"
                                    leftIcon={<Icon as={PhotoIcon} />}
                                    onClick={() => setViewMode("gallery")}
                                    isActive={viewMode === "gallery"}
                                    bg={
                                        viewMode === "gallery"
                                            ? "primary.500"
                                            : "transparent"
                                    }
                                    color={
                                        viewMode === "gallery"
                                            ? "white"
                                            : "inherit"
                                    }
                                    _hover={{
                                        bg:
                                            viewMode === "gallery"
                                                ? "primary.600"
                                                : "whiteAlpha.200",
                                    }}
                                    _active={{
                                        bg: "primary.600",
                                    }}
                                >
                                    Galería
                                </Button>
                            </ButtonGroup>

                            <Box>
                                <Heading
                                    size="md"
                                    mb={6}
                                    borderBottom="2px solid"
                                    borderColor="primary.500"
                                    pb={2}
                                    display="inline-block"
                                    width="fit-content"
                                >
                                    Detalles del Proyecto
                                </Heading>
                                <Stack spacing={5}>
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
                                        label="Dirección"
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

                            {/* Close Button - Mobile Friendly Integration */}
                            <Button
                                onClick={onClose}
                                leftIcon={<Icon as={XMarkIcon} />}
                                variant="outline"
                                colorScheme="red"
                                size="sm"
                                w="full"
                                _hover={{
                                    bg: "red.500",
                                    color: "white",
                                    borderColor: "red.500",
                                }}
                            >
                                Cerrar Ventana
                            </Button>
                        </GlassCard>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
});
