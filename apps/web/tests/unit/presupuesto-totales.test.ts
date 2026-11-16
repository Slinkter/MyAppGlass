import { describe, expect, it } from "vitest";
import {
  IGV_RATE,
  calcularTotales,
  formatNumeroPresupuesto,
  guardarPresupuestoInputSchema,
  puedeCambiarEstado,
  clienteCrmSchema,
} from "@/shared/schemas/presupuesto-schema";

describe("calcularTotales (presupuesto formal)", () => {
  it("calcula subtotal, IGV 18 % y total", () => {
    const t = calcularTotales([
      { cantidad: 2.5, precioUnitario: 120 },
      { cantidad: 1, precioUnitario: 80.5 },
    ]);
    expect(IGV_RATE).toBe(0.18);
    expect(t.importes).toEqual([300, 80.5]);
    expect(t.subtotal).toBe(380.5);
    expect(t.igv).toBe(68.49);
    expect(t.total).toBe(448.99);
  });

  it("redondea cada línea a céntimos sin arrastrar el error binario", () => {
    expect(calcularTotales([{ cantidad: 1, precioUnitario: 1.005 }]).importes).toEqual([1.01]);
    expect(calcularTotales([{ cantidad: 3, precioUnitario: 0.1 }]).subtotal).toBe(0.3);
    const t = calcularTotales([{ cantidad: 1, precioUnitario: 0.1 }, { cantidad: 1, precioUnitario: 0.2 }]);
    expect(t.subtotal).toBe(0.3);
    expect(t.total).toBe(0.35);
  });

  it("sin líneas todo es cero", () => {
    expect(calcularTotales([])).toEqual({ importes: [], subtotal: 0, igv: 0, total: 0 });
  });

  it("subtotal + IGV siempre es el total", () => {
    const t = calcularTotales([{ cantidad: 7.333, precioUnitario: 19.99 }, { cantidad: 12, precioUnitario: 3.335 }]);
    expect(Math.round((t.subtotal + t.igv) * 100)).toBe(Math.round(t.total * 100));
  });
});

describe("formatNumeroPresupuesto", () => {
  it("rellena a 4 dígitos y crece después de 9999", () => {
    expect(formatNumeroPresupuesto(1)).toBe("PRES-0001");
    expect(formatNumeroPresupuesto(42)).toBe("PRES-0042");
    expect(formatNumeroPresupuesto(12345)).toBe("PRES-12345");
  });
});

describe("contrato de guardarPresupuesto", () => {
  const base = {
    clienteId: "cli-1",
    items: [{ descripcion: "Vidrio templado 8 mm", unidad: "m2", cantidad: 1, precioUnitario: 10 }],
    validezDias: 15,
  };

  it("descarta totales e importes que envíe el cliente", () => {
    const parsed = guardarPresupuestoInputSchema.parse({
      ...base,
      total: 1,
      items: [{ ...base.items[0], importe: 1 }],
    });
    expect(parsed).not.toHaveProperty("total");
    expect(parsed.items[0]).not.toHaveProperty("importe");
  });

  it("acepta m², ml y und; rechaza unidades desconocidas", () => {
    for (const unidad of ["m2", "ml", "unidad"]) {
      expect(guardarPresupuestoInputSchema.safeParse({ ...base, items: [{ ...base.items[0], unidad }] }).success).toBe(true);
    }
    expect(guardarPresupuestoInputSchema.safeParse({ ...base, items: [{ ...base.items[0], unidad: "litros" }] }).success).toBe(false);
  });

  it("exige al menos un ítem y un número con formato PRES", () => {
    expect(guardarPresupuestoInputSchema.safeParse({ ...base, items: [] }).success).toBe(false);
    expect(guardarPresupuestoInputSchema.safeParse({ ...base, numero: "GYA-2026-0001" }).success).toBe(false);
    expect(guardarPresupuestoInputSchema.safeParse({ ...base, numero: "PRES-0001" }).success).toBe(true);
  });
});

describe("estados del presupuesto", () => {
  it("solo permite borrador → enviado → aprobado | rechazado", () => {
    expect(puedeCambiarEstado("borrador", "enviado")).toBe(true);
    expect(puedeCambiarEstado("enviado", "aprobado")).toBe(true);
    expect(puedeCambiarEstado("enviado", "rechazado")).toBe(true);
    expect(puedeCambiarEstado("borrador", "aprobado")).toBe(false);
    expect(puedeCambiarEstado("aprobado", "rechazado")).toBe(false);
    expect(puedeCambiarEstado("rechazado", "enviado")).toBe(false);
  });
});

describe("clienteCrmSchema", () => {
  const cliente = { fullName: "Constructora Prueba S.A.C.", dniRuc: "20123456789", phone: "999888777", address: "Av. Prueba 123", district: "La Molina" };

  it("acepta un cliente sin correo y lo deja activo", () => {
    const parsed = clienteCrmSchema.parse(cliente);
    expect(parsed.email).toBe("");
    expect(parsed.isActive).toBe(true);
  });

  it("valida DNI de 8 o RUC de 11 dígitos y el formato del correo", () => {
    expect(clienteCrmSchema.safeParse({ ...cliente, dniRuc: "12345678" }).success).toBe(true);
    expect(clienteCrmSchema.safeParse({ ...cliente, dniRuc: "123456789" }).success).toBe(false);
    expect(clienteCrmSchema.safeParse({ ...cliente, email: "no-es-correo" }).success).toBe(false);
  });
});
