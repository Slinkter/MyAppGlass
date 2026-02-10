/**
 * @file ServiceCard.jsx
 * @description Card component for displaying a service summary, wrapping `ServiceCardContent`.
 * @module services/components
 */

import React from "react";
import ServiceCardContent from "./ServiceCardContent";

/**
 * @typedef {Object} Service - Represents an individual service in the general list.
 * @property {number} id - Unique identifier for the service.
 * @property {string} image - Path or URL of the main image for the service.
 * @property {string} name - Name of the service.
 * @property {string} link - External link related to the service (e.g., Facebook).
 * @property {string} plink - Internal link to the service's detail page (slug).
 */

/**
 * @component ServiceCard
 * @description Displays an individual service card with an image, name, and a link to its detail page.
 * This component is memoized for performance optimization.
 *
 * @param {object} props - The properties for the ServiceCard component.
 * @param {string} props.image - The URL or path to the service's image.
 * @param {string} props.name - The name of the service.
 * @param {string} props.plink - The internal path (slug) to the service's detail page.
 * @param {boolean} [props.preloaded=false] - Indicates if the image should be preloaded or forced to show.
 * @returns {JSX.Element} The rendered service card.
 */
const ServiceCard = React.memo(({ image, name, plink, preloaded }) => {
  return (
    <ServiceCardContent
      image={image}
      name={name}
      plink={plink}
      forceShow={preloaded}
    />
  );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
