import { useCallback, useEffect, useMemo, useState } from "react";
import type { BoxProps } from "@chakra-ui/react";

/** Tiempo máximo esperando la foto: pasado este plazo se muestra la tarjeta igualmente. */
export const IMAGE_REVEAL_TIMEOUT_MS = 7000;

export type RevealStyleProps = Pick<BoxProps, "opacity" | "transition" | "_motionReduce">;

export interface UseImageRevealResult {
  /** `true` cuando la imagen cargó (o venció el plazo máximo). */
  loaded: boolean;
  /** Pásalo a `onLoad` de `ResponsiveImage` / `<img>`. */
  onLoad: () => void;
  /** Props de estilo (opacidad + transición de 1 propiedad) para foto, degradado y textos. */
  reveal: RevealStyleProps;
}

/**
 * Estado de revelado de una tarjeta con imagen.
 * @param timeoutMs - Plazo máximo de espera antes de mostrar la tarjeta aunque la foto no llegue.
 */
export function useImageReveal(timeoutMs: number = IMAGE_REVEAL_TIMEOUT_MS): UseImageRevealResult {
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setLoaded(true), timeoutMs);
    return () => window.clearTimeout(timer);
  }, [loaded, timeoutMs]);

  const reveal = useMemo<RevealStyleProps>(
    () => ({
      opacity: loaded ? 1 : 0,
      transition: "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      _motionReduce: { transition: "none" },
    }),
    [loaded],
  );

  return { loaded, onLoad, reveal };
}
