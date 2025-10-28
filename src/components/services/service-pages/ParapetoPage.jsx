import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listParapeto } from "../../../data/gallery/parapeto-data";
import ServicePageLayout from "./ServicePageLayout";

const parapetoPageData = {
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
};

const Parapeto = () => {
    return <ServicePageLayout pageData={parapetoPageData} />;
};

export default Parapeto;