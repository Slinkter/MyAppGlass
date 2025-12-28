import { Flex } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { useGallery } from "@/hooks/useGallery";
import GalleryViewer from "./gallery/GalleryViewer";
import GalleryThumbnails from "./gallery/GalleryThumbnails";

/**
 * Gallery Premium - Galería de producto de alta calidad
 * Diseño inspirado en configuradores de lujo (Apple, Tesla)
 * Con navegación, contador, dots y transiciones suaves.
 */
const Gallery = React.memo(({ images }) => {
    const {
        selectedIndex,
        setSelectedIndex,
        isHovered,
        setIsHovered,
        handlePrevious,
        handleNext,
        currentImage,
        imageCount,
    } = useGallery(images);

    if (!images || imageCount === 0) {
        return null;
    }

    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 2, md: 3, lg: 4 }}
            h="100%"
            w="100%"
            minW={0}
            maxW="100%"
        >
            {/* 1. Visor Principal con Controles */}
            <GalleryViewer
                currentImage={currentImage}
                imageCount={imageCount}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
            />

            {/* 2. Carrusel de Miniaturas */}
            <GalleryThumbnails
                images={images}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
        </Flex>
    );
});

Gallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            image: PropTypes.string.isRequired,
            name: PropTypes.string,
        })
    ),
};

Gallery.displayName = "Gallery";
export default Gallery;
