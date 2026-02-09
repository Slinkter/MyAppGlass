import React, { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  Flex,
  Badge,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { getProjects } from "@/features/projects";

// Estilos del mapa
const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1rem",
};

// Coordenadas de Lima (centro inicial)
const center = {
  lat: -12.046374,
  lng: -77.042793,
};

// Ubicación de la tienda principal
const mainStore = {
  id: "store",
  name: "Glass & Aluminum Company",
  address: "Av. Los Fresnos MZ. H LT. 1250 - La Molina - Lima",
  type: "store",
  position: { lat: -12.103252, lng: -76.942035 },
};

/**
 * @component InteractiveMap
 * @description Mapa interactivo usando Google Maps JS API que muestra marcadores
 * personalizados para la tienda y proyectos.
 */
function InteractiveMapComponent() {
  const [projects, setProjects] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState(null);

  // Colores y estilos (hooks deben estar antes de cualquier return)
  const spinnerColor = useColorModeValue("primary.500", "primary.300");
  const errorBgColor = useColorModeValue("gray.100", "gray.800");

  // Cargar API de Google Maps
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  // Cargar proyectos y geocodificar sus direcciones
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        console.log(`📍 Geocodificando ${data.length} proyectos...`);
        
        // Geocodificar cada dirección usando Google Geocoding API
        const geocodePromises = data.map(async (project) => {
          if (!project.g_maps) {
            console.warn(`⚠️ Proyecto ${project.residencial} no tiene dirección g_maps`);
            return null;
          }
          
          try {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            if (!apiKey) {
              console.error("❌ Google Maps API Key no encontrada en el entorno");
              return null;
            }

            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                project.g_maps
              )}&key=${apiKey}`
            );
            const result = await response.json();
            
            if (result.status === 'OK' && result.results && result.results[0]) {
              const location = result.results[0].geometry.location;
              console.log(`✅ ${project.residencial}: ${location.lat}, ${location.lng}`);
              return {
                ...project,
                type: "project",
                position: {
                  lat: location.lat,
                  lng: location.lng,
                },
              };
            } else {
              console.error(`❌ Error geocodificando ${project.residencial}:`, result.status, result.error_message);
            }
          } catch (error) {
            console.error(`❌ Error geocodificando ${project.residencial}:`, error);
          }
          return null;
        });

        const geocodedProjects = await Promise.all(geocodePromises);
        // Filtrar proyectos que se geocodificaron correctamente
        const validProjects = geocodedProjects.filter((p) => p !== null);
        console.log(`✅ ${validProjects.length} proyectos geocodificados exitosamente`);
        setProjects(validProjects);
      } catch (error) {
        console.error("❌ Error loading projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Ajustar el mapa para mostrar todos los marcadores cuando carguen los proyectos
  useEffect(() => {
    if (map && projects.length > 0 && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      // Añadir tienda principal
      bounds.extend(mainStore.position);
      // Añadir todos los proyectos
      projects.forEach((project) => {
        bounds.extend(project.position);
      });
      map.fitBounds(bounds);
    }
  }, [map, projects]);

  // Manejar clic en marcador
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  // Íconos personalizados usando SVG embebidos (se crean solo cuando la API está cargada)
  const icons = useMemo(() => {
    if (!isLoaded || !window.google || !window.google.maps) return null;

    try {
      return {
        store: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
              <!-- Pin Background -->
              <path d="M22.5 0C14.5 0 8 6.5 8 14.5C8 25.4 22.5 42 22.5 42S37 25.4 37 14.5C37 6.5 30.5 0 22.5 0Z" fill="#FF6B35" stroke="white" stroke-width="2"/>
              <!-- Wrench/Tool Icon -->
              <g transform="translate(13, 7) scale(0.8)" fill="white">
                <path d="M19.7,3.1c-2.4-2.4-6.3-2.4-8.7,0l-1.3,1.3l-1.3-1.3c-2.4-2.4-6.3-2.4-8.7,0c-2.4,2.4-2.4,6.3,0,8.7L10,21.5l10.3-10.3l-1.3-1.3l1.3-1.3C22.1,6.5,22.1,3.1,19.7,3.1z M17,9l-1.3,1.3l-2.7-2.7L14.3,6.3C15,5.6,15,4.4,14.3,3.7c-0.7-0.7-1.9-0.7-2.7,0l-1.3,1.3l-2.7-2.7l1.3-1.3C9.6,0.3,10.8,0.3,11.5,1s0.7,1.9,0,2.7L10.3,5l2.7,2.7l1.3-1.3c0.7-0.7,1.9-0.7,2.7,0S17.7,8.3,17,9z"/>
              </g>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(45, 45),
          anchor: new window.google.maps.Point(22.5, 42),
        },
        project: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <!-- Pin Background -->
              <path d="M20 0C13.4 0 8 5.4 8 12C8 21 20 35 20 35S32 21 32 12C32 5.4 26.6 0 20 0Z" fill="#3182CE" stroke="white" stroke-width="1.5"/>
              <!-- Building Symbol -->
              <rect x="15" y="6" width="10" height="12" fill="white" rx="1"/>
              <rect x="16" y="8" width="2" height="2" fill="#3182CE"/>
              <rect x="19" y="8" width="2" height="2" fill="#3182CE"/>
              <rect x="22" y="8" width="2" height="2" fill="#3182CE"/>
              <rect x="16" y="11" width="2" height="2" fill="#3182CE"/>
              <rect x="19" y="11" width="2" height="2" fill="#3182CE"/>
              <rect x="22" y="11" width="2" height="2" fill="#3182CE"/>
              <rect x="16" y="14" width="2" height="2" fill="#3182CE"/>
              <rect x="19" y="14" width="2" height="2" fill="#3182CE"/>
              <rect x="22" y="14" width="2" height="2" fill="#3182CE"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 35),
        }
      };
    } catch (e) {
      console.error("Error creating Google Maps objects:", e);
      return null;
    }
  }, [isLoaded]);

  if (loadError) {
    return (
      <Flex
        align="center"
        justify="center"
        h={{ base: "400px", md: "600px" }}
        bg={errorBgColor}
        rounded="2xl"
      >
        <Text color="red.500">Error al cargar Google Maps</Text>
      </Flex>
    );
  }

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
      className="google-map-container"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true,
          // Estilos para ocultar POIs y mostrar solo calles
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        {/* Marcador de Tienda Principal */}
        <Marker
          position={mainStore.position}
          title={mainStore.name}
          icon={icons?.store}
          onClick={() => handleMarkerClick(mainStore)}
        />

        {/* Marcadores de Proyectos */}
        {projects.map((project) => (
          <Marker
            key={project.id}
            position={project.position}
            title={project.residencial || project.name}
            icon={icons?.project}
            onClick={() => handleMarkerClick(project)}
          />
        ))}

        {/* InfoWindow para mostrar detalles al hacer clic */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <Box p={2} maxW="250px" color="black" textAlign="left">
              <HStack mb={2}>
                <Badge
                  colorScheme={
                    selectedMarker.type === "store" ? "orange" : "blue"
                  }
                >
                  {selectedMarker.type === "store" ? "TIENDA" : "PROYECTO"}
                </Badge>
              </HStack>
              <Heading size="xs" mb={1} color="gray.800">
                {selectedMarker.name || selectedMarker.residencial}
              </Heading>
              <Text fontSize="xs" mb={2} color="gray.600">
                {selectedMarker.address}
              </Text>
              {selectedMarker.g_maps && (
                <Button
                  size="xs"
                  rightIcon={<Icon as={FaExternalLinkAlt} />}
                  as="a"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedMarker.g_maps
                  )}`}
                  target="_blank"
                  colorScheme="blue"
                  variant="link"
                >
                  Ver en Maps
                </Button>
              )}
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>
    </Box>
  );
}

const InteractiveMap = React.memo(InteractiveMapComponent);
InteractiveMap.displayName = "InteractiveMap";

export default InteractiveMap;
