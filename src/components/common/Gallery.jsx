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
    Flex,
} from "@chakra-ui/react";

import { useState } from "react";
import FadingImage from "./FadingImage";

/**
 * Componente que renderiza una galería de imágenes en una cuadrícula responsive.
 * Al hacer clic en una imagen, se abre un modal para mostrarla en un tamaño más grande.
 *
 * @param {{ images: Array<{id: number|string, image: string}> }} props - Props del componente.
 * @param {Array<{id: number|string, image: string}>} props.images - Un array de objetos, donde cada objeto representa una imagen y debe tener las propiedades `id` e `image` (URL).
 * @returns {JSX.Element}
 */
import React from "react";
const Gallery = React.memo(({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // Will store the full image object
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
                            w="100%" // Make it responsive to GridItem width
                            h={{ base: "320px", md: "200px" }} // Keep height fixed or adjust as needed
                            src={src.image}
                            alt={`Imagen de ${src.name}`}
                            rounded="md"
                            cursor={"pointer"}
                            borderRadius="md"
                            objectFit="cover"
                            shadow={"base"}
                            transition="all 0.3s ease-in-out"
                            _hover={{
                                shadow: "lg",
                                transform: "scale(1.03)",
                            }}
                            onClick={() => {
                                setSelectedImage(src); // Pass the full image object
                                setIsOpen(true);
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
                                    src={selectedImage?.image}
                                    alt={
                                        selectedImage
                                            ? `Vista ampliada de ${selectedImage.name || selectedImage.image}` // Use name or image URL as fallback
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
});

Gallery.displayName = "Gallery";
export default Gallery;
