import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  OverlayViewF,
} from "@react-google-maps/api";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  Flex,
  Tooltip,
  Image,
  Icon,
  Card,
} from "@chakra-ui/react";
import { getProjects } from "@/features/projects";
import { FaBuilding } from "react-icons/fa";

import logo from "@/assets/branding/logovcr.png";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "24px",
};

const center = { lat: -12.103252, lng: -76.942035 };

const mainStore = {
  id: "store",
  residencial: "Glass & Aluminum Company",
  name: "GYA Company S.A.C.",
  address: "Av. Los Fresnos MZ. H LT. 1250 - La Molina",
  type: "store",
  client: "Sede Principal",
  position: { lat: -12.103252, lng: -76.942035 },
};

// --- ERROR BOUNDARY ---
class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "MapOverlay failed, falling back to standard markers:",
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// --- MODO PREMIUM (OverlayView + Tooltip) ---
const PremiumMarker = ({ marker, isSelected, onHover, onLeave, isStore }) => {
  if (!marker.position) return null;
  return (
    <OverlayViewF
      position={marker.position}
      mapPaneName={OverlayViewF.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -height,
      })}
    >
      <Tooltip
        label={
          <Box textAlign="left" p={1}>
            <Heading size="xs" color="blue.200" textTransform="uppercase">
              {marker.residencial || marker.name}
            </Heading>
            <Text fontSize="xs" fontWeight="bold">
              {marker.g_maps || marker.address}
            </Text>
            <Text fontSize="10px" color="gray.300">
              {marker.client || "Proyecto Realizado"}
            </Text>
          </Box>
        }
        hasArrow
        bg="gray.800"
        color="white"
        placement="top"
        borderRadius="md"
        isOpen={isSelected}
      >
        <Box
          onMouseEnter={() => onHover(marker)}
          onMouseLeave={onLeave}
          cursor="pointer"
          transform={isSelected ? "scale(1.2)" : "scale(1)"}
          transition="all 0.2s"
        >
          {isStore ? (
            <Image
              src={logo}
              alt={marker.name}
              w="50px"
              h="50px"
              objectFit="contain"
              filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.25))"
            />
          ) : (
            <Box
              bg="#3182CE"
              borderRadius="full"
              border="2px solid white"
              w="30px"
              h="30px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="lg"
            >
              <Icon as={FaBuilding} color="white" w="60%" h="60%" />
            </Box>
          )}
        </Box>
      </Tooltip>
    </OverlayViewF>
  );
};

// --- MODO SEGURO (MarkerF + InfoWindowF) ---
const SafeMarkers = ({
  projects,
  mainStore,
  onHover,
  onLeave,
  selectedMarker,
}) => (
  <>
    <MarkerF
      position={mainStore.position}
      onMouseOver={() => onHover(mainStore)}
      onMouseOut={onLeave}
      icon={
        window.google
          ? { url: logo, scaledSize: new window.google.maps.Size(50, 50) }
          : undefined
      }
    />
    {projects.map((project) => (
      <MarkerF
        key={project.id}
        position={project.position}
        onMouseOver={() => onHover(project)}
        onMouseOut={onLeave}
        icon={
          window.google
            ? {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "#3182CE",
                fillOpacity: 1,
                strokeColor: "#FFFFFF",
                strokeWeight: 2,
                scale: 8,
              }
            : undefined
        }
      />
    ))}
    {selectedMarker && (
      <InfoWindowF
        position={selectedMarker.position}
        onCloseClick={onLeave}
        options={{
          pixelOffset: new window.google.maps.Size(0, -30),
          disableAutoPan: true,
          headerContent: " ",
          minWidth: 200,
        }}
      >
        <Card
          p={3}
          bg="white"
          variant="elevated"
          borderRadius="lg"
          boxShadow="none"
          border="none"
        >
          <Heading
            size="xs"
            color="blue.600"
            textTransform="uppercase"
            mb={1}
            letterSpacing="wide"
          >
            {selectedMarker.residencial || selectedMarker.name}
          </Heading>
          <Text fontSize="sm" fontWeight="semibold" color="gray.800" mb={1}>
            {selectedMarker.g_maps || selectedMarker.address}
          </Text>
          <Text fontSize="xs" color="gray.500" fontStyle="italic">
            {selectedMarker.client || "Proyecto Realizado"}
          </Text>
        </Card>
      </InfoWindowF>
    )}
  </>
);

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = getProjects();
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (!apiKey) return;

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
                client: project.name,
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
        console.error("InteractiveMap Error:", error);
      }
    };
    fetchProjects();
  }, []);

  const onLoad = useCallback((mapInstance) => setMap(mapInstance), []);
  const onUnmount = useCallback(() => setMap(null), []);

  useEffect(() => {
    if (map && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(mainStore.position);
      if (projects.length > 0) {
        projects.forEach((p) => bounds.extend(p.position));
      }
      map.fitBounds(bounds);
    }
  }, [map, projects]);

  const handleMarkerHover = useCallback((marker) => {
    setSelectedMarker(marker);
  }, []);

  const handleMarkerLeave = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  if (loadError)
    return (
      <Flex h="400px" align="center" justify="center">
        <Text color="red.500">Error en Maps</Text>
      </Flex>
    );

  if (!isLoaded) {
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
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
        }}
      >
        <MapErrorBoundary
          fallback={
            <SafeMarkers
              projects={projects}
              mainStore={mainStore}
              onHover={handleMarkerHover}
              onLeave={handleMarkerLeave}
              selectedMarker={selectedMarker}
            />
          }
        >
          {/* INTENTO PREMIUM */}
          <PremiumMarker
            marker={mainStore}
            isSelected={selectedMarker?.id === mainStore.id}
            onHover={handleMarkerHover}
            onLeave={handleMarkerLeave}
            isStore
          />
          {projects.map((project) => (
            <PremiumMarker
              key={project.id}
              marker={project}
              isSelected={selectedMarker?.id === project.id}
              onHover={handleMarkerHover}
              onLeave={handleMarkerLeave}
            />
          ))}
        </MapErrorBoundary>
      </GoogleMap>
    </Box>
  );
}

const InteractiveMap = React.memo(InteractiveMapComponent);
export default InteractiveMap;
