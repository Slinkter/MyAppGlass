"use client";

import { Box } from "@chakra-ui/react";
import ServicePageContainer from "@/features/services/components/ServicePageContainer";

export default function Page() {
  return (
    <Box as="section" py={1}>
      <ServicePageContainer />
    </Box>
  );
}
