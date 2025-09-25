import {
    Box,
    Grid,
    GridItem,
    Image,
    useColorModeValue,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Flex,
} from "@chakra-ui/react";

import { useState } from "react";
import FadingImage from "./FadingImage";

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
                {images.map((src) => (
                    <GridItem key={src.id}>
                        <FadingImage
                            w="100%"
                            h={{ base: "150px", md: "200px" }}
                            src={src.image}
                            alt={`Imagen de mampara sistema }`}
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
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Gallery;
