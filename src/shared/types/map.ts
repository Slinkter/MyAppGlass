import React from "react";

export interface MapProject {
  id: string | number;
  name: string;
  residencial: string;
  address: string;
  year: string;
  image?: string;
  photosObra?: Array<{ id: number; image: string; name?: string }>;
  type: "project";
  client: string;
  position: { lat: number; lng: number };
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  type: string;
  client: string;
  position: { lat: number; lng: number };
  image: string;
}

export type MarkerType = StoreLocation | MapProject;

export interface MapIconConfig {
  iconContent: React.ComponentType | string;
  isSvg: boolean;
  size: { width: number; height: number };
}

export interface MapIcons {
  store: MapIconConfig;
  project: MapIconConfig;
}
