import { QUOTE_PRICING, type Difficulty } from "../config/pricing";
import type { AluminumColor, GlassType, SystemType } from "@/entities/window/model";
import { BudgetItem } from "@/shared/schemas/ecommerce-schemas";

export interface QuoteCalculationInput {
  systemType: SystemType;
  width: number; // en metros (ej. 2.40)
  height: number; // en metros (ej. 2.10)
  glassType: GlassType;
  aluminumColor: AluminumColor;
  difficulty: Difficulty;
  includeInstallation: boolean;
}

export const quoteCalculator = {
  calculateQuote(input: QuoteCalculationInput): {
    items: BudgetItem[];
    subtotal: number;
    installationCost: number;
    igv: number;
    total: number;
    /** true si el sistema elegido aún no tiene precio definido: el total es referencial. */
    pricePending: boolean;
  } {
    const P = QUOTE_PRICING;
    const areaM2 = Math.max(P.minAreaM2, Number((input.width * input.height).toFixed(2)));
    const perimeterM = Math.max(P.minPerimeterM, Number((2 * (input.width + input.height)).toFixed(2)));

    const unitPriceGlass = P.glass[input.glassType]?.pricePerM2 ?? P.glass["8mm_incoloro"].pricePerM2;
    const totalGlass = Number((areaM2 * unitPriceGlass).toFixed(2));

    const unitPriceAlu = P.aluminum[input.aluminumColor]?.pricePerMeter ?? P.aluminum.negro_mate.pricePerMeter;
    const totalAlu = Number((perimeterM * unitPriceAlu).toFixed(2));

    const system = P.systems[input.systemType];
    const accKit = { desc: system.kitDescription, cost: system.kitCost };
    const pricePending = "pricePending" in system && system.pricePending === true;

    const items: BudgetItem[] = [
      {
        description: `Vidrio Templado (${input.glassType.replace("_", " ")}) - ${areaM2} m²`,
        category: "vidrio",
        quantity: areaM2,
        unit: "m2",
        unitPrice: unitPriceGlass,
        totalPrice: totalGlass,
        width: input.width,
        height: input.height,
      },
      {
        description: `Perfiles de Aluminio (${input.aluminumColor.replace("_", " ")}) - ${perimeterM} m`,
        category: "aluminio",
        quantity: perimeterM,
        unit: "m",
        unitPrice: unitPriceAlu,
        totalPrice: totalAlu,
      },
      {
        description: accKit.desc,
        category: "accesorio",
        quantity: 1,
        unit: "kit",
        unitPrice: accKit.cost,
        totalPrice: accKit.cost,
      },
    ];

    const subtotal = Number((totalGlass + totalAlu + accKit.cost).toFixed(2));

    // 4. Mano de obra e instalación
    let installationCost = 0;
    if (input.includeInstallation) {
      const baseLaborRate = areaM2 * P.installation.ratePerM2 + (P.installation.surcharge[input.difficulty]?.amount ?? 0);
      installationCost = Number(Math.max(P.installation.minCost, baseLaborRate).toFixed(2));
      items.push({
        description: `Servicio de Instalación y Montaje Profesional (${input.difficulty.replace(/_/g, " ")})`,
        category: "instalacion",
        quantity: 1,
        unit: "servicio",
        unitPrice: installationCost,
        totalPrice: installationCost,
      });
    }

    const subtotalConInstalacion = Number((subtotal + installationCost).toFixed(2));
    const igv = Number((subtotalConInstalacion * P.igvRate).toFixed(2));
    const total = Number((subtotalConInstalacion + igv).toFixed(2));

    return {
      items,
      subtotal,
      installationCost,
      igv,
      total,
      pricePending,
    };
  },
};
