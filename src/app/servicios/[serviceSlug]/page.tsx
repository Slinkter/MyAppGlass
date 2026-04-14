import React from "react";
import { Metadata } from "next";
import ServicePageContainer from "@features/services/components/ServicePageContainer";
import { getServicePageData, getServices } from "@features/services/services/serviceService";

type Props = {
  params: Promise<{ serviceSlug: string }>;
};

/**
 * @function generateMetadata
 * @description Generates dynamic metadata for each service page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  try {
    const data = await getServicePageData(serviceSlug);
    return {
      title: `${data.seo?.title || "Servicio"} | GYA Glass & Aluminum`,
      description: data.seo?.description || "Detalles de nuestro servicio especializado.",
      openGraph: {
        title: data.seo?.title,
        description: data.seo?.description,
      }
    };
  } catch {
    return {
      title: "Servicio no encontrado | GYA Glass & Aluminum",
    };
  }
}

/**
 * @function generateStaticParams
 * @description Pre-renders all service pages at build time.
 */
export async function generateStaticParams() {
  const services = getServices();
  // We assume services is an array. serviceService.js shows plink contains the slug.
  return services.map((service: any) => ({
    serviceSlug: service.plink,
  }));
}

/**
 * @page Detalle de Servicio
 * @description Página dinámica que carga los datos de un servicio específico.
 */
export default async function ServiceDetailPage({ params }: Props) {
  const { serviceSlug } = await params;
  return <ServicePageContainer serviceSlug={serviceSlug} />;
}
