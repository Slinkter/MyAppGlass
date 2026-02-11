import React, { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Icon, // Added Icon component
} from "@chakra-ui/react";
import { getProjects } from "@/features/projects";
import { FaBuilding } from "react-icons/fa"; // Import FaBuilding

import logo from "@/assets/branding/logovcr.png";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "24px",
};

const center = { lat: -12.046374, lng: -77.042793 };

const mainStore = {
  id: "store",
  name: "Glass & Aluminum Company",
  address: "Av. Los Fresnos MZ. H LT. 1250 - La Molina - Lima",
  type: "store",
  client: "Sede Principal",
  position: { lat: -12.103252, lng: -76.942035 },
};

// --- COMPONENTE CUSTOM MARKER (UX/UI LIMPIO) ---
const CustomMarker = ({
  marker,
  isSelected,
  onToggleSelect,
  iconContent,
  isSvg,
  iconSize,
  map,
  google,
}) => {
  const getPixelPositionOffset = useCallback(
    (width, height) => ({ x: -(width / 2), y: -height }),
    [],
  );

  if (!map || !google) return null;

  return (
    <OverlayView
      position={marker.position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <Popover
        isOpen={isSelected}
        onClose={() => onToggleSelect(null)}
        placement="top"
        isLazy
        returnFocusOnClose={false}
      >
        <PopoverTrigger>
          <Box
            cursor="pointer"
            w={`${iconSize.width}px`}
            h={`${iconSize.height}px`}
            // Conditionally render based on isSvg
            {...(isSvg
              ? typeof iconContent === "string"
                ? { dangerouslySetInnerHTML: { __html: iconContent } }
                : {
                    // Render React Icon component using Chakra's Icon within a styled Box
                    children: (
                      <Box
                        bg="#3182CE" // Blue background
                        borderRadius="full" // Circular shape
                        border="2px solid white" // White stroke
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="100%"
                        h="100%"
                      >
                        <Icon as={iconContent} color="white" w="60%" h="60%" />{" "}
                        {/* White icon inside */}
                      </Box>
                    ),
                  }
              : { as: "img", src: iconContent, alt: marker.name })}
            onClick={() => onToggleSelect(marker)}
            _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
            transition="all 0.2s"
          />
        </PopoverTrigger>
        <PopoverContent
          p={0}
          maxW="220px"
          color="black"
          boxShadow="2xl"
          rounded="xl"
          overflow="hidden"
          border="none"
        >
          <PopoverArrow />
          <PopoverCloseButton size="sm" top={2} />
          <PopoverBody p={4}>
            {/* 1. Nombre Residencial */}
            <Heading
              size="xs"
              mb={1}
              color="blue.600"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {marker.residencial || marker.name}
            </Heading>
            {/* 2. Dirección */}
            <Text fontSize="xs" mb={2} color="gray.100" fontWeight="medium">
              {marker.g_maps || marker.address}
            </Text>
            {/* 3. Cliente/Constructora */}
            <Text fontSize="10px" color="gray.500" fontStyle="italic">
              {marker.client || marker.name}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </OverlayView>
  );
};

function InteractiveMapComponent() {
  const [projects, setProjects] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState(null);

  const spinnerColor = useColorModeValue("primary.500", "primary.300");
  const errorBgColor = useColorModeValue("gray.100", "gray.800");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  // --- CORRECCIÓN OBJETO GOOGLE ---
  const google = window.google;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        const geocodePromises = data.map(async (project) => {
          if (!project.g_maps) return null;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(project.g_maps)}&key=${apiKey}`,
            );
            const result = await response.json();
            if (result.status === "OK") {
              const location = result.results[0].geometry.location;
              return {
                ...project,
                type: "project",
                client: project.name, // Mapeo de cliente
                position: { lat: location.lat, lng: location.lng },
              };
            }
          } catch (e) {
            return null;
          }
          return null;
        });

        const validProjects = (await Promise.all(geocodePromises)).filter(
          (p) => p !== null,
        );
        setProjects(validProjects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

  const onLoad = useCallback((mapInstance) => setMap(mapInstance), []);
  const onUnmount = useCallback(() => setMap(null), []);

  useEffect(() => {
    if (map && projects.length > 0 && google) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(mainStore.position);
      projects.forEach((p) => bounds.extend(p.position));
      map.fitBounds(bounds);
    }
  }, [map, projects, google]);

  const handleMarkerToggle = useCallback((marker) => {
    setSelectedMarker((prev) => (prev?.id === marker?.id ? null : marker));
  }, []);

  const icons = useMemo(() => {
    if (!isLoaded || !google) return null;
    return {
      store: {
        iconContent: logo, // Use the imported logo image
        isSvg: false, // Indicate it's an image, not an SVG string
        size: { width: 45, height: 45 },
      },
      project: {
        iconContent: FaBuilding, // Use FaBuilding component
        isSvg: true, // Indicate it's an SVG component
        size: { width: 40, height: 40 }, // Outer Box size for styling
      },
    };
  }, [isLoaded, google]);

  // --- RENDERIZADO SEGURO ---
  if (loadError)
    return (
      <Flex h="400px" align="center" justify="center">
        <Text color="red.500">Error en Maps</Text>
      </Flex>
    );

  if (!isLoaded || !google || !icons) {
    return (
      <Flex
        align="center"
        justify="center"
        h={{ base: "400px", md: "600px" }}
        bg={errorBgColor}
        rounded="2xl"
      >
        <Spinner size="xl" color={spinnerColor} thickness="4px" />
      </Flex>
    );
  }

  return (
    <Box
      position="relative"
      w="full"
      h={{ base: "400px", md: "600px" }}
      rounded="2xl"
      overflow="hidden"
      boxShadow="xl"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
        }}
      >
        <CustomMarker
          marker={mainStore}
          isSelected={selectedMarker?.id === mainStore.id}
          onToggleSelect={handleMarkerToggle}
          iconContent={icons.store.iconContent} // Pass iconContent
          isSvg={icons.store.isSvg} // Pass isSvg
          iconSize={icons.store.size}
          map={map}
          google={google}
        />
        {projects.map((project) => (
          <CustomMarker
            key={project.id}
            marker={project}
            isSelected={selectedMarker?.id === project.id}
            onToggleSelect={handleMarkerToggle}
            iconContent={icons.project.iconContent} // Pass iconContent
            isSvg={icons.project.isSvg} // Pass isSvg
            iconSize={icons.project.size}
            map={map}
            google={google}
          />
        ))}
      </GoogleMap>
    </Box>
  );
}

const InteractiveMap = React.memo(InteractiveMapComponent);
export default InteractiveMap;
