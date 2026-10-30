"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceDetailView } from "@/screens/Services";
import { ServiceDetailSkeleton } from "@/features/services/components/ServiceSkeletons";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

/**
 * Detalle cliente para servicios creados en el admin: con `output: 'export'` solo se
 * prerenderizan los slugs locales (generateStaticParams), así que los nuevos se
 * resuelven aquí en runtime vía `/servicios/ver?slug=<slug>`.
 */
function ServicioVerContent() {
  const slug = useSearchParams().get("slug") ?? undefined;
  return <ServiceDetailView serviceSlug={slug} />;
}

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <Suspense fallback={<ServiceDetailSkeleton />}>
        <ServicioVerContent />
      </Suspense>
    </ComponentErrorBoundary>
  );
}
