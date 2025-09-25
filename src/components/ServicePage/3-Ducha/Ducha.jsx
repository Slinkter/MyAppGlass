import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { listDucha } from "../../../assets/webService/s/03.Ducha/db_ducha";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const Ducha = () => {
    const pageData = {
        seo: {
            title: "Puertas de Ducha",
            description:
                "Instalación de puertas para ducha de vidrio templado en La Molina. Modelos corredizos y batientes con sistema KIT y acrílico. Calidad y seguridad para tu baño.",
        },
        systems: [
            { label: "Sistema KIT", icon: ChevronRightIcon },
            { label: "Sistema Acrilico", icon: ChevronRightIcon },
        ],
        features: [
            { label: "Color : Incoro | Bronce", icon: CheckIcon },
            { label: "Tipo : Templado", icon: CheckIcon },
            { label: "Aluminio : Natural | Negro", icon: CheckIcon },
            { label: "Espesor : 8 mm ", icon: CheckIcon },
        ],
        imageLists: [listDucha.kit, [...listDucha.kit].reverse()], // reversing for variety
    };

    return <ServicePageLayout pageData={pageData} />;
};

export default Ducha;