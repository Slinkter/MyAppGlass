import { Metadata } from "next";
import { CompanyPoliciesView } from "@/screens/legal";

export const metadata: Metadata = {
  title: "Políticas de la Empresa y Garantías | GYA Company",
  description: "Términos y condiciones de servicios residenciales, corporativos y política de privacidad de datos según Ley N° 29733.",
  alternates: {
    canonical: "https://www.gyacompany.com/politicas-empresa",
  },
  openGraph: {
    title: "Políticas de la Empresa y Garantías | GYA Company",
    description: "Términos y condiciones de servicios residenciales, corporativos y política de privacidad de datos según Ley N° 29733.",
    url: "https://www.gyacompany.com/politicas-empresa",
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default function Page() {
  return (
    <ComponentErrorBoundary>
      <CompanyPoliciesView />
    </ComponentErrorBoundary>
  );
}
