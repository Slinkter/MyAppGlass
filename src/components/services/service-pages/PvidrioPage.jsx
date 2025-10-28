import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listPuertaVidrio } from "../../../data/gallery/puerta-vidrio-data";
import ServicePageLayout from "./ServicePageLayout";

const pvidrioPageData = {
    seo: {
        title: "Puertas de Vidrio",
        description:
            "Fabricamos e instalamos puertas de vidrio de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
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
    imageLists: [listPuertaVidrio.pv01, listPuertaVidrio.pv02, listPuertaVidrio.pv03],
};

const Pvidrio = () => {
    return <ServicePageLayout pageData={pvidrioPageData} />;
};

export default Pvidrio;