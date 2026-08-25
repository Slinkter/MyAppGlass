import { ChevronRight, Check, LucideIcon } from "lucide-react";

// Import all gallery data
import { listVentana } from "@/features/services/data/gallery/ventana-data";
import { listBalcon } from "@/features/services/data/gallery/balcon-data";
import { listBaranda } from "@/features/services/data/gallery/baranda-data";
import { listCelosias } from "@/features/services/data/gallery/celosias-data";
import { listDucha } from "@/features/services/data/gallery/ducha-data";
import { listMampara } from "@/features/services/data/gallery/mampara-data";
import { listParapeto } from "@/features/services/data/gallery/parapeto-data";
import { listPuertas } from "@/features/services/data/gallery/puerta-serie-data";
import { listPuertav } from "@/features/services/data/gallery/puerta-vidrio-data";
import { listTecho } from "@/features/services/data/gallery/techo-data";
import { GalleryItem } from "@/shared/types/gallery";

/**
 * @interface ServicePageData
 * @property {object} seo - SEO metadata (title, description)
 * @property {object} about - About section (title, description)
 * @property {Array<{label: string, icon: LucideIcon}>} benefits - List of benefits
 * @property {Array<{label: string, icon: LucideIcon}>} systems - List of systems with label and icon
 * @property {Array<{label: string, icon: LucideIcon}>} features - List of features with label and icon
 * @property {Array<GalleryItem[]>} imageLists - Array of image lists for the gallery
 */
export interface ServicePageData {
    seo: {
        title: string;
        description: string;
    };
    about: {
        title: string;
        description: string;
    };
    benefits: { label: string; icon: LucideIcon }[];
    systems: { label: string; icon: LucideIcon }[];
    features: { label: string; icon: LucideIcon }[];
    imageLists: GalleryItem[][];
}

/**
 * @constant {Record<string, ServicePageData>} servicePageDataMap
 * @description A map containing all the configuration data for service pages,
 * keyed by their respective slugs with high-converting SEO metadata for La Molina and Lima.
 */
