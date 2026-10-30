import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { ServicesListView } from "@/screens/Services";
import { getBuildServices } from "@/shared/api/firebase/publicRest";

export const metadata: Metadata = {
  title: "Servicios de Vidriería y Aluminio | GYA Company La Molina",
  description: "Explora nuestro catálogo de ventanas de aluminio, mamparas de baño, duchas, techos de policarbonato y barandas de vidrio templado.",
  alternates: {
    canonical: `${SITE_URL}/servicios`,
  },
  openGraph: {
    title: "Servicios de Vidriería y Aluminio | GYA Company La Molina",
    description: "Explora nuestro catálogo de ventanas de aluminio, mamparas de baño, duchas, techos de policarbonato y barandas de vidrio templado.",
    url: `${SITE_URL}/servicios`,
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default async function Page() {
  // Datos de build (Firestore REST); la lista no usa la galería, se omite del payload.
  const services = (await getBuildServices()).map((service) => ({ ...service, gallery: [] }));
  return (
    <ComponentErrorBoundary>
      <ServicesListView initialData={services} />
    </ComponentErrorBoundary>
  );
}
