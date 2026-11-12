import { describe, expect, it } from "vitest";
import { formatMeasure, formatSoles, parseMeasure } from "@/entities/quote";

describe("parseMeasure", () => {
  it("acepta coma y punto", () => {
    expect(parseMeasure("1,45")).toBe(1.45);
    expect(parseMeasure("1.45")).toBe(1.45);
    expect(parseMeasure(" 1,2 ")).toBe(1.2);
    expect(parseMeasure("2")).toBe(2);
    expect(parseMeasure(",5")).toBe(0.5);
  });

  it("devuelve NaN si no es una medida clara", () => {
    for (const bad of ["", "   ", "abc", "1,2,3", "1.2.3", "1,2.3", "-1", "-1,5", "1,", "1 m", "1e2", "--1"]) {
      expect(parseMeasure(bad)).toBeNaN();
    }
  });
});

describe("formatSoles", () => {
  it("usa 2 decimales, coma y espacio de miles", () => {
    expect(formatSoles(0)).toBe("S/\u00A00,00");
    expect(formatSoles(5)).toBe("S/\u00A05,00");
    expect(formatSoles(240.5)).toBe("S/\u00A0240,50");
    expect(formatSoles(1234.56)).toBe("S/\u00A01\u00A0234,56");
    expect(formatSoles(1234567.8)).toBe("S/\u00A01\u00A0234\u00A0567,80");
  });
});

describe("formatMeasure", () => {
  it("usa 2 decimales y coma", () => {
    expect(formatMeasure(1.2)).toBe("1,20");
    expect(formatMeasure(2)).toBe("2,00");
    expect(formatMeasure(1.456)).toBe("1,46");
  });
});
