import React from "react";
import type { StoreLocation } from "@/shared/types/map";

export type { StoreLocation } from "@/shared/types/map";

export const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

export const center = { lat: -12.103252, lng: -76.942035 };

export const mainStore: StoreLocation = {
  id: "store",
  name: "GYA Glass & Aluminum",
  address: "Av. Los Fresnos MZ. H LT. 1250 - La Molina - Lima",
  type: "store",
  client: "Sede Principal",
  position: { lat: -12.103252, lng: -76.942035 },
  image: "https://placehold.co/800x600/18181b/ffffff?text=Sede+Principal+GYA",
};
