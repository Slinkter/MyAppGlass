import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listCelosias } from "../../../data/gallery/celosias-data";
import ServicePageLayout from "./ServicePageLayout";

const celosiasPageData = {
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
};

const Celosias = () => {
    return <ServicePageLayout pageData={celosiasPageData} />;
};

export default Celosias;