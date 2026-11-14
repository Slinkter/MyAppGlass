import type { ServicePageSystem, ServiceSystemSheet } from "../model";
import type { GalleryItem } from "@/shared/types/gallery";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const VISIBLE_WINDOW_SYSTEMS = new Set([
  "nova",
  "serie 20",
  "serie 25",
  "serie 35",
  "serie 62",
  "serie 3831",
]);

const WINDOW_CANONICAL_ORDER: readonly string[] = [
  "nova",
  "serie 20",
  "serie 25",
  "serie 35",
  "serie 62",
  "serie 3831",
  "serie 28",
  "serie 29",
  "serie 3825",
  "serie 80",
  "corrediza vco 031",
  "corrediza vco 036",
  "corrediza vco 042",
  "corrediza vco 043",
  "serie 42",
  "proyectante vpr 036",
  "proyectante vpr 042",
];

const HIDDEN_MAMPARA_SYSTEMS = new Set([
  "serie 7038",
  "corrediza mco 042",
  "corrediza mco 043",
  "corrediza mco 044",
  "batiente mbt 035",
  "batiente mbt 036",
]);

const HIDDEN_DUCHA_SYSTEMS = new Set(["sistema corredizo"]);

const DUCHA_PHOTO_INDICES: Record<string, readonly number[]> = {
  "kit de ducha de 1 hoja": [1, 6, 7, 8, 13, 17],
  "kit de ducha corredizo": [3, 4, 11, 12, 14, 15, 18],
  "kit de ducha esquinero": [2, 5, 9, 10, 16],
};

const MAMPARA_CANONICAL_ORDER: readonly string[] = [
  "nova",
  "serie 25",
  "serie 7038",
  "serie 80",
  "corrediza mco 042",
  "corrediza mco 043",
  "corrediza mco 044",
  "batiente mbt 035",
  "batiente mbt 036",
];

const getSeriesRank = (
  label: string,
  slug: string | undefined,
  sheetOrderMap: Map<string, number>,
): [number, number, string] => {
  const norm = normalize(label);

  if (slug === "ventana") {
    const idx = WINDOW_CANONICAL_ORDER.indexOf(norm);
    if (idx !== -1) return [0, idx, norm];
  }
  if (slug === "mampara") {
    const idx = MAMPARA_CANONICAL_ORDER.indexOf(norm);
    if (idx !== -1) return [0, idx, norm];
  }

  const sheetIdx = sheetOrderMap.get(norm);
  if (sheetIdx !== undefined) return [1, sheetIdx, norm];

  // Orden por apertura y número ascendente para sistemas nuevos publicados desde /admin/sistemas
  const family =
    norm === "nova"
      ? 0
      : norm.includes("proyectante") || norm.includes("vpr") || norm.includes("42") || norm.includes("3831")
        ? 3
        : norm.includes("batiente") || norm.includes("mbt") || norm.includes("serie 35") || norm.includes("serie 36")
          ? 4
          : norm.includes("vco") || norm.includes("mco")
            ? 2
            : 1;

  const numMatch = norm.match(/\d+/);
  const numericVal = numMatch ? Number.parseInt(numMatch[0], 10) : Number.MAX_SAFE_INTEGER;
  return [2, family * 10000 + numericVal, norm];
};

/**
 * Ordena los sistemas del servicio (y mantiene alineadas sus listas de imágenes)
 * siguiendo progresión por familia de apertura y serie numérica ascendente.
 */
export function sortServiceSystemsAndImages(
  systems: ServicePageSystem[],
  imageLists: GalleryItem[][],
  serviceSlug?: string,
  systemSheets?: ServiceSystemSheet[],
): { systems: ServicePageSystem[]; imageLists: GalleryItem[][] } {
  if (systems.length <= 1) return { systems, imageLists };

  const sheetOrderMap = new Map<string, number>();
  (systemSheets || []).forEach((sheet, idx) => {
    sheetOrderMap.set(normalize(sheet.nombre), idx);
  });

  const duchaMasterPhotos =
    serviceSlug === "ducha"
      ? imageLists.reduce<GalleryItem[]>(
          (best, list) => (list.length > best.length ? list : best),
          [],
        )
      : [];

  const pairs = systems
    .map((system, originalIndex) => {
      const key = normalize(system.label);
      let images = imageLists[originalIndex] || [];
      if (serviceSlug === "ducha" && duchaMasterPhotos.length >= 18) {
        const indices = DUCHA_PHOTO_INDICES[key];
        if (indices) {
          images = indices
            .map((oneBased) => duchaMasterPhotos[oneBased - 1])
            .filter((img): img is GalleryItem => Boolean(img));
        }
      }
      return {
        system,
        images,
        originalIndex,
        rank: getSeriesRank(system.label, serviceSlug, sheetOrderMap),
      };
    })
    .filter((pair) => {
      const key = normalize(pair.system.label);
      if (serviceSlug === "ventana") return VISIBLE_WINDOW_SYSTEMS.has(key);
      if (serviceSlug === "mampara") return !HIDDEN_MAMPARA_SYSTEMS.has(key);
      if (serviceSlug === "ducha") return !HIDDEN_DUCHA_SYSTEMS.has(key);
      return true;
    });

  pairs.sort((a, b) => {
    if (a.rank[0] !== b.rank[0]) return a.rank[0] - b.rank[0];
    if (a.rank[1] !== b.rank[1]) return a.rank[1] - b.rank[1];
    if (a.rank[2] !== b.rank[2]) return a.rank[2].localeCompare(b.rank[2]);
    return a.originalIndex - b.originalIndex;
  });

  const sortedSystems = pairs.map((p) => p.system);
  const sortedImages = pairs.map((p) => p.images);

  // Preserva cualquier galería suelta final si imageLists traía un elemento extra sin sistema
  if (imageLists.length > systems.length) {
    for (let i = systems.length; i < imageLists.length; i += 1) {
      sortedImages.push(imageLists[i]);
    }
  }

  return { systems: sortedSystems, imageLists: sortedImages };
}
