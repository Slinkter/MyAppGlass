import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listParapeto } from "../../../data/gallery/parapeto";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const parapetoPageData = {
    seo: {
        title: "Parapetos",
        description:
            "Fabricamos e instalamos parapetos de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
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
    imageLists: [listParapeto.parapeto01, listParapeto.parapeto02, listParapeto.parapeto03],
};

const Parapeto = () => {
    return <ServicePageLayout pageData={parapetoPageData} />;
};

export default Parapeto;