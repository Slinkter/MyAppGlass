import React, { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import {
  Box,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
  Spinner,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Icon,
  Button,
  Tooltip,
  Badge,
  Link,
  VStack,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { getProjects } from "@/features/projects";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCompass,
  FaExternalLinkAlt,
} from "react-icons/fa";
import logo from "@/assets/branding/logovcr.png";
import { mapStyles } from "./mapStyles";

// --- ANIMATIONS ---
const pulseRing = keyframes`
  0% { transform: scale(0.33); opacity: 1; }
  80%, 100% { opacity: 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
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

// --- COMPONENTE CUSTOM MARKER (UX/UI MEJORADO) ---
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

  const isStore = marker.type === "store";
  const markerColor = isStore ? "blue.500" : "teal.500";
  const ringColor = isStore
    ? "rgba(49, 130, 206, 0.4)"
    : "rgba(56, 178, 172, 0.4)";

  // Hooks for Popover styles
  const popoverBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

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
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Box
            position="relative"
            onClick={() => onToggleSelect(marker)}
            cursor="pointer"
            w={`${iconSize.width}px`}
            h={`${iconSize.height}px`}
            transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            _hover={{ transform: "scale(1.15) translateY(-2px)" }}
            animation={
              isSelected ? `${float} 2s ease-in-out infinite` : undefined
            }
            zIndex={isSelected ? 10 : 1}
          >
            {/* Pulse Effect for Store or Selected Items */}
            {(isStore || isSelected) && (
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                borderRadius="full"
                border="3px solid"
                borderColor={ringColor}
                animation={`${pulseRing} 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite`}
                zIndex={-1}
              />
            )}

            {isSvg ? (
              // Project Marker
              <Flex
                bg={isSelected ? "red.600" : "blue.500"}
                borderRadius="full"
                border="2px solid white"
                align="center"
                justify="center"
                w="100%"
                h="100%"
                boxShadow="lg"
                color="white"
              >
                <Icon as={iconContent} w="50%" h="50%" />
              </Flex>
            ) : (
              // Store Marker (Image)
              <Box
                w="100%"
                h="100%"
                borderRadius="full"
                border="2px solid white"
                boxShadow="xl"
                overflow="hidden"
                bg="white"
              >
                <Box
                  as="img"
                  src={iconContent}
                  alt={marker.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
            )}
          </Box>
        </PopoverTrigger>

        <PopoverContent
          border="none"
          boxShadow="dark-lg"
          borderRadius="xl"
          overflow="hidden"
          maxW="280px"
          _focus={{ outline: "none" }}
          bg={popoverBg}
        >
          <PopoverArrow bg={popoverBg} />
          <PopoverCloseButton size="sm" top={2} right={2} zIndex={2} />

          {/* Header Image or Gradient */}
          <Box h="6px" w="100%" bgGradient={"null"} />

          <PopoverBody p={4}>
            <VStack align="center" spacing={2}>
              <Flex align="center" justify="center" w="100%">
                <Badge
                  colorScheme={isStore ? "blue" : "red"}
                  fontSize="1.2em"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                >
                  {isStore ? "OFICINA CENTRAL" : "PROYECTO"}
                </Badge>
              </Flex>

              <Box>
                <Heading
                  size="sm"
                  mb={1}
                  color={headingColor}
                  lineHeight="short"
                >
                  {marker.residencial || marker.name}
                </Heading>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                  {marker.client || marker.name}
                </Text>
              </Box>

              <Flex align="start" gap={2}>
                <Icon
                  as={FaMapMarkerAlt}
                  color="gray.400"
                  mt={0.5}
                  boxSize={3}
                />
                <Text fontSize="xs" color={textColor}>
                  {marker.g_maps || marker.address}
                </Text>
              </Flex>

              <Button
                as={Link}
                href={`https://www.google.com/maps/dir/?api=1&destination=${marker.position.lat},${marker.position.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                variant="outline"
                colorScheme={isStore ? "blue" : "red"}
                w="100%"
                rightIcon={<FaExternalLinkAlt />}
                mt={1}
                _hover={{
                  textDecoration: "none",
                  bg: isStore ? "white" : "red.50",
                }}
              >
                Cómo llegar
              </Button>
            </VStack>
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
  const { colorMode } = useColorMode();

  // --- HOOKS MOVED TO TOP LEVEL ---
  const spinnerColor = useColorModeValue("blue.500", "blue.300");
  const errorBgColor = useColorModeValue("gray.50", "gray.900");
  const mapContainerBg = useColorModeValue("gray.200", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const btnBg = useColorModeValue("white", "gray.800");
  const btnColor = useColorModeValue("gray.600", "white");
  const btnHoverBg = useColorModeValue("gray.100", "gray.700");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const google = window.google;

  useEffect(() => {
    const fetchProjectsAndSetPositions = async () => {
      try {
        const data = await getProjects();
        const projectsWithPositions = data
          .map((project) => {
            if (project.lat != null && project.lng != null) {
              return {
                ...project,
                type: "project",
                client: project.name,
                position: { lat: project.lat, lng: project.lng },
              };
            }
            return null;
          })
          .filter((p) => p !== null);

        setProjects(projectsWithPositions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjectsAndSetPositions();
  }, []);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => setMap(null), []);

  const fitBounds = useCallback(() => {
    if (map && google) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(mainStore.position);
      projects.forEach((p) => bounds.extend(p.position));
      map.fitBounds(bounds);
    }
  }, [map, projects, google]);

  useEffect(() => {
    if (projects.length > 0) {
      fitBounds();
    }
  }, [fitBounds, projects.length]);

  const handleMarkerToggle = useCallback((marker) => {
    setSelectedMarker((prev) => (prev?.id === marker?.id ? null : marker));
  }, []);

  const icons = useMemo(() => {
    if (!isLoaded || !google) return null;
    return {
      store: {
        iconContent: logo,
        isSvg: false,
        size: { width: 50, height: 50 },
      },
      project: {
        iconContent: FaBuilding,
        isSvg: true,
        size: { width: 36, height: 36 },
      },
    };
  }, [isLoaded, google]);

  const currentMapStyle = useMemo(() => {
    return colorMode === "light" ? mapStyles.dark : mapStyles.light;
  }, [colorMode]);

  // --- RENDER CONDITIONALS ---
  if (loadError)
    return (
      <Flex
        h="400px"
        align="center"
        justify="center"
        bg={errorBgColor}
        borderRadius="2xl"
      >
        <VStack spacing={3}>
          <Icon as={FaMapMarkerAlt} boxSize={8} color="red.400" />
          <Text color="red.500" fontWeight="bold">
            Error cargando el mapa
          </Text>
          <Text fontSize="sm" color="gray.500">
            Verifique su conexión o clave API
          </Text>
        </VStack>
      </Flex>
    );

  if (!isLoaded || !google || !icons) {
    return (
      <Flex
        align="center"
        justify="center"
        h={{ base: "400px", md: "600px" }}
        bg={mapContainerBg}
        rounded="2xl"
        position="relative"
      >
        <VStack spacing={4}>
          <Spinner
            size="xl"
            color={spinnerColor}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
          />
          <Text
            fontSize="sm"
            color="gray.500"
            animate={{ opacity: [0.5, 1, 0.5] }}
          >
            Cargando ubicaciones...
          </Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <Box
      position="relative"
      w="full"
      h={{ base: "450px", md: "650px" }}
      rounded="2xl"
      overflow="hidden"
      boxShadow="2xl"
      border="1px solid"
      borderColor={borderColor}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
          styles: currentMapStyle,
          disableDefaultUI: false,
        }}
      >
        {/* Custom Controls Layer */}
        <Box position="absolute" top={4} right={4} zIndex={10}>
          <Tooltip label="Centrar mapa" placement="left" hasArrow>
            <Button
              onClick={fitBounds}
              bg={btnBg}
              color={btnColor}
              size="sm"
              shadow="lg"
              _hover={{ bg: btnHoverBg }}
              borderRadius="lg"
            >
              <Icon as={FaCompass} boxSize={5} />
            </Button>
          </Tooltip>
        </Box>

        <CustomMarker
          marker={mainStore}
          isSelected={selectedMarker?.id === mainStore.id}
          onToggleSelect={handleMarkerToggle}
          iconContent={icons.store.iconContent}
          isSvg={icons.store.isSvg}
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
            iconContent={icons.project.iconContent}
            isSvg={icons.project.isSvg}
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
