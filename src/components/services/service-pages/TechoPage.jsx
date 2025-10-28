import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listTecho } from "../../../data/gallery/techo-data";
import ServicePageLayout from "./ServicePageLayout";

const techoPageData = {
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
};

const Techo = () => {
    return <ServicePageLayout pageData={techoPageData} />;
};

export default Techo;