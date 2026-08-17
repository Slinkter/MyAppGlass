import { describe, it, expect } from 'vitest';
import { companyData } from '@/shared/config/company-data';
import { bankAccountsData } from '@/shared/data/bank-accounts';

describe('Integridad de Datos Corporativos y Cuentas Bancarias (FASE 5)', () => {
  describe('companyData (company-data.ts)', () => {
    it('✅ debe contener información legal no vacía de la empresa', () => {
      expect(companyData.companyName).toBeTruthy();
      expect(companyData.razonSocial).toBeTruthy();
      expect(companyData.direccion).toBeTruthy();
      expect(companyData.direccion.length).toBeGreaterThan(10);
    });

    it('✅ el RUC debe ser una cadena válida de 11 dígitos numéricos que comience con 10 o 20', () => {
      expect(companyData.ruc).toMatch(/^(10|20)\d{9}$/);
      expect(companyData.ruc).toHaveLength(11);
    });

    it('✅ el número y mensaje de WhatsApp deben estar configurados correctamente', () => {
      expect(companyData.whatsappNumber).toBeTruthy();
      expect(companyData.whatsappNumber).toMatch(/^51\d{9}$/);
      expect(companyData.whatsappMessage).toBeTruthy();
      expect(companyData.whatsappMessage.length).toBeGreaterThan(5);
    });

    it('✅ los datos de la persona de contacto deben ser válidos', () => {
      expect(companyData.contactPerson).toBeTruthy();
      expect(companyData.contactTitle).toBeTruthy();
      expect(companyData.contactPhone).toBeTruthy();
      expect(companyData.contactPhone).toMatch(/^\d{3}-\d{3}-\d{3}$/);
      expect(companyData.contactEmail).toBeTruthy();
      expect(companyData.contactEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  describe('bankAccountsData (bank-accounts.ts)', () => {
    it('✅ debe contener al menos 2 entidades bancarias configuradas', () => {
      expect(Array.isArray(bankAccountsData)).toBe(true);
      expect(bankAccountsData.length).toBeGreaterThanOrEqual(2);
    });

    it('✅ cada cuenta bancaria debe tener nombre de banco, tipo de cuenta y subcuentas válidas', () => {
      bankAccountsData.forEach((bank) => {
        expect(bank.bankName).toBeTruthy();
        expect(bank.accountType).toBeTruthy();
        expect(bank).toHaveProperty('logo');
        expect(bank.accounts).toBeInstanceOf(Array);
        expect(bank.accounts.length).toBeGreaterThan(0);
      });
    });

    it('✅ todas las subcuentas deben tener label y número de cuenta o CCI con formato no vacío', () => {
      bankAccountsData.forEach((bank) => {
        bank.accounts.forEach((acc) => {
          expect(acc.label).toBeTruthy();
          expect(acc.value).toBeTruthy();
          expect(acc.value.trim().length).toBeGreaterThan(5);
        });
      });
    });
  });
});
