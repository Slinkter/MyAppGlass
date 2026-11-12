import { describe, it, expect } from "vitest";
import {
  validateCustomer,
  validateLines,
  normalizePhone,
  normalizeMobile,
  quickCustomerSchema,
  validateQuickCustomer,
} from "@/features/presupuesto/schemas/quote-form-schema";
import { QUOTE_TEXTS } from "@/features/presupuesto/components/quoteTexts";

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

describe("quickCustomerSchema", () => {
  const ok = { fullName: "Carlos Mendoza", phone: "987654321", acceptsPrivacy: true };

  it("acepta un celular de 9 dígitos que empieza con 9", () => {
    expect(quickCustomerSchema.safeParse(ok).success).toBe(true);
  });

  it("acepta prefijo 51, espacios y guiones", () => {
    expect(quickCustomerSchema.safeParse({ ...ok, phone: "+51 987 654 321" }).success).toBe(true);
    expect(quickCustomerSchema.safeParse({ ...ok, phone: "987-654-321" }).success).toBe(true);
  });

  it("rechaza celulares mal formados", () => {
    for (const phone of ["98765432", "887654321", "4567890", "98765abc1"]) {
      expect(validateQuickCustomer({ ...ok, phone }).phone).toBe(QUOTE_TEXTS.closing.errors.phone);
    }
  });

  it("rechaza nombre vacío o de 2 letras", () => {
    expect(validateQuickCustomer({ ...ok, fullName: "" }).fullName).toBe(QUOTE_TEXTS.closing.errors.name);
    expect(validateQuickCustomer({ ...ok, fullName: "Al" }).fullName).toBe(QUOTE_TEXTS.closing.errors.name);
  });

  it("exige aceptar los datos personales", () => {
    expect(validateQuickCustomer({ ...ok, acceptsPrivacy: false }).acceptsPrivacy).toBe(QUOTE_TEXTS.closing.errors.acceptance);
    expect(validateQuickCustomer(ok)).toEqual({});
  });
});

describe("normalizeMobile", () => {
  it("devuelve los 9 dígitos sin prefijo 51", () => {
    expect(normalizeMobile("+51 987 654 321")).toBe("987654321");
    expect(normalizeMobile("987-654-321")).toBe("987654321");
  });
});
