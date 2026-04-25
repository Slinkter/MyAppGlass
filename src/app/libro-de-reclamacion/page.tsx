import { Metadata } from "next";
import ReclamationForm from "@/features/reclamation-book/components/ReclamationForm";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones | GYA Glass & Aluminum",
  description: "Formulario virtual para presentar quejas o reclamos de acuerdo con la normativa vigente de protección al consumidor en Perú.",
};

export default function Page() {
  return (
    <ComponentErrorBoundary>
       <ReclamationForm />
    </ComponentErrorBoundary>
  );
}
