import { Metadata } from "next";
import { ProjectsView } from "@/screens/projects";

export const metadata: Metadata = {
  title: "Proyectos de Vidriería y Aluminio | Glass & Aluminum Company S.A.C.",
  description: "Portafolio de proyectos de vidrio y aluminio de GYA Company en La Molina y Lima. Ventanas, mamparas y cerramientos de vidrio premium.",
  alternates: {
    canonical: "https://www.gyacompany.com/proyectos",
  },
  openGraph: {
    title: "Proyectos de Vidriería y Aluminio | Glass & Aluminum Company S.A.C.",
    description: "Portafolio de proyectos de vidrio y aluminio de GYA Company en La Molina y Lima. Ventanas, mamparas y cerramientos de vidrio premium.",
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
