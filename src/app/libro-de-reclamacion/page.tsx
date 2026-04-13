import { Metadata } from "next";
import { Container } from "@chakra-ui/react";
import ReclamationForm from "@/features/reclamation-book/components/ReclamationForm";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual - GYA Company",
  description: "Presente sus reclamos o quejas a través de nuestro Libro de Reclamaciones Virtual, conforme a la normativa vigente.",
  alternates: {
    canonical: "https://www.gyacompany.com/libro-de-reclamacion",
  },
};

/**
 * @page Libro de Reclamaciones
 * @description Punto de entrada para el Libro de Reclamaciones Virtual de la empresa.
 * Cumple con la normativa local de protección al consumidor e INDECOPI.
 */
export default function ReclamationPage() {
  return (
    <Container maxW="container.lg" py={12}>
        <ReclamationForm />
    </Container>
  );
}
