"use client";

import React, { useCallback } from "react";
import { OverlayViewF } from "@react-google-maps/api";
import { Box, chakra } from "@chakra-ui/react";
import { Building2, Store } from "lucide-react";

interface LocationMarkerProps {
  id: string | number;
  name: string;
  position: { lat: number; lng: number };
  kind: "store" | "project";
  isSelected: boolean;
  onSelect: (id: string | number) => void;
}

const MARKER_SIZE = 44; // target táctil mínimo

/**
 * Marcador del mapa para los prototipos de Ubicación. A diferencia del marcador de
 * producción responde al toque en móvil, es un `button` accesible y mide 44 px.
 */
const LocationMarker: React.FC<LocationMarkerProps> = ({
  id,
  name,
  position,
  kind,
  isSelected,
  onSelect,
}) => {
  const offset = useCallback(
    (width: number, height: number) => ({ x: -(width / 2), y: -height }),
    [],
  );
  const Icon = kind === "store" ? Store : Building2;

  return (
    <OverlayViewF position={position} mapPaneName="overlayMouseTarget" getPixelPositionOffset={offset}>
      <chakra.button
        type="button"
       
        onClick={() => onSelect(id)}
        aria-label={kind === "store" ? `Sede principal: ${name}` : `Obra: ${name}`}
        aria-pressed={isSelected}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w={`${MARKER_SIZE}px`}
        h={`${MARKER_SIZE}px`}
        borderRadius="full"
        borderWidth="2px"
        borderStyle="solid"
        cursor="pointer"
        zIndex={isSelected ? 100 : kind === "store" ? 50 : 1}
        bg={isSelected || kind === "store" ? "primary.900" : "white"}
        color={isSelected || kind === "store" ? "white" : "primary.900"}
        borderColor={isSelected ? "white" : "primary.700"}
        boxShadow={isSelected ? "lg" : "sm"}
        transform={isSelected ? "scale(1.15)" : "scale(1)"}
        transition="transform 0.2s ease, box-shadow 0.2s ease"
        _focusVisible={{ outline: "3px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
        _dark={{
          bg: isSelected || kind === "store" ? "white" : "primary.900",
          color: isSelected || kind === "store" ? "primary.900" : "white",
        }}
      >
        <Box as={Icon} boxSize="5" aria-hidden="true" style={{ flexShrink: 0 }} />
      </chakra.button>
    </OverlayViewF>
  );
};

export default React.memo(LocationMarker);
