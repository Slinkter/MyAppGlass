import type { Metadata } from "next";
import { SalesOrderScreen } from "@/screens/Admin/SalesOrderScreen";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Emisión de Ventas y Despacho",
  description: "Registro de órdenes de salida y descuento atómico de inventario en almacén.",
  robots: { index: false, follow: false },
};

export default function AdminSalesPage() {
  return (
    <AdminRouteGuard>
      <SalesOrderScreen />
    </AdminRouteGuard>
  );
}
