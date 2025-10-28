import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listParapeto } from "@/data/gallery/parapeto-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} parapetoPageData
 * @description Configuration object for the Parapetos service page.
 * Contains SEO, systems, features, and image data for the `ServicePageLayout`.
 */
const parapetoPageData = {
    seo: {
        title: "Parapetos",
        description:
            "Fabricamos e instalamos parapetos de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Vidrio templado de 8mm", icon: CheckIcon },
        { label: "Estructura de Acero", icon: CheckIcon },
        { label: "Estructura de Aluminio", icon: CheckIcon },
        { label: "Accesorios", icon: CheckIcon },
    ],
    imageLists: [listParapeto.parapeto],
};

/**
 * @component ParapetoPage
 * @description Displays detailed information about the "Parapetos" (Parapets) service.
 * It provides the specific data to the reusable `ServicePageLayout` and is memoized for performance.
 * @returns {JSX.Element} The rendered layout for the parapetos service page.
 */
const ParapetoPage = React.memo(() => {
    return <ServicePageLayout pageData={parapetoPageData} />;
});

ParapetoPage.displayName = "ParapetoPage";

export default ParapetoPage;