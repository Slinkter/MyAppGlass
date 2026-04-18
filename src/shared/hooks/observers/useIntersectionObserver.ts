/**
 * @file useIntersectionObserver.ts
 * @description Hook with callback pattern for reliable infinite scroll.
 * @module shared/hooks
 */

import { useEffect, useRef, RefObject } from "react";

/**
 * Hook to observe an element's intersection with its parent or viewport.
 * 
 * @param elementRef - Ref to the DOM element to observe
 * @param onIntersect - Callback fired each time element intersects
 * @param options - IntersectionObserver options
 */
const useIntersectionObserver = (
  elementOrRef: RefObject<Element | null> | Element | null,
  onIntersect: () => void,
  { root = null, rootMargin = "0px", threshold = 0 }: IntersectionObserverInit = {}
): void => {
  const callbackRef = useRef<() => void>(onIntersect);

  // Keep callback ref fresh without re-creating the observer
  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const node = elementOrRef && 'current' in elementOrRef ? elementOrRef.current : elementOrRef;

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
  }, [elementOrRef, rootMargin, threshold, root]);
  // NOTE: onIntersect is intentionally excluded from deps (handled by callbackRef)
};

export default useIntersectionObserver;
