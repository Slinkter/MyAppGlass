import { Metadata } from "next";
import { HomeView } from "@/screens/Home";
import { buildPageMetadata } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { getBuildProjects, getBuildServices } from "@/shared/api/firebase/publicRest";
import { PageTransition } from "@/shared/components/motion/PageTransition";

export const metadata: Metadata = buildPageMetadata({
  title: "Vidriería en La Molina | Ventanas de aluminio y mamparas",
  description:
    "Vidriería y carpintería en La Molina: ventanas de aluminio, mamparas, boxes y puertas de vidrio, puertas en serie, parapetos, techos, espejos, muro cortina, celosías, vitrinas, frenos hidráulicos y mantenimiento.",
  path: "/",
  useAbsoluteTitle: true,
  keywords: [
    "vidriería la molina",
    "Glass & Aluminum Company S.A.C.",
    "GYA Company",
    "ventanas de aluminio la molina",
    "mamparas de vidrio templado",
    "aluminio la molina",
  ],
});

export default async function Page() {
  const [rawServices, rawProjects] = await Promise.all([getBuildServices(), getBuildProjects()]);
  const services = rawServices.map((service) => ({ ...service, gallery: [] }));
  const projects = rawProjects.map((project) => ({ ...project, gallery: [] }));

  return (
    <PageTransition>
      <ComponentErrorBoundary>
        <HomeView initialServices={services} initialProjects={projects} />
      </ComponentErrorBoundary>
    </PageTransition>
  );
}
