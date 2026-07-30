import { Metadata } from "next";
import ContactPageClient from "./contact-page-client";

export const metadata: Metadata = {
  title: "Cotizar Vidriería en La Molina | GYA Company",
  description: "Solicita tu presupuesto sin compromiso para ventanas antirruido, mamparas y techos. Atención directa por WhatsApp y formulario.",
  alternates: {
    canonical: "https://www.gyacompany.com/contacto",
  },
  openGraph: {
    title: "Cotizar Vidriería en La Molina | GYA Company",
    description: "Solicita tu presupuesto sin compromiso para ventanas antirruido, mamparas y techos. Atención directa por WhatsApp y formulario.",
    url: "https://www.gyacompany.com/contacto",
    siteName: "Glass & Aluminum Company S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default function ContactPage() {
  return (
    <ComponentErrorBoundary>
      <ContactPageClient />
    </ComponentErrorBoundary>
  );
}
