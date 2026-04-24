import { Metadata } from "next";
import { ServiceDetailView } from "@/views/services";
import { getServiceBySlug, getServices } from "@/features/services/services/serviceService";

export function generateStaticParams() {
  const servicesList = getServices();
  return servicesList.map((service) => ({
    serviceSlug: service.plink.split("/").pop() || "",
  }));
}


type Props = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  
  if (!service) {
    return {
      title: "Servicio no encontrado | GYA Glass & Aluminum",
    };
  }

  return {
    title: `${service.name} | GYA Glass & Aluminum`,
    description: `Detalles del servicio de ${service.name}. ${service.description?.substring(0, 150)}`,
    alternates: {
      canonical: `https://www.gyacompany.com/servicios/${serviceSlug}`,
    },
  };
}

export default function Page() {
  return <ServiceDetailView />;
}
