import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listVentana } from "../../../data/gallery/ventana-data";
import ServicePageLayout from "./ServicePageLayout";

// 1. Definir todos los datos para la página de Ventanas
const ventanaPageData = {
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
};

const Ventana = () => {
    return (
        // 2. Renderizar el layout pasándole los datos de Ventanas
        <ServicePageLayout pageData={ventanaPageData} />
    );
};

export default Ventana;
