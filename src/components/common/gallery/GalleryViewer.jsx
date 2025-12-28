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

const GalleryViewer = ({
    currentImage,
    imageCount,
    selectedIndex,
    setSelectedIndex,
    isHovered,
    setIsHovered,
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                    objectFit="cover"
                    showOverlay={false}
                    transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    transform={isHovered ? "scale(1.05)" : "scale(1)"}
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
                        opacity={{ base: 1, md: isHovered ? 1 : 0 }}
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
                        opacity={{ base: 1, md: isHovered ? 1 : 0 }}
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
    isHovered: PropTypes.bool.isRequired,
    setIsHovered: PropTypes.func.isRequired,
    handlePrevious: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
};

export default GalleryViewer;
