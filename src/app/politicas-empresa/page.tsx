import { Metadata } from "next";
import { CompanyPoliciesView } from "@/views/legal";

export const metadata: Metadata = {
  title: "Políticas de Empresa | GYA Glass & Aluminum",
  description: "Información sobre privacidad, términos de servicio y políticas de calidad de nuestra empresa.",
};

export default function Page() {
  return <CompanyPoliciesView />;
}
