import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listBaranda } from "@/data/gallery/baranda-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} barandaPageData
 * @description Configuration object for the Barandas service page.
 * Contains SEO, systems, features, and image data for the `ServicePageLayout`.
 */
const barandaPageData = {
    seo: {
        title: "Barandas",
        description:
            "Fabricamos e instalamos barandas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Material : Acero", icon: CheckIcon },
        { label: "Color : Incoro | Bronce", icon: CheckIcon },
        { label: "Arenado : Lamina", icon: CheckIcon },
        { label: "Tipo : Templado", icon: CheckIcon },
        { label: "Espesor : 8 mm", icon: CheckIcon },
    ],
    imageLists: [listBaranda.baranda],
};

/**
 * @component BarandaPage
 * @description Displays detailed information about the "Barandas" (Railings) service.
 * It provides the specific data to the reusable `ServicePageLayout` and is memoized for performance.
 * @returns {JSX.Element} The rendered layout for the barandas service page.
 */
const BarandaPage = React.memo(() => {
    return <ServicePageLayout pageData={barandaPageData} />;
});

BarandaPage.displayName = "BarandaPage";

export default BarandaPage;