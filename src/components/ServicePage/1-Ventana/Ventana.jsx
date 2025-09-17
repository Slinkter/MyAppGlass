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
    SkeletonCircle,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listVentana } from "../../../assets/webService/s/01.Ventanas/db_ventana";

const Ventana = () => {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(0);
    const imagesNova = listVentana.nova;
    const imagesSerie25 = listVentana.serie25;
    const imagesSerie31 = listVentana.serie31;

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [open]);

    return (
        <>
            <Helmet>
                <title>Ventanas de Aluminio y Vidrio (Sistemas Nova, Serie 25, Serie 31) | GYA Company</title>
                <meta 
                    name="description" 
                    content="Fabricamos e instalamos ventanas de aluminio y vidrio en La Molina. Ofrecemos sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales." 
                />
            </Helmet>
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
                            VENTANAS
                        </Text>
                    </Box>
                    <Stack spacing={1}>
                        <SidebarItem
                            icon={ChevronRightIcon}
                            label="Sistema Nova"
                            isActive={open === 0} // Activo si open es 0
                            onClick={() => setOpen(0)}
                            loading={loading}
                        />
                        <SidebarItem
                            icon={ChevronRightIcon}
                            label="Sistema Serie 25"
                            isActive={open === 1}
                            onClick={() => setOpen(1)}
                            loading={loading}
                        />
                        <SidebarItem
                            icon={ChevronRightIcon}
                            label="Sistema Serie 31"
                            isActive={open === 2}
                            onClick={() => setOpen(2)}
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
                            label="Color : Incoro | Bronce"
                            loading={loading}
                        />
                        <CharItem
                            icon={CheckIcon}
                            label="Tipo : Templado | Crudo"
                            loading={loading}
                        />
                        <CharItem
                            icon={CheckIcon}
                            label="Aluminio : Natural | Negro"
                            loading={loading}
                        />
                        <CharItem
                            icon={CheckIcon}
                            label="Espesor : 6 mm "
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
                    {open === 0 && (
                        <Gallery images={imagesNova} loading={loading} />
                    )}
                    {open === 1 && (
                        <Gallery images={imagesSerie25} loading={loading} />
                    )}
                    {open === 2 && (
                        <Gallery images={imagesSerie31} loading={loading} />
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Ventana;

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