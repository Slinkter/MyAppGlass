"use client";

/**
 * @file useScrollProgress.ts
 * @description Progreso de scroll de un elemento (0 al entrar por abajo, 1 al salir por arriba) expuesto
 * como variable CSS `--p`. Un solo cálculo por fotograma (`requestAnimationFrame`), listener pasivo y
 * solo mientras el elemento está cerca de la pantalla. Con `prefers-reduced-motion` no hace nada.
 */

import { useEffect, useRef } from "react";

export function useScrollProgress<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let queued = false;

    const update = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--p", t.toFixed(3));
    };
    const schedule = () => {
      if (!visible || queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        schedule();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  return ref;
}

export default useScrollProgress;
