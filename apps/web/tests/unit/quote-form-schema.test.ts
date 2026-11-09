import { describe, it, expect } from "vitest";
import { validateCustomer, validateLines, normalizePhone } from "@/features/presupuesto/schemas/quote-form-schema";

const validCustomer = {
  fullName: "Carlos Mendoza",
  dniRuc: "",
  email: "",
  phone: "974 278 303",
  address: "",
  district: "La Molina",
};

describe("validateCustomer", () => {
  it("acepta un cliente mínimo válido", () => {
    expect(validateCustomer(validCustomer)).toEqual({});
  });

  it("exige nombre y teléfono", () => {
    const errors = validateCustomer({ ...validCustomer, fullName: "", phone: "" });
    expect(errors.fullName).toBeDefined();
    expect(errors.phone).toBeDefined();
  });

  it("valida DNI (8) y RUC (11) cuando se informan", () => {
    expect(validateCustomer({ ...validCustomer, dniRuc: "12345678" })).toEqual({});
    expect(validateCustomer({ ...validCustomer, dniRuc: "20606432870" })).toEqual({});
    expect(validateCustomer({ ...validCustomer, dniRuc: "123" }).dniRuc).toBeDefined();
  });

  it("valida el correo solo si se informa", () => {
    expect(validateCustomer({ ...validCustomer, email: "cliente@ejemplo.com" })).toEqual({});
    expect(validateCustomer({ ...validCustomer, email: "no-es-correo" }).email).toBeDefined();
  });
});

describe("validateLines", () => {
  it("acepta medidas dentro de rango", () => {
    expect(validateLines([{ id: "a", ambiente: "Sala", width: 2, height: 2.1 }])).toEqual({});
  });

  it("rechaza medidas vacías, mínimas o excesivas", () => {
    const errors = validateLines([
      { id: "a", ambiente: "", width: Number.NaN, height: 0.1 },
      { id: "b", ambiente: "", width: 20, height: 2 },
    ]);
    expect(errors.a.width).toBeDefined();
    expect(errors.a.height).toBeDefined();
    expect(errors.b.width).toBeDefined();
    expect(errors.b.height).toBeUndefined();
  });
});

describe("normalizePhone", () => {
  it("quita espacios y signos", () => {
    expect(normalizePhone("+51 974-278-303")).toBe("51974278303");
  });
});
