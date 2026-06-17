import { Metadata } from "next";
import { ServicesListView } from "@/screens/services";

export const metadata: Metadata = {
  title: "Nuestros Servicios | GYA Glass & Aluminum",
  description: "Servicios especializados de vidriería, instalación de ventanas, mamparas, sistemas Nova y aluminio premium en Lima.",
  alternates: {
    canonical: "https://www.gyacompany.com/servicios",
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
