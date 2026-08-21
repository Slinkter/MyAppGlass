import type { Metadata } from "next";
import { SimuladorAIScreen } from "@/screens/SimuladorAI/SimuladorAIScreen";

export const metadata: Metadata = {
  title: "Simulador de Espacios con IA | Glass & Aluminum Company S.A.C.",
  description:
    "Sube una foto de tu living o terraza y visualiza con Inteligencia Artificial cómo quedará tu mampara, ventana o puerta de ducha antes de comprar.",
};

export default function SimuladorAIPage() {
  return <SimuladorAIScreen />;
}
