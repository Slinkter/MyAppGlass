import { handleFirebaseError } from '@/utils/firebaseErrorHandler';

const SUBMIT_RECLAMO_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface ReclamoFormData {
  nombreCompleto: string;
  domicilio: string;
  email: string;
  telefono: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombrePadreMadre: string;
  tipoBien: string;
  montoReclamado: string;
  descripcionBien: string;
  tipoSolicitud: string;
  detalle: string;
  pedido: string;
  aceptaTerminos: boolean;
  autorizaEmail: boolean;
}

export const reclamoService = {
  submitReclamo: async (reclamoData: ReclamoFormData): Promise<string> => {
    try {
      const response = await fetch(SUBMIT_RECLAMO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reclamoData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Error del servidor: \u0040',
        );
      }

      return result.data.id;
    } catch (error) {
      console.error('Error al enviar el reclamo:', error);
      const appError = handleFirebaseError(error);
      throw new Error(appError.message);
    }
  },
};
