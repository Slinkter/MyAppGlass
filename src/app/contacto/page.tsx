import { Metadata } from "next";
import ContactPageClient from "./contact-page-client";

export const metadata: Metadata = {
  title: "Contacto | Cotiza tu Proyecto | Glass & Aluminum Company S.A.C.",
  description:
    "Solicita tu cotización sin compromiso. Visita técnica gratuita en La Molina y Lima. WhatsApp: 974 278 303. Expertos en vidrio y aluminio desde 2012.",
  alternates: {
    canonical: "https://www.gyacompany.com/contacto",
  },
  openGraph: {
    title: "Contacto | Cotiza tu Proyecto | Glass & Aluminum Company S.A.C.",
    description: "Solicita tu cotización sin compromiso. Visita técnica gratuita en La Molina y Lima. Expertos en vidrio y aluminio desde 2012.",
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
