import { BudgetItem } from "@/shared/schemas/ecommerce-schemas";

export interface QuoteCalculationInput {
  systemType: "ventana_nova" | "mampara_serie25" | "ducha_cristal" | "techo_policarbonato";
  width: number; // en metros (ej. 2.40)
  height: number; // en metros (ej. 2.10)
  glassType: "8mm_incoloro" | "10mm_incoloro" | "6mm_incoloro" | "8mm_laminado";
  aluminumColor: "negro_mate" | "aluminio_mate" | "blanco" | "champagne";
  difficulty: "primer_piso" | "piso_alto_sin_andamio" | "piso_alto_con_andamio";
  includeInstallation: boolean;
}

export const quoteCalculator = {
  calculateQuote(input: QuoteCalculationInput): {
    items: BudgetItem[];
    subtotal: number;
    installationCost: number;
    igv: number;
    total: number;
  } {
    const areaM2 = Math.max(0.1, Number((input.width * input.height).toFixed(2)));
    const perimeterM = Math.max(0.5, Number((2 * (input.width + input.height)).toFixed(2)));

    // 1. Vidrio
    const glassPricePerM2: Record<string, number> = {
      "6mm_incoloro": 95.0,
      "8mm_incoloro": 135.0,
      "10mm_incoloro": 165.0,
      "8mm_laminado": 190.0,
    };
    const unitPriceGlass = glassPricePerM2[input.glassType] || 135.0;
    const totalGlass = Number((areaM2 * unitPriceGlass).toFixed(2));

    // 2. Aluminio
    const aluPricePerMeter: Record<string, number> = {
      negro_mate: 45.0,
      aluminio_mate: 38.0,
      blanco: 40.0,
      champagne: 48.0,
    };
    const unitPriceAlu = aluPricePerMeter[input.aluminumColor] || 45.0;
    const totalAlu = Number((perimeterM * unitPriceAlu).toFixed(2));

    // 3. Accesorios
    const accessoriesCostBySystem: Record<string, { desc: string; cost: number }> = {
      ventana_nova: { desc: "Kit de Accesorios y Rodajes Sistema Nova", cost: 85.0 },
      mampara_serie25: { desc: "Kit de Cerradura Pico Loro, Tirador y Rodajes Serie 25", cost: 160.0 },
      ducha_cristal: { desc: "Kit de Accesorios en Acero Inoxidable para Puerta de Ducha", cost: 220.0 },
      techo_policarbonato: { desc: "Kit de Perfilería Unión H y Selladores Estructurales", cost: 140.0 },
    };
    const accKit = accessoriesCostBySystem[input.systemType] || { desc: "Kit de Accesorios Estándar", cost: 100.0 };

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
      let baseLaborRate = areaM2 * 80.0; // 80 soles x m2 de instalación
      if (input.difficulty === "piso_alto_sin_andamio") baseLaborRate += 100;
      if (input.difficulty === "piso_alto_con_andamio") baseLaborRate += 250;
      installationCost = Number(Math.max(150, baseLaborRate).toFixed(2));

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
    const igv = Number((subtotalConInstalacion * 0.18).toFixed(2));
    const total = Number((subtotalConInstalacion + igv).toFixed(2));

    return {
      items,
      subtotal,
      installationCost,
      igv,
      total,
    };
  },
};
