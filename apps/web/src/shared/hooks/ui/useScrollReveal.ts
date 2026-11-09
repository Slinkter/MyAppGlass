"use client";
import { useEffect, useRef, useState } from "react";

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Progressive scroll-reveal hook.
 * Content remains visible if JS hasn't hydrated or if prefers-reduced-motion is active.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.12, rootMargin = "0px 0px -40px 0px" } = options;
  const ref = useRef<T | null>(null);
  // Start as true on SSR so content is 100% visible if JS doesn't run
  const [isVisible, setIsVisible] = useState(true);
  const [isArmed, setIsArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const rect = node.getBoundingClientRect();
    // If already in viewport on mount, keep visible without hiding
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    setIsArmed(true);
    setIsVisible(false);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible, isArmed };
}
