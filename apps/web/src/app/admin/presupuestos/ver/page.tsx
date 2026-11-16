"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BudgetDetailScreen } from "@/screens/Admin/BudgetDetailScreen";

/**
 * Detalle del presupuesto formal: `/admin/presupuestos/ver?numero=PRES-0001`.
 * Sin número vuelve al listado. El acceso lo protege `AdminRouteGuard` en `app/admin/layout.tsx`.
 */
function DetailContent() {
  const router = useRouter();
  const numero = useSearchParams().get("numero") ?? undefined;

  useEffect(() => {
    if (!numero) router.replace("/admin/presupuestos");
  }, [numero, router]);

  if (!numero) return null;
  return <BudgetDetailScreen key={numero} numero={numero} />;
}

export default function AdminBudgetDetailPage() {
  return (
    <Suspense fallback={null}>
      <DetailContent />
    </Suspense>
  );
}
