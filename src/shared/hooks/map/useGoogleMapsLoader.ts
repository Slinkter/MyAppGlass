import { useJsApiLoader } from "@react-google-maps/api";
import { env } from "@/shared/config/env";

const LIBRARIES: ("marker" | "drawing" | "geometry" | "places" | "visualization")[] = ["marker"];

export const useGoogleMapsLoader = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  return { isLoaded, loadError };
};
