/**
 * @file catalogo-proveedores-servicios.ts
 * @description Catálogo consolidado de proveedores (Corporación Corrales, Eduhg, Favitem, HPD Glass)
 * vinculado a los 13 servicios de instalación de Glass & Aluminum Company S.A.C.
 * Obtenido directamente de los catálogos técnicos oficiales (sin consumir cuota de IA RAG).
 */

export interface SistemaVentanaProveedor {
  id: string;
  nombre: string;
  codigoSerie: string;
  tipoApertura: "corrediza" | "proyectante" | "batiente" | "fijo";
  espesoresVidrioMm: number[];
  tipoVidrioSoportado: ("crudo" | "templado" | "laminado" | "insulado")[];
  proveedoresPrincipales: string[];
  accesoriosClave: {
    sku: string;
    descripcion: string;
    proveedor: string;
  }[];
  ventajas: string[];
}

export const SISTEMAS_VENTANAS_PROVEEDORES: SistemaVentanaProveedor[] = [
  {
    id: "sistema-nova",
    nombre: "Sistema Nova (Cristal Templado)",
    codigoSerie: "NOVA",
    tipoApertura: "corrediza",
    espesoresVidrioMm: [6, 8, 10],
    tipoVidrioSoportado: ["templado", "laminado"],
    proveedoresPrincipales: ["corporacion_corrales", "eduhg"],
    accesoriosClave: [
      { sku: "03CD00230", descripcion: "Cierre automático MR625 Nova", proveedor: "eduhg" },
      { sku: "03CF0010N", descripcion: "Felpa F-10 perimetral hermética", proveedor: "eduhg" },
    ],
    ventajas: ["Máxima visibilidad sin perfiles intermedios gruesos", "Fácil limpieza y estética moderna minimalista"],
  },
  {
    id: "serie-20",
    nombre: "Serie 20 (Aluminio Corredizo Liviano)",
    codigoSerie: "S20",
    tipoApertura: "corrediza",
    espesoresVidrioMm: [3, 4, 5, 6],
    tipoVidrioSoportado: ["crudo", "templado"],
    proveedoresPrincipales: ["corporacion_corrales", "eduhg"],
    accesoriosClave: [
      { sku: "03GA00321", descripcion: "Garrucha armada para Serie 20", proveedor: "eduhg" },
      { sku: "03TA00034", descripcion: "Guía superior Serie 20", proveedor: "eduhg" },
      { sku: "03CD00230", descripcion: "Cierre automático central", proveedor: "eduhg" },
    ],
    ventajas: ["Económica y liviana para vanos residenciales estándar", "Deslizamiento suave con garruchas de nylon"],
  },
  {
    id: "serie-25",
    nombre: "Serie 25 (Aluminio Corredizo Intermedio)",
    codigoSerie: "S25",
    tipoApertura: "corrediza",
    espesoresVidrioMm: [4, 5, 6, 8],
    tipoVidrioSoportado: ["crudo", "templado", "laminado"],
    proveedoresPrincipales: ["corporacion_corrales", "eduhg"],
    accesoriosClave: [
      { sku: "03GA00322", descripcion: "Garrucha armada para Serie 25", proveedor: "eduhg" },
      { sku: "03TA00035", descripcion: "Guía superior/inferior Serie 25", proveedor: "eduhg" },
    ],
    ventajas: ["Mayor resistencia al viento que Serie 20", "Compatible con vidrio laminado de seguridad 6.38mm"],
  },
  {
    id: "serie-35",
    nombre: "Serie 35 (Batiente y Proyectante)",
    codigoSerie: "S35",
    tipoApertura: "batiente",
    espesoresVidrioMm: [4, 5, 6],
    tipoVidrioSoportado: ["crudo", "templado", "laminado"],
    proveedoresPrincipales: ["corporacion_corrales", "eduhg"],
    accesoriosClave: [
      { sku: "03BS00035", descripcion: "Bisagra para Serie 35 (Mate/Negro/Blanco)", proveedor: "eduhg" },
      { sku: "03BU00003", descripcion: "Burlete cuña negro p/4mm", proveedor: "eduhg" },
    ],
    ventajas: ["Hermeticidad superior ante viento y lluvia", "Apertura amplia hacia el exterior o interior"],
  },
  {
    id: "serie-3831",
    nombre: "Serie 3831 / Serie 38 (Acústica Proyectante)",
    codigoSerie: "S3831",
    tipoApertura: "proyectante",
    espesoresVidrioMm: [4, 6, 8],
    tipoVidrioSoportado: ["templado", "laminado"],
    proveedoresPrincipales: ["corporacion_corrales", "eduhg"],
    accesoriosClave: [
      { sku: "03VP00001", descripcion: "Manija Fermax derecha (S 3831 - S 42)", proveedor: "eduhg" },
      { sku: "03BU00004", descripcion: "Burlete cuña p/4mm (Serie 3831)", proveedor: "eduhg" },
      { sku: "03BU00005", descripcion: "Burlete DC negro doble contacto", proveedor: "eduhg" },
      { sku: "03EE00173", descripcion: "Escuadra expansiva interior 34.5x10", proveedor: "eduhg" },
    ],
    ventajas: ["Cierre de compresión con doble burlete EPDM", "Alta atenuación sonora para dormitorios y salas"],
  },
  {
    id: "serie-42",
    nombre: "Serie 42 (Acústica de Alta Prestación)",
    codigoSerie: "S42",
    tipoApertura: "proyectante",
    espesoresVidrioMm: [6, 8, 10],
    tipoVidrioSoportado: ["templado", "laminado", "insulado"],
    proveedoresPrincipales: ["corporacion_corrales", "eduhg"],
    accesoriosClave: [
      { sku: "03BU00010", descripcion: "Burlete cuña 6mm Serie 42", proveedor: "eduhg" },
      { sku: "03BU00100", descripcion: "Burlete EPDM burbuja nave hermética", proveedor: "eduhg" },
      { sku: "03EE00042", descripcion: "Escuadra expansiva 38.2x9.5", proveedor: "eduhg" },
    ],
    ventajas: ["Capacidad para DVH (Doble Vidriado Hermético)", "Aislamiento acústico de hasta 35 dB"],
  },
  {
    id: "serie-62",
    nombre: "Serie 62 (Mampara y Ventana Pesada de Alto Tráfico)",
    codigoSerie: "S62",
    tipoApertura: "corrediza",
    espesoresVidrioMm: [6, 8, 10],
    tipoVidrioSoportado: ["templado", "laminado"],
    proveedoresPrincipales: ["corporacion_corrales"],
    accesoriosClave: [
      { sku: "03GI00283", descripcion: "Garrucha de nylon de 20 a 50 kg para Serie 62", proveedor: "corporacion_corrales" },
      { sku: "03VP00137", descripcion: "Cierre automático Fermax con llave", proveedor: "corporacion_corrales" },
      { sku: "03CF0015P", descripcion: "Felpa perimetral reforzada F-15", proveedor: "eduhg" },
    ],
    ventajas: ["Soporta hojas de gran formato y peso", "Rodamiento silencioso y traba de seguridad con llave"],
  },
];

