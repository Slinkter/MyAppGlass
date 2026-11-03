import type { Metadata } from "next";
import { ClientManagementScreen } from "@/screens/Admin/ClientManagementScreen";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Gestión de Clientes y Empresas",
  description: "Directorio y administración de clientes, constructoras e instaladores en Firestore.",
  robots: { index: false, follow: false },
};

export default function AdminClientsPage() {
  return (
    <AdminRouteGuard>
      <ClientManagementScreen />
    </AdminRouteGuard>
  );
}
