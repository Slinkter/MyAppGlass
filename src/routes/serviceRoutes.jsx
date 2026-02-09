import ServicePageContainer from "@features/services/components/ServicePageContainer";

export const serviceRoutes = [
    { path: ":serviceSlug", element: <ServicePageContainer /> },
];
