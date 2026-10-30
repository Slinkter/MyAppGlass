import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilterableList } from '@/shared/hooks/ui/useFilterableList';

// Mock @chakra-ui/react useMediaQuery
vi.mock('@chakra-ui/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@chakra-ui/react')>();
  return {
    ...actual,
    useMediaQuery: vi.fn().mockReturnValue([false]),
  };
});

// Mock useIntersectionObserver
let triggerIntersectCallback: (() => void) | null = null;
vi.mock('@shared/hooks/observers/useIntersectionObserver', () => ({
  default: (_node: any, callback: () => void) => {
    triggerIntersectCallback = callback;
  },
}));

interface TestItem {
  id: number;
  name: string;
  category: string;
}

describe('useFilterableList Hook', () => {
  const mockItems: TestItem[] = [
    { id: 1, name: 'Item 1', category: 'CatA' },
    { id: 2, name: 'Item 2', category: 'CatA' },
    { id: 3, name: 'Item 3', category: 'CatB' },
    { id: 4, name: 'Item 4', category: 'CatB' },
    { id: 5, name: 'Item 5', category: 'CatA' },
    { id: 6, name: 'Item 6', category: 'CatC' },
    { id: 7, name: 'Item 7', category: 'CatA' },
    { id: 8, name: 'Item 8', category: 'CatB' },
  ];

  const filterFn = (items: TestItem[], category: string) => {
    if (category === 'Todos') return items;
    return items.filter((item) => item.category === category);
  };

  beforeEach(() => {
    triggerIntersectCallback = null;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('✅ debe inicializar con valores por defecto (Todos, pageSize=6)', () => {
    const { result } = renderHook(() =>
      useFilterableList({
        items: mockItems,
        filterFn,
      })
    );

    expect(result.current.activeCategory).toBe('Todos');
    expect(result.current.displayCount).toBe(6);
    expect(result.current.totalFilteredCount).toBe(8);
    expect(result.current.paginatedItems).toHaveLength(6);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.isPending).toBe(false);
  });

  it('✅ debe inicializar con categoría y pageSize personalizados', () => {
    const { result } = renderHook(() =>
      useFilterableList({
        items: mockItems,
        filterFn,
        pageSize: 2,
        initialCategory: 'CatB',
      })
    );

    expect(result.current.activeCategory).toBe('CatB');
    expect(result.current.displayCount).toBe(2);
    expect(result.current.totalFilteredCount).toBe(3); // 3 CatB items (id: 3, 4, 8)
    expect(result.current.paginatedItems).toHaveLength(2);
    expect(result.current.hasMore).toBe(true);
  });

  it('✅ debe actualizar categoría y reiniciar el displayCount al cambiar filtro', () => {
    const { result } = renderHook(() =>
      useFilterableList({
        items: mockItems,
        filterFn,
        pageSize: 3,
      })
    );

    expect(result.current.activeCategory).toBe('Todos');
    expect(result.current.paginatedItems).toHaveLength(3);

    act(() => {
      result.current.handleFilterChange('CatA');
    });

    expect(result.current.activeCategory).toBe('CatA');
    expect(result.current.totalFilteredCount).toBe(4); // 4 CatA items (1, 2, 5, 7)
    expect(result.current.paginatedItems).toHaveLength(3);
    expect(result.current.hasMore).toBe(true);
  });

  it('✅ debe paginar más elementos cuando el intersection observer se activa', () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: any) => {
      cb(0);
      return 1;
    });

    const { result } = renderHook(() =>
      useFilterableList({
        items: mockItems,
        filterFn,
        pageSize: 4,
      })
    );

    expect(result.current.paginatedItems).toHaveLength(4);
    expect(result.current.hasMore).toBe(true);

    // Simular que el IntersectionObserver detecta que el loader es visible
    act(() => {
      triggerIntersectCallback?.();
    });

    expect(result.current.displayCount).toBe(8);
    expect(result.current.paginatedItems).toHaveLength(8);
    expect(result.current.hasMore).toBe(false);

    rafSpy.mockRestore();
  });

  it('✅ no debe incrementar displayCount si ya se mostraron todos los elementos', () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');

    const { result } = renderHook(() =>
      useFilterableList({
        items: mockItems,
        filterFn,
        pageSize: 10,
      })
    );

    expect(result.current.hasMore).toBe(false);
    expect(result.current.displayCount).toBe(10);

    act(() => {
      triggerIntersectCallback?.();
    });

    expect(rafSpy).not.toHaveBeenCalled();
    expect(result.current.displayCount).toBe(10);

    rafSpy.mockRestore();
  });

  it('✅ debe gestionar loaderRef asignando el nodo del loader correctamente', () => {
    const { result } = renderHook(() =>
      useFilterableList({
        items: mockItems,
        filterFn,
      })
    );

    const mockNode = document.createElement('div');
    act(() => {
      result.current.loaderRef(mockNode);
    });

    // Test cleaning up ref
    act(() => {
      result.current.loaderRef(null);
    });
  });

  it('✅ debe cancelar requestAnimationFrame previo al desmontar', () => {
    const cancelRafSpy = vi.spyOn(window, 'cancelAnimationFrame');
    vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(999);

    const { result, unmount } = renderHook(() =>
      useFilterableList({
        items: mockItems,
        filterFn,
        pageSize: 2,
      })
    );

    act(() => {
      triggerIntersectCallback?.();
    });

    unmount();
    expect(cancelRafSpy).toHaveBeenCalledWith(999);
  });
});
