import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGallery } from '@/shared/hooks/ui/useGallery';
import { GalleryItem } from '@/shared/types/gallery';

describe('useGallery Hook', () => {
  const mockImages: GalleryItem[] = [
    { src: '/images/img1.webp', alt: 'Imagen 1', name: 'Ventana 1' },
    { src: '/images/img2.webp', alt: 'Imagen 2', name: 'Ventana 2' },
    { src: '/images/img3.webp', alt: 'Imagen 3', name: 'Ventana 3' },
  ];

  it('✅ debe inicializar correctamente con el primer elemento seleccionado y modales cerrados', () => {
    const { result } = renderHook(() => useGallery(mockImages));

    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.currentImage).toEqual(mockImages[0]);
    expect(result.current.imageCount).toBe(3);
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.isHovered).toBe(false);
  });

  it('✅ debe manejar un array vacío de imágenes de manera segura', () => {
    const { result } = renderHook(() => useGallery([]));

    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.currentImage).toBeUndefined();
    expect(result.current.imageCount).toBe(0);
  });

  it('✅ debe navegar hacia adelante con handleNext y rotar circularmente al final', () => {
    const { result } = renderHook(() => useGallery(mockImages));

    // De 0 a 1
    act(() => {
      result.current.handleNext();
    });
    expect(result.current.selectedIndex).toBe(1);
    expect(result.current.currentImage).toEqual(mockImages[1]);

    // De 1 a 2
    act(() => {
      result.current.handleNext();
    });
    expect(result.current.selectedIndex).toBe(2);
    expect(result.current.currentImage).toEqual(mockImages[2]);

    // De 2 a 0 (vuelta al inicio circular)
    act(() => {
      result.current.handleNext();
    });
    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.currentImage).toEqual(mockImages[0]);
  });

  it('✅ debe navegar hacia atrás con handlePrevious y rotar circularmente al inicio', () => {
    const { result } = renderHook(() => useGallery(mockImages));

    // De 0 a 2 (salto al final circular)
    act(() => {
      result.current.handlePrevious();
    });
    expect(result.current.selectedIndex).toBe(2);
    expect(result.current.currentImage).toEqual(mockImages[2]);

    // De 2 a 1
    act(() => {
      result.current.handlePrevious();
    });
    expect(result.current.selectedIndex).toBe(1);
    expect(result.current.currentImage).toEqual(mockImages[1]);

    // De 1 a 0
    act(() => {
      result.current.handlePrevious();
    });
    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.currentImage).toEqual(mockImages[0]);
  });

  it('✅ debe permitir seleccionar directamente un índice específico con setSelectedIndex', () => {
    const { result } = renderHook(() => useGallery(mockImages));

    act(() => {
      result.current.setSelectedIndex(2);
    });
    expect(result.current.selectedIndex).toBe(2);
    expect(result.current.currentImage).toEqual(mockImages[2]);
  });

  it('✅ debe controlar la apertura y cierre del modal (onOpenModal, onCloseModal)', () => {
    const { result } = renderHook(() => useGallery(mockImages));

    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      result.current.onOpenModal();
    });
    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.onCloseModal();
    });
    expect(result.current.isModalOpen).toBe(false);
  });

  it('✅ debe controlar el estado hover (setIsHovered)', () => {
    const { result } = renderHook(() => useGallery(mockImages));

    expect(result.current.isHovered).toBe(false);

    act(() => {
      result.current.setIsHovered(true);
    });
    expect(result.current.isHovered).toBe(true);

    act(() => {
      result.current.setIsHovered(false);
    });
    expect(result.current.isHovered).toBe(false);
  });

  it('✅ debe resetear selectedIndex a 0 cuando la lista de imágenes cambia', () => {
    const { result, rerender } = renderHook(({ imgs }) => useGallery(imgs), {
      initialProps: { imgs: mockImages },
    });

    act(() => {
      result.current.setSelectedIndex(2);
    });
    expect(result.current.selectedIndex).toBe(2);

    const newImages: GalleryItem[] = [
      { src: '/images/new1.webp', alt: 'New 1' },
      { src: '/images/new2.webp', alt: 'New 2' },
    ];

    rerender({ imgs: newImages });
    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.currentImage).toEqual(newImages[0]);
    expect(result.current.imageCount).toBe(2);
  });

  it('✅ debe prevenir la propagación de eventos si se pasa un evento a handleNext / handlePrevious', () => {
    const { result } = renderHook(() => useGallery(mockImages));
    const stopPropagationMock = vi.fn();
    const mockEvent = { stopPropagation: stopPropagationMock } as any;

    act(() => {
      result.current.handleNext(mockEvent);
    });
    expect(stopPropagationMock).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.handlePrevious(mockEvent);
    });
    expect(stopPropagationMock).toHaveBeenCalledTimes(2);
  });
});
