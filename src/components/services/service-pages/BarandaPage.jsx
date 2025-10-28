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
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Material : Acero", icon: CheckIcon },
        { label: "Color : Incoro | Bronce", icon: CheckIcon },
        { label: "Arenado : Lamina", icon: CheckIcon },
        { label: "Tipo : Templado", icon: CheckIcon },
        { label: "Espesor : 8 mm", icon: CheckIcon },
    ],
    imageLists: [listBaranda.baranda],
};

const Baranda = () => {
    return <ServicePageLayout pageData={barandaPageData} />;
};

export default Baranda;