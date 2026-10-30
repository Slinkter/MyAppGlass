import { Metadata } from "next";
import { DesignSystemScreen } from "@/screens/DesignSystem";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export const metadata: Metadata = {
  title: "Aura Design System Showcase | GYA Company",
  description: "Catálogo interactivo de componentes, tokens y variantes del Aura Design System.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <DesignSystemScreen />
    </ComponentErrorBoundary>
  );
}
