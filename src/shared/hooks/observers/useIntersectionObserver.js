// src/hooks/useIntersectionObserver.js
import { useEffect, useState, useRef } from "react";

const useIntersectionObserver = (elementRef, options) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!elementRef || !elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observerRef.current = observer;
    observer.observe(elementRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [elementRef, options]);

  return isVisible;
};

export default useIntersectionObserver;
