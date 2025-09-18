import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listMampara } from "../../../assets/webService/s/02.Mampara/db_mampara";
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
} from "@chakra-ui/react";

const Mampara = () => {
    const [open, setOpen] = useState(0);
    const [loading, setLoading] = useState(true);

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
                <title>Mamparas</title>
                <meta
                    name="description"
                    content="Perfectas divisiones de oficina. Sistemas Nova y Serie 25."
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
                    w={{ base: "full", md: "20vw" }}
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
                            MAMPARAS
                        </Text>
                    </Box>
                    <Stack spacing={1}>
                        <SidebarItem
                            label="Sistema Nova"
                            isActive={open === 0} // Activo si open es 0
                            onClick={() => setOpen(0)}
                            loading={loading}
                        />
                        <SidebarItem
                            label="Sistema Serie 25"
                            isActive={open === 1}
                            onClick={() => setOpen(1)}
                            loading={loading}
                        />
                    </Stack>
                    {/* Separador visual */}
                    <Box
                        h="1px"
                        bg={useColorModeValue("gray.200", "gray.700")}
                        my={4}
                    />
                    <Box mb={1} p={3} opacity={loading ? 0 : 1}>
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            textTransform="uppercase"
                            color={useColorModeValue("gray.700", "gray.200")}
                        >
                            CARACTERÍSTICA
                        </Text>
                    </Box>
                    <Stack spacing={1}>
                        <SidebarItem
                            label="Color : Incoro | Bronce"
                            loading={loading}
                        />
                        <SidebarItem
                            label="Tipo : Templado | Crudo"
                            loading={loading}
                        />
                        <SidebarItem
                            label="Aluminio : Natural | Negro"
                            loading={loading}
                        />

                        <SidebarItem
                            label="Diseño : Lamina | Logo"
                            loading={loading}
                        />
                        <SidebarItem
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
                    {open === 0 ? (
                        <Gallery images={listMampara.nova} loading={loading} />
                    ) : (
                        <Gallery images={listMampara.serie} loading={loading} />
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Mampara;

const SidebarItem = ({ label, onClick, isActive, loading }) => {
    // Determina qué ícono usar basado en si el item es interactivo (tiene onClick)
    const iconToShow = onClick ? ChevronRightIcon : CheckIcon;
    return (
        <Stack
            direction="row"
            align="center"
            justifyContent="flex-start" // Alinea los items a la izquierda
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
                <Stack direction="row" align="center" spacing={3}>
                    <Icon w={5} h={5} as={iconToShow} />
                    <Text fontWeight={600}>{label}</Text>
                </Stack>
            )}
        </Stack>
    );
};

const Gallery = ({ images, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const responsiveColumns = useBreakpointValue({ base: 1, md: 5 });
    const onClose = () => setIsOpen(false);

    return (
        <>
            <Grid
                templateColumns={`repeat(${responsiveColumns}, 1fr)`}
                gap={4}
                p={2}
            >
                {images.map((src) => (
                    <GridItem key={src.id}>
                        <FadingImage
                            w="full"
                            h={{ base: "44vh", md: "24vh" }}
                            src={src.image}
                            alt={`Imagen de mampara sistema ${
                                images === listMampara.nova
                                    ? "Nova"
                                    : "Serie 25"
                            } ${src.id}`}
                            rounded="lg"
                            objectFit={"cover"}
                            transition="all .2s ease-in-out"
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
            <Modal
                isOpen={isOpen && !isMobile} // El modal solo se abre si no es móvil
                onClose={onClose}
                isCentered
                motionPreset="slideInBottom"
            >
                <ModalOverlay backdropFilter={"blur(10px)"} />
                <ModalContent>
                    <ModalCloseButton />
                    <Image
                        src={selectedImage}
                        alt={
                            selectedImage
                                ? `Vista ampliada de ${selectedImage}`
                                : "Imagen ampliada"
                        }
                        objectFit={"cover"}
                        align={"center"}
                        borderRadius={"base"}
                        shadow={"lg"}
                    />
                </ModalContent>
            </Modal>
        </>
    );
};

const FadingImage = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <Skeleton
            isLoaded={isLoaded} // El esqueleto se desvanecerá solo cuando isLoaded sea true
            w="full"
            h={{ base: "44vh", md: "24vh" }}
            rounded="lg"
            fadeDuration={0.5} // Controla la velocidad de la transición
        >
            <Image
                onLoad={() => setIsLoaded(true)} // Cuando la imagen carga, actualiza el estado
                {...props} // Pasa todos los props originales (src, onClick, etc.)
            />
        </Skeleton>
    );
};
