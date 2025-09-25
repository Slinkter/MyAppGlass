import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { listPuertav } from "../../../assets/webService/s/11.PuertaV/db_puertav";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const Pvidrio = () => {
    const pageData = {
        seo: {
            title: "Puertas de Vidrio ",
            description:
                "Fabricamos puertas de vidrio templado batientes y corredizas para interiores y exteriores. Soluciones elegantes y seguras para oficinas y residencias.",
        },
        systems: [{ label: "Sistema Unico", icon: ChevronRightIcon }],
        features: [
            { label: "Vidrio templado de 8mm", icon: CheckIcon },
            { label: "Chapa bola ", icon: CheckIcon },
            { label: "Accesorios ", icon: CheckIcon },
            { label: "Arenado con diseño", icon: CheckIcon },
        ],
        imageLists: [listPuertav.puertav],
    };

    return <ServicePageLayout pageData={pageData} />;
};

export default Pvidrio;
