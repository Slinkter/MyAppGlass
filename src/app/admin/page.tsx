import type { Metadata } from "next";
import { AdminHubScreen } from "@/screens/Admin/AdminHubScreen";
import { AdminRouteGuard } from "@/shared/components/guards/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Panel de Administración Maestro | Glass & Aluminum Company S.A.C.",
  description: "Centro de control y gestión integral de inventario, ventas, reportes y clientes.",
};

export default function AdminPage() {
  return (
    <AdminRouteGuard>
      <AdminHubScreen />
    </AdminRouteGuard>
  );
}
