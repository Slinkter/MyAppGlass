import { Metadata } from "next";
import ServiceList from "@features/services/components/ServiceList";

/**
 * @metadata
 * @description SEO Configuration for the Services catalog.
 */
export const metadata: Metadata = {
  title: "Servicios de Vidriería y Aluminio | GYA Glass & Aluminum",
  description: "Servicios profesionales de instalación de vidrios templados, mamparas, barandas, techos de policarbonato y estructuras de aluminio en La Molina, Lima.",
  openGraph: {
    title: "Servicios Especializados | GYA Glass & Aluminum",
    description: "Ventanas, mamparas, barandas y más con calidad premium.",
    type: "website",
  },
};

/**
 * @page Servicios
 * @description Catálogo completo de servicios profesionales de vidriería.
 */
export default function ServicesPage() {
  return <ServiceList />;
}
