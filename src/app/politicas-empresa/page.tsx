import { Metadata } from "next";
import { CompanyPoliciesView } from "@/screens/legal";

export const metadata: Metadata = {
  title: "Políticas de Empresa | Glass & Aluminum Company S.A.C.",
  description: "Políticas de privacidad, términos de servicio y estándares de calidad de Glass & Aluminum Company S.A.C. Vidriería La Molina, Lima - Perú.",
};

export default function Page() {
  return <CompanyPoliciesView />;
}
