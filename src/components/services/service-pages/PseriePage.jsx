import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listPuertaSerie } from "../../../data/gallery/puerta-serie-data";
import ServicePageLayout from "./ServicePageLayout";

const pseriePageData = {
    seo: {
        title: "Puertas en Serie",
        description:
            "Fabricamos e instalamos puertas en serie de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
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
    imageLists: [listPuertaSerie.ps01, listPuertaSerie.ps02, listPuertaSerie.ps03],
};

const Pserie = () => {
    return <ServicePageLayout pageData={pseriePageData} />;
};

export default Pserie;