import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listBalcon } from "@/data/gallery/balcon-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} balconPageData
 * @description Configuration object for the Balcones service page.
 * Contains SEO, systems, features, and image data for the `ServicePageLayout`.
 */
const balconPageData = {
    seo: {
        title: "Balcones",
        description:
            "Fabricamos e instalamos balcones de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Unico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Vidrio templado de 8mm", icon: CheckIcon },
        { label: "Accesorios de acero cromado", icon: CheckIcon },
        { label: "Arenado con diseño", icon: CheckIcon },
        { label: "tiempc", icon: CheckIcon },
    ],
    imageLists: [listBalcon.items],
};

/**
 * @component BalconPage
 * @description Displays detailed information about the "Balcones" (Balconies) service.
 * It provides the specific data to the reusable `ServicePageLayout` and is memoized for performance.
 * @returns {JSX.Element} The rendered layout for the balcones service page.
 */
const BalconPage = React.memo(() => {
    return <ServicePageLayout pageData={balconPageData} />;
});

BalconPage.displayName = "BalconPage";

export default BalconPage;