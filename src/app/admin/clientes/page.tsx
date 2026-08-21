import type { Metadata } from "next";
import { ClientManagementScreen } from "@/screens/Admin/ClientManagementScreen";
import { AdminRouteGuard } from "@/shared/components/guards/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Gestión de Clientes y Empresas | Glass & Aluminum Company S.A.C.",
  description: "Directorio y administración de clientes, constructoras e instaladores en Firestore.",
};

export default function AdminClientsPage() {
  return (
    <AdminRouteGuard>
      <ClientManagementScreen />
    </AdminRouteGuard>
  );
}
