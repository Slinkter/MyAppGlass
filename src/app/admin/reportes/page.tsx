import type { Metadata } from "next";
import { ReportsScreen } from "@/screens/Admin/ReportsScreen";
import { AdminRouteGuard } from "@/shared/components/guards/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Historial de Ventas y Reportes | Glass & Aluminum Company S.A.C.",
  description: "Histórico de órdenes despachadas, exportación a Excel y comprobantes de almacén.",
};

export default function AdminReportsPage() {
  return (
    <AdminRouteGuard>
      <ReportsScreen />
    </AdminRouteGuard>
  );
}
