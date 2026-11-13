import type { Metadata } from "next";
import { PurchaseOrderScreen } from "@/screens/Admin/PurchaseOrderScreen";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Pedidos de Compra a Proveedores",
  description: "Armado de pedidos de compra con el catálogo de proveedores, separados por proveedor.",
  robots: { index: false, follow: false },
};

export default function AdminPurchaseOrdersPage() {
  return (
    <AdminRouteGuard>
      <PurchaseOrderScreen />
    </AdminRouteGuard>
  );
}
