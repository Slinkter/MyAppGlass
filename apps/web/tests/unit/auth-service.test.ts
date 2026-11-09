import { describe, it, expect } from "vitest";
import { normalizeRole, isValidDniRuc, validateClientRegistration } from "@/features/auth/services/auth-service";

const base = {
  userId: "u1",
  email: "a@b.com",
  role: "cliente",
  fullName: "Juan Perez",
  dniRuc: "12345678",
  phone: "974278303",
  address: "Av. Los Fresnos 1250",
  district: "La Molina",
};

describe("auth-service", () => {
  it("normalizeRole solo concede admin con valor exacto", () => {
    expect(normalizeRole(" ADMIN ")).toBe("admin");
    expect(normalizeRole("superadmin")).toBe("cliente");
    expect(normalizeRole(null)).toBe("cliente");
    expect(normalizeRole(undefined)).toBe("cliente");
  });

  it("isValidDniRuc acepta 8 u 11 dígitos", () => {
    expect(isValidDniRuc("12345678")).toBe(true);
    expect(isValidDniRuc("20123456789")).toBe(true);
    expect(isValidDniRuc("123456789")).toBe(false);
    expect(isValidDniRuc("1234567a")).toBe(false);
  });

  it("validateClientRegistration valida perfil completo", () => {
    expect(validateClientRegistration(base).ok).toBe(true);
    expect(validateClientRegistration({ ...base, dniRuc: "1234567890" }).ok).toBe(false);
    expect(validateClientRegistration({ ...base, email: "x" }).errors.length).toBeGreaterThan(0);
  });
});
