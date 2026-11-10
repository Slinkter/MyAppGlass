import { Metadata } from "next";
import { NavbarLabScreen } from "@/screens/NavbarLab";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export const metadata: Metadata = {
  title: "Prueba de navbar móvil 3 | GYA Company",
  description: "Variante 3 de navbar móvil para revisión interna.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <NavbarLabScreen variant={3} />
    </ComponentErrorBoundary>
  );
}
