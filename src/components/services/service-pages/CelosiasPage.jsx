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
    imageLists: [listCelosias.celosias01, listCelosias.celosias02, listCelosias.celosias03],
};

const Celosias = () => {
    return <ServicePageLayout pageData={celosiasPageData} />;
};

export default Celosias;