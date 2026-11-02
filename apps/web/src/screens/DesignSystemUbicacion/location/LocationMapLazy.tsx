"use client";

import dynamic from "next/dynamic";
import React from "react";
import MapLoader from "@shared/components/map/MapLoader";

/** Mapa de Ubicación cargado solo en el cliente (el script de Google no existe en el servidor). */
const LocationMapLazy = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => <MapLoader />,
});

export default LocationMapLazy;
