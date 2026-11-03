import type { Metadata } from "next";
import { ReportsScreen } from "@/screens/Admin/ReportsScreen";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Historial de Ventas y Reportes",
  description: "Histórico de órdenes despachadas, exportación a Excel y comprobantes de almacén.",
  robots: { index: false, follow: false },
};

export default function AdminReportsPage() {
  return (
    <AdminRouteGuard>
      <ReportsScreen />
    </AdminRouteGuard>
  );
}
