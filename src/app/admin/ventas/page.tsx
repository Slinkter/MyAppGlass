import type { Metadata } from "next";
import { SalesOrderScreen } from "@/screens/Admin/SalesOrderScreen";
import { AdminRouteGuard } from "@/shared/components/guards/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Emisión de Ventas y Despacho | Glass & Aluminum Company S.A.C.",
  description: "Registro de órdenes de salida y descuento atómico de inventario en almacén.",
};

export default function AdminSalesPage() {
  return (
    <AdminRouteGuard>
      <SalesOrderScreen />
    </AdminRouteGuard>
  );
}
