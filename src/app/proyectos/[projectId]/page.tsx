import { Metadata } from "next";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import { projects } from "@/data/proyectos";

type Props = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const project = projects.find(p => p.id.toString() === projectId);
  
  if (!project) {
    return {
      title: "Proyecto no encontrado | GYA Glass & Aluminum",
    };
  }

  return {
    title: `${project.residencial} | Proyecto GYA`,
    description: `Detalles del proyecto ${project.residencial} ubicado en ${project.address}. Realizado en el año ${project.year}.`,
    alternates: {
      canonical: `https://www.gyacompany.com/proyectos/${projectId}`,
    },
  };
}

export default function Page() {
  return <ProjectDetailPage />;
}
