import { useState, useEffect } from "react";

/**
 * Custom hook que detecta si un elemento es visible en el viewport.
 * @param {React.RefObject | Element} elementRef - La referencia al elemento del DOM que se quiere observar.
 *   Puede ser un `React.RefObject` (con la propiedad `.current`) o un elemento DOM directo.
 * @param {object} [options] - Opciones para el `IntersectionObserver`.
 * @param {number} [options.threshold=0.1] - Un número o un array de números entre 0 y 1.
 *   Indica qué porcentaje del elemento debe estar visible para que se active el callback.
 *   Un valor de 0.0 significa que tan pronto como un píxel del elemento sea visible, el callback será ejecutado.
 *   Un valor de 1.0 significa que el callback no se ejecutará hasta que cada píxel del elemento sea visible.
 * @param {HTMLElement|null} [options.root=null] - El elemento que es usado como el viewport para la comprobación de la intersección.
 *   Debe ser un ancestro del `target`. Si es `null`, se usa el viewport del documento.
 * @param {string} [options.rootMargin="0px 0px 0px 0px"] - Margen alrededor del `root`.
 *   Especifica un margen para cada lado del `root` que expande o encoge el área de la intersección.
 *   Por ejemplo, "10px 20px 30px 40px" (top, right, bottom, left).
 * @returns {boolean} - Devuelve `true` si el elemento está intersectando (visible) según las opciones, de lo contrario `false`.
 *
 * @example
 * // Ejemplo de uso básico: detecta si el 10% del elemento es visible
 * const myRef = useRef();
 * const isVisible = useIntersectionObserver(myRef, { threshold: 0.1 });
 * // ... en el JSX: <div ref={myRef}>Contenido</div>
 *
 * @example
 * // Ejemplo con diferentes opciones: detecta si el elemento es completamente visible en un contenedor específico
 * const containerRef = useRef();
 * const itemRef = useRef();
 * const isItemFullyVisible = useIntersectionObserver(itemRef, { root: containerRef.current, threshold: 1.0, rootMargin: "0px" });
 * // ... en el JSX:
 * // <div ref={containerRef} style={{ overflowY: 'scroll', height: '300px' }}>
 * //   <div ref={itemRef}>Item a observar</div>
 * // </div>
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
