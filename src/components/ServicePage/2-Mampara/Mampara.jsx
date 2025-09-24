import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRightIcon, TagIcon } from "@heroicons/react/24/outline";
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
    ModalBody,
    Heading,
    Flex,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

const Mampara = () => {
    const [open, setOpen] = useState(0);
    const colorWhite = "gray.200";
    const colorBlack = "blackAlpha.500";

    const caracteristicas = [
        { label: "Color: Incoloro , Bronce", icon: CheckIcon },
        { label: "Tipo: Templado , Crudo", icon: CheckIcon },
        { label: "Aluminio: Natural , Negro", icon: CheckIcon },
        { label: "Diseño: Lámina , Logo", icon: CheckIcon },
        { label: "Espesor: 8mm , 10mm", icon: CheckIcon },
    ];

    const [isDesktop] = useMediaQuery("(min-width: 48em)"); // 48em es el breakpoint 'md' de Chakra

    // Renderiza las características en el sidebar solo en desktop
    const caracteristicasSidebar = isDesktop
        ? caracteristicas
        : caracteristicas.slice(0, 0); // Array vacío en móvil

    const renderList = open === 0 ? listMampara.nova : listMampara.serie;

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
                justifyContent={{ base: "", md: "center" }}
                alignItems={{ base: "stretch", md: "center" }}
                p={{ base: 4, md: 8 }}
                gap={6}
            >
                <Box // 1.Sidebar
                    bg={useColorModeValue(colorWhite, colorBlack)}
                    w={{ base: "full", md: "20vw", lg: "16vw" }}
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
                            Mamparas
                        </Heading>
                        <Stack spacing={1}>
                            <SidebarItem
                                label="Sistema Nova"
                                isActive={open === 0}
                                onClick={() => setOpen(0)}
                                icon={ChevronRightIcon}
                            />
                            <SidebarItem
                                label="Sistema Serie 25"
                                isActive={open === 1}
                                onClick={() => setOpen(1)}
                                icon={ChevronRightIcon}
                            />
                        </Stack>
                    </Box>

                    <Box
                        display={{
                            base: "none",
                            md: "block",
                        }}
                    >
                        <Heading
                            as="h3"
                            size="lg"
                            mb={4}
                            p={2}
                            display={{ base: "none", md: "block" }}
                        >
                            Características
                        </Heading>
                        <Stack spacing={1}>
                            {caracteristicasSidebar.map((item, index) => (
                                <SidebarItem
                                    key={index}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Box>
                <Box // 2.Galería
                    bg={useColorModeValue(colorWhite, colorBlack)}
                    w={{ base: "full", md: "70vw", lg: "64vw" }}
                    h={{ base: "auto", md: "85vh" }}
                    p={4}
                    rounded="xl"
                    shadow="xl"
                    _hover={{
                        boxShadow: "md",
                        borderColor: "gray.300",
                    }}
                    overflowY="auto" // Permite scroll si el contenido es muy largo
                >
                    <Gallery
                        systemName={open === 0 ? "Nova" : "Serie 25"}
                        images={renderList}
                        caracteristicas={caracteristicas}
                    />
                </Box>
            </Box>
        </>
    );
};

export default Mampara;

const SidebarItem = ({ label, onClick, isActive, icon }) => {
    const activeBg = useColorModeValue("red.100", "red.900");
    const activeColor = useColorModeValue("red.600", "red.200");

    return (
        <Stack
            direction="row"
            align="center"
            justifyContent="flex-start"
            onClick={onClick}
            cursor={onClick ? "pointer" : "default"}
            p={3}
            rounded="md"
            bg={isActive ? activeBg : "transparent"}
            color={isActive ? activeColor : "inherit"}
            _hover={{
                bg: onClick
                    ? useColorModeValue("gray.100", "gray.700")
                    : "transparent",
                color: isActive
                    ? activeColor
                    : onClick
                    ? useColorModeValue("red.500", "red.300")
                    : "inherit",
            }}
            transition="background-color 0.2s, color 0.2s"
        >
            <Icon w={5} h={5} as={icon} />
            <Text fontWeight={isActive ? 700 : 500}>{label}</Text>
        </Stack>
    );
};

const Gallery = ({ images, systemName, caracteristicas }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const responsiveColumns = useBreakpointValue({
        base: 2,
        md: 3,
        lg: 5,
    });
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
                            w="100%"
                            h={{ base: "150px", md: "200px" }}
                            src={src.image}
                            alt={`Imagen de mampara sistema ${systemName} ${src.id}`}
                            rounded="md"
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
                                transform: "scale(1.02)",
                            }}
                        />
                    </GridItem>
                ))}
            </Grid>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                motionPreset="slideInBottom" // Corregido: motionPreset
                size="4xl" // Modal más grande
            >
                <ModalOverlay backdropFilter={"blur(10px)"} />
                <ModalContent
                    bg={useColorModeValue("white", "gray.800")}
                    shadow="xl"
                    rounded="lg"
                >
                    <ModalCloseButton />
                    <ModalBody p={{ base: 4, md: 6 }}>
                        <Flex direction={{ base: "column", md: "row" }} gap={6}>
                            {/* Contenedor para la imagen con tamaño definido */}
                            <Box
                                flex="1" // Permite que el contenedor crezca
                                h={{ base: "50vh", md: "70vh" }} // Altura definida y responsiva
                                w={{ base: "100%", md: "auto" }} // Ancho responsivo
                                bg={useColorModeValue("gray.100", "gray.700")}
                                m={4}
                                rounded="lg"
                                overflow="hidden" // Asegura que la imagen no se desborde
                            >
                                <Image
                                    src={selectedImage}
                                    alt={
                                        selectedImage
                                            ? `Vista ampliada de ${selectedImage}`
                                            : ""
                                    }
                                    w="100%"
                                    h="100%"
                                    objectFit="cover" // Rellena el contenedor sin distorsionar
                                />
                            </Box>
                            <Box display={{ base: "none", md: "none" }}>
                                <Heading as="h3" size="lg" mb={4}>
                                    Características
                                </Heading>
                                <Stack spacing={1}>
                                    {caracteristicas.map((item, index) => (
                                        <SidebarItem
                                            key={index}
                                            label={item.label}
                                            icon={item.icon}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        </Flex>
                    </ModalBody>
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
            h="full" // Ocupa la altura del contenedor (GridItem)
            fadeDuration={0.5} // Controla la velocidad de la transición
        >
            <Image
                onLoad={() => setIsLoaded(true)} // Cuando la imagen carga, actualiza el estado
                {...props} // Pasa todos los props originales (src, onClick, etc.)
            />
        </Skeleton>
    );
};
