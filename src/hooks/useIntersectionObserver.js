import { useState, useEffect } from "react";

/**
 * Custom hook que detecta si un elemento es visible en el viewport.
 * @param {React.RefObject} elementRef - La referencia al elemento del DOM que se quiere observar.
 * @param {object} options - Opciones para el IntersectionObserver (threshold, root, rootMargin).
 * @param {number} options.threshold - Un número entre 0 y 1 que indica qué porcentaje del elemento debe estar visible para que se active.
 * @returns {boolean} - Devuelve `true` si el elemento está intersectando (visible), de lo contrario `false`.
 */
const useIntersectionObserver = (elementRef, { threshold = 0.1 } = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Soporte para RefObject (.current) o Elemento DOM directo
    const node =
      elementRef?.current !== undefined ? elementRef.current : elementRef;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [elementRef, threshold]); // Si usamos callback ref, 'elementRef' será el nodo mismo y cambiará al montarse

  return isIntersecting;
};

export default useIntersectionObserver;
