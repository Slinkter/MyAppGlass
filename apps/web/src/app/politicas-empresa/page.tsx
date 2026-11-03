import { Metadata } from "next";
import { CompanyPoliciesView } from "@/screens/Legal";
import { buildPageMetadata } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export const metadata: Metadata = buildPageMetadata({
  title: "Políticas de la Empresa y Garantías",
  description:
    "Términos y condiciones de fabricación e instalación de vidriería y carpintería de aluminio, coberturas de garantía y política de privacidad.",
  path: "/politicas-empresa",
});

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <CompanyPoliciesView />
    </ComponentErrorBoundary>
  );
}
