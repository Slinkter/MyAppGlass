export const mapStyles = {
  light: [
    { elementType: "geometry", stylers: [{ color: "#f4f4f5" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#18181b" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#e4e4e7" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#d4d4d8" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e4e4e7" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#fafafa" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#e4e4e7" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#fafafa" }],
    },
  ],
  dark: [
    { elementType: "geometry", stylers: [{ color: "#09090b" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#a1a1aa" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#09090b" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#18181b" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#27272a" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#18181b" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#121215" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#18181b" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#121215" }],
    },
  ],
};