import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { listBalcon } from "../../../assets/webService/s/07.Balcones/db_balcon";
import ServicePageLayout from "../0-ServeItem/ServicePageLayout";

const Balcon = () => {
    const pageData = {
        seo: {
            title: "Balcones de Vidrio ",
            description:
                "Fabricación e instalación de balcones con vidrio templado y accesorios de acero. Diseños modernos y seguros para tu hogar o edificio en La Molina.",
        },
        systems: [{ label: "Sistema Unico", icon: ChevronRightIcon }],
        features: [
            { label: "Vidrio templado de 8mm", icon: CheckIcon },
            { label: "Accesorios de acero cromado", icon: CheckIcon },
            { label: "Arenado con diseño", icon: CheckIcon },
            { label: "tiempc ", icon: CheckIcon },
        ],
        imageLists: [listBalcon.balcon],
    };

    return <ServicePageLayout pageData={pageData} />;
};

export default Balcon;
