"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectDetailView } from "@/screens/Projects";
import { ProjectDetailSkeleton } from "@/features/projects/components/ProjectSkeletons";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

/**
 * Detalle cliente para proyectos creados en el admin: con `output: 'export'` solo se
 * prerenderizan los ids locales (generateStaticParams), así que los nuevos se
 * resuelven aquí en runtime vía `/proyectos/ver?id=<id>`.
 */
function ProyectoVerContent() {
  const id = useSearchParams().get("id") ?? undefined;
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
