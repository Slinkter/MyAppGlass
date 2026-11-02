import { Metadata } from "next";
import { DesignSystemUbicacionScreen } from "@/screens/DesignSystemUbicacion";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export const metadata: Metadata = {
  title: "Prototipos de Ubicación | Aura Design System",
  description: "Propuestas de rediseño de la sección Ubicación: mapa, sede y obras entregadas.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <DesignSystemUbicacionScreen />
    </ComponentErrorBoundary>
  );
}
