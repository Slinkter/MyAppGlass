import { describe, it, expect } from "vitest";
import {
  computeSashes,
  priceWindow,
  quoteTotals,
  splitBodies,
  temperedPerM2,
  validateWindow,
} from "@/entities/quote/lib/windowRules";

// Valores del dueño (2026-11-11), spec `docs/claude/specs/cotizador-presupuesto/spec.md` §8.
describe("windowRules · precio", () => {
  it("vidrio crudo: área × 240", () => {
    expect(priceWindow({ widthM: 1.2, heightM: 1.6, glass: "crudo", finish: "ninguno" }).subtotal).toBe(460.8);
    expect(priceWindow({ widthM: 1.45, heightM: 1.6, glass: "crudo", finish: "ninguno" }).subtotal).toBe(556.8);
    expect(priceWindow({ widthM: 1.48, heightM: 1.8, glass: "crudo", finish: "ninguno" }).subtotal).toBe(639.36);
  });

  it("templado: 240 + 30 % = 312 por m²", () => {
    expect(temperedPerM2()).toBe(312);
    expect(priceWindow({ widthM: 1.2, heightM: 1.6, glass: "templado", finish: "ninguno" }).subtotal).toBe(599.04);
  });

  it("arenado o laminado: área × 80, sin recargo del 30 %", () => {
    const a = priceWindow({ widthM: 1.2, heightM: 1.6, glass: "crudo", finish: "arenado" });
    expect(a.finishAmount).toBe(153.6);
    expect(a.subtotal).toBe(614.4);
    const l = priceWindow({ widthM: 1.2, heightM: 1.6, glass: "templado", finish: "laminado" });
    expect(l.subtotal).toBe(752.64);
  });

  it("cobra al menos 0,10 m²", () => {
    expect(priceWindow({ widthM: 0.1, heightM: 0.5, glass: "crudo", finish: "ninguno" }).areaM2).toBe(0.1);
  });

  it("totales con IGV (confirmados por el dueño)", () => {
    const crudo = quoteTotals([614.4], false);
    expect([crudo.subtotal, crudo.igv, crudo.total]).toEqual([614.4, 110.59, 724.99]);
    const templado = quoteTotals([752.64], false);
    expect([templado.subtotal, templado.igv, templado.total]).toEqual([752.64, 135.48, 888.12]);
  });

  it("carrito de 3 ventanas, precio de lista y efectivo", () => {
    const t = quoteTotals([460.8, 556.8, 639.36], false);
    expect([t.windowsSubtotal, t.igv, t.total]).toEqual([1656.96, 298.25, 1955.21]);
    expect(t.listPrice).toBe(2052.97);
    expect(t.cashSaving).toBe(97.76);
    expect(t.cashSaving).toBe(Math.round((t.listPrice - t.total) * 100) / 100);
  });

  it("flete de S/ 120 sin IGV fuera de La Molina", () => {
    const t = quoteTotals([460.8, 556.8, 639.36], true);
    expect([t.freight, t.subtotal, t.igv, t.total]).toEqual([120, 1776.96, 319.85, 2096.81]);
  });

  it("sin ventanas no hay flete ni total", () => {
    expect(quoteTotals([], true).total).toBe(0);
  });
});

describe("windowRules · hojas", () => {
  it.each([
    [1.2, 2],
    [1.4, 2],
    [1.6, 2],
    [1.7, 2], // 2 hojas de 85 cm (margen de 5 cm)
    [1.8, 3],
    [2.3, 3],
    [2.4, 3], // 3 hojas de 80 cm
    [2.6, 4],
    [2.8, 4],
  ])("ancho %s m → %s hojas", (w, n) => {
    const r = computeSashes(w);
    expect(r.count).toBe(n);
    expect(r.needsTechnician).toBe(false);
    expect(r.layout).toHaveLength(n);
  });

  it("recomienda ventana fija si la hoja sería menor a 60 cm", () => {
    const r = computeSashes(0.9);
    expect(r.recommendFixed).toBe(true);
    expect(r.count).toBe(1);
  });

  it("ancho menor a 1,10 m recomienda fija; 1,10 m ya admite 2 hojas", () => {
    expect(computeSashes(1.09).recommendFixed).toBe(true);
    expect(computeSashes(1.0).recommendFixed).toBe(true);
    expect(computeSashes(1.1).recommendFixed).toBe(false);
    expect(computeSashes(1.1).count).toBe(2);
  });

  it("1,70 m → 2 hojas de 85 cm; 2,40 m → 3 hojas de 80 cm", () => {
    expect(computeSashes(1.7).sashWidthCm).toBe(85);
    expect(computeSashes(2.4).sashWidthCm).toBe(80);
  });

  it("distribución según número de hojas", () => {
    expect(computeSashes(1.2).layout).toEqual(["fija", "corrediza"]);
    expect(computeSashes(1.8).layout).toEqual(["fija", "corrediza", "corrediza"]);
    expect(computeSashes(2.6).layout).toEqual(["fija", "corrediza", "corrediza", "fija"]);
  });
});

describe("windowRules · cuerpos", () => {
  it("una sola ventana hasta 2,40 m de alto", () => {
    expect(splitBodies(1.8, 2.1)).toEqual([{ kind: "unico", widthM: 1.8, heightM: 2.1 }]);
  });

  it("alto de 2,40 m devuelve un solo cuerpo único", () => {
    expect(splitBodies(1.8, 2.4)).toEqual([{ kind: "unico", widthM: 1.8, heightM: 2.4 }]);
  });

  it("uso en tienda; la web no pasa de 2,40 m: 1,80 × 2,90 → 1,80 × 0,60, 1,80 × 1,20 y 1,80 × 1,10", () => {
    const b = splitBodies(1.8, 2.9);
    expect(b.map((x) => x.heightM)).toEqual([0.6, 1.2, 1.1]);
    expect(b.every((x) => x.widthM === 1.8)).toBe(true);
    expect(b[2].kind).toBe("fijo inferior");
  });
});

describe("windowRules · validación", () => {
  it.each([[0], [-1], [NaN], [Infinity]])("rechaza ancho inválido %s sin visita", (w) => {
    const r = validateWindow(w, 1.5);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.field).toBe("width");
      expect(r.requiresVisit).toBe(false);
    }
  });

  it.each([[0], [-1], [NaN], [Infinity]])("rechaza alto inválido %s", (h) => {
    const r = validateWindow(1.5, h);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("height");
  });

  it("ancho de 10 000 m pide visita técnica", () => {
    const r = validateWindow(10000, 1.5);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.requiresVisit).toBe(true);
  });

  it("acepta medidas dentro del rango, incluidos los topes (alto 2,40; ancho 2,80)", () => {
    expect(validateWindow(1.2, 1.6).ok).toBe(true);
    expect(validateWindow(2.8, 2.4).ok).toBe(true);
    expect(validateWindow(2.8, 1.5).ok).toBe(true);
    expect(validateWindow(1.5, 2.4).ok).toBe(true);
  });

  it.each([[2.41], [2.5], [2.9]])("alto %s m pide visita técnica", (h) => {
    const r = validateWindow(1.5, h);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.field).toBe("height");
      expect(r.requiresVisit).toBe(true);
    }
  });

  it("ancho 2,81 m pide visita técnica", () => {
    const r = validateWindow(2.81, 1.5);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.field).toBe("width");
      expect(r.requiresVisit).toBe(true);
    }
  });

  it("alto 0,39 m es inválido y no pide visita", () => {
    const r = validateWindow(1.5, 0.39);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.field).toBe("height");
      expect(r.requiresVisit).toBe(false);
    }
  });
});
