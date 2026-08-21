import type { Metadata } from "next";
import { InventoryDashboardScreen } from "@/screens/Admin/InventoryDashboardScreen";
import { AdminRouteGuard } from "@/shared/components/guards/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Gestión de Inventario | Glass & Aluminum Company S.A.C.",
  description: "Panel de administración y control de existencias en tiempo real de vidrios, perfiles y accesorios.",
};

export default function AdminInventoryPage() {
  return (
    <AdminRouteGuard>
      <InventoryDashboardScreen />
    </AdminRouteGuard>
  );
}
