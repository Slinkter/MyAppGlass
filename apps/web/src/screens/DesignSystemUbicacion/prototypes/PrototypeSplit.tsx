"use client";

import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import LocationMapLazy from "../location/LocationMapLazy";
import { useLocationData } from "../location/useLocationData";

/** Prototipo provisional A (se reemplaza en la fase 2): solo prueba la base compartida. */
export const PrototypeSplit: React.FC = () => {
  const { projects } = useLocationData();
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  return (
    <Box>
      <Text color="text.muted" fontSize="sm" mb="2">
        {projects.length} obras · seleccionado: {String(selectedId)}
      </Text>
      <Box h="420px" borderRadius="2xl" overflow="hidden" borderWidth="1px" borderColor="border.default">
        <LocationMapLazy projects={projects} selectedId={selectedId} onSelect={setSelectedId} />
      </Box>
    </Box>
  );
};

export default PrototypeSplit;
