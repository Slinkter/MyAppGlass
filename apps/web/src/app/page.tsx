import { Metadata } from "next";
import { HomeView } from "@/screens/Home";
import { buildPageMetadata } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { getBuildProjects, getBuildServices } from "@/shared/api/firebase/publicRest";

export const metadata: Metadata = buildPageMetadata({
  title: "Vidriería en La Molina | Ventanas Antirruido y Mamparas",
  description:
    "Especialistas en suministro, ensamblaje e instalación de ventanas antirruido (Sistema Nova, Serie 25, Serie 35, Serie 62), mamparas de vidrio templado, boxes de ducha y estructuras de aluminio en La Molina y Lima.",
  path: "/",
  useAbsoluteTitle: true,
  keywords: [
    "vidriería la molina",
    "Glass & Aluminum Company S.A.C.",
    "GYA Company",
    "ventanas antirruido la molina",
    "mamparas de vidrio templado",
    "aluminio la molina",
  ],
});

export default async function Page() {
  const [rawServices, rawProjects] = await Promise.all([getBuildServices(), getBuildProjects()]);
  const services = rawServices.map((service) => ({ ...service, gallery: [] }));
  const projects = rawProjects.map((project) => ({ ...project, gallery: [] }));

  return (
    <ComponentErrorBoundary>
      <HomeView initialServices={services} initialProjects={projects} />
    </ComponentErrorBoundary>
  );
}
