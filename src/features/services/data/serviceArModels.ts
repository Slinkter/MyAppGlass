export interface SystemARConfig {
  systemLabel: string;
  category: string;
  glbModelUrl: string;
  usdzModelUrl: string;
  description: string;
}

export const SERVICE_AR_MODELS_MAP: Record<string, Record<string, SystemARConfig>> = {
  ventana: {
    "Sistema Nova": {
      systemLabel: "Ventana Corrediza Sistema Nova",
      category: "Ventanas Acústicas",
      glbModelUrl: "/models/ventana-nova.glb",
      usdzModelUrl: "/models/ventana-nova.glb",
      description: "Ventana corrediza hermética con perfilería Nova y cristal templado de 6mm/8mm.",
    },
    "Sistema Serie 25": {
      systemLabel: "Ventana Antirruido Serie 25",
      category: "Ventanas Acústicas",
      glbModelUrl: "/models/ventana-nova.glb",
      usdzModelUrl: "/models/ventana-nova.glb",
      description: "Ventana de aluminio Serie 25 reforzada con felpas de nylon y cierres multipunto.",
    },
    "Sistema Serie 31": {
      systemLabel: "Ventana Acústica Serie 31",
      category: "Ventanas Acústicas",
      glbModelUrl: "/models/ventana-nova.glb",
      usdzModelUrl: "/models/ventana-nova.glb",
      description: "Sistema para vanos de gran formato con rodajes industriales y aislamiento superior.",
    },
  },
  mampara: {
    "Sistema Serie 25": {
      systemLabel: "Mampara Corrediza Serie 25",
      category: "Mamparas & Terrazas",
      glbModelUrl: "/models/mampara-serie25.glb",
      usdzModelUrl: "/models/mampara-serie25.glb",
      description: "Mampara de cristal templado de 8mm/10mm para terrazas con perfiles anodizados.",
    },
    "Sistema Nova": {
      systemLabel: "Mampara Sistema Nova",
      category: "Mamparas & Terrazas",
      glbModelUrl: "/models/mampara-serie25.glb",
      usdzModelUrl: "/models/mampara-serie25.glb",
      description: "Mampara estándar para divisiones interiores y salas de estar.",
    },
  },
  ducha: {
    "Sistema Corredizo": {
      systemLabel: "Box de Ducha Corredizo en Acero",
      category: "Puertas de Ducha",
      glbModelUrl: "/models/puerta-ducha.glb",
      usdzModelUrl: "/models/puerta-ducha.glb",
      description: "Puerta de ducha en cristal templado con accesorios de acero inoxidable 304.",
    },
    "Sistema Batiente": {
      systemLabel: "Puerta de Ducha Batiente",
      category: "Puertas de Ducha",
      glbModelUrl: "/models/puerta-ducha.glb",
      usdzModelUrl: "/models/puerta-ducha.glb",
      description: "Puerta batiente con bisagras vidrio-muro de acero y sellos magnéticos.",
    },
  },
  techo: {
    "Sistema Policarbonato": {
      systemLabel: "Techo de Policarbonato Alveolar",
      category: "Techos & Coberturas",
      glbModelUrl: "/models/techo-policarbonato.glb",
      usdzModelUrl: "/models/techo-policarbonato.glb",
      description: "Cobertura de aluminio con protección solar UV y estructura resistente.",
    },
  },
};
