/**
 * @file useIntersectionObserver.js
 * @description Hook with callback pattern for reliable infinite scroll.
 * @module shared/hooks
 */

import { useEffect, useRef } from "react";

/**
 * @param {React.RefObject} elementRef - Ref to the DOM element to observe
 * @param {Function} onIntersect - Callback fired each time element intersects
 * @param {Object} options - IntersectionObserver options
 */
const useIntersectionObserver = (
  elementRef,
  onIntersect,
  { root = null, rootMargin = "0px", threshold = 0 } = {}
) => {
  const callbackRef = useRef(onIntersect);

  // Keep callback ref fresh without re-creating the observer
  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const node = elementRef?.current;

    if (typeof window !== "undefined" && !window.IntersectionObserver) {
      callbackRef.current?.();
      return;
    }

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callbackRef.current?.();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [elementRef, rootMargin, threshold, root]);
  // NOTE: onIntersect is intentionally excluded from deps (handled by callbackRef)
};

export default useIntersectionObserver;
