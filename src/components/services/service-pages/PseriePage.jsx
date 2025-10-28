import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listPuertas } from "@/data/gallery/puerta-serie-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} pseriePageData
 * @description Configuration object for the Puertas en Serie service page.
 * Contains SEO, systems, features, and image data for the `ServicePageLayout`.
 */
const pseriePageData = {
    seo: {
        title: "Puertas en Serie",
        description:
            "Fabricamos e instalamos puertas en serie de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Estructura de Aluminio", icon: CheckIcon },
        { label: "Chapa bola de Aluminio", icon: CheckIcon },
        { label: "Plancha Arenado", icon: CheckIcon },
    ],
    imageLists: [listPuertas.puertas],
};

/**
 * @component PseriePage
 * @description Displays detailed information about the "Puertas en Serie" (Serialized Doors) service.
 * It provides the specific data to the reusable `ServicePageLayout` and is memoized for performance.
 * @returns {JSX.Element} The rendered layout for the Puertas en Serie service page.
 */
const PseriePage = React.memo(() => {
    return <ServicePageLayout pageData={pseriePageData} />;
});

PseriePage.displayName = "PseriePage";

export default PseriePage;