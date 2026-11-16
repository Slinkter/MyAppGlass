"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BudgetEditorScreen } from "@/screens/Admin/BudgetEditorScreen";

/**
 * Alta y edición del presupuesto formal. Con `output: 'export'` no hay rutas dinámicas para
 * documentos creados después del build, así que el número viaja por query:
 * `/admin/presupuestos/editor` (nuevo) o `/admin/presupuestos/editor?numero=PRES-0001`.
 * El acceso lo protege `AdminRouteGuard` en `app/admin/layout.tsx`.
 */
function EditorContent() {
  const params = useSearchParams();
  const numero = params.get("numero") ?? undefined;
  const clienteId = params.get("clienteId") ?? "";
  // La clave fuerza un formulario limpio si se cambia de presupuesto sin salir de la ruta.
  return <BudgetEditorScreen key={numero ?? "nuevo"} numero={numero} initialClienteId={clienteId} />;
}

export default function AdminBudgetEditorPage() {
  return (
    <Suspense fallback={null}>
      <EditorContent />
    </Suspense>
  );
}
