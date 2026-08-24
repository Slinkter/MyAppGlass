import type { ConfiguracionCotizacion } from "../types/catalogo";

const PRICING = {
  glass: { crudo: 90, templado: 160, laminado: 220, pavonado: 190 },
  finish: { natural: 1.0, negro: 1.1, madera: 1.4 },
  baseHardware: {
    corredizo: 50,
    proyectante: 90,
    batiente: 110,
    pivotante: 140,
    fija: 20,
    "fijo-corredizo": 80,
    oscilobatiente: 150,
  },
};

const SYSTEM_PROFILES: Record<string, { multiplier: number }> = {
  "sistema-nova": { multiplier: 1.0 },
  "serie-20": { multiplier: 0.95 },
  "serie-25": { multiplier: 1.15 },
  "serie-26": { multiplier: 1.3 },
  "serie-42": { multiplier: 1.6 },
  "serie-37": { multiplier: 1.5 },
  "serie-62": { multiplier: 2.2 },
};

export function calcularPrecio(config: ConfiguracionCotizacion): number {
  const { anchoMm, altoMm, tipoVidrio, acabadoAluminio, sistemaId, tipoId } =
    config;
  const area = (anchoMm / 1000) * (altoMm / 1000); // m2
  const perimeter = 2 * (anchoMm / 1000 + altoMm / 1000); // m

  const sys = SYSTEM_PROFILES[sistemaId] || { multiplier: 1.0 };

  const glassCost = area * (PRICING.glass[tipoVidrio as keyof typeof PRICING.glass] || 160);
  const alumCost =
    perimeter *
    45 *
    sys.multiplier *
    (PRICING.finish[acabadoAluminio as keyof typeof PRICING.finish] || 1.0);
  const hwCost = PRICING.baseHardware[tipoId as keyof typeof PRICING.baseHardware] || 50;
  const labor = 80 + area * 30; // Base labor + per m2

  const subtotal = glassCost + alumCost + hwCost + labor;
  const total = subtotal * 1.18; // IGV

  return total;
}
