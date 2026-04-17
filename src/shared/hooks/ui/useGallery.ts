/**
 * @file useGallery.ts
 * @description Logic engine for image galleries, managing circular navigation, modals, and selection states.
 * @module shared/hooks
 */

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { GalleryItem } from "../../types/gallery";

/**
 * Interface representing the return object of useGallery hook.
 */
export interface UseGalleryReturn {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  handlePrevious: (e?: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => void;
  handleNext: (e?: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => void;
  currentImage?: GalleryItem;
  imageCount: number;
}

/**
 * Hook para gestionar la lógica y el estado de un componente de galería de imágenes.
 * @param images - Un array de objetos de imagen a mostrar en la galería.
 * @returns Un objeto con el estado de la galería y los manejadores de eventos.
 */
export const useGallery = (images: GalleryItem[]): UseGalleryReturn => {
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

  const handlePrevious = useCallback((e?: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback((e?: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleSelect = (index: number) => {
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

  // Preloading images to improve navigation performance
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const preload = (index: number) => {
      const src = images[index]?.src;
      if (!src || src === "undefined") return;
      const img = new Image();
      img.src = src;
    };

    const nextIndex = (safeIndex + 1) % images.length;
    const prevIndex = (safeIndex - 1 + images.length) % images.length;

    preload(nextIndex);
    preload(prevIndex);
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

export default useGallery;
