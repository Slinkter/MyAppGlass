import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { listParapeto } from "../../../assets/webService/s/05.Parapeto/db_parapeto";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const Parapeto = () => {
    const pageData = {
        seo: {
            title: "Parapetos ",
            description:
                "Instalación de parapetos de vidrio templado con estructuras de acero o aluminio. Seguridad y diseño moderno para terrazas, balcones y azoteas en La Molina.",
        },
        systems: [{ label: "Sistema Unico", icon: ChevronRightIcon }],
        features: [
            { label: "Vidrio templado de 8mm", icon: CheckIcon },
            { label: "Estructura de Acero", icon: CheckIcon },
            { label: "Estructura de Aluminio", icon: CheckIcon },
            { label: "Accesorios ", icon: CheckIcon },
        ],
        imageLists: [listParapeto.parapeto],
    };

    return <ServicePageLayout pageData={pageData} />;
};

export default Parapeto;
