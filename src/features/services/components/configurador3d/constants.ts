import {
    ArrowUp,
    ArrowRightLeft,
    DoorOpen,
    Square,
} from "lucide-react";

export interface WindowCatalogItem {
    id: string;
    title: string;
    badge: string;
    colorPalette: string;
    icon: typeof ArrowRightLeft;
    description: string;
    mechanics: string;
    bullets: string[];
}

export const WINDOW_CATALOG: WindowCatalogItem[] = [
    {
        id: "corredizo",
        title: "CORREDIZA",
        badge: "Más Popular",
        colorPalette: "emerald",
        icon: ArrowRightLeft,
        description: "Se desliza horizontalmente sobre rieles inferiores.",
        mechanics: "Deslizamiento lateral sobre garruchas.",
        bullets: [
            "Ahorra espacio interior",
            "Fácil de usar y limpiar",
            "Ideal para mamparas y ventilación amplia",
        ],
    },
    {
        id: "proyectante",
        title: "PROYECTANTE",
        badge: "Ventilación",
        colorPalette: "orange",
        icon: ArrowUp,
        description: "Se proyecta hacia afuera desde la parte inferior.",
        mechanics: "Brazos de extensión laterales.",
        bullets: [
            "Ventilación constante",
            "Protege contra la lluvia",
            "Ideal para oficinas y baños",
        ],
    },
    {
        id: "batiente",
        title: "BATIENTE (ABATIBLE)",
        badge: "Hermética",
        colorPalette: "blue",
        icon: DoorOpen,
        description: "Se abre hacia el interior o exterior mediante bisagras laterales.",
        mechanics: "Giro sobre bisagras capuchinas/pesadas.",
        bullets: [
            "Máxima ventilación total",
            "Aislamiento acústico superior",
            "Fácil limpieza ambas caras",
        ],
    },
    {
        id: "fija",
        title: "LUZ FIJA",
        badge: "Económica",
        colorPalette: "gray",
        icon: Square,
        description: "Panel inamovible para maximizar iluminación.",
        mechanics: "Cristal incrustado en marco sellado.",
        bullets: [
            "100% Hermética y acústica",
            "La opción más económica",
            "Máxima entrada de luz",
        ],
    },
];

export const FINISHES = [
    { id: "negro", label: "Negro", color: "#1A1A1A" },
    { id: "gris-claro", label: "Gris Claro", color: "#B0B4B8" },
    { id: "madera-claro", label: "Madera Claro", color: "#C19A6B" },
    { id: "blanco", label: "Blanco", color: "#F8F9FA" },
];

export const GLASS_TYPES = [
    {
        id: "crudo",
        label: "Vidrio Crudo",
        thickness: "6 mm",
        desc: "Económico y ligero para interiores",
        badge: "Básico",
        colorPalette: "gray",
    },
    {
        id: "laminado",
        label: "Vidrio Laminado",
        thickness: "(3+3) 6 mm",
        desc: "Máximo aislamiento acústico y protección contra roturas",
        badge: "🔇 Antirruido",
        colorPalette: "blue",
    },
    {
        id: "templado",
        label: "Vidrio Templado",
        thickness: "6 mm",
        desc: "Alta resistencia al impacto y seguridad",
        badge: "⭐ Más Popular",
        colorPalette: "emerald",
    },
];

export const GLASS_COLORS = [
    {
        id: "incoloro",
        label: "Incoloro",
        colorHex: "#E8F4F8",
        border: "#CBD5E1",
        tint3d: 0xe8f4f8,
    },
    {
        id: "bronce",
        label: "Bronce",
        colorHex: "#8A5A36",
        border: "#78350F",
        tint3d: 0x966847,
    },
    {
        id: "gris",
        label: "Gris (Humo)",
        colorHex: "#4B5563",
        border: "#374151",
        tint3d: 0x475569,
    },
];

export const DIMENSION_PRESETS = [
    { label: "1.20 × 1.00 m", width: 1.2, height: 1.0 },
    { label: "1.50 × 1.20 m", width: 1.5, height: 1.2 },
    { label: "1.80 × 1.40 m", width: 1.8, height: 1.4 },
    { label: "2.00 × 1.50 m", width: 2.0, height: 1.5 },
];
