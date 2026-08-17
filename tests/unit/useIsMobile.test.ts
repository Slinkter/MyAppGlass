import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsMobile } from '@/shared/hooks/ui/useIsMobile';
import * as chakra from '@chakra-ui/react';

// Mock @chakra-ui/react
vi.mock('@chakra-ui/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@chakra-ui/react')>();
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

describe('useIsMobile Hook', () => {
  it('✅ debe retornar true cuando la media query coincide con viewport móvil (<= 768px)', () => {
    vi.mocked(chakra.useMediaQuery).mockReturnValue([true]);

    const { result } = renderHook(() => useIsMobile());

    expect(chakra.useMediaQuery).toHaveBeenCalledWith(['(max-width: 768px)']);
    expect(result.current).toBe(true);
  });

  it('✅ debe retornar false cuando la media query coincide con viewport de escritorio (> 768px)', () => {
    vi.mocked(chakra.useMediaQuery).mockReturnValue([false]);

    const { result } = renderHook(() => useIsMobile());

    expect(chakra.useMediaQuery).toHaveBeenCalledWith(['(max-width: 768px)']);
    expect(result.current).toBe(false);
  });
});
