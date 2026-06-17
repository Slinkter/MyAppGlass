import { Metadata } from "next";
import ReclamationForm from "@/features/reclamation-book/components/ReclamationForm";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones | Glass & Aluminum Company S.A.C.",
  description: "Presenta tu queja o reclamo formal a través del Libro de Reclamaciones virtual de Glass & Aluminum Company S.A.C. Cumplimos con la normativa del INDECOPI.",
  alternates: {
    canonical: "https://www.gyacompany.com/libro-de-reclamacion",
  },
  openGraph: {
    title: "Libro de Reclamaciones | Glass & Aluminum Company S.A.C.",
    description: "Presenta tu queja o reclamo formal a través del Libro de Reclamaciones virtual. Cumplimos con la normativa del INDECOPI.",
    url: "https://www.gyacompany.com/libro-de-reclamacion",
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

import AuraContainer from "@/shared/components/aura/AuraContainer";

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default function Page() {
  return (
    <AuraContainer>
      <ComponentErrorBoundary>
        <ReclamationForm />
      </ComponentErrorBoundary>
    </AuraContainer>
  );
}
