import { Metadata } from "next";
import { ProjectsView } from "@/screens/projects";

export const metadata: Metadata = {
  title: "Proyectos y Obras Entregadas | GYA Glass & Aluminum",
  description: "Conoce nuestros proyectos ejecutados de vidriería y aluminio en residencias, edificios y locales comerciales de Lima.",
  alternates: {
    canonical: "https://www.gyacompany.com/proyectos",
  },
  openGraph: {
    title: "Proyectos y Obras Entregadas | GYA Glass & Aluminum",
    description: "Conoce nuestros proyectos ejecutados de vidriería y aluminio en residencias, edificios y locales comerciales de Lima.",
    url: "https://www.gyacompany.com/proyectos",
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <ProjectsView />
    </ComponentErrorBoundary>
  );
}