export interface ServicioInstalacionProveedor {
  slug: string;
  nombreServicio: string;
  categoriaNegocio: string;
  proveedoresInvolucrados: string[];
  insumosYMateriales: {
    nombre: string;
    descripcion: string;
    proveedor: string;
  }[];
}

export const SERVICIOS_PROVEEDORES_MAPA: ServicioInstalacionProveedor[] = [
  {
    slug: "ventana",
    nombreServicio: "Ventanas Antirruido",
    categoriaNegocio: "Sistemas de carpintería de aluminio y vidrio",
    proveedoresInvolucrados: ["eduhg", "corporacion_corrales", "hpd_glass"],
    insumosYMateriales: [
      { nombre: "Perfiles Serie 20, 25, 35, 3831 y 42", descripcion: "Aluminio anodizado y lacado mate/negro/blanco/madera", proveedor: "corporacion_corrales / eduhg" },
      { nombre: "Vidrios Laminados Acústicos 6.38 / 8.38 / 10.38", descripcion: "Interlámina de PVB con reducción de ruido decibélico", proveedor: "eduhg / hpd_glass" },
      { nombre: "Herrajes y Rodamientos", descripcion: "Garruchas de nylon, guías y burletes EPDM de compresión", proveedor: "eduhg" },
    ],
  },
  {
    slug: "mampara",
    nombreServicio: "Mamparas de Vidrio Templado",
    categoriaNegocio: "Sistemas correderos y batientes de alto vano",
    proveedoresInvolucrados: ["corporacion_corrales", "eduhg", "favitem"],
    insumosYMateriales: [
      { nombre: "Sistema Serie 62 y Nova", descripcion: "Rieles pesados, zócalos de aluminio y felpas F-15", proveedor: "corporacion_corrales" },
      { nombre: "Cristal Templado 8mm y 10mm", descripcion: "Tratamiento térmico 650°C de seguridad contra impacto", proveedor: "hpd_glass / eduhg" },
      { nombre: "Cierres automáticos y jaladores de acero", descripcion: "Cierres con llave y jaladores cilíndricos de 10mm", proveedor: "corporacion_corrales / favitem" },
    ],
  },
  {
    slug: "ducha",
    nombreServicio: "Boxes y Puertas de Ducha",
    categoriaNegocio: "Soluciones sanitarias en vidrio templado y acero",
    proveedoresInvolucrados: ["favitem", "corporacion_corrales"],
    insumosYMateriales: [
      { nombre: "Kits de puerta de ducha en acero inoxidable", descripcion: "Tubos guía, garruchas de acero suspendidas y topes", proveedor: "favitem" },
      { nombre: "Burletes magnéticos y aletas de goteo", descripcion: "Sellos hidrófugos de silicona contra filtración de agua", proveedor: "corporacion_corrales" },
    ],
  },
  {
    slug: "parapeto",
    nombreServicio: "Parapetos y Fachadas Integrales",
    categoriaNegocio: "Cerramientos exteriores y protección perimetral",
    proveedoresInvolucrados: ["favitem", "hpd_glass"],
    insumosYMateriales: [
      { nombre: "Accesorios spider y conectores de acero 304", descripcion: "Fijación puntual sin marcos para fachadas limpias", proveedor: "favitem" },
      { nombre: "Vidrio templado laminado 10.76mm", descripcion: "Cristal de alta seguridad anticaídas según norma RNE", proveedor: "hpd_glass" },
    ],
  },
  {
    slug: "baranda",
    nombreServicio: "Barandas de Vidrio y Acero",
    categoriaNegocio: "Sistemas arquitectónicos de seguridad para escaleras y balcones",
    proveedoresInvolucrados: ["favitem", "corporacion_corrales"],
    insumosYMateriales: [
      { nombre: "Bridas, canoplas y postes de acero inoxidable AISI 304", descripcion: "Anclajes mecánicos de alta resistencia a tracción", proveedor: "favitem / corporacion_corrales" },
      { nombre: "Pasamanos ranurado con junta de jebe", descripcion: "Perfil de acero con canal para encaje directo del vidrio", proveedor: "favitem" },
    ],
  },
  {
    slug: "techo",
    nombreServicio: "Techos de Policarbonato y Vidrio",
    categoriaNegocio: "Cubiertas ligeras y protección solar",
    proveedoresInvolucrados: ["eduhg", "corporacion_corrales"],
    insumosYMateriales: [
      { nombre: "Policarbonato Alveolar Polylite Plus 6mm/8mm", descripcion: "50 micras de protección UV y 10 años de garantía", proveedor: "eduhg" },
      { nombre: "Paneles de Aluminio Compuesto (PAC) Duplopac", descripcion: "Núcleo de alta densidad y lámina de aluminio doble cara", proveedor: "eduhg" },
      { nombre: "Perfiles de unión H y perimetrales U", descripcion: "Aluminio con cinta de sellado antipolvo y silicona neutra", proveedor: "eduhg / corporacion_corrales" },
    ],
  },
  {
    slug: "cortaviento",
    nombreServicio: "Cortavientos y Cerramientos",
    categoriaNegocio: "Aislamiento de terrazas y espacios al aire libre",
    proveedoresInvolucrados: ["corporacion_corrales", "hpd_glass"],
    insumosYMateriales: [
      { nombre: "Estructura de aluminio anodizado reforzado", descripcion: "Postes esquineros y tubulares de soporte vertical", proveedor: "corporacion_corrales" },
      { nombre: "Cristal templado 8mm y 10mm incoloro/gris", descripcion: "Atenuación de rachas de viento en pisos altos", proveedor: "hpd_glass" },
    ],
  },
  {
    slug: "muro-cortina",
    nombreServicio: "Muro Cortina",
    categoriaNegocio: "Fachadas flotantes estructurales para edificios",
    proveedoresInvolucrados: ["hpd_glass", "eduhg"],
    insumosYMateriales: [
      { nombre: "Perfiles montantes y travesaños estructurales", descripcion: "Aleación 6063-T6 para carga de viento y peso propio", proveedor: "hpd_glass" },
      { nombre: "Vidrios reflectivos y Low-E de control solar", descripcion: "Eficiencia energética y reducción del calor radiante", proveedor: "hpd_glass" },
    ],
  },
  {
    slug: "puerta-aluminio",
    nombreServicio: "Puertas de Aluminio",
    categoriaNegocio: "Puertas comerciales y residenciales de alto tránsito",
    proveedoresInvolucrados: ["corporacion_corrales", "eduhg"],
    insumosYMateriales: [
      { nombre: "Perfiles Serie 35 y Serie 45", descripcion: "Marcos batientes con zócalo y contravidrio", proveedor: "corporacion_corrales" },
      { nombre: "Cerraduras de pomo y manija embutida", descripcion: "Cilindros de seguridad para puertas de exterior", proveedor: "corporacion_corrales" },
    ],
  },
  {
    slug: "divisorias-oficina",
    nombreServicio: "Divisorias de Oficina",
    categoriaNegocio: "Tabiquería vidriada corporativa",
    proveedoresInvolucrados: ["corporacion_corrales", "eduhg"],
    insumosYMateriales: [
      { nombre: "Zócalos y perfiles en U de aluminio minimalista", descripcion: "Anclaje a cielo raso y piso técnico sin marcos invasivos", proveedor: "corporacion_corrales" },
      { nombre: "Vidrio laminado acústico o templado con arenado", descripcion: "Privacidad visual y confidencialidad acústica", proveedor: "eduhg" },
    ],
  },
  {
    slug: "espejos",
    nombreServicio: "Espejos a Medida y Decorativos",
    categoriaNegocio: "Vidrio procesado y acabados de interiores",
    proveedoresInvolucrados: ["eduhg", "hpd_glass"],
    insumosYMateriales: [
      { nombre: "Cristal reflectivo de plata de 3mm a 6mm", descripcion: "Corte milimétrico y biselado perimetral brillante", proveedor: "eduhg / hpd_glass" },
      { nombre: "Silicona neutra especial no corrosiva", descripcion: "Adhesión que preserva la capa de nitrato de plata posterior", proveedor: "corporacion_corrales" },
    ],
  },
  {
    slug: "frenos-hidraulicos",
    nombreServicio: "Frenos Hidráulicos y Accesorios",
    categoriaNegocio: "Herrajes mecánicos de piso y calibración",
    proveedoresInvolucrados: ["corporacion_corrales", "favitem"],
    insumosYMateriales: [
      { nombre: "Frenos hidráulicos de piso Sevax y Dorma", descripcion: "Cajas regulables de doble válvula para puertas de hasta 120 kg", proveedor: "corporacion_corrales" },
      { nombre: "Puntos de giro superior e inferior", descripcion: "Herrajes reforzados con zócalo de acero", proveedor: "corporacion_corrales / favitem" },
      { nombre: "Cerrojos de piso y zócalo PIC-615", descripcion: "Traba de piso para cristal templado (SKU 03AN0615B)", proveedor: "corporacion_corrales" },
    ],
  },
  {
    slug: "mantenimiento",
    nombreServicio: "Mantenimiento y Calibración",
    categoriaNegocio: "Servicio técnico preventivo y correctivo",
    proveedoresInvolucrados: ["eduhg", "corporacion_corrales"],
    insumosYMateriales: [
      { nombre: "Garruchas armadas para Serie 20, 25 y 62", descripcion: "Reemplazo de rodamientos atascados o desgastados", proveedor: "eduhg / corporacion_corrales" },
      { nombre: "Burletes de jebe y felpas perimetrales F-10/F-15", descripcion: "Restitución de la hermeticidad térmica y acústica", proveedor: "eduhg" },
      { nombre: "Brazos proyectantes y cierres automáticos", descripcion: "Regulación de hojas vencidas y lubricación especializada", proveedor: "eduhg / corporacion_corrales" },
    ],
  },
];
