import { describe, it, expect } from "vitest";
import { summarizeQuote } from "@/features/presupuesto/utils/quoteSummary";
import { quoteCalculator } from "@/features/presupuesto/utils/quoteCalculator";
import { createQuoteLine, parseSystemParam } from "@/features/presupuesto/utils/quoteLines";

describe("summarizeQuote", () => {
  it("una sola línea equivale al cálculo directo", () => {
    const line = createQuoteLine({ systemType: "ventana_nova", width: 1.4, height: 1.2 });
    const direct = quoteCalculator.calculateQuote(line);
    const summary = summarizeQuote([line]);
    expect(summary.total).toBe(direct.total);
    expect(summary.items).toHaveLength(direct.items.length);
    expect(summary.pricePending).toBe(false);
  });

  it("suma los totales de varias líneas", () => {
    const a = createQuoteLine({ width: 1.4, height: 1.2 });
    const b = createQuoteLine({ systemType: "ventana_nova", width: 1.15, height: 1.5, includeInstallation: false });
    const sum = summarizeQuote([a, b]);
    const expected = Number((quoteCalculator.calculateQuote(a).total + quoteCalculator.calculateQuote(b).total).toFixed(2));
    expect(sum.total).toBe(expected);
    expect(sum.lines).toHaveLength(2);
  });

  it("marca el total como referencial si algún sistema no tiene precio", () => {
    const pending = createQuoteLine({ systemType: "ventana_pvc_abatible" });
    expect(summarizeQuote([pending]).pricePending).toBe(true);
    expect(summarizeQuote([createQuoteLine(), pending]).pricePending).toBe(true);
  });

  it("sin líneas devuelve ceros", () => {
    const empty = summarizeQuote([]);
    expect(empty.total).toBe(0);
    expect(empty.pricePending).toBe(false);
  });
});

describe("parseSystemParam", () => {
  it("acepta sistemas del catálogo, incluidos los incorporados el 2026-11-08", () => {
    expect(parseSystemParam("ventana_nova")).toBe("ventana_nova");
    expect(parseSystemParam("ventana_acustica")).toBe("ventana_acustica");
    expect(parseSystemParam("ventana_pvc_abatible")).toBe("ventana_pvc_abatible");
  });

  it("rechaza valores inexistentes o nulos", () => {
    expect(parseSystemParam("serie_31")).toBeNull();
    expect(parseSystemParam("constructor")).toBeNull();
    expect(parseSystemParam(null)).toBeNull();
  });
});
