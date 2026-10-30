"use client";
import { useState, useEffect } from "react";
import { env } from "@/shared/config/env";

const LIBRARIES: ("marker" | "drawing" | "geometry" | "places" | "visualization")[] = ["marker"];
const SCRIPT_ID = "google-map-script";
const CALLBACK_NAME = "__gyaGoogleMapsReady";

// Promesa compartida: el script se inyecta una sola vez aunque varios mapas monten a la vez.
let loaderPromise: Promise<void> | null = null;

const isMapsReady = (): boolean =>
  typeof window !== "undefined" && typeof window.google?.maps?.Map === "function";

const loadGoogleMaps = (apiKey: string): Promise<void> => {
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise<void>((resolve, reject) => {
    // Con loading=async el evento "load" llega antes de que la API esté lista;
    // Google invoca este callback cuando la API y las librerías pedidas ya cargaron.
    const globalScope = window as unknown as Record<string, unknown>;
    globalScope[CALLBACK_NAME] = () => {
      delete globalScope[CALLBACK_NAME];
      resolve();
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=${LIBRARIES.join(",")}&loading=async&callback=${CALLBACK_NAME}`;
    script.async = true;
    script.addEventListener("error", () => {
      delete globalScope[CALLBACK_NAME];
      reject(new Error("Error al cargar Google Maps API."));
    });
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    loaderPromise = null;
    document.getElementById(SCRIPT_ID)?.remove();
    throw error instanceof Error ? error : new Error("Error al cargar Google Maps API.");
  });

  return loaderPromise;
};

export const useGoogleMapsLoader = (): { isLoaded: boolean; loadError: Error | undefined } => {
  const apiKey = env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [isLoaded, setIsLoaded] = useState<boolean>(isMapsReady);
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

    if (isMapsReady()) {
      setIsLoaded(true);
      return;
    }

    let cancelled = false;
    loadGoogleMaps(apiKey).then(
      () => {
        if (!cancelled) setIsLoaded(true);
      },
      (error: Error) => {
        if (!cancelled) setLoadError(error);
      },
    );

    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  return { isLoaded, loadError };
};
