import { Metadata } from "next";
import { ProjectsView } from "@/screens/projects";

export const metadata: Metadata = {
  title: "Proyectos de Vidriería y Aluminio | Glass & Aluminum Company S.A.C.",
  description: "Portafolio de proyectos de vidrio y aluminio realizados por Glass & Aluminum Company S.A.C. en La Molina y Lima. Ventanas, mamparas, balcones y cerramientos premium.",
  alternates: {
    canonical: "https://www.gyacompany.com/proyectos",
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
