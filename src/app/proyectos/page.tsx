import { Metadata } from "next";
import { ProjectsView } from "@/screens/projects";

export const metadata: Metadata = {
  title: "Proyectos de Vidriería y Aluminio | Glass & Aluminum Company S.A.C.",
  description: "Portafolio de proyectos de vidrio y aluminio realizados por Glass & Aluminum Company S.A.C. en La Molina y Lima. Ventanas, mamparas, balcones y cerramientos premium.",
  alternates: {
    canonical: "https://www.gyacompany.com/proyectos",
  },
  openGraph: {
    title: "Proyectos de Vidriería y Aluminio | Glass & Aluminum Company S.A.C.",
    description: "Portafolio de proyectos de vidrio y aluminio en La Molina y Lima. Ventanas, mamparas, balcones y cerramientos premium.",
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
