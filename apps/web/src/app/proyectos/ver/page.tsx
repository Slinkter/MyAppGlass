"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectDetailView } from "@/screens/Projects";
import { ProjectDetailSkeleton } from "@/features/projects/components/ProjectSkeletons";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

/**
 * Detalle cliente para proyectos creados en el admin: con `output: 'export'` solo se
 * prerenderizan los ids locales (generateStaticParams), así que los nuevos se
 * resuelven aquí en runtime vía `/proyectos/ver?id=<id>`.
 * Si se visita sin id, redirige limpiamente a la sección de proyectos en la home.
 */
function ProyectoVerContent() {
  const router = useRouter();
  const id = useSearchParams().get("id") ?? undefined;

  useEffect(() => {
    if (!id) {
      router.replace("/#proyectos");
    }
  }, [id, router]);

  if (!id) return null;
  return <ProjectDetailView projectId={id} />;
}

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProyectoVerContent />
      </Suspense>
    </ComponentErrorBoundary>
  );
}
