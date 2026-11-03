import type { Metadata } from "next";
import { InventoryDashboardScreen } from "@/screens/Admin/InventoryDashboardScreen";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Gestión de Inventario | Admin GYA",
  description: "Panel de administración y control de existencias en tiempo real de vidrios, perfiles y accesorios.",
  robots: { index: false, follow: false },
};

export default function AdminInventoryPage() {
  return (
    <AdminRouteGuard>
      <InventoryDashboardScreen />
    </AdminRouteGuard>
  );
}
