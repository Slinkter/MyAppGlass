import {
    Box,
    Grid,
    GridItem,
    Image,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Card,
    CardBody,
    Skeleton,
    Flex,
} from "@chakra-ui/react";

import { useState } from "react";
import FadingImage from "./FadingImage";

const Gallery = ({ images }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const responsiveColumns = useBreakpointValue({
        base: 1,
        md: 2,
        lg: 5,
        xl: 6,
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
                            w={{ base: "320px", md: "385px" }}
                            h={{ base: "320px", md: "200px" }}
                            src={src.image}
                            alt={`Imagen de mampara sistema }`}
                            rounded="md"
                            transition="all .2s ease-in-out"
                            cursor={"pointer"}
                            borderRadius="md"
                            objectFit="cover"
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
                <ModalContent shadow="xl" rounded="lg">
                    <ModalCloseButton />
                    <ModalBody p={{ base: 4, md: 6 }}>
                        <Flex direction={{ base: "row", md: "row" }}>
                            {/* Contenedor para la imagen con tamaño definido */}
                            <Box
                                flex="1" // Permite que el contenedor crezca
                                w={{ base: "100%", md: "20vh" }} // Ancho responsivo
                                h={{ base: "100%", md: "70vh" }} // Altura definida y responsiva
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
                                    p="2"
                                    objectFit="contain" // Rellena el contenedor sin distorsionar
                                />
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Gallery;
