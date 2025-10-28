import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listPuertav } from "@/data/gallery/puerta-vidrio-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} pvidrioPageData
 * @description Configuration object for the Puertas de Vidrio service page.
 * Contains SEO, systems, features, and image data for the `ServicePageLayout`.
 */
const pvidrioPageData = {
    seo: {
        title: "Puertas de Vidrio",
        description:
            "Fabricamos e instalamos puertas de vidrio de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Vidrio templado de 8mm", icon: CheckIcon },
        { label: "Chapa bola", icon: CheckIcon },
        { label: "Accesorios", icon: CheckIcon },
        { label: "Arenado con diseño", icon: CheckIcon },
    ],
    imageLists: [listPuertav.puertav],
};

/**
 * @component PvidrioPage
 * @description Displays detailed information about the "Puertas de Vidrio" (Glass Doors) service.
 * It provides the specific data to the reusable `ServicePageLayout` and is memoized for performance.
 * @returns {JSX.Element} The rendered layout for the Puertas de Vidrio service page.
 */
const PvidrioPage = React.memo(() => {
    return <ServicePageLayout pageData={pvidrioPageData} />;
});

PvidrioPage.displayName = "PvidrioPage";

export default PvidrioPage;