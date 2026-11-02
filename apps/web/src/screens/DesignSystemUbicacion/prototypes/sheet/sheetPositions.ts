/** Posiciones (detents) de la hoja inferior, como fracción del alto del contenedor. */
export const SHEET_POSITIONS = ["min", "mid", "full"] as const;
export type SheetPosition = (typeof SHEET_POSITIONS)[number];

export const SHEET_RATIO: Record<SheetPosition, number> = { min: 0.25, mid: 0.5, full: 0.85 };

export const SHEET_LABEL: Record<SheetPosition, string> = {
  min: "mínima",
  mid: "media",
  full: "completa",
};

/** Posición más cercana a una fracción de alto. */
export const nearestPosition = (ratio: number): SheetPosition =>
  SHEET_POSITIONS.reduce((best, p) =>
    Math.abs(SHEET_RATIO[p] - ratio) < Math.abs(SHEET_RATIO[best] - ratio) ? p : best,
  );
