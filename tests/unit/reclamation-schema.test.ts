import { describe, it, expect } from 'vitest';
import { reclamationFormSchema } from '@/shared/schemas/reclamation-schema';

describe('ReclamationFormSchema Zod Validation', () => {
  const validData = {
    nombreCompleto: 'Juan Pérez Silva',
    tipoDocumento: 'DNI' as const,
    numeroDocumento: '72819203',
    domicilio: 'Calle Los Cedros 123, La Molina',
    email: 'juan.perez@example.com',
    telefono: '+51 987654321',
    tipoBien: 'producto' as const,
    montoReclamado: '150.00',
    descripcionBien: 'Ventana acústica serie 80',
    tipoSolicitud: 'Reclamo' as const,
    detalle: 'El cierre hermético presenta un desfase de 3mm.',
    pedido: 'Ajuste de perfil o cambio de accesorio de cierre.',
    autorizaEmail: true,
    aceptaTerminos: true,
    middleName: '',
    website_hp: '',
    _ts: Date.now(),
  };

  it('should validate complete valid reclamation data', () => {
    const result = reclamationFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject if terms are not accepted', () => {
    const invalid = { ...validData, aceptaTerminos: false };
    const result = reclamationFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject if email authorization is false', () => {
    const invalid = { ...validData, autorizaEmail: false };
    const result = reclamationFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject invalid document type', () => {
    const invalid = { ...validData, tipoDocumento: 'CEDULA' };
    const result = reclamationFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
