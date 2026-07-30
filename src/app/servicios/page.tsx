import { Metadata } from "next";
import { ServicesListView } from "@/screens/services";

export const metadata: Metadata = {
  title: "Servicios de Vidriería y Aluminio | GYA Company La Molina",
  description: "Explora nuestro catálogo de ventanas de aluminio, mamparas de baño, duchas, techos de policarbonato y barandas de vidrio templado.",
  alternates: {
    canonical: "https://www.gyacompany.com/servicios",
  },
  openGraph: {
    title: "Servicios de Vidriería y Aluminio | GYA Company La Molina",
    description: "Explora nuestro catálogo de ventanas de aluminio, mamparas de baño, duchas, techos de policarbonato y barandas de vidrio templado.",
    url: "https://www.gyacompany.com/servicios",
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <ServicesListView />
    </ComponentErrorBoundary>
  );
}
