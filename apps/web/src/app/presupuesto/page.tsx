import type { Metadata } from "next";
import { PresupuestoWizardScreen } from "@/screens/Presupuesto/PresupuestoWizardScreen";

export const metadata: Metadata = {
  title: "Cotizador de Presupuestos Online | Glass & Aluminum Company S.A.C.",
  description:
    "Calcula tu presupuesto formal al instante para mamparas, ventanas antirruido, techos y puertas de ducha con hoja membretada oficial en La Molina, Lima.",
};

export default function PresupuestoPage() {
  return <PresupuestoWizardScreen />;
}
