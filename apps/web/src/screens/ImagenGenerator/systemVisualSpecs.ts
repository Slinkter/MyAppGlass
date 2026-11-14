export type SystemSvgKind = "serie42" | "serie80" | "duchaKit";

export type AluminumFinishId =
  | "negro"
  | "mate"
  | "blanco"
  | "madera"
  | "champagne";

export type GlassTintId = "incoloro" | "bronce" | "gris";

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

export interface LabSystemDemo {
  id: SystemSvgKind;
  category: string;
  title: string;
  subtitle: string;
  photoSrc: string;
  photoAlt: string;
  photoRatio: string;
  dimensionsLabel: string;
  glassSpec: string;
  hardwareList: string[];
  recommendedUse: string;
  nanoBananaPrompt: string;
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
    label: "Mate (Anodizado natural)",
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

export const LAB_SYSTEM_DEMOS: LabSystemDemo[] = [
  {
    id: "serie42",
    category: "Ventana Proyectante",
    title: "Ventana Proyectante · Serie 42",
    subtitle: "Alta hermeticidad con doble burlete EPDM y brazos en acero inoxidable",
    photoSrc: "/images/renders/ventana/serie-42.webp",
    photoAlt:
      "Render fotorrealista de ventana proyectante Serie 42 en aluminio negro mate abierta a 35 grados en dormitorio contemporáneo",
    photoRatio: "4 / 3",
    dimensionsLabel: "Vano referencial hasta 1.00 m × 1.30 m (hasta 10 pisos)",
    glassSpec: "Compatible con vidrio crudo, laminado, templado o insulado DVH (6–10 mm)",
    hardwareList: [
      "Marco y hoja perimetral Serie 42 (aluminio 6063-T5)",
      "Par de brazos proyectantes en acero inoxidable de apertura controlada (~35°)",
      "Manija ergonómica con cierre hermético multipunto",
      "Doble junta de estanqueidad EPDM contra viento y filtración de agua",
    ],
    recommendedUse:
      "Dormitorios, estudios y fachadas en edificios donde se requiere ventilación continua y mejor sellado perimetral.",
    nanoBananaPrompt:
      "Photorealistic architectural interior photography in a bright modern Lima apartment bedroom. Close-up three-quarter view of an aluminum projecting awning window (Serie 42 architectural profile, matte black anodized 6063-T5 finish, 42mm deep clean rectangular frame) tilted outward at 35 degrees. Clearly visible brushed stainless steel friction awning arms on both side jambs, minimalist black lever handle at bottom rail, double black EPDM rubber weatherstrip seals, crystal clear tempered glass reflecting soft morning daylight onto warm wood window sill and linen curtains. Natural architectural photography, 35mm lens, sharp rectilinear geometry, zero text, zero logos, zero watermarks.",
  },
  {
    id: "serie80",
    category: "Mampara Corrediza Europea",
    title: "Mampara Europea · Serie 80",
    subtitle: "Hojas de gran formato hasta 1.50 m × 3.00 m con riel de desagüe y cremona",
    photoSrc: "/images/lab/mampara-europea-serie80.webp",
    photoAlt:
      "Render fotorrealista de mampara corrediza europea Serie 80 de piso a techo con perfil negro mate y terraza iluminada",
    photoRatio: "16 / 9",
    dimensionsLabel: "Hoja máx. 1.50 m ancho × 3.00 m alto · Cristal 6 y 8 mm",
    glassSpec: "Vidrio templado o laminado de seguridad (6 y 8 mm) con felpa siliconada",
    hardwareList: [
      "Perfilería Serie 80 de gran inercia con cámara de desagüe inferior",
      "Cremona o tirador embutido con cierre multipunto de suave accionamiento",
      "Garruchas dobles de alta carga regulables en base de hoja corrediza",
      "Encuentro central reforzado con felpa siliconada y topes amortiguadores",
    ],
    recommendedUse:
      "Salas hacia terraza o jardín en La Molina, Surco, San Borja, San Isidro y Miraflores que buscan amplitud visual de piso a techo.",
    nanoBananaPrompt:
      "Photorealistic architectural photography of a luxury contemporary living room opening onto a sunlit garden terrace in Lima. Floor-to-ceiling European heavy-duty sliding aluminum glass door (Serie 80 profile, matte black powder-coated finish, clean architectural proportions, 3.0m height), one large fixed panel and one wide sliding glass panel partially open. Visible flush anodized drainage bottom track, sleek black cremona handle, crystal clear 8mm tempered glass panes, crisp rectilinear verticals, natural warm daylight, 24mm architectural shift lens look, zero text, zero brand watermarks.",
  },
  {
    id: "duchaKit",
    category: "Puerta de Ducha en Cristal Templado",
    title: "Box de Ducha Frontal · Kit Corredizo 1F + 1C",
    subtitle: "Cristal templado sin marco con riel tubular en acero inoxidable y rodamientos vistos",
    photoSrc: "/images/lab/box-ducha-kit-frontal.webp",
    photoAlt:
      "Render fotorrealista de puerta de ducha corrediza en vidrio templado transparente con tubo y rodamientos expuestos cromados",
    photoRatio: "4 / 3",
    dimensionsLabel: "1 paño fijo + 1 hoja corrediza · Vidrio templado 8 mm",
    glassSpec: "Vidrio templado incoloro de seguridad 8 mm con cantos pulidos y vinil antisalpicaduras",
    hardwareList: [
      "Barra tubular superior de acero inoxidable 304 con fijaciones a muro",
      "Dos rodamientos circulares expuestos con topes amortiguados",
      "Tirador tipo perilla / uñero en acero inoxidable pulido",
      "Guía inferior discreta + burlete magnético / aleta transparente de cierre",
    ],
    recommendedUse:
      "Baños principales y de visitas entre muros paralelos donde no conviene invadir el paso con puerta batiente.",
    nanoBananaPrompt:
      "Photorealistic interior architectural photography of a minimalist contemporary bathroom. Frameless 8mm clear tempered glass sliding shower enclosure (1 fixed panel + 1 sliding door) spanning wall-to-wall over large-format matte light-gray porcelain tile. Prominently detailed polished 304 stainless steel round top rail bar, two exposed cylindrical stainless steel rollers supporting the sliding door, round stainless steel knob handle, subtle floor guide, translucent anti-splash vertical vinyl sweep seal, warm natural skylight, sharp reflections, zero text, zero logos.",
  },
];
