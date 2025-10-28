import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listBaranda } from "../../../data/gallery/baranda-data";
import ServicePageLayout from "./ServicePageLayout";

const barandaPageData = {
    seo: {
        title: "Barandas",
        description:
            "Fabricamos e instalamos barandas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
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
    imageLists: [listBaranda.baranda01, listBaranda.baranda02, listBaranda.baranda03],
};

const Baranda = () => {
    return <ServicePageLayout pageData={barandaPageData} />;
};

export default Baranda;