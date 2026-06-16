import { Metadata } from "next";
import { ServiceDetailView } from "@/screens/services";
import { getServiceBySlug, getServices } from "@/features/services/services/serviceService";
import { servicePageDataMap } from "@/features/services/data/servicePageDataMap";

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
  const pageData = servicePageDataMap[serviceSlug];
  const service = getServiceBySlug(serviceSlug);
  
  if (!service) {
    return {
      title: "Servicio no encontrado | Glass & Aluminum Company S.A.C.",
    };
  }

  if (pageData?.seo) {
    return {
      title: pageData.seo.title,
      description: pageData.seo.description,
      alternates: {
        canonical: `https://www.gyacompany.com/servicios/${serviceSlug}`,
      },
    };
  }

  return {
    title: `${service.name} | Glass & Aluminum Company S.A.C.`,
    description: `Detalles del servicio de ${service.name}. ${service.description?.substring(0, 150)}`,
    alternates: {
      canonical: `https://www.gyacompany.com/servicios/${serviceSlug}`,
    },
  };
}

export default function Page() {
  return <ServiceDetailView />;
}
