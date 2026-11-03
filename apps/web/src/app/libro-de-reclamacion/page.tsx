import { Metadata } from "next";
import ReclamationForm from "@/features/reclamation-book/components/ReclamationForm";
import AuraContainer from "@/shared/components/aura/AuraContainer";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { buildPageMetadata } from "@/shared/utils/seo-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Libro de Reclamaciones Virtual",
  description:
    "Presenta tu queja o reclamo formal a través del Libro de Reclamaciones virtual de Glass & Aluminum Company S.A.C., conforme a las disposiciones de INDECOPI.",
  path: "/libro-de-reclamacion",
});

export default function Page() {
  return (
    <AuraContainer>
      <ComponentErrorBoundary>
        <ReclamationForm />
      </ComponentErrorBoundary>
    </AuraContainer>
  );
}
