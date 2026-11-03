import { describe, it, expect } from "vitest";
import { quoteCalculator } from "@/features/presupuesto/utils/quoteCalculator";
import { QUOTE_PRICING } from "@/features/presupuesto/config/pricing";

describe("Quote Calculator Parametric Engine", () => {
  it("calcula correctamente el presupuesto de una mampara Serie 25 con instalación", () => {
    const result = quoteCalculator.calculateQuote({
      systemType: "mampara_serie25",
      width: 2.0,
      height: 2.1,
      glassType: "8mm_incoloro",
      aluminumColor: "negro_mate",
      difficulty: "primer_piso",
      includeInstallation: true,
    });

    expect(result.subtotal).toBeGreaterThan(0);
    expect(result.installationCost).toBeGreaterThan(0);
    expect(result.igv).toBeCloseTo((result.subtotal + result.installationCost) * 0.18, 1);
    expect(result.total).toBeCloseTo(result.subtotal + result.installationCost + result.igv, 1);
    expect(result.items.length).toBe(4); // vidrio, aluminio, accesorio, instalacion
  });

  it("calcula sin mano de obra cuando no se solicita instalación", () => {
    const result = quoteCalculator.calculateQuote({
      systemType: "ventana_nova",
      width: 1.5,
      height: 1.2,
      glassType: "6mm_incoloro",
      aluminumColor: "aluminio_mate",
      difficulty: "primer_piso",
      includeInstallation: false,
    });

    expect(result.installationCost).toBe(0);
    expect(result.items.length).toBe(3);
  });
});

describe("Metraje y tabla de precios", () => {
  const base = {
    systemType: "ventana_nova" as const,
    glassType: "8mm_incoloro" as const,
    aluminumColor: "negro_mate" as const,
    difficulty: "primer_piso" as const,
    includeInstallation: false,
  };

  it("calcula m2 de vidrio y metros lineales de perfil", () => {
    const r = quoteCalculator.calculateQuote({ ...base, width: 2, height: 1.5 });
    expect(r.items[0].quantity).toBe(3); // 2 x 1.5 m2
    expect(r.items[1].quantity).toBe(7); // 2 * (2 + 1.5) m
    expect(r.items[0].totalPrice).toBe(QUOTE_PRICING.glass["8mm_incoloro"].pricePerM2 * 3);
  });

  it("aplica mínimos de área y perímetro", () => {
    const r = quoteCalculator.calculateQuote({ ...base, width: 0.01, height: 0.01 });
    expect(r.items[0].quantity).toBe(QUOTE_PRICING.minAreaM2);
    expect(r.items[1].quantity).toBe(QUOTE_PRICING.minPerimeterM);
  });
});