export const servicePageDataMap: Record<string, ServicePageData> = {
    ventana: {
        seo: {
            title: "Ventanas de Aluminio Antirruido en La Molina | GYA Company",
            description:
                "Ventanas de aluminio antirruido en La Molina y Lima. Sistemas Nova, Serie 25, Serie 35 y Serie 62 con perfiles herméticos. ¡Cotiza hoy!",
        },
        about: {
            title: "Ventanas de Aluminio y Acústicas Antirruido",
            description:
                "Nuestras ventanas de aluminio herméticas con cristales acústicos ofrecen el máximo aislamiento sonoro y confort térmico. Diseñadas a medida para departamentos, residencias y oficinas con perfiles herméticos de alta resistencia.",
        },
        benefits: [
            { label: "Aislamiento acústico y térmico superior", icon: Check },
            { label: "Hermeticidad certificada contra polvo, viento y lluvia", icon: Check },
            { label: "Perfiles de aluminio anodizado y electropintado", icon: Check },
            { label: "Asesoría técnica e instalación profesional garantizada", icon: Check },
        ],
        systems: [
            { label: "Nova", icon: ChevronRight },
            { label: "Serie 25", icon: ChevronRight },
            { label: "Serie 35", icon: ChevronRight },
            { label: "Serie 62", icon: ChevronRight },
        ],
        features: [
            { label: "Cristal: Templado 6mm / 8mm / Insulado Acústico (DVH)", icon: Check },
            { label: "Tonalidades: Incoloro Transparente, Bronce Cálido, Gris Humo y Satinado", icon: Check },
            { label: "Acabado Aluminio: Blanco Electropintado, Negro Mate, Natural y Champagne", icon: Check },
            { label: "Cierres: Cerrojos multipunto de seguridad y caracol de alta precisión", icon: Check },
        ],
        imageLists: [
            listVentana.nova,
            listVentana.serie25,
            listVentana.serie35,
            listVentana.serie62,
        ],
    },
    balcones: {
        seo: {
            title: "Balcones de Vidrio Templado en La Molina | GYA Company",
            description:
                "Diseño e instalación de balcones de vidrio templado de seguridad y acero inoxidable en La Molina y Lima. Vistas panorámicas y elegancia. ¡Cotiza gratis!",
        },
        about: {
            title: "Balcones Panorámicos en Vidrio Templado",
            description:
                "Transforma tu balcón en un espacio seguro, luminoso y de alto impacto arquitectónico. Paneles de vidrio templado de 8mm y 10mm resistentes al viento y la intemperie.",
        },
        benefits: [
            { label: "Máxima seguridad con vidrio templado", icon: Check },
            { label: "Vista panorámica sin perfiles invasivos", icon: Check },
            { label: "Accesorios de acero inoxidable calidad 304", icon: Check },
            { label: "Resistencia certificada ante impactos", icon: Check },
        ],
        systems: [{ label: "Sistema Panorámico", icon: ChevronRight }],
        features: [
            { label: "Vidrio templado de 8mm / 10mm", icon: Check },
            { label: "Accesorios de acero inoxidable", icon: Check },
            { label: "Arenado decorativo y lámina de seguridad", icon: Check },
        ],
        imageLists: [listBalcon.items],
    },
    baranda: {
        seo: {
            title: "Barandas de Vidrio Templado y Acero | GYA La Molina",
            description:
                "Fabricación de barandas de vidrio templado con conectores de acero para escaleras, terrazas y balcones en Lima. Seguridad certificada. ¡Solicita presupuesto!",
        },
        about: {
            title: "Barandas de Vidrio Templado y Acero Inoxidable",
            description:
                "Nuestras barandas de cristal templado combinan alta ingeniería de seguridad con estética minimalista, aportando amplitud visual a residencias y proyectos comerciales.",
        },
        benefits: [
            { label: "Seguridad para escaleras y terrazas", icon: Check },
            { label: "Diseño minimalista y moderno", icon: Check },
            { label: "Fijación con botones y pasamanos de acero", icon: Check },
            { label: "Instalación profesional certificada", icon: Check },
        ],
        systems: [{ label: "Sistema Baranda Minimalista", icon: ChevronRight }],
        features: [
            { label: "Material: Acero inoxidable AISI 304 / 316", icon: Check },
            { label: "Cristal: Templado incoloro o laminado", icon: Check },
            { label: "Espesor: 8 mm / 10 mm / 12 mm", icon: Check },
            { label: "Anclaje químico de alta resistencia", icon: Check },
        ],
        imageLists: [listBaranda.baranda],
    },
    celosias: {
        seo: {
            title: "Celosías de Aluminio para Fachadas | GYA La Molina",
            description:
                "Instalación de celosías de aluminio para control solar, ventilación y privacidad en fachadas y ventanas en La Molina y Lima. ¡Cotiza tu proyecto a medida!",
        },
        about: {
            title: "Celosías Arquitectónicas de Aluminio",
            description:
                "Las celosías de aluminio son la solución bioclimática ideal para optimizar el paso de luz natural, reducir la carga térmica y garantizar ventilación cruzada continua.",
        },
        benefits: [
            { label: "Ventilación natural y flujo de aire", icon: Check },
            { label: "Control de radiación solar y sombra", icon: Check },
            { label: "Privacidad sin oscurecer ambientes", icon: Check },
            { label: "Bajo mantenimiento y durabilidad extrema", icon: Check },
        ],
        systems: [{ label: "Sistema Celosía Fija y Móvil", icon: ChevronRight }],
        features: [
            { label: "Estructura de Aluminio extruido de alta resistencia", icon: Check },
            { label: "Acabados: Negro mate, Blanco, Madera, Natural", icon: Check },
            { label: "Diseño a medida para fachadas y ductos", icon: Check },
        ],
        imageLists: [listCelosias.celocias],
    },
    ducha: {
        seo: {
            title: "Puertas y Boxes de Ducha en Vidrio Templado | GYA Lima",
            description:
                "Boxes y puertas de ducha en vidrio templado de 8mm con accesorios de acero inoxidable y sistemas corredizos. Fabricación a medida en La Molina. ¡Cotiza ya!",
        },
        about: {
            title: "Boxes y Puertas de Ducha en Cristal Templado",
            description:
                "Moderniza tu baño con sistemas de ducha elegantes y herméticos. Utilizamos vidrio templado de seguridad de 8mm y rodamientos de acero inoxidable de suave deslizamiento.",
        },
        benefits: [
            { label: "Vidrio templado de seguridad con sellos anti-fuga", icon: Check },
            { label: "Accesorios y tiradores de acero inoxidable", icon: Check },
            { label: "Sistemas corredizos y batientes a medida", icon: Check },
            { label: "Fácil limpieza y tratamiento anticalcáreo", icon: Check },
        ],
        systems: [
            { label: "Sistema Corredizo KIT Acero", icon: ChevronRight },
            { label: "Sistema Batiente Minimalista", icon: ChevronRight },
        ],
        features: [
            { label: "Cristal: Incoloro, Bronce, Satinado, Arenado", icon: Check },
            { label: "Perfilería: Acero inoxidable / Aluminio negro", icon: Check },
            { label: "Espesor: Cristal templado 8 mm", icon: Check },
            { label: "Sellos magnéticos herméticos", icon: Check },
        ],
        imageLists: [listDucha.kit],
    },
    mampara: {
        seo: {
            title: "Mamparas de Vidrio Templado en La Molina | GYA Company",
            description:
                "Fabricación e instalación de mamparas de vidrio templado y aluminio hermético en La Molina y Lima. Diseños a medida para terrazas y salas. ¡Cotiza hoy!",
        },
        about: {
            title: "Mamparas de Vidrio Templado para Terrazas y Divisiones",
            description:
                "Mamparas de alta gama para integración de salas, terrazas y jardines. Sistemas Nova y Serie 25 con perfilería de aluminio reforzada y cristales templados de 8mm y 10mm.",
        },
        benefits: [
            { label: "Hermeticidad superior contra viento y ruido", icon: Check },
            { label: "Deslizamiento ultrasuave con rodamientos reforzados", icon: Check },
            { label: "Cristales templados con certificación de seguridad", icon: Check },
            { label: "Diseño personalizado según vano arquitectónico", icon: Check },
        ],
        systems: [
            { label: "Sistema Nova Corredizo", icon: ChevronRight },
            { label: "Sistema Serie 25 Reforzado", icon: ChevronRight },
        ],
        features: [
            { label: "Tonalidades: Incoloro, Bronce, Antelio, Gris", icon: Check },
            { label: "Perfilería: Aluminio natural, Negro mate, Champagne", icon: Check },
            { label: "Espesor: Templado 8 mm y 10 mm", icon: Check },
            { label: "Cerraduras de gancho y multipunto", icon: Check },
        ],
        imageLists: [listMampara.nova, listMampara.serie],
    },
    parapeto: {
        seo: {
            title: "Parapetos de Vidrio Templado en Azoteas | GYA La Molina",
            description:
                "Parapetos de vidrio templado y aluminio para terrazas, azoteas y pisos altos en La Molina y Lima. Seguridad y vista panorámica. ¡Presupuesto sin costo!",
        },
        about: {
            title: "Parapetos y Cerramientos de Seguridad en Cristal",
            description:
                "Protege tus azoteas y terrazas elevadas sin perder la vista de la ciudad. Diseñados para soportar presiones de viento y brindar la máxima protección a tu familia.",
        },
        benefits: [
            { label: "Resistencia estructural certificada ante vientos", icon: Check },
            { label: "Visibilidad panorámica limpia y luminosa", icon: Check },
            { label: "Fijaciones de alta resistencia anticorrosiva", icon: Check },
            { label: "Instalación en altura por técnicos calificados", icon: Check },
        ],
        systems: [{ label: "Sistema Parapeto Panorámico", icon: ChevronRight }],
        features: [
            { label: "Cristal: Templado 8 mm / 10 mm / Laminado", icon: Check },
            { label: "Estructura: Aluminio reforzado o postes de acero", icon: Check },
            { label: "Accesorios de fijación empotrada o con botones", icon: Check },
        ],
        imageLists: [listParapeto.parapeto],
    },
    pserie: {
        seo: {
            title: "Puertas de Aluminio Residenciales y Comerciales | GYA",
            description:
                "Fabricación de puertas de aluminio serie y plancha arenada para viviendas y locales en La Molina. Resistencia, seguridad y durabilidad. ¡Cotiza hoy!",
        },
        about: {
            title: "Puertas de Aluminio y Plancha Arenada",
            description:
                "Puertas de aluminio diseñadas para brindar máxima durabilidad sin deformación ni corrosión. Ideales para accesos peatonales, comercios, cocinas y lavanderías.",
        },
        benefits: [
            { label: "Inmunes a la humedad y el salitre", icon: Check },
            { label: "Estructura liviana y de gran solidez", icon: Check },
            { label: "Cerraduras de seguridad y chapa bola", icon: Check },
            { label: "Bajo mantenimiento durante toda su vida útil", icon: Check },
        ],
        systems: [{ label: "Sistema Puerta Serie", icon: ChevronRight }],
        features: [
            { label: "Estructura de Aluminio extruido pesado", icon: Check },
            { label: "Chapa y manijas de alto tránsito", icon: Check },
            { label: "Plancha de aluminio con diseño arenado", icon: Check },
        ],
        imageLists: [listPuertas.puertas],
    },
    pvidrio: {
        seo: {
            title: "Puertas de Vidrio Templado para Oficinas y Tiendas | GYA",
            description:
                "Puertas de vidrio templado batientes y corredizas con frenos hidráulicos en La Molina y Lima. Diseño sofisticado para empresas y hogares. ¡Cotiza ahora!",
        },
        about: {
            title: "Puertas de Cristal Templado Batientes y Pivotantes",
            description:
                "Elegancia, transparencia y luminosidad para ingresos residenciales, oficinas corporativas y tiendas comerciales. Incluye freno hidráulico de piso y cerradura central.",
        },
        benefits: [
            { label: "Apertura suave y controlada con freno hidráulico", icon: Check },
            { label: "Cristal templado de seguridad de 10mm", icon: Check },
            { label: "Tiradores y accesorios en acero inoxidable", icon: Check },
            { label: "Arenado corporativo o decorativo personalizado", icon: Check },
        ],
        systems: [{ label: "Sistema Pivotante con Freno de Piso", icon: ChevronRight }],
        features: [
            { label: "Cristal templado de 8mm / 10mm", icon: Check },
            { label: "Chapa central y chapa al piso", icon: Check },
            { label: "Jaladores tubulares de acero inoxidable", icon: Check },
            { label: "Logotipos arenados sobre vidrio", icon: Check },
        ],
        imageLists: [listPuertav.puertav],
    },
    techo: {
        seo: {
            title: "Techos de Policarbonato y Cristal para Terrazas | GYA",
            description:
                "Especialistas en techos de policarbonato y cristal templado con estructura de aluminio en La Molina y Lima. Protección UV e iluminación natural. ¡Cotiza!",
        },
        about: {
            title: "Techos de Policarbonato y Coberturas de Cristal",
            description:
                "Aprovecha tus terrazas, patios y cocheras con techos modernos que protegen del calor y la lluvia, manteniendo una óptima iluminación natural todo el año.",
        },
        benefits: [
            { label: "Filtro con protección UV 99%", icon: Check },
            { label: "Estructura de aluminio anticorrosiva libre de óxido", icon: Check },
            { label: "Sellado hermético con silicona estructural", icon: Check },
            { label: "Canaletas ocultas para evacuación de lluvias", icon: Check },
        ],
        systems: [{ label: "Sistema Cobertura Aluminio", icon: ChevronRight }],
        features: [
            { label: "Planchas de Policarbonato alveolar / macizo", icon: Check },
            { label: "Cristal laminado / templado de seguridad", icon: Check },
            { label: "Perfiles estructurales de aluminio pesado", icon: Check },
        ],
        imageLists: [listTecho.techo],
    },
};
