import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listDucha } from "../../../data/gallery/ducha-data";
import ServicePageLayout from "./ServicePageLayout";

const duchaPageData = {
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
};

const Ducha = () => {
    return <ServicePageLayout pageData={duchaPageData} />;
};

export default Ducha;
