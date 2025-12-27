import ServicePageContainer from "@/components/services/service-pages/ServicePageContainer";

export const serviceRoutes = [
    { path: ":serviceSlug", element: <ServicePageContainer /> },
];
