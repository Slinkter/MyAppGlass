import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listCelosias } from "@/data/gallery/celosias-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} celosiasPageData
 * @description Configuration object for the Celosías service page.
 * Contains SEO, systems, features, and image data for the `ServicePageLayout`.
 */
const celosiasPageData = {
    seo: {
        title: "Celosías",
        description:
            "Fabricamos e instalamos celosías de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Estructura de Aluminio", icon: CheckIcon },
        { label: "Ventilación de Espacios", icon: CheckIcon },
    ],
    imageLists: [listCelosias.celocias],
};

/**
 * @component CelosiasPage
 * @description Displays detailed information about the "Celosías" (Lattices) service.
 * It provides the specific data to the reusable `ServicePageLayout` and is memoized for performance.
 * @returns {JSX.Element} The rendered layout for the Celosías service page.
 */
const CelosiasPage = React.memo(() => {
    return <ServicePageLayout pageData={celosiasPageData} />;
});

CelosiasPage.displayName = "CelosiasPage";

export default CelosiasPage;