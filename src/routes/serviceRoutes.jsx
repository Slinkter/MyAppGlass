import { ServicePageContainer } from "@features/services";

export const serviceRoutes = [
    { path: ":serviceSlug", element: <ServicePageContainer /> },
];
