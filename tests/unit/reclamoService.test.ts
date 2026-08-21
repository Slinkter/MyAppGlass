import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reclamationService, ReclamationData } from '@/shared/api/reclamoService';
import { env } from '@/shared/config/env';
import { logger } from '@/shared/utils/logger';

describe('reclamationService API Service', () => {
  const mockReclamationData: ReclamationData = {
    nombreCompleto: 'Juan Pérez',
    domicilio: 'Av. Las Palmeras 123, Lima',
    email: 'juan.perez@example.com',
    telefono: '987654321',
    tipoDocumento: 'DNI',
    numeroDocumento: '12345678',
    nombrePadreMadre: '',
    tipoBien: 'Producto',
    montoReclamado: '150.00',
    descripcionBien: 'Ventana de aluminio Nova',
    tipoSolicitud: 'Reclamo',
    detalle: 'El producto presenta fallas en los cierres.',
    pedido: 'Cambio de cerradura',
    aceptaTerminos: true,
    autorizaEmail: true,
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('✅ debe enviar la reclamación con éxito y retornar el ID generado', async () => {
    const mockResponseData = {
      success: true,
      message: 'Reclamación registrada exitosamente',
      data: { id: 'REC-2026-0001' },
    };

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    } as Response);

    const id = await reclamationService.submitReclamation(mockReclamationData);

    expect(fetchSpy).toHaveBeenCalledWith(env.NEXT_PUBLIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockReclamationData),
    });
    expect(id).toBe('REC-2026-0001');
  });

  it('❌ debe lanzar error si la respuesta HTTP no es exitosa (response.ok = false)', async () => {
    const loggerSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({
        success: false,
        message: 'Internal Database Error',
      }),
    } as Response);

    await expect(
      reclamationService.submitReclamation(mockReclamationData)
    ).rejects.toThrow('Internal Database Error');

    expect(loggerSpy).toHaveBeenCalled();
  });

  it('❌ debe lanzar error con mensaje de código de estado si el servidor no incluye mensaje de error', async () => {
    vi.spyOn(logger, 'error').mockImplementation(() => {});

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: async () => ({
        success: false,
      }),
    } as Response);

    await expect(
      reclamationService.submitReclamation(mockReclamationData)
    ).rejects.toThrow('Server error: 502');
  });

  it('❌ debe lanzar error si response.ok es true pero result.success es false', async () => {
    vi.spyOn(logger, 'error').mockImplementation(() => {});

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        success: false,
        message: 'Error en la validación del formulario',
      }),
    } as Response);

    await expect(
      reclamationService.submitReclamation(mockReclamationData)
    ).rejects.toThrow('Error en la validación del formulario');
  });

  it('❌ debe capturar excepciones de red (ej. fetch fallido por timeout o sin conexión)', async () => {
    vi.spyOn(logger, 'error').mockImplementation(() => {});

    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network connection failed'));

    await expect(
      reclamationService.submitReclamation(mockReclamationData)
    ).rejects.toThrow('Network connection failed');
  });

  it('❌ debe manejar errores no estándar que no son instancias de Error', async () => {
    vi.spyOn(logger, 'error').mockImplementation(() => {});

    vi.spyOn(global, 'fetch').mockRejectedValueOnce('Error desconocido');

    await expect(
      reclamationService.submitReclamation(mockReclamationData)
    ).rejects.toThrow('Could not send request.');
  });
});
