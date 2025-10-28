import { useMediaQuery } from "@chakra-ui/react";

/**
 * Hook personalizado para detectar si el viewport corresponde a un dispositivo móvil.
 * Centraliza la lógica de `useMediaQuery` para una fácil reutilización y mantenimiento.
 *
 * @returns {boolean} Devuelve `true` si el ancho del viewport es de 768px o menos, `false` en caso contrario.
 */
const useIsMobile = () => {
    // La media query "(max-width: 768px)" define el punto de quiebre para dispositivos móviles.
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    return isMobile;
};

export default useIsMobile;
