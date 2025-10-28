import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listTecho } from "../../../data/gallery/techo";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const techoPageData = {
    seo: {
        title: "Techos",
        description:
            "Fabricamos e instalamos techos de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
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
    imageLists: [listTecho.techo01, listTecho.techo02, listTecho.techo03],
};

const Techo = () => {
    return <ServicePageLayout pageData={techoPageData} />;
};

export default Techo;