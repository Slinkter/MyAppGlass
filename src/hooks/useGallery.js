import { useState, useEffect, useMemo } from "react";

/**
 * Hook para gestionar la lógica y el estado de un componente de galería de imágenes.
 * @param {Array} images - El array de imágenes a mostrar.
 * @returns {object} Un objeto con el estado de la galería y los manejadores de eventos.
 */
export const useGallery = (images) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Efecto para resetear el índice si las imágenes cambian
    useEffect(() => {
        if (images && images.length > 0) {
            setSelectedIndex(0);
        }
    }, [images]);

    const onOpenModal = () => setIsModalOpen(true);
    const onCloseModal = () => setIsModalOpen(false);

    const handlePrevious = (e) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleSelect = (index) => {
        setSelectedIndex(index);
    };

    // Lógica de seguridad para el índice y la imagen actual
    const safeIndex = useMemo(() => {
        if (!images || images.length === 0) return 0;
        return selectedIndex >= images.length ? 0 : selectedIndex;
    }, [images, selectedIndex]);

    const currentImage = useMemo(() => {
        return images?.[safeIndex];
    }, [images, safeIndex]);

    return {
        selectedIndex: safeIndex,
        setSelectedIndex: handleSelect,
        isModalOpen,
        onOpenModal,
        onCloseModal,
        isHovered,
        setIsHovered,
        handlePrevious,
        handleNext,
        currentImage,
        imageCount: images?.length || 0,
    };
};
