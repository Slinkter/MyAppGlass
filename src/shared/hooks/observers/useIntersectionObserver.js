/**
 * @file useIntersectionObserver.js
 * @description Hook robusto para detectar visibilidad con fallback para navegadores antiguos.
 * @module shared/hooks
 */

import { useEffect, useState } from "react";

const useIntersectionObserver = (elementRef, { root = null, rootMargin = "0px", threshold = 0 } = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef?.current;
    
    // Fallback para navegadores MUY antiguos sin IntersectionObserver
    if (typeof window !== "undefined" && !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [elementRef, rootMargin, threshold, root]);

  return isVisible;
};

export default useIntersectionObserver;
