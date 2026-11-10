"use client";

/**
 * @file useMotionBudget.ts
 * @description Decide cuánto movimiento usar según el dispositivo y la preferencia del usuario.
 * - "none": `prefers-reduced-motion` activo. Sin animaciones de entrada.
 * - "lite": dispositivo de gama baja (≤ 4 GB de RAM o ≤ 4 núcleos). Sin revelado al hacer scroll,
 *   el contenido aparece directamente para no gastar CPU en Android antiguos.
 * - "full": el resto.
 * En SSR devuelve "full"; el ajuste real ocurre en el cliente tras montar.
 */

import { useEffect, useState } from "react";

export type MotionLevel = "full" | "lite" | "none";

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
}

export function resolveMotionLevel(): MotionLevel {
  if (typeof window === "undefined") return "full";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "none";

  const nav = window.navigator as NavigatorWithHints;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
  return lowMemory || lowCpu ? "lite" : "full";
}

export function useMotionBudget(): MotionLevel {
  const [level, setLevel] = useState<MotionLevel>("full");

  useEffect(() => {
    const update = () => setLevel(resolveMotionLevel());
    update();

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return level;
}
