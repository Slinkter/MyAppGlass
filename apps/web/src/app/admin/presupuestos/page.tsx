import { AdminPresupuestosScreen } from "@/screens/Admin/AdminPresupuestosScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presupuestos Solicitados | Panel de Administración",
  robots: { index: false, follow: false },
};

export default function AdminPresupuestosPage() {
  return <AdminPresupuestosScreen />;
}
