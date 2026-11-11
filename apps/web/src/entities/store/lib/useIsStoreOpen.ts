"use client";

import { useEffect, useState } from "react";
import { companyData } from "@/shared/config/company-data";

/** Horario centralizado desde companyData (hora de Lima). */
const OPEN_MINUTE = companyData.schedule.openHour * 60;
const CLOSE_MINUTE = companyData.schedule.closeHour * 60;
const REFRESH_MS = 60_000;

const limaDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Lima",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const computeIsOpen = (): boolean => {
  const parts = limaDateTimeFormatter.formatToParts(new Date());
  const partsMap = new Map<string, string>(parts.map((p) => [p.type, p.value]));
  const get = (type: string) => partsMap.get(type) ?? "";
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
