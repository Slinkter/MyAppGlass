import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { ProjectDetailView } from "@/screens/Projects";
import { getBuildProjects } from "@/shared/api/firebase/publicRest";
import { BUILD_SENTINEL } from "@/shared/config/build-sentinel";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

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
  const { projectId } = await params;
  const projects = await getBuildProjects();
  const project = projects.find((p) => String(p.id) === projectId);
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

  const title = `${project.title} | Proyecto GYA`;
  const description = `Detalles del proyecto ${project.title} ubicado en ${project.location}.${
    project.completedAt ? ` Realizado en ${project.completedAt}.` : ""
  }`;
  const url = `${SITE_URL}/proyectos/${projectId}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Glass & Aluminum Company S.A.C.",
      locale: "es_PE",
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { projectId, project } = await resolveProjectData(params);

  return (
    <ComponentErrorBoundary>
      <ProjectDetailView projectId={projectId} initialData={project} />
    </ComponentErrorBoundary>
  );
}
