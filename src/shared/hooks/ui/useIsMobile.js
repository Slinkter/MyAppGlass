import { useMediaQuery } from "@chakra-ui/react";

/**
 * Hook personalizado para detectar si el viewport corresponde a un dispositivo móvil.
 * Centraliza la lógica de `useMediaQuery` para una fácil reutilización y mantenimiento.
 *
 * @returns {boolean} Devuelve `true` si el ancho del viewport es de 768px o menos, `false` en caso contrario.
 *
 * @example
 * // Ejemplo de uso en un componente React
 * import { Text } from '@chakra-ui/react';
 * import useIsMobile from '@/hooks/useIsMobile';
 *
 * function ResponsiveComponent() {
 *   const isMobile = useIsMobile();
 *
 *   return (
 *     <Text>
 *       {isMobile ? "Estás en un dispositivo móvil" : "Estás en un dispositivo de escritorio"}
 *     </Text>
 *   );
 * }
 */
const useIsMobile = () => {
    // La media query "(max-width: 768px)" define el punto de quiebre para dispositivos móviles.
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    return isMobile;
};

export default useIsMobile;
