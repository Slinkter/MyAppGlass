import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

// Import all gallery data
import { listVentana } from "@/data/gallery/ventana-data";
import { listBalcon } from "@/data/gallery/balcon-data";
import { listBaranda } from "@/data/gallery/baranda-data";
import { listCelosias } from "@/data/gallery/celosias-data";
import { listDucha } from "@/data/gallery/ducha-data";
import { listMampara } from "@/data/gallery/mampara-data";
import { listParapeto } from "@/data/gallery/parapeto-data";
import { listPuertas } from "@/data/gallery/puerta-serie-data";
import { listPuertav } from "@/data/gallery/puerta-vidrio-data";
import { listTecho } from "@/data/gallery/techo-data";

/**
 * @typedef {object} ServicePageData
 * @property {object} seo - SEO metadata (title, description)
 * @property {object} about - About section (title, description)
 * @property {Array<object>} benefits - List of benefits
 * @property {Array<object>} systems - List of systems with label and icon
 * @property {Array<object>} features - List of features with label and icon
 * @property {Array<Array<object>>} imageLists - Array of image lists for the gallery
 */

/**
 * @constant {Record<string, ServicePageData>} servicePageDataMap
 * @description A map containing all the configuration data for service pages,
 * keyed by their respective slugs.
 */
export const servicePageDataMap = {
    ventana: {
        seo: {
            title: "Ventanas",
            description:
                "Fabricamos e instalamos ventanas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Ventanas",
            description:
                "Nuestras ventanas de aluminio ofrecen la combinación perfecta entre estética moderna y funcionalidad. Fabricadas con perfiles de alta calidad, garantizamos aislamiento térmico y acústico superior. Ideales para vivienda urbana, departamentos y oficinas.",
        },
        benefits: [
            { label: "Durabilidad garantizada", icon: CheckIcon },
            { label: "Instalación profesional", icon: CheckIcon },
            { label: "Variedad de acabados", icon: CheckIcon },
            { label: "Asesoría técnica personalizada", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema Nova", icon: ChevronRightIcon },
            { label: "Sistema Serie 25", icon: ChevronRightIcon },
            { label: "Sistema Serie 31", icon: ChevronRightIcon },
            { label: "Sistema Serie 62", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Color: Incoloro, Bronce", icon: CheckIcon },
            { label: "Tipo: Templado, Crudo", icon: CheckIcon },
            { label: "Aluminio: Natural, Negro", icon: CheckIcon },
            { label: "Espesor: 6mm", icon: CheckIcon },
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
            title: "Balcones",
            description:
                "Fabricamos e instalamos balcones de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Balcones",
            description:
                "Transforma tu balcony en un espacio seguro y elegante con nuestros paneles de vidrio templado. Ideales para departamentos y casas con vista, ofreciendo protección sin sacrificar la panorámica.",
        },
        benefits: [
            { label: "Seguridad con vidrio templado", icon: CheckIcon },
            { label: "Diseño panorámico", icon: CheckIcon },
            { label: "Fácil mantenimiento", icon: CheckIcon },
            { label: "Resistencia a condiciones climáticas", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Vidrio templado de 8mm", icon: CheckIcon },
            { label: "Accesorios de acero cromado", icon: CheckIcon },
            { label: "Arenado con diseño", icon: CheckIcon },
            { label: "tiempc", icon: CheckIcon },
        ],
        imageLists: [listBalcon.items],
    },
    baranda: {
        seo: {
            title: "Barandas",
            description:
                "Fabricamos e instalamos barandas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Barandas",
            description:
                "Nuestras barandas de vidrio templado combinan seguridad y diseño Minimalista. Perfectas para escaleras, terrazas y balcones, aportando luminosidad y sensación de espacio a cualquier ambiente.",
        },
        benefits: [
            { label: "Máxima seguridad", icon: CheckIcon },
            { label: "Diseño Minimalista y moderno", icon: CheckIcon },
            { label: "Acabados en acero cromado", icon: CheckIcon },
            { label: "Instación certificada", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Material : Acero", icon: CheckIcon },
            { label: "Color : Incoro | Bronce", icon: CheckIcon },
            { label: "Arenado : Lamina", icon: CheckIcon },
            { label: "Tipo : Templado", icon: CheckIcon },
            { label: "Espesor : 8 mm", icon: CheckIcon },
        ],
        imageLists: [listBaranda.baranda],
    },
    celosias: {
        seo: {
            title: "Celosías",
            description:
                "Fabricamos e instalamos celosías de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Celosías",
            description:
                "Las celosías de aluminio son la solución ideal para controlar la entrada de luz y mantener la privacidad. Perfectas para fachadas, balcones y espacios comerciales.",
        },
        benefits: [
            { label: "Ventilación natural", icon: CheckIcon },
            { label: "Control de luz solar", icon: CheckIcon },
            { label: "Diseño arquitectónico", icon: CheckIcon },
            { label: "Bajo mantenimiento", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Estructura de Aluminio", icon: CheckIcon },
            { label: "Ventilación de Espacios", icon: CheckIcon },
        ],
        imageLists: [listCelosias.celocias],
    },
    ducha: {
        seo: {
            title: "Duchas",
            description:
                "Fabricamos e instalamos duchas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Duchas",
            description:
                "Boxes de ducha con diseño moderno y funcional. Trabajamos con vidrio templado de seguridad para garantizar tu tranquilidad. Sistemas KIT y acrílico disponibles.",
        },
        benefits: [
            { label: "Vidrio templado de seguridad", icon: CheckIcon },
            { label: "Fácil limpieza", icon: CheckIcon },
            { label: "Diseño personalizado", icon: CheckIcon },
            { label: "Asesoría en diseño", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema KIT", icon: ChevronRightIcon },
            { label: "Sistema Acrilico", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Color: Incoro | Bronce", icon: CheckIcon },
            { label: "Tipo: Templado", icon: CheckIcon },
            { label: "Aluminio: Natural | Negro", icon: CheckIcon },
            { label: "Espesor: 8 mm", icon: CheckIcon },
        ],
        imageLists: [listDucha.kit],
    },
    mampara: {
        seo: {
            title: "Mamparas",
            description:
                "Fabricamos e instalamos mamparas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Mamparas",
            description:
                "Mamparas de baño que combinan funcionalidad y elegancia. Sistemas Nova y Serie 25 con perfiles de aluminio en acabado natural o negro. El toque moderno para tu baño.",
        },
        benefits: [
            { label: "Estanqueidad garantizada", icon: CheckIcon },
            { label: "Acabados premium", icon: CheckIcon },
            { label: "Vidrio templado seguro", icon: CheckIcon },
            { label: "Diseño a medida", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema Nova", icon: ChevronRightIcon },
            { label: "Sistema Serie 25", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Color: Incoloro, Bronce", icon: CheckIcon },
            { label: "Tipo: Templado, Crudo", icon: CheckIcon },
            { label: "Aluminio: Natural, Negro", icon: CheckIcon },
            { label: "Espesor: 6mm", icon: CheckIcon },
        ],
        imageLists: [listMampara.nova, listMampara.serie],
    },
    parapeto: {
        seo: {
            title: "Parapetos",
            description:
                "Fabricamos e instalamos parapetos de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Parapetos",
            description:
                "Parapetos de vidrio templado con estructura de acero o aluminio. Solución perfecta para azoteas, terrazas y pisos altos, ofreciendo seguridad y views sin obstáculos.",
        },
        benefits: [
            { label: "Seguridad estructural", icon: CheckIcon },
            { label: "Visibilidad panorámica", icon: CheckIcon },
            { label: "Resistencia al clima", icon: CheckIcon },
            { label: "Instalación profesional", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Vidrio templado de 8mm", icon: CheckIcon },
            { label: "Estructura de Acero", icon: CheckIcon },
            { label: "Estructura de Aluminio", icon: CheckIcon },
            { label: "Accesorios", icon: CheckIcon },
        ],
        imageLists: [listParapeto.parapeto],
    },
    pserie: {
        seo: {
            title: "Puertas en Serie",
            description:
                "Fabricamos e instalamos puertas en serie de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Puertas en Serie",
            description:
                "Puertas enrollables de aluminio con plancha arenada. Ideales para comercio y vivienda, ofrecen seguridad, durabilidad y un diseño discreto que se integra a cualquier fachada.",
        },
        benefits: [
            { label: "Seguridad reforzada", icon: CheckIcon },
            { label: "Durabilidad extrema", icon: CheckIcon },
            { label: "Diseño discreto", icon: CheckIcon },
            { label: "Mantenimiento mínimo", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Estructura de Aluminio", icon: CheckIcon },
            { label: "Chapa bola de Aluminio", icon: CheckIcon },
            { label: "Plancha Arenado", icon: CheckIcon },
        ],
        imageLists: [listPuertas.puertas],
    },
    pvidrio: {
        seo: {
            title: "Puertas de Vidrio",
            description:
                "Fabricamos e instalamos puertas de vidrio de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Puertas de Vidrio",
            description:
                "Puertas de vidrio templado con chapa bola y bisagras de alta calidad. Solución elegante para ingresos principales, oficinas y espacios comerciales que buscan luminosidad.",
        },
        benefits: [
            { label: "Diseño moderno y elegante", icon: CheckIcon },
            { label: "Máxima luminosidad", icon: CheckIcon },
            { label: "Seguridad con vidrio templado", icon: CheckIcon },
            { label: "Accesorios de calidad", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Vidrio templado de 8mm", icon: CheckIcon },
            { label: "Chapa bola", icon: CheckIcon },
            { label: "Accesorios", icon: CheckIcon },
            { label: "Arenado con diseño", icon: CheckIcon },
        ],
        imageLists: [listPuertav.puertav],
    },
    techo: {
        seo: {
            title: "Techos",
            description:
                "Fabricamos e instalamos techos de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
        about: {
            title: "Acerca de Techos",
            description:
                "Techos de policarbonato con estructura de aluminio. Solución práctica para terrazas, cocheras y áreas sociales. Permite aprovechar la luz natural mientras te protege del clima.",
        },
        benefits: [
            { label: "Iluminación natural", icon: CheckIcon },
            { label: "Protección UV", icon: CheckIcon },
            { label: "Resistencia estructural", icon: CheckIcon },
            { label: "Instalación rápida", icon: CheckIcon },
        ],
        systems: [
            { label: "Sistema Unico", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Planchas de policarbonato", icon: CheckIcon },
            { label: "Estructura de Aluminio", icon: CheckIcon },
        ],
        imageLists: [listTecho.techo],
    },
};