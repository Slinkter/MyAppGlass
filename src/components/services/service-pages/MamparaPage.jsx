import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listMampara } from "@/data/gallery/mampara-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} mamparaPageData
 * @description Configuration object for the Mamparas service page.
 * Contains SEO, systems, features, and image data for the `ServicePageLayout`.
 */
const mamparaPageData = {
    seo: {
        title: "Mamparas",
        description:
            "Fabricamos e instalamos mamparas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Nova", icon: ChevronRightIcon },
        { label: "Sistema Serie 25", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Color: Incoloro, Bronce", icon: CheckIcon },
        { label: "Tipo: Templado, Crudo", icon: CheckIcon },
        { label: "Aluminio: Natural, Negro", icon: CheckIcon },
        { label: "Espesor: 6mm", icon: CheckIcon },
    ],
    imageLists: [listMampara.nova, listMampara.serie],
};

/**
 * @component MamparaPage
 * @description Displays detailed information about the "Mamparas" (Screens) service.
 * It provides the specific data to the reusable `ServicePageLayout` and is memoized for performance.
 * @returns {JSX.Element} The rendered layout for the mamparas service page.
 */
const MamparaPage = React.memo(() => {
    return <ServicePageLayout pageData={mamparaPageData} />;
});

MamparaPage.displayName = "MamparaPage";

export default MamparaPage;