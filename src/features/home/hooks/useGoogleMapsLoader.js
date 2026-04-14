import { useJsApiLoader } from "@react-google-maps/api";

export const useGoogleMapsLoader = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["marker"],
  });

  return { isLoaded, loadError };
};
