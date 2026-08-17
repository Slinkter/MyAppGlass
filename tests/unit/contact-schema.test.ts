import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '@/shared/schemas/contact-schema';

describe('ContactFormSchema Zod Validation', () => {
  it('should pass with valid data', () => {
    const validData = {
      fullName: 'María González',
      email: 'maria.gonzalez@example.com',
      phone: '+51 987654321',
      serviceSlug: 'ventanas-antiruido',
      message: 'Deseo cotizar 3 ventanas antiruido para departamento en La Molina.',
    };

    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail when email format is invalid', () => {
    const invalidData = {
      fullName: 'María González',
      email: 'not-an-email',
      phone: '+51 987654321',
      serviceSlug: 'ventanas-antiruido',
      message: 'Deseo cotizar ventanas.',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('correo electrónico');
    }
  });

  it('should fail when message is too short', () => {
    const invalidData = {
      fullName: 'María González',
      email: 'maria@example.com',
      phone: '+51 987654321',
      serviceSlug: 'ventanas-antiruido',
      message: 'Hola',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('al menos 10 caracteres');
    }
  });
});
