/**
 * @file useImagePrefetch.ts
 * @description Precarga imágenes en segundo plano para calentar el caché HTTP del navegador.
 * @module shared/hooks/ui
 */

import { useEffect } from "react";

/** URLs ya solicitadas en esta sesión (evita descargas duplicadas entre componentes). */
const requested = new Set<string>();

/** Referencias vivas para que el navegador no cancele la descarga al recolectar el objeto. */
const inflight: HTMLImageElement[] = [];

const whenIdle = (task: () => void): (() => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(task, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(task, 800);
  return () => window.clearTimeout(id);
};

/**
 * Descarga las imágenes indicadas cuando el navegador está libre, con prioridad baja,
 * para que al llegar a la sección ya estén en caché. Las portadas de Firebase Storage
 * se sirven con `Cache-Control: max-age` de un año, así que también acelera las visitas
 * siguientes.
 *
 * @param urls - Imágenes a precargar (se ignoran vacías y repetidas).
 */
export function useImagePrefetch(urls: ReadonlyArray<string | undefined>): void {
  const signature = urls.filter(Boolean).join("|");

  useEffect(() => {
    if (!signature) return;
    const pending = signature.split("|").filter((url) => !requested.has(url));
    if (pending.length === 0) return;

    return whenIdle(() => {
      pending.forEach((url) => {
        requested.add(url);
        const img = new window.Image();
        img.decoding = "async";
        img.fetchPriority = "low";
        img.src = url;
        inflight.push(img);
      });
    });
  }, [signature]);
}
