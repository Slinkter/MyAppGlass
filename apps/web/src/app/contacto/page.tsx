import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { buildPageMetadata } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { PageTransition } from "@/shared/components/motion/PageTransition";

export const metadata: Metadata = buildPageMetadata({
  title: "Cotizaciones y Contacto en La Molina, Lima",
  description:
    "Solicita tu presupuesto sin compromiso para ventanas antirruido, mamparas y estructuras de vidrio y aluminio. Visítanos en Av. Los Fresnos 1250 - La Molina o escríbenos al WhatsApp 974 278 303.",
  path: "/contacto",
  keywords: [
    "contacto vidriería la molina",
    "cotización ventanas antirruido",
    "mamparas de vidrio lima",
    "vidrio y aluminio la molina",
    "Av. Los Fresnos 1250",
    "974 278 303",
  ],
});

export default function ContactPage() {
  return (
    <PageTransition>
      <ComponentErrorBoundary>
        <ContactPageClient />
      </ComponentErrorBoundary>
    </PageTransition>
  );
}
