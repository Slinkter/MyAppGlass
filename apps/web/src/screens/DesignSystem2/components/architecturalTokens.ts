/**
 * @file architecturalTokens.ts
 * @description Tokens arquitectónicos y catálogo real de obra para DesignSystem2.
 * Proporción estricta: ~90% superficies sólidas mate + ~10% glassmorphism óptico.
 */

export const ARCH_SURFACE = {
  graphite: "#0B0C0E",
  steel: "#121417",
  panel: "#171A1F",
  concrete: "#F3F2EE",
  concreteAlt: "#E8E6E0",
} as const;

export const ARCH_BORDER = {
  hairline: "rgba(255, 255, 255, 0.12)",
  hairlineStrong: "rgba(255, 255, 255, 0.22)",
  concreteHairline: "#D2CFC7",
  concreteStrong: "#111111",
} as const;

export const ARCH_TEXT = {
  onDarkPrimary: "#F3F2EE",
  onDarkMuted: "#A6ACB8",
  onDarkSubtle: "#9BA1AB",
  onConcretePrimary: "#0B0C0E",
  onConcreteMuted: "#3E4147",
} as const;

/**
 * Únicas 3 superficies autorizadas para glassmorphism óptico (~10% del sistema):
 * 1) FloatingPillNavbar, 2) GlassSystemCard, 3) Lightbox / Modal HUD.
 */
export const OPTICAL_GLASS = {
  bg: "rgba(11, 12, 14, 0.72)",
  bgHud: "rgba(11, 12, 14, 0.80)",
  backdropFilter: "blur(16px)",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.18)",
} as const;

export const ARCH_TRANSITION = {
  transformBorder: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1), border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  opacityTransform: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const FIREBASE_PROJECTS = {
  palmer: {
    code: "01",
    name: "PALMER",
    district: "La Molina",
    coordinates: "12°04'48\"S 76°56'52\"W",
    year: "2024",
    system: "Serie 62 · Vidrio Templado",
    typology: "Multifamiliar",
    webImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fpalmer%2Fweb%2Fpalmer001.webp?alt=media",
    mobileImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fpalmer%2Fmobile%2Fpalmer001.webp?alt=media",
  },
  elenor: {
    code: "02",
    name: "ELENOR",
    district: "Surco",
    coordinates: "12°08'42\"S 76°59'28\"W",
    year: "2024",
    system: "Sistema Nova · Acústica",
    typology: "Residencial",
    webImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Felenor%2Fweb%2Felenor001.webp?alt=media",
    mobileImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Felenor%2Fmobile%2Felenor002.webp?alt=media",
  },
  vittorie: {
    code: "03",
    name: "VITTORIE",
    district: "San Borja",
    coordinates: "12°05'58\"S 77°00'12\"W",
    year: "2024",
    system: "Serie 35 · Aluminio Negro",
    typology: "Edificio Residencial",
    webImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fvittorie%2Fweb%2Fvittorie001.webp?alt=media",
    mobileImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fvittorie%2Fweb%2Fvittorie001.webp?alt=media",
  },
  ventura: {
    code: "04",
    name: "VENTURA",
    district: "San Isidro",
    coordinates: "12°05'50\"S 77°02'15\"W",
    year: "2024",
    system: "Acústica · Vidrio Laminado",
    typology: "Fachada Corporativa",
    webImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fventura%2Fmobile%2Fventura001.webp?alt=media",
    mobileImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fventura%2Fmobile%2Fventura001.webp?alt=media",
  },
  parquePrado: {
    code: "05",
    name: "PARQUE PRADO",
    district: "Miraflores",
    coordinates: "12°07'16\"S 77°01'44\"W",
    year: "2023",
    system: "Serie 25 · PVC abatible",
    typology: "Frente Urbano",
    webImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fparque-prado%2Fmobile%2Fparque-prado001.webp?alt=media",
    mobileImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fparque-prado%2Fmobile%2Fparque-prado001.webp?alt=media",
  },
  maddy: {
    code: "06",
    name: "MADDY",
    district: "La Molina",
    coordinates: "12°05'11\"S 76°57'18\"W",
    year: "2023",
    system: "Serie 62 · Aluminio Champagne",
    typology: "Vivienda Unifamiliar",
    webImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fmaddy%2Fmobile%2Fmaddy001.webp?alt=media",
    mobileImage:
      "https://firebasestorage.googleapis.com/v0/b/gya-app-4c8a9.firebasestorage.app/o/projects%2Fmaddy%2Fmobile%2Fmaddy001.webp?alt=media",
  },
} as const;

export const LIMA_TOP_DISTRICTS = [
  { name: "La Molina", coords: "12°04'48\"S 76°56'52\"W", scope: "Taller, Showroom y Proyectos" },
  { name: "Surco", coords: "12°08'42\"S 76°59'28\"W", scope: "Residencial y Multifamiliar" },
  { name: "San Borja", coords: "12°05'58\"S 77°00'12\"W", scope: "Vivienda y Oficinas" },
  { name: "San Isidro", coords: "12°05'50\"S 77°02'15\"W", scope: "Corporativo y Antirruido" },
  { name: "Miraflores", coords: "12°07'16\"S 77°01'44\"W", scope: "Frente Urbano y Acústica" },
] as const;

export const OFFICIAL_SYSTEMS_CATALOG = [
  {
    code: "SYS-01",
    name: "Sistema Nova",
    typology: "Corrediza · Luz Fija",
    glass: "Crudo / Templado",
    aluminum: "Negro / Mate / Blanco / Champagne",
    acoustic: "Estándar urbano",
    application: "Viviendas y edificios multifamiliares",
  },
  {
    code: "SYS-02",
    name: "Serie 25",
    typology: "Corrediza",
    glass: "Crudo / Laminado",
    aluminum: "Mate / Blanco / Champagne",
    acoustic: "Media",
    application: "Ventanas residenciales de luz media",
  },
  {
    code: "SYS-03",
    name: "Serie 35",
    typology: "Corrediza · Proyectante",
    glass: "Templado / Laminado",
    aluminum: "Negro / Madera / Mate",
    acoustic: "Media-Alta",
    application: "Mamparas de terraza y vanos amplios",
  },
  {
    code: "SYS-04",
    name: "Serie 62",
    typology: "Corrediza · Proyectante",
    glass: "Laminado / Templado",
    aluminum: "Negro / Blanco / Mate",
    acoustic: "Alta hermeticidad",
    application: "Fachadas expuestas y proyectos exigentes",
  },
  {
    code: "SYS-05",
    name: "Acústica",
    typology: "Batiente · Proyectante",
    glass: "Laminado antirruido",
    aluminum: "Negro / Mate / Blanco",
    acoustic: "Atenuación antirruido",
    application: "Avenidas principales y dormitorios",
  },
  {
    code: "SYS-06",
    name: "PVC abatible",
    typology: "Batiente · Luz Fija",
    glass: "Laminado / Templado",
    aluminum: "Perfilería termoacústica",
    acoustic: "Máximo hermetismo",
    application: "Clínicas, oficinas y residencias premium",
  },
] as const;
