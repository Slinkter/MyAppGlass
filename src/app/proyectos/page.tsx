import { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import ProjectsList from "@/features/projects/components/ProjectsList";

export const metadata: Metadata = {
  title: "Nuestros Proyectos | GYA Glass & Aluminum",
  description: "Portafolio de proyectos realizados en Lima. Instalaciones premium de vidrios y aluminios en residencias, oficinas y edificios.",
  alternates: {
    canonical: "https://www.gyacompany.com/proyectos",
  },
};

export default function Page() {
  return (
    <Box as="section" py={1}>
      <ProjectsList />
    </Box>
  );
}
