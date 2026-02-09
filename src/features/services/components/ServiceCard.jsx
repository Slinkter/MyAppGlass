import React from "react";
import ServiceCardContent from "./ServiceCardContent";

/**
 * @typedef {Object} Service - Representa un servicio individual en la lista general.
 * @property {number} id - Identificador único del servicio.
 * @property {string} image - Ruta o URL de la imagen principal del servicio.
 * @property {string} name - Nombre del servicio.
 * @property {string} link - Enlace externo relacionado con el servicio (ej. Facebook).
 * @property {string} plink - Enlace interno a la página de detalles del servicio (slug).
 */

/**
 * @component ServiceCard
 * @description Container component that manages the state and provides props to ServiceCardContent.
 * Displays an individual service card with image, title, and link to the catalog.
 *
 * @param {Service} props - The service object to display on the card.
 * @returns {JSX.Element} Rendered service card.
 */
const ServiceCard = React.memo(({ image, name, plink }) => {
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);
    const handleImageLoad = React.useCallback(() => setIsImageLoaded(true), []);

    return (
        <ServiceCardContent
            image={image}
            name={name}
            plink={plink}
            isImageLoaded={isImageLoaded}
            handleImageLoad={handleImageLoad}
        />
    );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;