import { Metadata } from "next";
import ReclamationForm from "@/features/reclamation-book/components/ReclamationForm";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones | Glass & Aluminum Company S.A.C.",
  description: "Presenta tu queja o reclamo formal a través del Libro de Reclamaciones virtual de Glass & Aluminum Company S.A.C. Cumplimos con la normativa del INDECOPI.",
};

import AuraContainer from "@/shared/components/aura/AuraContainer";

export default function Page() {
  return (
    <AuraContainer>
       <ReclamationForm />
    </AuraContainer>
  );
}
