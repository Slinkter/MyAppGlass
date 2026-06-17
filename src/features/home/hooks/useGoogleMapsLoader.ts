import { useJsApiLoader } from "@react-google-maps/api";
import { env } from "@/shared/config/env";

// Extract libraries array outside the hook to avoid unnecessary re-loading of the Google Maps script.
// This resolves the performance warning: "LoadScript has been reloaded unintentionally!".
const LIBRARIES: ("marker" | "drawing" | "geometry" | "places" | "visualization")[] = ["marker"];

export const useGoogleMapsLoader = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  return { isLoaded, loadError };
};
