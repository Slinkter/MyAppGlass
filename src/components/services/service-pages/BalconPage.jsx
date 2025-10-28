import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listBalcon } from "../../../data/gallery/balcon-data";
import ServicePageLayout from "./ServicePageLayout";

const balconPageData = {
    seo: {
        title: "Balcones",
        description:
            "Fabricamos e instalamos balcones de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
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
    imageLists: [listBalcon.balcon01, listBalcon.balcon02, listBalcon.balcon03],
};

const Balcon = () => {
    return <ServicePageLayout pageData={balconPageData} />;
};

export default Balcon;