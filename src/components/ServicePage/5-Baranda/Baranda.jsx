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
    Container,
    Heading,
    Flex,
    SkeletonCircle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listBaranda } from "../../../assets/webService/s/06.Baranda/db_baranda";

const Baranda = () => {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(0);

    //
    useEffect(() => {
        setLoading(true);
        document.title = `Baranda`;
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
            p={8}
        >
            <Box
                w={{ base: "full", md: "25vw" }}
                h={{ base: "auto", md: "85vh" }}
                m={{ base: "20px" }}
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                boxShadow="md"
                border={"1px solid "}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                _hover={{
                    boxShadow: "xl",
                    borderColor: "gray.300",
                }}
            >
                <Box mb={1} p={3} opacity={loading ? 0 : 1}>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color={useColorModeValue("gray.700", "gray.200")}
                    >
                        BARANDAS
                    </Text>
                </Box>
                <Stack spacing={1}>
                    <SidebarItem
                        icon={ChevronRightIcon}
                        label="Sistema "
                        loading={loading}
                    />
                </Stack>

                <Box mb={1} p={3} opacity={loading ? 0 : 1}>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color={useColorModeValue("gray.700", "gray.200")}
                    >
                        CARACTERÍSTICA
                    </Text>
                </Box>
                <Stack spacing={1}>
                    <CharItem
                        icon={CheckIcon}
                        label="Material : Acero "
                        loading={loading}
                    />
                    <CharItem
                        icon={CheckIcon}
                        label="Color : Incoro | Bronce"
                        loading={loading}
                    />
                    <CharItem
                        icon={CheckIcon}
                        label="Arenado : Lamina"
                        loading={loading}
                    />
                    <CharItem
                        icon={CheckIcon}
                        label="Tipo : Templado "
                        loading={loading}
                    />

                    <CharItem
                        icon={CheckIcon}
                        label="Espesor : 8 mm "
                        loading={loading}
                    />
                </Stack>
            </Box>
            <Box
                h={{ base: "auto", md: "85vh" }}
                w={{ base: "full", md: "100vw" }}
                mx={{ base: "20px" }}
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                boxShadow="md"
                border={"1px solid "}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                _hover={{
                    borderColor: "gray.300",
                    boxShadow: "xl",
                }}
            >
                <Gallery images={listBaranda.baranda} loading={loading} />
            </Box>
        </Box>
    );
};

export default Baranda;

const SidebarItem = ({ icon, label, onClick, isActive, loading }) => {
    return (
        <Stack
            direction="row"
            align="center"
            justify="space-between"
            onClick={onClick}
            cursor="pointer"
            p={2}
            rounded="md"
            bg={isActive ? "red.100" : "transparent"} // Cambia el fondo si está activo
            color={isActive ? "red.500" : "inherit"} // Cambia el color si está activo
            _hover={{
                bg: useColorModeValue("gray.50", "gray.900"),
                color: "red.500",
            }}
        >
            {loading ? (
                <Stack direction="row" align="center" spacing={4}>
                    <SkeletonCircle w={5} h={5} />
                    <Skeleton height="20px" w={"140px"} />
                </Stack>
            ) : (
                <Stack direction="row" align="center" spacing={4}>
                    <Icon w={5} h={5} as={icon} />
                    <Text>{label}</Text>
                </Stack>
            )}
        </Stack>
    );
};
const CharItem = ({ icon, label, loading }) => {
    return (
        <Stack direction="row" align="center" justify="space-between" p={2}>
            {loading && (
                <Stack direction="row" align="center" spacing={4}>
                    <SkeletonCircle w={5} h={5} />
                    <Skeleton height="20px" w={"140px"} />
                </Stack>
            )}

            {!loading && (
                <Stack direction="row" align="center" spacing={4}>
                    <Icon w={5} h={5} as={icon} />
                    <Text>{label}</Text>
                </Stack>
            )}
        </Stack>
    );
};

const Gallery = ({ images, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const responsiveColumns = useBreakpointValue({ base: 1, md: 5 });
    const onClose = () => setIsOpen(false);

    return (
        <>
            <Grid
                templateColumns={`repeat(${responsiveColumns}, 1fr)`}
                gap={4}
                p={2}
            >
                {loading &&
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((_, idx) => (
                        <GridItem key={idx}>
                            <Skeleton
                                w="full"
                                h={{ base: "", md: "24vh" }}
                                rounded="lg"
                            />
                        </GridItem>
                    ))}

                {!loading &&
                    images.map((src, index) => (
                        <GridItem key={index}>
                            <Image
                                w="full"
                                h={{ base: "44vh", md: "24vh" }}
                                src={src.image}
                                rounded="lg"
                                objectFit={"cover"}
                                transition="all .2s ease-in-out"
                                opacity={loading ? 0 : 1}
                                cursor={"pointer"}
                                shadow={"base"}
                                onClick={() => {
                                    setSelectedImage(src.image);
                                    setIsOpen(true);
                                }}
                                _hover={{
                                    shadow: "lg",
                                    transform: {
                                        base: "scale(1.00)",
                                        md: "scale(1.02)",
                                    },
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
