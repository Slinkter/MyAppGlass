import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { listPuertas } from "../../../data/gallery/puertaSerie";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const Pserie = () => {
    const pageData = {
        seo: {
            title: "Puertas de Aluminio ",
            description: "Fabricamos puertas de aluminio en serie .",
        },
        systems: [{ label: "Sistema Unico", icon: ChevronRightIcon }],
        features: [
            { label: "Estructura de Aluminio ", icon: CheckIcon },
            { label: "Chapa bola de Aluminio", icon: CheckIcon },
            { label: "Plancha Arenado", icon: CheckIcon },
        ],
        imageLists: [listPuertas.puertas],
    };

    return <ServicePageLayout pageData={pageData} />;
};

export default Pserie;
