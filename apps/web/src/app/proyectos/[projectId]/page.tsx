import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { ProjectDetailView } from "@/screens/Projects";
import { getBuildProjects } from "@/shared/api/firebase/publicRest";
import { BUILD_SENTINEL } from "@/shared/config/build-sentinel";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { createLookupMap } from "@/shared/utils/algorithm-utils";
import {
  buildPageMetadata,
  getProjectJsonLd,
  getSectionBreadcrumbJsonLd,
  serializeJsonLd,
} from "@/shared/utils/seo-utils";
import { PageTransition } from "@/shared/components/motion/PageTransition";

/**
 * Los ids salen de Firestore (lectura REST en build). Si la lectura falla o no hay
 * proyectos se devuelve un centinela para que `output: 'export'` no falle.
 */
export async function generateStaticParams() {
  const projects = await getBuildProjects();
  return projects.length > 0
    ? projects.map((project) => ({ projectId: String(project.id) }))
    : [{ projectId: BUILD_SENTINEL }];
}

type Props = {
  params: Promise<{ projectId: string }>;
};

async function resolveProjectData(params: Promise<{ projectId: string }>) {
  const [{ projectId }, projects] = await Promise.all([params, getBuildProjects()]);
  const projectMap = createLookupMap(projects, (p) => String(p.id));
  const project = projectMap.get(projectId);
  return { projectId, project };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId, project } = await resolveProjectData(params);

  if (!project) {
    return {
      title: "Proyecto | GYA Glass & Aluminum",
      robots: { index: false, follow: true },
    };
  }

  const includesLocation = project.title
    .toLowerCase()
    .includes(project.location.trim().toLowerCase());
  const rawTitle =
    project.seoTitle ||
    (includesLocation
      ? `${project.title} — Proyecto Ejecutado`
      : `${project.title} — Proyecto en ${project.location}`);
  const rawDesc =
    project.seoDescription ||
    `${project.description} Obra ejecutada en ${project.location} por Glass & Aluminum Company S.A.C.`;

  return buildPageMetadata({
    title: rawTitle,
    description: rawDesc,
    path: `/proyectos/${projectId}`,
    image: project.coverImage,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { projectId, project } = await resolveProjectData(params);
  const initialProject = project;

  return (
    <PageTransition>
      <ComponentErrorBoundary>
        {initialProject && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: serializeJsonLd(
                  getSectionBreadcrumbJsonLd(
                    { name: "Proyectos", path: "/#proyectos" },
                    { name: initialProject.title, url: `${SITE_URL}/proyectos/${projectId}` }
                  )
                ),
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: serializeJsonLd(
                  getProjectJsonLd(initialProject, `${SITE_URL}/proyectos/${projectId}`)
                ),
              }}
            />
          </>
        )}
        <ProjectDetailView projectId={projectId} initialData={initialProject} />
      </ComponentErrorBoundary>
    </PageTransition>
  );
}
