"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

export interface GalleryImage {
  id: string | number;
  image: string;
  name?: string;
}

export interface UseGalleryReturn {
  selectedIndex: number;
  setSelectedIndex: (_index: number) => void;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  isHovered: boolean;
  setIsHovered: (_hovered: boolean) => void;
  handlePrevious: (_e?: React.MouseEvent | React.KeyboardEvent) => void;
  handleNext: (_e?: React.MouseEvent | React.KeyboardEvent) => void;
  currentImage?: GalleryImage;
  imageCount: number;
}

export const useGallery = (images: GalleryImage[]): UseGalleryReturn => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedIndex(0);
    }
  }, [images]);

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);

  const handlePrevious = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const safeIndex = useMemo(() => {
    if (!images || images.length === 0) return 0;
    return selectedIndex >= images.length ? 0 : selectedIndex;
  }, [images, selectedIndex]);

  const currentImage = useMemo(() => {
    return images?.[safeIndex];
  }, [images, safeIndex]);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const preload = (index: number) => {
      if (typeof window === "undefined") return;
      const img = new Image();
      img.src = images[index].image;
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
