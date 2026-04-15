import { useJsApiLoader } from "@react-google-maps/api";

// Extraemos el array de librerías fuera del hook para evitar re-cargas innecesarias del script de Google Maps.
// Esto soluciona el aviso de rendimiento: "LoadScript has been reloaded unintentionally!".
const LIBRARIES = ["marker"];

export const useGoogleMapsLoader = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  return { isLoaded, loadError };
};
