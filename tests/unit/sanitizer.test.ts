import { describe, it, expect } from 'vitest';
import {
  sanitizeSingleLine,
  sanitizeMultilineText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeDocumentNumber,
  sanitizeAmount,
  isValidTipoDocumento,
  isValidTipoBien,
  isValidTipoSolicitud,
  sanitizeReclamationData,
} from '@/features/reclamation-book/utils/sanitizer';
import { ReclamationData } from '@/shared/api/reclamoService';

describe('Sanitizer Utilities for Reclamation Book', () => {
  it('should remove HTML/script tags and newlines in sanitizeSingleLine', () => {
    const raw = '<script>alert("hack")</script>Juan \n Pérez<b> Ramos</b>';
    const cleaned = sanitizeSingleLine(raw);
    expect(cleaned).toBe('alert("hack")Juan   Pérez Ramos');
  });

  it('should sanitize email address to lowercase and strip dangerous chars', () => {
    const email = '  USER.Test+1@GYACompany.COM <script> ';
    const cleaned = sanitizeEmail(email);
    expect(cleaned).toBe('user.test+1@gyacompany.com');
  });

  it('should sanitize phone number keeping digits and plus sign', () => {
    const phone = '+51 (987) 654-321 abc';
    const cleaned = sanitizePhone(phone);
    expect(cleaned).toBe('+51 (987) 654-321');
  });

  it('should sanitize document number retaining alphanumeric and hyphens', () => {
    const doc = ' 72839485<>& ';
    const cleaned = sanitizeDocumentNumber(doc);
    expect(cleaned).toBe('72839485');
  });

  it('should sanitize monetary amount correctly', () => {
    const amount = ' S/. 1,500.50.20 ';
    const cleaned = sanitizeAmount(amount);
    expect(cleaned).toBe('1500.5020');
  });

  it('should validate TipoDocumento, TipoBien and TipoSolicitud guards', () => {
    expect(isValidTipoDocumento('DNI')).toBe(true);
    expect(isValidTipoDocumento('PASAPORTE')).toBe(true);
    expect(isValidTipoDocumento('INVALID')).toBe(false);

    expect(isValidTipoBien('producto')).toBe(true);
    expect(isValidTipoBien('servicio')).toBe(true);
    expect(isValidTipoBien('otro')).toBe(false);

    expect(isValidTipoSolicitud('Reclamo')).toBe(true);
    expect(isValidTipoSolicitud('Queja')).toBe(true);
    expect(isValidTipoSolicitud('Sugerencia')).toBe(false);
  });

  it('should sanitize a complete ReclamationData object', () => {
    const mockData: ReclamationData = {
      nombreCompleto: ' <b>Carlos Lopez</b> ',
      tipoDocumento: 'DNI',
      numeroDocumento: ' 12345678 ',
      email: ' CARLOS@GMAIL.COM ',
      telefono: ' +51 999 888 777 ',
      domicilio: ' Av. Javier Prado 1234 \n Lima ',
      tipoBien: 'servicio',
      montoReclamado: ' 250.00 ',
      descripcionBien: ' Instalación de mampara ',
      tipoSolicitud: 'Reclamo',
      detalle: ' Retraso en entrega ',
      pedido: ' Devolución o reprogramación ',
      autorizaEmail: true,
      aceptaTerminos: true,
      middleName: '',
      website_hp: '',
      _ts: Date.now(),
    };

    const sanitized = sanitizeReclamationData(mockData);
    expect(sanitized.nombreCompleto).toBe('Carlos Lopez');
    expect(sanitized.email).toBe('carlos@gmail.com');
    expect(sanitized.tipoDocumento).toBe('DNI');
    expect(sanitized.numeroDocumento).toBe('12345678');
  });
});
