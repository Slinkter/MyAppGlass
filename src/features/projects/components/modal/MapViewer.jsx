import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Flex, Spinner, useColorModeValue } from "@chakra-ui/react";

/**
 * Componente: MapViewer
 * --------------------------------------------------------------------
 * @description
 * Componente de presentación encargado exclusivamente de renderizar un mapa de Google
 * mediante un iframe. Maneja su propio estado de carga para mejorar la UX.
 *
 * Lógica Interna:
 * - Muestra un `Spinner` de carga mientras el iframe no ha terminado de cargar.
 * - Utiliza el evento `onLoad` del iframe para detectar cuando está listo (`isMapLoaded`).
 * - Aplica una transición de opacidad (fade-in) para que el mapa aparezca suavemente.
 *
 * @param {Object} props
 * @param {string} props.url - La URL completa del embed de Google Maps.
 */
const MapViewer = ({ url }) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const spinnerBg = useColorModeValue("gray.100", "gray.800");

    useEffect(() => {
        setIsMapLoaded(false);
    }, [url]);

    return (
        <>
            {!isMapLoaded && (
                <Flex
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    align="center"
                    justify="center"
                    bg={spinnerBg}
                    zIndex={1}
                >
                    <Spinner size="xl" color="primary.500" thickness="4px" />
                </Flex>
            )}
            <iframe
                title="Google Maps Location"
                src={url}
                width="100%"
                height="100%"
                style={{
                    border: 0,
                    opacity: isMapLoaded ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                }}
                allowFullScreen=""
                loading="lazy"
                onLoad={() => setIsMapLoaded(true)}
            ></iframe>
        </>
    );
};

MapViewer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default MapViewer;
