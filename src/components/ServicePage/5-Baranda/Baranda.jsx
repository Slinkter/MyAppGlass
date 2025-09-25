import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { listBaranda } from "../../../assets/webService/s/06.Baranda/db_baranda";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const Baranda = () => {
    const pageData = {
        seo: {
            title: "Barandas de Acero ",
            description:
                "Diseño e instalación de barandas de acero y vidrio templado para escaleras, balcones y terrazas. Estilo moderno y máxima seguridad para tu proyecto.",
        },
        systems: [{ label: "Sistema Unico", icon: ChevronRightIcon }],
        features: [
            { label: "Material : Acero ", icon: CheckIcon },
            { label: "Color : Incoro | Bronce", icon: CheckIcon },
            { label: "Arenado : Lamina", icon: CheckIcon },
            { label: "Tipo : Templado ", icon: CheckIcon },
            { label: "Espesor : 8 mm ", icon: CheckIcon },
        ],
        imageLists: [listBaranda.baranda],
    };

    return <ServicePageLayout pageData={pageData} />;
};

export default Baranda;
