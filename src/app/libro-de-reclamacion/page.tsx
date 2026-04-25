import { Metadata } from "next";
import ReclamationForm from "@/features/reclamation-book/components/ReclamationForm";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones | Glass & Aluminum Company S.A.C.",
  description: "Formulario virtual para presentar quejas o reclamos de acuerdo con la normativa vigente de protección al consumidor en Perú.",
};

import AuraContainer from "@/shared/components/aura/AuraContainer";

export default function Page() {
  return (
    <AuraContainer>
       <ReclamationForm />
    </AuraContainer>
  );
}
