"use client";

import React from "react";
import { MediaCard } from "@shared/components/Card/MediaCard";

interface ClientCardProps {
  image: string;
  nameClient: string;
  descClient: string;
}

/**
 * @component ClientCard
 * @description Tarjeta de cliente: envoltorio fino de `MediaCard` (sin destino, por eso sin acción).
 */
const ClientCard: React.FC<ClientCardProps> = React.memo(({ image, nameClient, descClient }) => (
  <MediaCard
    image={image}
    imageAlt={nameClient}
    title={nameClient}
    description={descClient}
    rootProps={{ as: "article", boxShadow: "none" }}
  />
));

ClientCard.displayName = "ClientCard";

export default ClientCard;
