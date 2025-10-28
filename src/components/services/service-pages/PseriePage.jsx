import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listPuertas } from "../../../data/gallery/puerta-serie-data";
import ServicePageLayout from "./ServicePageLayout";

const pseriePageData = {
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
};

const Pserie = () => {
    return <ServicePageLayout pageData={pseriePageData} />;
};

export default Pserie;