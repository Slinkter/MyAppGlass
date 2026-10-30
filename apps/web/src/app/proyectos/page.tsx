import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { ProjectsView } from "@/screens/Projects";
import { getBuildProjects } from "@/shared/api/firebase/publicRest";

export const metadata: Metadata = {
  title: "Proyectos y Obras Entregadas | GYA Glass & Aluminum",
  description: "Conoce nuestros proyectos ejecutados de vidriería y aluminio en residencias, edificios y locales comerciales de Lima.",
  alternates: {
    canonical: `${SITE_URL}/proyectos`,
  },
  openGraph: {
    title: "Proyectos y Obras Entregadas | GYA Glass & Aluminum",
    description: "Conoce nuestros proyectos ejecutados de vidriería y aluminio en residencias, edificios y locales comerciales de Lima.",
    url: `${SITE_URL}/proyectos`,
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default async function Page() {
  // Datos de build (Firestore REST); la lista no usa la galería, se omite del payload.
  const projects = (await getBuildProjects()).map((project) => ({ ...project, gallery: [] }));
  return (
    <ComponentErrorBoundary>
      <ProjectsView initialData={projects} />
    </ComponentErrorBoundary>
  );
}
