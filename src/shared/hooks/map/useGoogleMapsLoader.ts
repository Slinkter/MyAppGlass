"use client";
import { useState, useEffect } from "react";
import { env } from "@/shared/config/env";

const LIBRARIES: ("marker" | "drawing" | "geometry" | "places" | "visualization")[] = ["marker"];

export const useGoogleMapsLoader = (): { isLoaded: boolean; loadError: Error | undefined } => {
  const apiKey = env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    return typeof window !== "undefined" && Boolean(window.google?.maps);
  });
  const [loadError, setLoadError] = useState<Error | undefined>(() => {
    if (!apiKey) {
      return new Error("Google Maps API Key no configurada.");
    }
    return undefined;
  });

  useEffect(() => {
    if (!apiKey) {
      setLoadError(new Error("Google Maps API Key no configurada."));
      return;
    }

    if (typeof window === "undefined") return;

    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    const scriptId = "google-map-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setLoadError(new Error("Error al cargar Google Maps API."));

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=${LIBRARIES.join(",")}`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", handleLoad);
      script.addEventListener("error", handleError);
      document.head.appendChild(script);
    } else {
      script.addEventListener("load", handleLoad);
      script.addEventListener("error", handleError);
    }

    return () => {
      if (script) {
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
      }
    };
  }, [apiKey]);

  return { isLoaded, loadError };
};

