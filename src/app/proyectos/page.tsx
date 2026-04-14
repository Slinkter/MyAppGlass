import { Metadata } from "next";
import ProjectsList from "@features/projects/components/ProjectsList";

/**
 * @metadata
 * @description SEO Configuration for the Projects page.
 */
export const metadata: Metadata = {
  title: "Portafolio de Proyectos | GYA Glass & Aluminum",
  description: "Explora nuestra galería de obras terminadas: edificios residenciales, oficinas y proyectos de vidriería de alto impacto en La Molina y todo Lima.",
  openGraph: {
    title: "Nuestros Proyectos | GYA Glass & Aluminum",
    description: "Instalaciones de primer nivel en cristal y aluminio.",
    type: "website",
  },
};

/**
 * @page Proyectos
 * @description Galería de proyectos y obras entregadas. 
 * Rendereado como Server Component para SEO óptimo y delegando interactividad a ProjectsList.
 */
export default function ProjectsPage() {
  return <ProjectsList />;
}
