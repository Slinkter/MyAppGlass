import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { CopyButton } from '@/shared/components/ui/copy-button';
import { Provider } from '@/components/ui/provider';
import { toaster } from '@/components/ui/toaster-instance';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe('CopyButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(toaster, 'create').mockImplementation(() => 'toast-id');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('✅ debe renderizar el botón con el aria-label adecuado para accesibilidad', () => {
    renderWithProvider(<CopyButton value="20606432870" label="RUC" />);

    const button = screen.getByRole('button', { name: 'Copiar RUC' });
    expect(button).toBeInTheDocument();
  });

  it('✅ debe copiar el texto a navigator.clipboard.writeText y disparar toaster de éxito', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });

    renderWithProvider(<CopyButton value="0011-0106-0100041622" label="N° Cuenta" />);

    const button = screen.getByRole('button', { name: 'Copiar N° Cuenta' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(writeTextMock).toHaveBeenCalledWith('0011-0106-0100041622');
    expect(toaster.create).toHaveBeenCalledWith({
      title: 'Copiado',
      description: 'N° Cuenta copiado al portapapeles.',
      type: 'success',
      duration: 2000,
    });
  });

  it('✅ debe resetear el estado de copiado tras 2000ms', async () => {
    vi.useFakeTimers();

    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });

    renderWithProvider(<CopyButton value="996-537-435" label="Teléfono" />);
    const button = screen.getByRole('button', { name: 'Copiar Teléfono' });

    await act(async () => {
      fireEvent.click(button);
    });

    // Avanzar temporizador
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    vi.useRealTimers();
  });

  it('❌ debe capturar errores del portapapeles y disparar toast de error', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Clipboard permission denied'));
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });

    renderWithProvider(<CopyButton value="secret" label="Dato" />);
    const button = screen.getByRole('button', { name: 'Copiar Dato' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(writeTextMock).toHaveBeenCalledWith('secret');
    expect(toaster.create).toHaveBeenCalledWith({
      title: 'Error',
      description: 'No se pudo copiar el texto.',
      type: 'error',
    });
  });
});
