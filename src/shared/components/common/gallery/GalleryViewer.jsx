import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    IconButton,
    Text,
    HStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import FadingImage from "../FadingImage";

/**
 * @component GalleryViewer
 * @description Visor principal de la galería de imágenes.
 * Muestra la imagen seleccionada en grande con controles de navegación (flechas, dots, contador).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.currentImage - Objeto de la imagen actual a mostrar.
 * @param {number} props.imageCount - Total de imágenes en la galería.
 * @param {number} props.selectedIndex - Índice actual.
 * @param {function} props.setSelectedIndex - Función para cambiar el índice manualmente (dots).
 * @param {function} props.handlePrevious - Función para ir a la imagen anterior.
 * @param {function} props.handleNext - Función para ir a la imagen siguiente.
 * @returns {JSX.Element} Visor de imagen principal.
 */
const GalleryViewer = ({
    currentImage,
    imageCount,
    selectedIndex,
    setSelectedIndex,
    handlePrevious,
    handleNext,
}) => {
    const dotColor = useColorModeValue("gray.300", "whiteAlpha.400");
    const dotActiveColor = useColorModeValue("primary.600", "primary.300");

    return (
        <Box
            flex="1"
            h={{ base: "280px", sm: "320px", md: "100%" }}
            w="100%"
            minW={0}
            position="relative"
            borderRadius={{ base: "lg", md: "xl" }}
            overflow="hidden"
            role="group"
        >
            {/* Imagen Principal */}
            <Box
                w="100%"
                h="100%"
                cursor="default"
                position="relative"
                overflow="hidden"
            >
                <FadingImage
                    src={currentImage.image}
                    alt={currentImage.name || "Vista principal"}
                    w="100%"
                    h="100%"
                    mx="auto"
                    objectFit="cover"
                    showOverlay={false}
                    loading="eager" // Prioridad alta para imagen principal
                    fetchpriority="high" // HTML5 priority hint
                    transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    _groupHover={{ transform: "scale(1.00)" }}
                    style={{ 
                        willChange: "transform",
                        transform: "translateZ(0)", // Force GPU acceleration
                    }}
                />
            </Box>

            {/* Controles de Navegación (solo si hay más de 1 imagen) */}
            {imageCount > 1 && (
                <>
                    {/* Botón Anterior */}
                    <IconButton
                        icon={<ChevronLeftIcon boxSize={{ base: 5, md: 6 }} />}
                        position="absolute"
                        left={{ base: 2, md: 4 }}
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handlePrevious}
                        opacity={{ base: 1, md: 0 }}
                        _groupHover={{ opacity: { md: 1 } }}
                        transition="opacity 0.3s ease"
                        bg="blackAlpha.600"
                        color="white"
                        size={{ base: "md", md: "lg" }}
                        rounded="full"
                        _hover={{
                            bg: "blackAlpha.800",
                            transform: "translateY(-50%) scale(1.1)",
                        }}
                        aria-label="Imagen anterior"
                        zIndex={2}
                    />

                    {/* Botón Siguiente */}
                    <IconButton
                        icon={<ChevronRightIcon boxSize={{ base: 5, md: 6 }} />}
                        position="absolute"
                        right={{ base: 2, md: 4 }}
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handleNext}
                        opacity={{ base: 1, md: 0 }}
                        _groupHover={{ opacity: { md: 1 } }}
                        transition="opacity 0.3s ease"
                        bg="blackAlpha.600"
                        color="white"
                        size={{ base: "md", md: "lg" }}
                        rounded="full"
                        _hover={{
                            bg: "blackAlpha.800",
                            transform: "translateY(-50%) scale(1.1)",
                        }}
                        aria-label="Imagen siguiente"
                        zIndex={2}
                    />

                    {/* Contador de Imágenes */}
                    <Box
                        position="absolute"
                        top={{ base: 2, md: 4 }}
                        right={{ base: 2, md: 4 }}
                        bg="blackAlpha.700"
                        backdropFilter="blur(8px)"
                        px={{ base: 2, md: 3 }}
                        py={1}
                        borderRadius="full"
                        zIndex={2}
                    >
                        <Text
                            fontSize={{ base: "xs", md: "sm" }}
                            color="white"
                            fontWeight="medium"
                        >
                            {selectedIndex + 1} / {imageCount}
                        </Text>
                    </Box>

                    {/* Indicadores de Navegación (Dots) */}
                    <HStack
                        position="absolute"
                        bottom={{ base: 2, md: 4 }}
                        left="50%"
                        transform="translateX(-50%)"
                        spacing={{ base: 1.5, md: 2 }}
                        zIndex={2}
                    >
                        {Array.from({ length: imageCount }).map((_, index) => (
                            <Box
                                key={index}
                                w={
                                    selectedIndex === index
                                        ? { base: "20px", md: "24px" }
                                        : { base: "6px", md: "8px" }
                                }
                                h={{ base: "6px", md: "8px" }}
                                bg={
                                    selectedIndex === index
                                        ? dotActiveColor
                                        : dotColor
                                }
                                borderRadius="full"
                                cursor="pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex(index);
                                }}
                                transition="all 0.3s ease"
                                _hover={{
                                    bg: dotActiveColor,
                                    transform: "scale(1.2)",
                                }}
                                aria-label={`Seleccionar imagen ${index + 1}`}
                            />
                        ))}
                    </HStack>
                </>
            )}
        </Box>
    );
};

GalleryViewer.propTypes = {
    currentImage: PropTypes.object.isRequired,
    imageCount: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    setSelectedIndex: PropTypes.func.isRequired,
    handlePrevious: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
};

export default GalleryViewer;