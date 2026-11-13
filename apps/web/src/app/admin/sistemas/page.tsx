import type { Metadata } from "next";
import { SystemsScreen } from "@/screens/Admin/SystemsScreen";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Sistemas",
  description: "Sistemas por servicio cargados desde los catálogos de proveedores.",
  robots: { index: false, follow: false },
};

export default function AdminSystemsPage() {
  return (
    <AdminRouteGuard>
      <SystemsScreen />
    </AdminRouteGuard>
  );
}
