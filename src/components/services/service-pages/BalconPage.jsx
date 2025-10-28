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
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Vidrio templado de 8mm", icon: CheckIcon },
        { label: "Accesorios de acero cromado", icon: CheckIcon },
        { label: "Arenado con diseño", icon: CheckIcon },
        { label: "tiempc", icon: CheckIcon },
    ],
    imageLists: [listBalcon.items],
};

const Balcon = () => {
    return <ServicePageLayout pageData={balconPageData} />;
};

export default Balcon;