"use client";

import React from "react";
import { MediaCard } from "@shared/components/Card/MediaCard";

interface ClientTestimonialCardProps {
  image: string;
  nameClient: string;
  descClient: string;
}

/**
 * @component ClientTestimonialCard
 * @description Tarjeta testimonial de cliente en Home: envoltorio fino de `MediaCard` (sin destino, por eso sin acción).
 */
export const ClientTestimonialCard: React.FC<ClientTestimonialCardProps> = React.memo(({ image, nameClient, descClient }) => (
  <MediaCard
    image={image}
    imageAlt={nameClient}
    title={nameClient}
    description={descClient}
    rootProps={{ as: "article", boxShadow: "none" }}
  />
));

ClientTestimonialCard.displayName = "ClientTestimonialCard";

// Export default preserved for backward compatibility
export default ClientTestimonialCard;
