import { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import ServicePageContainer from "@/features/services/components/ServicePageContainer";
import { getServiceBySlug } from "@/features/services/services/serviceService";

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
  return (
    <Box as="section" py={1}>
      <ServicePageContainer />
    </Box>
  );
}
