import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { CompanyPoliciesView } from "@/screens/Legal";

export const metadata: Metadata = {
  title: "Políticas de la Empresa y Garantías | GYA Company",
  description: "Términos y condiciones de servicios residenciales, corporativos y política de privacidad de datos según Ley N° 29733.",
  alternates: {
    canonical: `${SITE_URL}/politicas-empresa`,
  },
  openGraph: {
    title: "Políticas de la Empresa y Garantías | GYA Company",
    description: "Términos y condiciones de servicios residenciales, corporativos y política de privacidad de datos según Ley N° 29733.",
    url: `${SITE_URL}/politicas-empresa`,
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
