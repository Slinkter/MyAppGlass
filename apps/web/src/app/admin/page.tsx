import type { Metadata } from "next";
import { AdminHubScreen } from "@/screens/Admin/AdminHubScreen";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Panel de Administración Maestro | Admin GYA",
  description: "Centro de control y gestión integral de inventario, ventas, reportes y clientes.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <AdminRouteGuard>
      <AdminHubScreen />
    </AdminRouteGuard>
  );
}
