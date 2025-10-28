import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listPuertav } from "@/data/gallery/puerta-vidrio-data";
import ServicePageLayout from "./ServicePageLayout";

const pvidrioPageData = {
    seo: {
        title: "Puertas de Vidrio",
        description:
            "Fabricamos e instalamos puertas de vidrio de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Vidrio templado de 8mm", icon: CheckIcon },
        { label: "Chapa bola", icon: CheckIcon },
        { label: "Accesorios", icon: CheckIcon },
        { label: "Arenado con diseño", icon: CheckIcon },
    ],
    imageLists: [listPuertav.puertav],
};

const Pvidrio = () => {
    return <ServicePageLayout pageData={pvidrioPageData} />;
};

export default Pvidrio;