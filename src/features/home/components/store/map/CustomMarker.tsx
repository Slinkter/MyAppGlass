import { useColorModeValue } from "@/components/ui/color-mode-hooks";
import React, { useCallback, useState } from "react";
import { OverlayViewF } from "@react-google-maps/api";
import { Box, Flex, Image } from "@chakra-ui/react";

import { useIsMobile } from "@/shared/hooks/ui/useIsMobile";
import type { StoreLocation } from "./mapConfig";
import type { MapProject } from "../../../hooks/useMapProjects";

interface CustomMarkerProps {
  marker: StoreLocation | MapProject;
  isSelected: boolean;
  onToggleSelect: (marker: StoreLocation | MapProject) => void;
  iconContent: React.ComponentType | string;
  isSvg: boolean;
  iconSize: { width: number; height: number };
  map: google.maps.Map | null;
  google: typeof window.google | undefined;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  marker, isSelected, onToggleSelect, iconContent, isSvg, iconSize, map, google,
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  const getPixelPositionOffset = useCallback(
    (width: number, height: number) => ({ x: -(width / 2), y: -height }),
    [],
  );


  const markerBg = useColorModeValue(
    isSelected ? "primary.900" : "white",
    isSelected ? "primary.100" : "primary.900",
  );
  const markerBorder = useColorModeValue(
    isSelected ? "primary.700" : "border.default",
    isSelected ? "primary.600" : "whiteAlpha.200",
  );
  const iconColor = useColorModeValue(
    isSelected ? "white" : "primary.900",
    isSelected ? "primary.900" : "white",
  );

  if (!map || !google) return null;

  const position = (marker as { position: { lat: number; lng: number } }).position; // Both have position
  if (!position.lat || !position.lng) return null;

  const handleMarkerClick = () => {
    if (isMobile) return;
    onToggleSelect(marker);
  };

  return (
    <OverlayViewF
      position={position}
      mapPaneName="overlayMouseTarget"
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <Box
        onClick={handleMarkerClick}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        cursor={isMobile ? "default" : "pointer"}
        position="relative"
        w={`${iconSize.width}px`}
        h={`${iconSize.height + 15}px`}
        zIndex={isSelected ? 100 : 1}
        transition="transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        transform={!isMobile && (isHovered || isSelected) ? "translateY(-4px)" : "translateY(0)"}
      >
        <Flex direction="column" align="center" gap={0}>
          <Flex
            w={`${iconSize.width}px`}
            h={`${iconSize.width}px`}
            bg={markerBg}
            borderRadius="xl"
            border="1px solid"
            borderColor={markerBorder}
            align="center"
            justify="center"
            position="relative"
            boxShadow={!isMobile && isSelected ? "lg" : "sm"}
            transition="background-color 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            transform={!isMobile && (isHovered || isSelected) ? "scale(1.08)" : "scale(1)"}
          >
            {isSvg ? (
              <Box 
                as={iconContent as React.ElementType} 
                boxSize="20px" 
                color={iconColor}
                transition="color 0.3s ease"
              />
            ) : (
              <Image 
                src={iconContent as string} 
                alt={marker.name} 
                w="70%" 
                h="70%" 
                objectFit="contain"
                transition="filter 0.3s ease"
                filter={isSelected ? "brightness(0) invert(1)" : "none"}
              />
            )}
          </Flex>
          
        </Flex>
      </Box>
    </OverlayViewF>
  );
};

export default React.memo(CustomMarker);
