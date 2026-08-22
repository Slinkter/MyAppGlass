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
    "Sistema Serie 62": {
      systemLabel: "Ventana Hermética Serie 62",
      category: "Ventanas Acústicas",
      glbModelUrl: "/models/ventana-nova.glb",
      usdzModelUrl: "/models/ventana-nova.glb",
      description: "Sistema europeo de alta hermeticidad y máximo aislamiento sonoro.",
    },
  },
  mampara: {
    "Sistema Nova Corredizo": {
      systemLabel: "Mampara Sistema Nova",
      category: "Mamparas & Terrazas",
      glbModelUrl: "/models/mampara-serie25.glb",
      usdzModelUrl: "/models/mampara-serie25.glb",
      description: "Mampara estándar para divisiones interiores y salas de estar.",
    },
    "Sistema Serie 25 Reforzado": {
      systemLabel: "Mampara Corrediza Serie 25",
      category: "Mamparas & Terrazas",
      glbModelUrl: "/models/mampara-serie25.glb",
      usdzModelUrl: "/models/mampara-serie25.glb",
      description: "Mampara de cristal templado de 8mm/10mm para terrazas con perfiles anodizados.",
    },
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
    "Sistema Corredizo KIT Acero": {
      systemLabel: "Box de Ducha Corredizo KIT Acero",
      category: "Puertas de Ducha",
      glbModelUrl: "/models/puerta-ducha.glb",
      usdzModelUrl: "/models/puerta-ducha.glb",
      description: "Puerta de ducha en cristal templado con tubo y rodamientos de acero inoxidable 304.",
    },
    "Sistema Batiente Minimalista": {
      systemLabel: "Puerta de Ducha Batiente Minimalista",
      category: "Puertas de Ducha",
      glbModelUrl: "/models/puerta-ducha.glb",
      usdzModelUrl: "/models/puerta-ducha.glb",
      description: "Puerta batiente con bisagras vidrio-muro de acero inoxidable y sellos magnéticos.",
    },
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
  parapeto: {
    "Sistema Parapeto Panorámico": {
      systemLabel: "Parapeto de Vidrio Templado Panorámico",
      category: "Parapetos & Azoteas",
      glbModelUrl: "/models/mampara-serie25.glb",
      usdzModelUrl: "/models/mampara-serie25.glb",
      description: "Parapeto de seguridad para azoteas y terrazas con cristal templado de 10mm.",
    },
  },
  baranda: {
    "Sistema Baranda Minimalista": {
      systemLabel: "Baranda de Vidrio y Acero Inoxidable",
      category: "Barandas & Escaleras",
      glbModelUrl: "/models/mampara-serie25.glb",
      usdzModelUrl: "/models/mampara-serie25.glb",
      description: "Baranda minimalista con pasamanos de acero y botones de anclaje de alta resistencia.",
    },
  },
  balcones: {
    "Sistema Panorámico": {
      systemLabel: "Balcón Panorámico de Vidrio Templado",
      category: "Balcones & Fachadas",
      glbModelUrl: "/models/mampara-serie25.glb",
      usdzModelUrl: "/models/mampara-serie25.glb",
      description: "Cerramiento panorámico para balcones residenciales con cristal de 8mm/10mm.",
    },
  },
  techo: {
    "Sistema Cobertura Aluminio": {
      systemLabel: "Techo de Policarbonato Alveolar con Aluminio",
      category: "Techos & Coberturas",
      glbModelUrl: "/models/techo-policarbonato.glb",
      usdzModelUrl: "/models/techo-policarbonato.glb",
      description: "Cobertura de aluminio con protección solar UV y estructura resistente al viento y lluvia.",
    },
    "Sistema Policarbonato": {
      systemLabel: "Techo de Policarbonato Alveolar",
      category: "Techos & Coberturas",
      glbModelUrl: "/models/techo-policarbonato.glb",
      usdzModelUrl: "/models/techo-policarbonato.glb",
      description: "Cobertura de aluminio con protección solar UV y estructura resistente.",
    },
  },
  pvidrio: {
    "Sistema Pivotante con Freno de Piso": {
      systemLabel: "Puerta de Cristal Templado con Freno Hidráulico",
      category: "Puertas de Vidrio",
      glbModelUrl: "/models/mampara-serie25.glb",
      usdzModelUrl: "/models/mampara-serie25.glb",
      description: "Puerta de vidrio templado batiente con freno de piso y tirador tubular de acero.",
    },
  },
  pserie: {
    "Sistema Puerta Serie": {
      systemLabel: "Puerta de Aluminio Serie Residencial",
      category: "Puertas de Aluminio",
      glbModelUrl: "/models/ventana-nova.glb",
      usdzModelUrl: "/models/ventana-nova.glb",
      description: "Puerta de perfiles extruidos de aluminio con plancha arenada y cerradura de seguridad.",
    },
  },
  celosias: {
    "Sistema Celosía Fija y Móvil": {
      systemLabel: "Celosía de Aluminio para Ventilación",
      category: "Celosías & Ventilación",
      glbModelUrl: "/models/ventana-nova.glb",
      usdzModelUrl: "/models/ventana-nova.glb",
      description: "Sistema de lamas de aluminio para ventilación continua y protección solar.",
    },
  },
};
