import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listDucha } from "@/data/gallery/ducha-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} duchaPageData
 * @description Configuration object for the Duchas service page.
 * Contains SEO, systems, features, and image data for the `ServicePageLayout`.
 */
const duchaPageData = {
    seo: {
        title: "Duchas",
        description:
            "Fabricamos e instalamos duchas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema KIT", icon: ChevronRightIcon },
        { label: "Sistema Acrilico", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Color: Incoro | Bronce", icon: CheckIcon },
        { label: "Tipo: Templado", icon: CheckIcon },
        { label: "Aluminio: Natural | Negro", icon: CheckIcon },
        { label: "Espesor: 8 mm", icon: CheckIcon },
    ],
    imageLists: [listDucha.kit],
};

/**
 * @component DuchaPage
 * @description Displays detailed information about the "Duchas" (Showers) service.
 * It provides the specific data to the reusable `ServicePageLayout` and is memoized for performance.
 * @returns {JSX.Element} The rendered layout for the duchas service page.
 */
const DuchaPage = React.memo(() => {
    return <ServicePageLayout pageData={duchaPageData} />;
});

DuchaPage.displayName = "DuchaPage";

export default DuchaPage;
