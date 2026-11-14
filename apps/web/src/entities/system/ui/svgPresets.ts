export type AluminumFinishId =
  | "negro"
  | "mate"
  | "blanco"
  | "madera"
  | "champagne";

export type GlassTintId = "incoloro" | "bronce" | "gris";

export type SystemSvgArchetype =
  | "proyectante"
  | "corrediza"
  | "corrediza_triple"
  | "corrediza_4"
  | "batiente"
  | "ducha_frontal"
  | "ducha_doble"
  | "ducha_esquinero"
  | "freno_piso"
  | "freno_aereo"
  | "baranda_minimalista"
  | "baranda_tubular"
  | "muro_cortina"
  | "balcon"
  | "celosia"
  | "espejo"
  | "techo"
  | "mantenimiento";

export interface FinishSwatch {
  id: AluminumFinishId;
  label: string;
  frameMain: string;
  frameDark: string;
  frameHighlight: string;
  stroke: string;
}

export interface GlassTintOption {
  id: GlassTintId;
  label: string;
  fillStart: string;
  fillEnd: string;
  reflection: string;
  edgeStroke: string;
}

export const ALUMINUM_FINISHES: FinishSwatch[] = [
  {
    id: "negro",
    label: "Negro",
    frameMain: "#1F2226",
    frameDark: "#0F1114",
    frameHighlight: "#4A5058",
    stroke: "#090A0C",
  },
  {
    id: "mate",
    label: "Mate",
    frameMain: "#C6CCD2",
    frameDark: "#8F98A3",
    frameHighlight: "#E7EBEF",
    stroke: "#66707A",
  },
  {
    id: "blanco",
    label: "Blanco",
    frameMain: "#F4F5F6",
    frameDark: "#CFD4DA",
    frameHighlight: "#FFFFFF",
    stroke: "#9CA4AE",
  },
  {
    id: "madera",
    label: "Madera",
    frameMain: "#8B5A3C",
    frameDark: "#5A3620",
    frameHighlight: "#B27A54",
    stroke: "#422514",
  },
  {
    id: "champagne",
    label: "Champagne",
    frameMain: "#B6A58B",
    frameDark: "#85745C",
    frameHighlight: "#D6C8B0",
    stroke: "#665844",
  },
];

export const GLASS_TINTS: GlassTintOption[] = [
  {
    id: "incoloro",
    label: "Incoloro",
    fillStart: "rgba(186, 224, 245, 0.38)",
    fillEnd: "rgba(224, 242, 254, 0.16)",
    reflection: "rgba(255, 255, 255, 0.55)",
    edgeStroke: "#6DA9C9",
  },
  {
    id: "bronce",
    label: "Bronce",
    fillStart: "rgba(146, 108, 72, 0.42)",
    fillEnd: "rgba(188, 150, 114, 0.20)",
    reflection: "rgba(255, 244, 232, 0.44)",
    edgeStroke: "#8C6343",
  },
  {
    id: "gris",
    label: "Gris",
    fillStart: "rgba(96, 110, 124, 0.45)",
    fillEnd: "rgba(148, 163, 184, 0.22)",
    reflection: "rgba(241, 245, 249, 0.46)",
    edgeStroke: "#5B6B7B",
  },
];

const normalize = (value?: string) =>
  (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/**
 * Resuelve el arquetipo vectorial exacto para cualquier servicio y sistema de GYA.
 */
export function resolveSystemSvgArchetype(
  serviceSlug?: string,
  systemName?: string,
): SystemSvgArchetype {
  const slug = normalize(serviceSlug);
  const name = normalize(systemName);

  if (slug === "ducha") {
    if (name.includes("esquinero")) return "ducha_esquinero";
    if (name.includes("corredizo") && !name.includes("1 hoja")) return "ducha_doble";
    return "ducha_frontal";
  }

  if (slug === "frenos-hidraulicos" || name.includes("freno")) {
    if (name.includes("aerea") || name.includes("bisagra")) return "freno_aereo";
    return "freno_piso";
  }

  if (slug === "baranda") {
    if (name.includes("minimalista")) return "baranda_minimalista";
    return "baranda_tubular";
  }

  if (slug === "parapeto") {
    if (name.includes("cortina") || name.includes("stick") || name.includes("unitizado")) {
      return "muro_cortina";
    }
    return "baranda_minimalista";
  }

  if (slug === "balcones") return "balcon";
  if (slug === "celosias") return "celosia";
  if (slug === "espejos") return "espejo";
  if (slug === "techo") return "techo";
  if (slug === "mantenimiento") return "mantenimiento";
  if (slug === "pserie" || slug === "pvidrio") return "batiente";

  if (
    name.includes("proyectante") ||
    name.includes("3831") ||
    name.includes("serie 42") ||
    name.includes("vpr")
  ) {
    return "proyectante";
  }

  if (
    name.includes("batiente") ||
    name.includes("mbt") ||
    name.includes("serie 35") ||
    name.includes("serie 36")
  ) {
    return "batiente";
  }

  if (name.includes("mco 042") || name.includes("4 hojas")) {
    return "corrediza_4";
  }

  if (name.includes("vco 043") || name.includes("mco 043") || name.includes("triple")) {
    return "corrediza_triple";
  }

  return "corrediza";
}

export function archetypeSupportsAluminumFinish(archetype: SystemSvgArchetype): boolean {
  return (
    archetype !== "ducha_frontal" &&
    archetype !== "ducha_doble" &&
    archetype !== "ducha_esquinero" &&
    archetype !== "freno_piso" &&
    archetype !== "freno_aereo" &&
    archetype !== "baranda_tubular" &&
    archetype !== "espejo"
  );
}
