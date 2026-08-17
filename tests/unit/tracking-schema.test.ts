import { describe, it, expect } from 'vitest';
import { trackingQuerySchema } from '@/shared/schemas/tracking-schema';

describe('Esquema de Consulta de Seguimiento - trackingQuerySchema Zod Validation', () => {
  it('✅ debe validar con éxito un código de seguimiento válido', () => {
    const result = trackingQuerySchema.safeParse({ id: 'REC-2025-001' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe('REC-2025-001');
    }
  });

  it('✅ debe aplicar trim al código de seguimiento válido', () => {
    const result = trackingQuerySchema.safeParse({ id: '   TK-123456   ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe('TK-123456');
    }
  });

  it('❌ debe fallar si el código original tiene menos de 5 caracteres', () => {
    const result = trackingQuerySchema.safeParse({ id: '1234' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'El código de seguimiento debe tener al menos 5 caracteres'
      );
    }
  });

  it('❌ debe fallar si el código original está completamente vacío', () => {
    const result = trackingQuerySchema.safeParse({ id: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'El código de seguimiento debe tener al menos 5 caracteres'
      );
    }
  });

  it('❌ debe fallar si el código excede 100 caracteres', () => {
    const longId = 'A'.repeat(101);
    const result = trackingQuerySchema.safeParse({ id: longId });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Código de seguimiento demasiado largo'
      );
    }
  });

  it('❌ debe fallar si el campo id no es una cadena de texto', () => {
    const result = trackingQuerySchema.safeParse({ id: 12345 });
    expect(result.success).toBe(false);
  });

  it('❌ debe fallar si no se proporciona el campo id', () => {
    const result = trackingQuerySchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
