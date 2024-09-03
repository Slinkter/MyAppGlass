import { useEffect, useState } from "react";
import {
    Box,
    Icon,
    Text,
    Stack,
    Grid,
    GridItem,
    Image,
    useColorModeValue,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Skeleton,
    useMediaQuery,
    SkeletonText,
} from "@chakra-ui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import { listVentana } from "../../../assets/webService/s/01.Ventanas/db_ventana";
window.document.title = "Ventana";
const Ventana = () => {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(0);
    const imagesNova = listVentana.nova;
    const imagesSerie25 = listVentana.serie;
    //
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [open]);

    return (
        <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            h={"90dvh"}
            bg={useColorModeValue("gray.100", "gray.800")}
        >
            <Box
                w={{ base: "auto", md: "20vw" }}
                h={{ base: "auto", md: "80vh" }}
                mx={{ base: "20px" }}
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                boxShadow="md"
                border={"1px solid "}
                borderColor={useColorModeValue("gray.200", "black")}
                transition="all .2s ease-in-out"
                _hover={{
                    boxShadow: "xl",
                }}
            >
                <Box mb={2} p={4} opacity={loading ? 0 : 1}>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color={useColorModeValue("gray.700", "gray.200")}
                    >
                        Sistema de Ventanas
                    </Text>
                </Box>
                <Stack spacing={1}>
                    <SidebarItem
                        icon={PaperAirplaneIcon}
                        label="Nova"
                        onClick={() => setOpen(0)}
                        loading={loading}
                    />
                    <SidebarItem
                        icon={PaperAirplaneIcon}
                        label="Serie 25"
                        onClick={() => setOpen(1)}
                        loading={loading}
                    />
                </Stack>
            </Box>
            <Box
                h={{ base: "auto", md: "80vh" }}
                w={{ base: "auto", md: "100vw" }}
                m={{ base: "20px" }}
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                boxShadow="md"
                border={"1px solid "}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                _hover={{
                    borderColor: "gray.300",
                    boxShadow: "lg",
                }}
            >
                {open === 0 ? (
                    <Gallery images={imagesNova} loading={loading} />
                ) : (
                    <Gallery images={imagesSerie25} loading={loading} />
                )}
            </Box>
        </Box>
    );
};

export default Ventana;

const Gallery = ({ images, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const responsiveColumns = useBreakpointValue({ base: 1, md: 5 });

    const onClose = () => setIsOpen(false);

    return (
        <>
            <Grid templateColumns={`repeat(${responsiveColumns}, 1fr)`} gap={4}>
                {images.map((src, index) => (
                    <GridItem key={index}>
                        <Image
                            w="full"
                            h={{ base: "", md: "24vh" }}
                            rounded="lg"
                            src={src.image}
                            objectFit="cover"
                            transition="opacity 0.5s ease-in-out"
                            opacity={loading ? 0 : 1}
                            onClick={() => {
                                setSelectedImage(src.image);
                                setIsOpen(true);
                            }}
                        />
                    </GridItem>
                ))}
            </Grid>

            {!isMobile && (
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered
                    motionPreset="slideInBottom"
                    size="xl"
                >
                    <ModalOverlay backdropFilter="blur(10px)" />
                    <ModalContent>
                        <ModalCloseButton />
                        <Image
                            src={selectedImage}
                            alt={selectedImage}
                            objectFit="cover"
                            borderRadius="base"
                            shadow="lg"
                            maxH="100vh"
                        />
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

const SidebarItem = ({ icon, label, onClick, loading }) => {
    return (
        <Stack
            direction="row"
            align="center"
            justify="space-between"
            onClick={onClick}
            cursor="pointer"
            p={2}
            rounded="md"
            opacity={loading ? 0 : 1}
            transition="opacity 0.5s ease-in-out"
            _hover={{
                bg: useColorModeValue("gray.50", "gray.900"),
                color: "red.500",
            }}
        >
            <Stack direction="row" align="center" spacing={4}>
                <Icon as={icon} w={5} h={5} />
                <Text transition="all .2s ease" fontWeight={500}>
                    {label}
                </Text>
            </Stack>
        </Stack>
    );
};
