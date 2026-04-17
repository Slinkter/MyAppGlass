"use client";

import { Box } from "@chakra-ui/react";
import { ServiceList } from "@/features/services";

export default function Page() {
  return (
    <Box as="section" py={1}>
      <ServiceList />
    </Box>
  );
}
