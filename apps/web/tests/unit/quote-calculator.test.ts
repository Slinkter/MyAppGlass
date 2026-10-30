import { describe, it, expect } from "vitest";
import { quoteCalculator } from "@/features/presupuesto/utils/quoteCalculator";

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
