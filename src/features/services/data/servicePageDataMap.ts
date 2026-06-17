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
 * keyed by their respective slugs.
 */
export const servicePageDataMap: Record<string, ServicePageData> = {
    ventana: {
        seo: {
            title: "Ventanas Antirruido La Molina",
            description:
                "Fabricación e instalación de ventanas de aluminio antirruido en La Molina. Sistemas Nova, Serie 25 y 31 con perfiles herméticos para aislamiento acústico. ¡Cotiza tu ventana hoy!",
        },
        about: {
            title: "Acerca de Ventanas",
            description:
                "Nuestras ventanas de aluminio ofrecen la combinación perfecta entre estética moderna y funcionalidad. Fabricadas con perfiles de alta calidad, garantizamos aislamiento térmico y acústico superior. Ideales para vivienda urbana, departamentos y oficinas.",
        },
        benefits: [
            { label: "Durabilidad garantizada", icon: Check },
            { label: "Instalación profesional", icon: Check },
            { label: "Variedad de acabados", icon: Check },
            { label: "Asesoría técnica personalizada", icon: Check },
        ],
        systems: [
            { label: "Sistema Nova", icon: ChevronRight },
            { label: "Sistema Serie 25", icon: ChevronRight },
            { label: "Sistema Serie 31", icon: ChevronRight },
            { label: "Sistema Serie 62", icon: ChevronRight },
        ],
        features: [
            { label: "Color: Incoloro, Bronce", icon: Check },
            { label: "Tipo: Templado, Crudo", icon: Check },
            { label: "Aluminio: Natural, Negro", icon: Check },
            { label: "Espesor: 6mm", icon: Check },
        ],
        imageLists: [
            listVentana.nova,
            listVentana.serie25,
            listVentana.serie31,
            [],
        ],
    },
    balcones: {
        seo: {
            title: "Balcones de Vidrio La Molina",
            description:
                "Balcones de vidrio templado con arenado decorativo en La Molina. Transforma tu terraza en un espacio seguro y elegante sin perder la vista panorámica.",
        },
        about: {
            title: "Acerca de Balcones",
            description:
                "Transforma tu balcony en un espacio seguro y elegante con nuestros paneles de vidrio templado. Ideales para departamentos y casas con vista, ofreciendo protección sin sacrificar la panorámica.",
        },
        benefits: [
            { label: "Seguridad con vidrio templado", icon: Check },
            { label: "Diseño panorámico", icon: Check },
            { label: "Fácil mantenimiento", icon: Check },
            { label: "Resistencia a condiciones climáticas", icon: Check },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRight },
        ],
        features: [
            { label: "Vidrio templado de 8mm", icon: Check },
            { label: "Accesorios de acero cromado", icon: Check },
            { label: "Arenado con diseño", icon: Check },
            { label: "tiempc", icon: Check },
        ],
        imageLists: [listBalcon.items],
    },
    baranda: {
        seo: {
            title: "Barandas de Vidrio Templado La Molina",
            description:
                "Barandas de vidrio templado con accesorios de acero cromado. Diseño minimalista para escaleras, terrazas y balcones en Lima. Seguridad y estilo en cada proyecto.",
        },
        about: {
            title: "Acerca de Barandas",
            description:
                "Nuestras barandas de vidrio templado combinan seguridad y diseño Minimalista. Perfectas para escaleras, terrazas y balcones, aportando luminosidad y sensación de espacio a cualquier ambiente.",
        },
        benefits: [
            { label: "Máxima seguridad", icon: Check },
            { label: "Diseño Minimalista y moderno", icon: Check },
            { label: "Acabados en acero cromado", icon: Check },
            { label: "Instación certificada", icon: Check },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRight },
        ],
        features: [
            { label: "Material : Acero", icon: Check },
            { label: "Color : Incoro | Bronce", icon: Check },
            { label: "Arenado : Lamina", icon: Check },
            { label: "Tipo : Templado", icon: Check },
            { label: "Espesor : 8 mm", icon: Check },
        ],
        imageLists: [listBaranda.baranda],
    },
    celosias: {
        seo: {
            title: "Celosías de Aluminio La Molina",
            description:
                "Celosías de aluminio para fachadas, balcones y ventanas en La Molina. Control solar, ventilación natural y privacidad con diseño arquitectónico moderno.",
        },
        about: {
            title: "Acerca de Celosías",
            description:
                "Las celosías de aluminio son la solución ideal para controlar la entrada de luz y mantener la privacidad. Perfectas para fachadas, balcones y espacios comerciales.",
        },
        benefits: [
            { label: "Ventilación natural", icon: Check },
            { label: "Control de luz solar", icon: Check },
            { label: "Diseño arquitectónico", icon: Check },
            { label: "Bajo mantenimiento", icon: Check },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRight },
        ],
        features: [
            { label: "Estructura de Aluminio", icon: Check },
            { label: "Ventilación de Espacios", icon: Check },
        ],
        imageLists: [listCelosias.celocias],
    },
    ducha: {
        seo: {
            title: "Boxes de Ducha La Molina | Cabinas Vidrio Templado",
            description:
                "Boxes de ducha de vidrio templado 8mm con sistemas KIT y acrílico. Seguridad, diseño moderno y fácil limpieza. ¡Cotiza tu ducha a medida en La Molina!",
        },
        about: {
            title: "Acerca de Duchas",
            description:
                "Boxes de ducha con diseño moderno y funcional. Trabajamos con vidrio templado de seguridad para garantizar tu tranquilidad. Sistemas KIT y acrílico disponibles.",
        },
        benefits: [
            { label: "Vidrio templado de seguridad", icon: Check },
            { label: "Fácil limpieza", icon: Check },
            { label: "Diseño personalizado", icon: Check },
            { label: "Asesoría en diseño", icon: Check },
        ],
        systems: [
            { label: "Sistema KIT", icon: ChevronRight },
            { label: "Sistema Acrilico", icon: ChevronRight },
        ],
        features: [
            { label: "Color: Incoro | Bronce", icon: Check },
            { label: "Tipo: Templado", icon: Check },
            { label: "Aluminio: Natural | Negro", icon: Check },
            { label: "Espesor: 8 mm", icon: Check },
        ],
        imageLists: [listDucha.kit],
    },
    mampara: {
        seo: {
            title: "Mamparas de Baño La Molina",
            description:
                "Mamparas de baño en vidrio templado con perfiles de aluminio natural o negro. Sistemas Nova y Serie 25. Diseño a medida con instalación profesional en Lima.",
        },
        about: {
            title: "Acerca de Mamparas",
            description:
                "Mamparas de baño que combinan funcionaliad y elegancia. Sistemas Nova y Serie 25 con perfiles de aluminio en acabado natural o negro. El toque moderno para tu baño.",
        },
        benefits: [
            { label: "Estanqueidad garantizada", icon: Check },
            { label: "Acabados premium", icon: Check },
            { label: "Vidrio templado seguro", icon: Check },
            { label: "Diseño a medida", icon: Check },
        ],
        systems: [
            { label: "Sistema Nova", icon: ChevronRight },
            { label: "Sistema Serie 25", icon: ChevronRight },
        ],
        features: [
            { label: "Color: Incoloro, Bronce", icon: Check },
            { label: "Tipo: Templado, Crudo", icon: Check },
            { label: "Aluminio: Natural, Negro", icon: Check },
            { label: "Espesor: 6mm", icon: Check },
        ],
        imageLists: [listMampara.nova, listMampara.serie],
    },
    parapeto: {
        seo: {
            title: "Parapetos de Vidrio La Molina",
            description:
                "Parapetos de vidrio templado con estructura de acero o aluminio en La Molina. Seguridad y vista panorámica sin obstáculos para terrazas y azoteas. Instalación certificada.",
        },
        about: {
            title: "Acerca de Parapetos",
            description:
                "Parapetos de vidrio templado con estructura de acero o aluminio. Solución perfecta para azoteas, terrazas y pisos altos, ofreciendo seguridad y views sin obstáculos.",
        },
        benefits: [
            { label: "Seguridad estructural", icon: Check },
            { label: "Visibilidad panorámica", icon: Check },
            { label: "Resistencia al clima", icon: Check },
            { label: "Instalación profesional", icon: Check },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRight },
        ],
        features: [
            { label: "Vidrio templado de 8mm", icon: Check },
            { label: "Estructura de Acero", icon: Check },
            { label: "Estructura de Aluminio", icon: Check },
            { label: "Accesorios", icon: Check },
        ],
        imageLists: [listParapeto.parapeto],
    },
    pserie: {
        seo: {
            title: "Puertas Enrollables de Aluminio La Molina",
            description:
                "Puertas enrollables de aluminio con plancha arenada. Seguridad reforzada y diseño discreto para comercios y viviendas en La Molina. Resistencia y durabilidad.",
        },
        about: {
            title: "Acerca de Puertas en Serie",
            description:
                "Puertas enrollables de aluminio con plancha arenada. Ideales para comercio y vivienda, ofrecen seguridad, durabilidad y un diseño discreto que se integra a cualquier fachada.",
        },
        benefits: [
            { label: "Seguridad reforzada", icon: Check },
            { label: "Durabilidad extrema", icon: Check },
            { label: "Diseño discreto", icon: Check },
            { label: "Mantenimiento mínimo", icon: Check },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRight },
        ],
        features: [
            { label: "Estructura de Aluminio", icon: Check },
            { label: "Chapa bola de Aluminio", icon: Check },
            { label: "Plancha Arenado", icon: Check },
        ],
        imageLists: [listPuertas.puertas],
    },
    pvidrio: {
        seo: {
            title: "Puertas de Vidrio Templado La Molina",
            description:
                "Puertas de vidrio templado con chapa bola y bisagras de calidad en La Molina. Elegancia y luminosidad para ingresos principales, oficinas y locales comerciales.",
        },
        about: {
            title: "Acerca de Puertas de Vidrio",
            description:
                "Puertas de vidrio templado con chapa bola y bisagras de alta calidad. Solución elegante para ingresos principales, oficinas y espacios comerciales que buscan luminosidad.",
        },
        benefits: [
            { label: "Diseño moderno y elegante", icon: Check },
            { label: "Máxima luminosidad", icon: Check },
            { label: "Seguridad con vidrio templado", icon: Check },
            { label: "Accesorios de calidad", icon: Check },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRight },
        ],
        features: [
            { label: "Vidrio templado de 8mm", icon: Check },
            { label: "Chapa bola", icon: Check },
            { label: "Accesorios", icon: Check },
            { label: "Arenado con diseño", icon: Check },
        ],
        imageLists: [listPuertav.puertav],
    },
    techo: {
        seo: {
            title: "Techos de Policarbonato La Molina",
            description:
                "Techos de policarbonato con estructura de aluminio para terrazas, cocheras y patios en La Molina. Protección UV, luz natural e impermeabilidad garantizada.",
        },
        about: {
            title: "Acerca de Techos",
            description:
                "Techos de policarbonato con estructura de aluminio. Solución práctica para terrazas, cocheras y áreas sociales. Permite aprovechar la luz natural mientras te protege del clima.",
        },
        benefits: [
            { label: "Iluminación natural", icon: Check },
            { label: "Protección UV", icon: Check },
            { label: "Resistencia estructural", icon: Check },
            { label: "Instalación rápida", icon: Check },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRight },
        ],
        features: [
            { label: "Planchas de policarbonato", icon: Check },
            { label: "Estructura de Aluminio", icon: Check },
        ],
        imageLists: [listTecho.techo],
    },
};
