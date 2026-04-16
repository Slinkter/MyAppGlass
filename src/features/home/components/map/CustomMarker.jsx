import { useColorModeValue } from "@/components/ui/color-mode";
import React, { useCallback, useState } from "react";
import { OverlayViewF } from "@react-google-maps/api";
import { Box, Flex, Image } from "@chakra-ui/react";

import { useIsMobile } from "@/shared/hooks/ui/useIsMobile";

const CustomMarker = ({
  marker, isSelected, onToggleSelect, iconContent, isSvg, iconSize, map, google,
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  const getPixelPositionOffset = useCallback(
    (width, height) => ({ x: -(width / 2), y: -height }),
    [],
  );

  const isStore = marker.type === "store";

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
  const connectorColor = useColorModeValue("black", "black");

  if (!map || !google) return null;

  const position = marker.position || { lat: marker.lat, lng: marker.lng };
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
        transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
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
            boxShadow={!isMobile && isSelected ? "0 8px 20px rgba(0,0,0,0.3)" : "sm"}
            transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            transform={!isMobile && (isHovered || isSelected) ? "scale(1.08)" : "scale(1)"}
          >
            {isSvg ? (
              <Box 
                as={iconContent} 
                boxSize="20px" 
                color={iconColor}
                transition="all 0.3s ease"
              />
            ) : (
              <Image 
                src={iconContent} 
                alt={marker.name} 
                w="70%" 
                h="70%" 
                objectFit="contain"
                transition="all 0.3s ease"
                filter={isSelected ? "brightness(0) invert(1)" : "none"}
              />
            )}
          </Flex>

          {isStore && (
            <Box 
              w="1px" h="10px"
              bg={connectorColor}
              opacity={isSelected ? 0.8 : 0.5}
              mt="-2px"
              transition="all 0.3s ease"
            />
          )}
        </Flex>
      </Box>
    </OverlayViewF>
  );
};

export default React.memo(CustomMarker);
