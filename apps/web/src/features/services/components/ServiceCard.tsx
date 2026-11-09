"use client";

import React from "react";
import RouterLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaCard } from "@shared/components/Card/MediaCard";

export interface ServiceCardProps {
  image: string;
  name: string;
  category?: string;
  description?: string;
  plink: string;
  index?: number;
  onLoadComplete?: () => void;
  loading?: "lazy" | "eager";
  isLCP?: boolean;
}

/**
 * @component ServiceCard
 * @description Tarjeta de servicio: enlace a la página del servicio sobre `MediaCard`.
 */
const ServiceCard: React.FC<ServiceCardProps> = React.memo(({
  image,
  name,
  description,
  plink,
  loading = "lazy",
  isLCP = false,
}) => (
  <RouterLink href={plink} style={{ width: "100%", height: "100%", textDecoration: "none" }}>
    <MediaCard
      image={image}
      imageAlt={`Servicio de ${name} - GYA Glass & Aluminum`}
      title={name}
      description={description}
      actionIcon={ArrowUpRight}
      loading={loading}
      isLCP={isLCP}
    />
  </RouterLink>
));

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
