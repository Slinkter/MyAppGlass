import { describe, it, expect } from 'vitest';
import { reclamationFormSchema } from '@/shared/schemas/reclamation-schema';
import {
  sanitizeSingleLine,
  sanitizeMultilineText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeDocumentNumber,
  isValidTipoDocumento,
  isValidTipoBien,
  isValidTipoSolicitud,
  sanitizeReclamationData,
} from '@features/reclamation-book/utils/sanitizer';

// ─── Datos base válidos para los tests ───────────────────────────────────────
const validReclamo = {
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
  detalle: 'El cierre hermético presenta un desfase de 3mm en el marco.',
  pedido: 'Ajuste de perfil o cambio de accesorio de cierre.',
  autorizaEmail: true,
  aceptaTerminos: true,
  middleName: '',
  _ts: Date.now(),
};

// ─── Tests del Schema Zod ─────────────────────────────────────────────────────
describe('ReclamationFormSchema - Validaciones Zod', () => {
  it('✅ debe aceptar datos completos y válidos', () => {
    expect(reclamationFormSchema.safeParse(validReclamo).success).toBe(true);
  });

  it('❌ debe rechazar nombreCompleto vacío', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, nombreCompleto: '' });
    expect(r.success).toBe(false);
  });

  it('❌ debe rechazar nombreCompleto menor a 3 caracteres', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, nombreCompleto: 'Jo' });
    expect(r.success).toBe(false);
  });

  it('❌ debe rechazar email inválido', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, email: 'no-es-email' });
    expect(r.success).toBe(false);
  });

  it('✅ debe normalizar email a minúsculas', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, email: 'JUAN@EXAMPLE.COM' });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe('juan@example.com');
  });

  it('❌ debe rechazar tipoDocumento inválido', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, tipoDocumento: 'CEDULA' });
    expect(r.success).toBe(false);
  });

  it('✅ debe aceptar DNI como tipo de documento', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, tipoDocumento: 'DNI' });
    expect(r.success).toBe(true);
  });

  it('✅ debe aceptar CE como tipo de documento', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, tipoDocumento: 'CE' });
    expect(r.success).toBe(true);
  });

  it('✅ debe aceptar PASAPORTE como tipo de documento', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, tipoDocumento: 'PASAPORTE' });
    expect(r.success).toBe(true);
  });

  it('❌ debe rechazar tipoBien inválido', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, tipoBien: 'otro' });
    expect(r.success).toBe(false);
  });

  it('❌ debe rechazar tipoSolicitud inválido', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, tipoSolicitud: 'Denuncia' });
    expect(r.success).toBe(false);
  });

  it('❌ debe rechazar aceptaTerminos = false', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, aceptaTerminos: false });
    expect(r.success).toBe(false);
  });

  it('❌ debe rechazar autorizaEmail = false', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, autorizaEmail: false });
    expect(r.success).toBe(false);
  });

  it('❌ debe rechazar detalle menor a 10 caracteres', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, detalle: 'Corto' });
    expect(r.success).toBe(false);
  });

  it('❌ debe rechazar pedido menor a 5 caracteres', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, pedido: 'Nada' });
    expect(r.success).toBe(false);
  });

  it('❌ debe rechazar domicilio menor a 5 caracteres', () => {
    const r = reclamationFormSchema.safeParse({ ...validReclamo, domicilio: 'Jr' });
    expect(r.success).toBe(false);
  });
});

