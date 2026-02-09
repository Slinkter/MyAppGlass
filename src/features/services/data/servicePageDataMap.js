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
        systems: [
            { label: "Sistema Nova", icon: ChevronRightIcon },
            { label: "Sistema Serie 25", icon: ChevronRightIcon },
            { label: "Sistema Serie 31", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Color: Incoloro, Bronce", icon: CheckIcon },
            { label: "Tipo: Templado, Crudo", icon: CheckIcon },
            { label: "Aluminio: Natural, Negro", icon: CheckIcon },
            { label: "Espesor: 6mm", icon: CheckIcon },
        ],
        imageLists: [listVentana.nova, listVentana.serie25, listVentana.serie31],
    },
    balcones: {
        seo: {
            title: "Balcones",
            description:
                "Fabricamos e instalamos balcones de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
        },
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