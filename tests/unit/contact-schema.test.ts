import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '@/shared/schemas/contact-schema';

describe('Formulario de Contacto - contactFormSchema Zod Validation', () => {
  const validContact = {
    fullName: 'Carlos Mendoza',
    email: 'carlos.mendoza@example.com',
    phone: '+51 912345678',
    serviceSlug: 'ventanas-antiruido',
    message: 'Hola, deseo solicitar una cotización formal para 4 ventanas antiruido.',
  };

  it('✅ debe validar con éxito datos correctos y completos', () => {
    const result = contactFormSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  it('❌ debe fallar si el nombre tiene menos de 2 caracteres', () => {
    const result = contactFormSchema.safeParse({ ...validContact, fullName: 'C' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('al menos 2 caracteres');
    }
  });

  it('❌ debe fallar si el nombre excede 100 caracteres', () => {
    const longName = 'A'.repeat(101);
    const result = contactFormSchema.safeParse({ ...validContact, fullName: longName });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('no puede exceder 100 caracteres');
    }
  });

  it('❌ debe fallar con un formato de email inválido', () => {
    const result = contactFormSchema.safeParse({ ...validContact, email: 'correo-invalido' });
    expect(result.success).toBe(false);
  });

  it('✅ debe normalizar email en minúsculas y quitar espacios en trim', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      email: '  CARLOS.MENDOZA@EXAMPLE.COM  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('carlos.mendoza@example.com');
    }
  });

  it('❌ debe fallar con teléfonos no válidos (letras o muy cortos)', () => {
    const resultInvalidChars = contactFormSchema.safeParse({ ...validContact, phone: 'telefono123' });
    expect(resultInvalidChars.success).toBe(false);

    const resultTooShort = contactFormSchema.safeParse({ ...validContact, phone: '123' });
    expect(resultTooShort.success).toBe(false);
  });

  it('✅ debe aceptar diferentes formatos válidos de teléfono peruanos e internacionales', () => {
    const phoneFormats = ['912345678', '+51 987654321', '(01) 456-7890', '+51-999-888-777'];
    for (const phone of phoneFormats) {
      const result = contactFormSchema.safeParse({ ...validContact, phone });
      expect(result.success).toBe(true);
    }
  });

  it('❌ debe fallar si serviceSlug está vacío', () => {
    const result = contactFormSchema.safeParse({ ...validContact, serviceSlug: '' });
    expect(result.success).toBe(false);
  });

  it('❌ debe fallar si el mensaje tiene menos de 10 caracteres', () => {
    const result = contactFormSchema.safeParse({ ...validContact, message: 'Hola cot' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('al menos 10 caracteres');
    }
  });

  it('❌ debe fallar si el mensaje excede 1000 caracteres', () => {
    const longMessage = 'A'.repeat(1001);
    const result = contactFormSchema.safeParse({ ...validContact, message: longMessage });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('no puede exceder 1000 caracteres');
    }
  });
});
