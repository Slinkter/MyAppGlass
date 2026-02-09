import { useState, useEffect, useMemo } from "react";

/**
 * @typedef {Object} GalleryImage
 * @property {string|number} id - Identificador único de la imagen.
 * @property {string} image - URL o path de la imagen.
 * @property {string} [name] - Nombre opcional de la imagen.
 */

/**
 * @typedef {Object} UseGalleryReturn
 * @property {number} selectedIndex - El índice de la imagen actualmente seleccionada.
 * @property {function(number): void} setSelectedIndex - Función para establecer el índice de la imagen seleccionada.
 * @property {boolean} isModalOpen - Indica si el modal de la galería está abierto.
 * @property {function(): void} onOpenModal - Función para abrir el modal de la galería.
 * @property {function(): void} onCloseModal - Función para cerrar el modal de la galería.
 * @property {boolean} isHovered - Indica si el componente está siendo hovereado.
 * @property {function(boolean): void} setIsHovered - Función para establecer el estado de hover.
 * @property {function(Event): void} handlePrevious - Manejador para navegar a la imagen anterior.
 * @property {function(Event): void} handleNext - Manejador para navegar a la imagen siguiente.
 * @property {GalleryImage} [currentImage] - El objeto de la imagen actualmente seleccionada.
 * @property {number} imageCount - El número total de imágenes en la galería.
 */

/**
 * Hook para gestionar la lógica y el estado de un componente de galería de imágenes.
 * @param {GalleryImage[]} images - Un array de objetos de imagen a mostrar en la galería.
 * @returns {UseGalleryReturn} Un objeto con el estado de la galería y los manejadores de eventos.
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
