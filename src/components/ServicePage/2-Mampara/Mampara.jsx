import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listMampara } from "../../../assets/webService/s/02.Mampara/db_mampara";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

// 1. Definir todos los datos para esta página de servicio
const mamparaPageData = {
    seo: {
        title: "Mamparas",
        description:
            "Separador de area o espacio, perfectas divisiones de oficina. Sistemas Nova y Serie 25.",
    },
    systems: [
        { label: "Sistema Nova", icon: ChevronRightIcon },
        { label: "Sistema Serie 25", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Color: Incoloro, Bronce", icon: CheckIcon },
        { label: "Tipo: Templado, Crudo", icon: CheckIcon },
        { label: "Aluminio: Natural, Negro", icon: CheckIcon },
        { label: "Diseño: Lámina, Logo", icon: CheckIcon },
        { label: "Espesor: 8mm, 10mm", icon: CheckIcon },
    ],
    imageLists: [listMampara.nova, listMampara.serie],
};

const Mampara = () => {
    return (
        // 2. Renderizar el layout pasándole los datos
        <ServicePageLayout pageData={mamparaPageData} />
    );
};

export default Mampara;
