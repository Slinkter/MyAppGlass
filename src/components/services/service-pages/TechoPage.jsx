import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listTecho } from "@/data/gallery/techo-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} techoPageData
 * @description Configuration object for the Techos service page.
 * Contains SEO, systems, features, and image data for the `ServicePageLayout`.
 */
const techoPageData = {
    seo: {
        title: "Techos",
        description:
            "Fabricamos e instalamos techos de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Planchas de policarbonato", icon: CheckIcon },
        { label: "Estructura de Aluminio", icon: CheckIcon },
    ],
    imageLists: [listTecho.techo],
};

/**
 * @component TechoPage
 * @description Displays detailed information about the "Techos" (Roofs) service.
 * It provides the specific data to the reusable `ServicePageLayout` and is memoized for performance.
 * @returns {JSX.Element} The rendered layout for the techos service page.
 */
const TechoPage = React.memo(() => {
    return <ServicePageLayout pageData={techoPageData} />;
});

TechoPage.displayName = "TechoPage";

export default TechoPage;