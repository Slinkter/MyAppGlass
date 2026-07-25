import { Metadata } from "next";
import { CompanyPoliciesView } from "@/screens/legal";

export const metadata: Metadata = {
  title: "Políticas de Empresa | Glass & Aluminum Company S.A.C.",
  description: "Políticas de privacidad, términos de servicio y estándares de calidad de Glass & Aluminum Company S.A.C. Vidriería La Molina, Lima - Perú.",
  alternates: {
    canonical: "https://www.gyacompany.com/politicas-empresa",
  },
  openGraph: {
    title: "Políticas de Empresa | Glass & Aluminum Company S.A.C.",
    description: "Políticas de privacidad, términos de servicio y estándares de calidad de Glass & Aluminum Company S.A.C.",
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
