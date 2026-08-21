export interface AISimulatorProduct {
  id: string;
  name: string;
  category: "mamparas" | "ventanas" | "duchas" | "techos";
  description: string;
  previewImage: string;
  recommendedSpace: string;
  aiPromptSnippet: string;
}

export const AI_SIMULATOR_PRODUCTS: AISimulatorProduct[] = [
  {
    id: "mampara-serie25-black",
    name: "Mampara Corrediza Serie 25 (Negro Mate)",
    category: "mamparas",
    description: "Cristal templado de 8mm con perfiles de aluminio negro mate, ideal para salas conectadas a jardín o terraza.",
    previewImage: "/images/services-products-02.Mampara-save-mampara01.webp",
    recommendedSpace: "Sala principal, terraza o jardín",
    aiPromptSnippet: "modern minimalist sliding glass partition Serie 25 with matte black aluminum frame and clear tempered glass 8mm",
  },
  {
    id: "ventana-antirruido-nova",
    name: "Ventana Antirruido Sistema Nova Hermética",
    category: "ventanas",
    description: "Ventana acústica de doble contacto con cristal laminado antirruido de 8mm para dormitorios y oficinas.",
    previewImage: "/images/services-products-01.Ventanas-nova-a10.webp",
    recommendedSpace: "Dormitorio, fachada a la calle o estudio",
    aiPromptSnippet: "high-end acoustic hermetic window Nova system with dark bronze framing and soundproof laminated glass",
  },
  {
    id: "ducha-acero-inox",
    name: "Box de Ducha Cristal Templado & Acero Inox",
    category: "duchas",
    description: "Mampara corrediza de baño en cristal de 8mm con tirador y rieles de acero inoxidable 304 quirúrgico.",
    previewImage: "/images/services-products-03.Ducha-ducha01.webp",
    recommendedSpace: "Cuarto de baño principal o suite",
    aiPromptSnippet: "luxury frameless glass walk-in shower door with 304 stainless steel hardware and ultra-clear tempered glass",
  },
  {
    id: "techo-policarbonato-aluminio",
    name: "Techo de Policarbonato Alveolar Estructural",
    category: "techos",
    description: "Cobertura ligera con protección UV de 10mm y vigas de aluminio para cocheras y patios interiores.",
    previewImage: "/images/services-products-04.Techo-techopoli01.webp",
    recommendedSpace: "Patio interior, cochera o terraza abierta",
    aiPromptSnippet: "modern outdoor polycarbonate roof canopy with aluminum structural support beams and UV solar protection",
  },
];
