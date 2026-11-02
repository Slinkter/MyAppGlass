"use client";

import { useEffect, useState } from "react";

/** Lunes a Sábado, 9:00 – 17:00 (hora de Lima). */
const OPEN_MINUTE = 9 * 60;
const CLOSE_MINUTE = 17 * 60;
const REFRESH_MS = 60_000;

const computeIsOpen = (): boolean => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  if (get("weekday") === "Sun") return false;
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return minutes >= OPEN_MINUTE && minutes < CLOSE_MINUTE;
};

/**
 * Estado "abierto ahora" con la hora de Lima. Devuelve `null` hasta montar en cliente
 * (evita diferencias de hidratación) y se actualiza cada minuto.
 */
export function useIsStoreOpen(): boolean | null {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setIsOpen(computeIsOpen());
    update();
    const id = window.setInterval(update, REFRESH_MS);
    return () => window.clearInterval(id);
  }, []);

  return isOpen;
}
