import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { listCelosias } from "../../../assets/webService/s/13.Celosias/db_celosias";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const Celosias = () => {
    const pageData = {
        seo: {
            title: "Celosías ",
            description:
                "Fabricación e instalación de celosías de aluminio para fachadas y ductos de ventilación. Soluciones funcionales y estéticas para todo tipo de edificios.",
        },
        systems: [{ label: "Sistema Unico", icon: ChevronRightIcon }],
        features: [
            { label: "Estructura de Aluminio", icon: CheckIcon },
            { label: "Ventilación de Espacios", icon: CheckIcon },
        ],
        imageLists: [listCelosias.celocias],
    };

    return <ServicePageLayout pageData={pageData} />;
};

export default Celosias;
