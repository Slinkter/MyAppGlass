import { Metadata } from "next";
import { PoliciesClient } from "./PoliciesClient";

export const metadata: Metadata = {
  title: "Políticas de la Empresa - GYA Company",
  description: "Conoce las políticas y términos de servicio de GYA Company.",
  alternates: {
    canonical: "https://www.gyacompany.com/politicas-empresa",
  },
};

export default function PoliciesPage() {
  return <PoliciesClient />;
}
