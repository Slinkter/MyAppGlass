import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { listTecho } from "../../../data/gallery/techo";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const Techo = () => {
    const pageData = {
        seo: {
            title: "Techos  ",
            description:
                "Instalamos techos de policarbonato con estructuras de aluminio para terrazas, patios y cocheras.",
        },
        systems: [{ label: "Sistema Unico", icon: ChevronRightIcon }],
        features: [
            { label: "Planchas de policarbonato", icon: CheckIcon },
            { label: "Estructura de Aluminio", icon: CheckIcon },
        ],
        imageLists: [listTecho.techo],
    };

    return <ServicePageLayout pageData={pageData} />;
};

export default Techo;
