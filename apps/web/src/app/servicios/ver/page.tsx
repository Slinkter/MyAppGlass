"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ServiceDetailView } from "@/screens/Services";
import { ServiceDetailSkeleton } from "@/features/services/components/ServiceSkeletons";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

/**
 * Detalle cliente para servicios creados en el admin: con `output: 'export'` solo se
 * prerenderizan los slugs locales (generateStaticParams), así que los nuevos se
 * resuelven aquí en runtime vía `/servicios/ver?slug=<slug>`.
 * Si se visita sin slug, redirige limpiamente a la sección de servicios en la home.
 */
function ServicioVerContent() {
  const router = useRouter();
  const slug = useSearchParams().get("slug") ?? undefined;

  useEffect(() => {
    if (!slug) {
      router.replace("/#servicios");
    }
  }, [slug, router]);

  if (!slug) return null;
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