// ─── Tests de Sanitización ────────────────────────────────────────────────────
describe('Sanitizer - Sanitización de Campos', () => {
  describe('sanitizeSingleLine()', () => {
    it('✅ debe eliminar tags HTML', () => {
      expect(sanitizeSingleLine('<b>Juan</b>')).toBe('Juan');
      expect(sanitizeSingleLine('<div>Hola <span>Mundo</span></div>')).toBe('Hola Mundo');
    });

    it('✅ debe convertir saltos de línea a espacios', () => {
      expect(sanitizeSingleLine('Hola\nMundo')).toBe('Hola Mundo');
    });

    it('✅ debe devolver cadena vacía para null o undefined', () => {
      expect(sanitizeSingleLine(null)).toBe('');
      expect(sanitizeSingleLine(undefined)).toBe('');
    });

    it('✅ debe eliminar caracteres de control', () => {
      expect(sanitizeSingleLine('Hola\u0000Mundo')).toBe('HolaMundo');
    });
  });

  describe('sanitizeMultilineText()', () => {
    it('✅ debe eliminar tags HTML pero preservar saltos de línea', () => {
      const result = sanitizeMultilineText('<b>Hola</b>\nMundo');
      expect(result).toContain('Hola');
      expect(result).toContain('Mundo');
      expect(result).not.toContain('<b>');
    });
  });

  describe('sanitizeEmail()', () => {
    it('✅ debe normalizar email a minúsculas', () => {
      expect(sanitizeEmail('JUAN@EXAMPLE.COM')).toBe('juan@example.com');
    });

    it('✅ debe eliminar espacios', () => {
      expect(sanitizeEmail('  juan@example.com  ')).toBe('juan@example.com');
    });

    it('✅ debe devolver cadena vacía para input inválido', () => {
      expect(sanitizeEmail(null)).toBe('');
    });
  });

  describe('sanitizePhone()', () => {
    it('✅ debe eliminar caracteres no numéricos excepto +, espacios y guiones', () => {
      expect(sanitizePhone('abc+51987654321xyz')).toBe('+51987654321');
    });

    it('✅ debe devolver cadena vacía para null', () => {
      expect(sanitizePhone(null)).toBe('');
    });
  });

  describe('sanitizeDocumentNumber()', () => {
    it('✅ debe conservar caracteres alfanuméricos y guiones eliminando caracteres no válidos', () => {
      const result = sanitizeDocumentNumber('72819-203*#');
      expect(result).toBe('72819-203');
    });
  });

  describe('isValidTipoDocumento()', () => {
    it('✅ debe aceptar DNI, CE, PASAPORTE', () => {
      expect(isValidTipoDocumento('DNI')).toBe(true);
      expect(isValidTipoDocumento('CE')).toBe(true);
      expect(isValidTipoDocumento('PASAPORTE')).toBe(true);
    });

    it('❌ debe rechazar valores inválidos', () => {
      expect(isValidTipoDocumento('CEDULA')).toBe(false);
      expect(isValidTipoDocumento('')).toBe(false);
    });
  });

  describe('isValidTipoBien()', () => {
    it('✅ debe aceptar producto y servicio', () => {
      expect(isValidTipoBien('producto')).toBe(true);
      expect(isValidTipoBien('servicio')).toBe(true);
    });

    it('❌ debe rechazar valores inválidos', () => {
      expect(isValidTipoBien('bien')).toBe(false);
    });
  });

  describe('isValidTipoSolicitud()', () => {
    it('✅ debe aceptar Reclamo y Queja', () => {
      expect(isValidTipoSolicitud('Reclamo')).toBe(true);
      expect(isValidTipoSolicitud('Queja')).toBe(true);
    });

    it('❌ debe rechazar valores inválidos', () => {
      expect(isValidTipoSolicitud('Denuncia')).toBe(false);
    });
  });

  describe('sanitizeReclamationData() - Whitelist de campos', () => {
    it('✅ debe sanear todos los campos del payload', () => {
      const raw = {
        nombreCompleto: '  Juan <b>Pérez</b>  ',
        domicilio: 'Jr. Las Flores 123',
        email: 'JUAN@EXAMPLE.COM',
        telefono: '+51 987654321',
        tipoDocumento: 'DNI',
        numeroDocumento: '72819203',
        nombrePadreMadre: '',
        tipoBien: 'producto',
        montoReclamado: '150.00',
        descripcionBien: 'Ventana acústica',
        tipoSolicitud: 'Reclamo',
        detalle: 'El cierre presenta un desfase.',
        pedido: 'Solicito cambio del accesorio.',
        aceptaTerminos: true,
        autorizaEmail: true,
        middleName: '',
        _ts: Date.now(),
      };

      const sanitized = sanitizeReclamationData(raw);
      expect(sanitized.email).toBe('juan@example.com');
      expect(sanitized.nombreCompleto).not.toContain('<b>');
      expect(sanitized.nombreCompleto).toBe('Juan Pérez');
      expect(sanitized.aceptaTerminos).toBe(true);
    });

    it('❌ debe bloquear XSS en el nombre', () => {
      const raw = {
        ...validReclamo,
        nombreCompleto: '<img src=x onerror=alert(1)>Atacante',
      };
      const sanitized = sanitizeReclamationData(raw);
      expect(sanitized.nombreCompleto).not.toContain('<img');
      expect(sanitized.nombreCompleto).not.toContain('onerror');
    });
  });
});
