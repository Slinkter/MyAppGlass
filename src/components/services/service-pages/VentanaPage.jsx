import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listVentana } from "@/data/gallery/ventana-data";
import ServicePageLayout from "./ServicePageLayout";

/**
 * @constant {object} ventanaPageData
 * @description Configuration object containing all specific data for the Ventanas service page.
 * This data is passed to the ServicePageLayout for rendering.
 * It includes SEO metadata, available systems, features, and image galleries.
 */
const ventanaPageData = {
    seo: {
        title: "Ventanas",
        description:
            "Fabricamos e instalamos ventanas de sistemas Nova, Serie 25 y Serie 31 para proyectos residenciales y comerciales.",
    },
    systems: [
        { label: "Sistema Nova", icon: ChevronRightIcon },
        { label: "Sistema Serie 25", icon: ChevronRightIcon },
        { label: "Sistema Serie 31", icon: ChevronRightIcon },
    ],
    features: [
        { label: "Color: Incoloro, Bronce", icon: CheckIcon },
        { label: "Tipo: Templado, Crudo", icon: CheckIcon },
        { label: "Aluminio: Natural, Negro", icon: CheckIcon },
        { label: "Espesor: 6mm", icon: CheckIcon },
    ],
    imageLists: [listVentana.nova, listVentana.serie25, listVentana.serie31],
};

/**
 * @component VentanaPage
 * @description A page component that displays detailed information about the "Ventanas" (Windows) service.
 * It acts as a container, providing the specific data for this service to the reusable `ServicePageLayout`.
 * The component is memoized with `React.memo` to prevent unnecessary re-renders.
 * @returns {JSX.Element} The rendered layout for the windows service page.
 */
const VentanaPage = React.memo(() => {
    return <ServicePageLayout pageData={ventanaPageData} />;
});

VentanaPage.displayName = "VentanaPage";

export default VentanaPage;

