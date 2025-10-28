import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listMampara } from "../../../data/gallery/mampara";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const mamparaPageData = {
    seo: {
        title: "Mamparas",
        description:
            "Fabricamos e instalamos mamparas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
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
    imageLists: [listMampara.m_serie01, listMampara.m_serie02, listMampara.m_serie03],
};

const Mampara = () => {
    return <ServicePageLayout pageData={mamparaPageData} />;
};

export default Mampara;