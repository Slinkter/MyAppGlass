import { Metadata } from "next";
import ContactPageClient from "./contact-page-client";

export const metadata: Metadata = {
  title: "Contacto | Cotiza tu Proyecto | Glass & Aluminum Company S.A.C.",
  description:
    "Solicita tu cotización sin compromiso. Visita técnica gratuita en La Molina y Lima. WhatsApp: 974 278 303. Expertos en vidrio y aluminio desde 2012.",
  alternates: {
    canonical: "https://www.gyacompany.com/contacto",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
