import { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import ServiceList from "@/features/services/components/ServiceList";

export const metadata: Metadata = {
  title: "Nuestros Servicios | GYA Glass & Aluminum",
  description: "Servicios especializados de vidriería, instalación de ventanas, mamparas, sistemas Nova y aluminio premium en Lima.",
  alternates: {
    canonical: "https://www.gyacompany.com/servicios",
  },
};

export default function Page() {
  return (
    <Box as="section" py={1}>
      <ServiceList />
    </Box>
  );
}
