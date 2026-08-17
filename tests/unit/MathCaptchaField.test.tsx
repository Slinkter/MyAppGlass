import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { MathCaptchaField } from '@/shared/components/MathCaptchaField';
import * as mathCaptchaUtils from '@/shared/utils/mathCaptcha';
import { Provider } from '@/components/ui/provider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe('MathCaptchaField Component', () => {
  const defaultOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('✅ debe renderizar el título de seguridad, el reto matemático inicial y el input con placeholder', () => {
    vi.spyOn(mathCaptchaUtils, 'generateMathChallenge').mockReturnValue({
      numA: 7,
      numB: 3,
      operator: '+',
      question: '¿Cuánto es 7 + 3?',
      token: 'fake-token-123',
    });

    renderWithProvider(
      <MathCaptchaField
        value=""
        onChange={defaultOnChange}
      />
    );

    // Verificación de textos y elementos
    expect(screen.getByText(/Verificación de Seguridad/i)).toBeInTheDocument();
    expect(screen.getByText('¿Cuánto es 7 + 3?')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Tu respuesta');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'math-captcha-input');
    expect(input).toHaveAttribute('name', 'mathCaptchaAnswer');
    expect(input).toHaveAttribute('inputMode', 'numeric');
    expect(input).toHaveAttribute('maxLength', '4');

    // Botón de recargar con accesibilidad adecuada
    const refreshBtn = screen.getByRole('button', { name: /Generar nueva operación matemática/i });
    expect(refreshBtn).toBeInTheDocument();
    expect(refreshBtn).toHaveAttribute('title', 'Cambiar operación');
  });

  it('✅ debe llamar a onChange al montar con valor vacío y el token generado', () => {
    vi.spyOn(mathCaptchaUtils, 'generateMathChallenge').mockReturnValue({
      numA: 5,
      numB: 4,
      operator: '+',
      question: '¿Cuánto es 5 + 4?',
      token: 'initial-token-xyz',
    });

    renderWithProvider(
      <MathCaptchaField
        value=""
        onChange={defaultOnChange}
      />
    );

    expect(defaultOnChange).toHaveBeenCalledTimes(1);
    expect(defaultOnChange).toHaveBeenCalledWith('', 'initial-token-xyz');
  });

  it('✅ debe actualizar el valor y emitir onChange con el nuevo valor y token al escribir', () => {
    vi.spyOn(mathCaptchaUtils, 'generateMathChallenge').mockReturnValue({
      numA: 8,
      numB: 2,
      operator: '-',
      question: '¿Cuánto es 8 - 2?',
      token: 'token-typing-test',
    });

    renderWithProvider(
      <MathCaptchaField
        value=""
        onChange={defaultOnChange}
      />
    );

    const input = screen.getByPlaceholderText('Tu respuesta');
    fireEvent.change(input, { target: { value: '6' } });

    expect(defaultOnChange).toHaveBeenLastCalledWith('6', 'token-typing-test');
  });

  it('✅ debe regenerar un nuevo reto y llamar a onChange con valor vacío cuando se hace clic en refrescar', () => {
    vi.useFakeTimers();

    const mockGenerate = vi.spyOn(mathCaptchaUtils, 'generateMathChallenge');
    mockGenerate
      .mockReturnValueOnce({
        numA: 4,
        numB: 3,
        operator: '+',
        question: '¿Cuánto es 4 + 3?',
        token: 'token-1',
      })
      .mockReturnValueOnce({
        numA: 9,
        numB: 4,
        operator: '-',
        question: '¿Cuánto es 9 - 4?',
        token: 'token-2',
      });

    renderWithProvider(
      <MathCaptchaField
        value="7"
        onChange={defaultOnChange}
      />
    );

    expect(screen.getByText('¿Cuánto es 4 + 3?')).toBeInTheDocument();
    expect(defaultOnChange).toHaveBeenCalledWith('', 'token-1');

    const refreshBtn = screen.getByRole('button', { name: /Generar nueva operación matemática/i });
    
    act(() => {
      fireEvent.click(refreshBtn);
    });

    expect(mockGenerate).toHaveBeenCalledTimes(2);
    expect(screen.getByText('¿Cuánto es 9 - 4?')).toBeInTheDocument();
    expect(defaultOnChange).toHaveBeenLastCalledWith('', 'token-2');

    // Avanzar temporizador para verificar la rotación
    act(() => {
      vi.advanceTimersByTime(350);
    });

    vi.useRealTimers();
  });

  it('✅ debe mostrar el mensaje de error cuando la prop error está presente', () => {
    renderWithProvider(
      <MathCaptchaField
        value=""
        onChange={defaultOnChange}
        error="El captcha matemático es incorrecto."
      />
    );

    expect(screen.getByText('El captcha matemático es incorrecto.')).toBeInTheDocument();
  });

  it('✅ debe respetar el prop id personalizado', () => {
    renderWithProvider(
      <MathCaptchaField
        value=""
        onChange={defaultOnChange}
        id="custom-math-id"
      />
    );

    const input = screen.getByPlaceholderText('Tu respuesta');
    expect(input).toHaveAttribute('id', 'custom-math-id');
  });
});
