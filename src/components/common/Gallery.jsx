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
    useColorModeValue,
} from "@chakra-ui/react";

import React, { useState } from "react";
import FadingImage from "./FadingImage";

/**
 * Componente que renderiza una galería de imágenes en una cuadrícula responsive.
 * Al hacer clic en una imagen, se abre un modal para mostrarla en un tamaño más grande.
 *
 * @param {{ images: Array<{id: number|string, image: string, name?: string}> }} props - Props del componente.
 * @returns {JSX.Element}
 */
const Gallery = React.memo(({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const responsiveColumns = useBreakpointValue({
        base: 1,
        md: 2,
        lg: 5,
        xl: 6,
    });
    const onClose = () => setIsOpen(false);

    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.25)",
        "rgba(0, 0, 0, 0.25)"
    );
    const borderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.35)",
        "rgba(255, 255, 255, 0.15)"
    );

    return (
        <>
            <Grid
                templateColumns={`repeat(${responsiveColumns}, 1fr)`}
                gap={4}
                p={2}
            >
                {images.map((imageItem) => (
                    <GridItem key={imageItem.id}>
                        <FadingImage
                            w="100%"
                            h={{ base: "320px", md: "200px" }}
                            src={imageItem.image}
                            alt={`Imagen de ${
                                imageItem.name || `galería ${imageItem.id}`
                            }`}
                            rounded="md"
                            cursor={"pointer"}
                            objectFit="cover"
                            shadow={"base"}
                            transition="all 0.3s ease-in-out"
                            _hover={{
                                shadow: "lg",
                                transform: "scale(1.03)",
                            }}
                            onClick={() => {
                                setSelectedImage(imageItem);
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
                motionPreset="slideInBottom"
                size="4xl"
            >
                <ModalOverlay backdropFilter={"blur(20px)"} />
                <ModalContent
                    bg={bgColor}
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor={borderColor}
                    boxShadow="0 4px 30px rgba(0,0,0,0.1)"
                    borderRadius="2xl"
                >
                    <ModalCloseButton />
                    <ModalBody p={{ base: 4, md: 6 }}>
                        <Flex>
                            <Box
                                flex="1"
                                w={{ base: "100%", md: "20vh" }}
                                h={{ base: "auto", md: "70vh" }}
                                m={4}
                                rounded="lg"
                                overflow="hidden"
                            >
                                <Image
                                    src={selectedImage?.image}
                                    alt={
                                        selectedImage
                                            ? `Vista ampliada de ${
                                                  selectedImage.name ||
                                                  `galería ${selectedImage.id}`
                                              }`
                                            : ""
                                    }
                                    w="100%"
                                    h="100%"
                                    p="2"
                                    objectFit="contain"
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
