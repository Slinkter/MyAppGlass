import { useState } from "react";
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
    SkeletonCircle,
    Heading,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listVentana } from "../../../assets/webService/s/01.Ventanas/db_ventana";

const Ventana = () => {
    const [open, setOpen] = useState(0);
    const imagesNova = listVentana.nova;
    const imagesSerie25 = listVentana.serie25;
    const imagesSerie31 = listVentana.serie31;
    const colorWhite = "gray.200";
    const colorBlack = "blackAlpha.500";

    return (
        <>
            <Helmet>
                <title>Ventanas Sistemas Nova, Serie 25 y Serie 31</title>
                <meta
                    name="description"
                    content="Fabricamos e instalamos ventanas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales."
                />
            </Helmet>
            <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={{ base: "", md: "center" }}
                alignItems={{ base: "stretch", md: "center" }}
                p={{ base: 4, md: 8 }}
                gap={6}
            >
                <Box // 1.Sidebar
                    bg={useColorModeValue(colorWhite, colorBlack)}
                    w={{ base: "full", md: "30vw", lg: "16vw", xl: "16vw" }}
                    h={{ base: "auto", md: "85vh" }}
                    p={4}
                    rounded="xl"
                    shadow="xl"
                    _hover={{
                        boxShadow: "md",
                        borderColor: "gray.900",
                    }}
                >
                    <Box mb={6}>
                        <Heading as="h3" size="lg" mb={4} p={2}>
                            Ventanas
                        </Heading>
                        <Stack spacing={1}>
                            <SidebarItem
                                icon={ChevronRightIcon}
                                label="Sistema Nova"
                                isActive={open === 0} // Activo si open es 0
                                onClick={() => setOpen(0)}
                            />
                            <SidebarItem
                                icon={ChevronRightIcon}
                                label="Sistema Serie 25"
                                isActive={open === 1}
                                onClick={() => setOpen(1)}
                            />
                            <SidebarItem
                                icon={ChevronRightIcon}
                                label="Sistema Serie 31"
                                isActive={open === 2}
                                onClick={() => setOpen(2)}
                            />
                        </Stack>
                    </Box>

                    <Box display={{ base: "none", md: "block" }}>
                        <Heading as="h3" size="lg" mb={4} p={2}>
                            Características
                        </Heading>
                        <Stack spacing={1}>
                            <CharItem
                                icon={CheckIcon}
                                label="Color : Incoro | Bronce"
                            />
                            <CharItem
                                icon={CheckIcon}
                                label="Tipo : Templado | Crudo"
                            />
                            <CharItem
                                icon={CheckIcon}
                                label="Aluminio : Natural | Negro"
                            />
                            <CharItem
                                icon={CheckIcon}
                                label="Espesor : 6 mm "
                            />
                        </Stack>
                    </Box>
                </Box>
                <Box
                    bg={useColorModeValue(colorWhite, colorBlack)}
                    w={{ base: "full", md: "30vw", lg: "64vw", xl: "64vw" }}
                    h={{ base: "auto", md: "85vh" }}
                    p={4}
                    rounded="xl"
                    shadow="xl"
                    _hover={{
                        boxShadow: "md",
                        borderColor: "gray.300",
                    }}
                    overflowY="auto"
                >
                    {open === 0 && <Gallery images={imagesNova} />}
                    {open === 1 && <Gallery images={imagesSerie25} />}
                    {open === 2 && <Gallery images={imagesSerie31} />}
                </Box>
            </Box>
        </>
    );
};

export default Ventana;

const SidebarItem = ({ icon, label, onClick, isActive }) => {
    const activeBg = useColorModeValue("red.100", "red.900");
    const activeColor = useColorModeValue("red.600", "red.200");

    const h_activeBg = useColorModeValue("gray.100", "gray.700");
    const h_activeColor = useColorModeValue("red.500", "red.300");
    return (
        <Stack
            direction="row"
            justifyContent={"flex-start"}
            align="center"
            p={3}
            rounded="xl"
            onClick={onClick}
            cursor={onClick ? "pointer" : "default"}
            bg={isActive ? activeBg : "default"} // Cambia el fondo si está activo
            color={isActive ? activeColor : "default"} // Cambia el color si está activo
            transition={"background-color 0.3s, color 0.3s"}
            _hover={{
                bg: onClick ? h_activeBg : "",
                color: isActive
                    ? activeColor
                    : onClick
                    ? h_activeColor
                    : "inherit",
            }}
        >
            <Icon w={5} h={5} as={icon} />
            <Text fontWeight={isActive ? 700 : 500}>{label}</Text>
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

const Gallery = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const responsiveColumns = useBreakpointValue({
        base: 2,
        md: 2,
        lg: 5,
        xl: 5,
    });
    const onClose = () => setIsOpen(false);

    return (
        <>
            <Grid
                templateColumns={`repeat(${responsiveColumns}, 1fr)`}
                gap={4}
                p={2}
            >
                {images.map((src, index) => (
                    <GridItem key={index}>
                        <FadingImage
                            w="100%"
                            h={{ base: "150px", md: "200px" }}
                            src={src.image}
                            alt={src.id}
                            rounded="md"
                            objectFit="cover"
                            transition="all 0.2s ease-in-out"
                            cursor="pointer"
                            shadow="base"
                            onClick={() => {
                                setIsOpen(true);
                                setSelectedImage(src.image);
                            }}
                            _hover={{
                                shadow: "lg",
                                transform: "scale(1.02)",
                            }}
                        />
                    </GridItem>
                ))}
            </Grid>

            {
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
            }
        </>
    );
};

const FadingImage = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Skeleton isLoaded={isLoaded} w="full" h="full" fadeDuration={0.5}>
            <Image onLoad={() => setIsLoaded(true)} {...props} />
        </Skeleton>
    );
};
