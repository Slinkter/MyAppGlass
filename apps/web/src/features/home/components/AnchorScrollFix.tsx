"use client";

/**
 * @file AnchorScrollFix.tsx
 * @description Corrige el destino de los enlaces `#seccion` de la home. Las listas cargan más
 * tarjetas mientras dura el scroll suave, la página crece y la sección queda más abajo de lo
 * calculado. Al terminar el scroll se reajusta hasta 8 veces si la sección no quedó alineada.
 */

import { useEffect } from "react";

const SECTION_IDS = ["beneficios", "servicios", "proyectos", "clientes", "ubicacion"];

function align(id: string, attempt: number) {
  const el = document.getElementById(id);
  if (!el) return;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const delta = el.getBoundingClientRect().top - margin;
  if (Math.abs(delta) <= 4) return;
  if (attempt >= 8) return;
  window.scrollBy({ top: delta, behavior: "auto" });
  // Si la página aún crece (contenido que carga), se vuelve a comprobar.
  window.setTimeout(() => align(id, attempt + 1), 400);
}

export default function AnchorScrollFix() {
  useEffect(() => {
    let timer: number | undefined;
    const schedule = (hashId?: string) => {
      const id = hashId ?? window.location.hash.slice(1);
      if (!SECTION_IDS.includes(id)) return;
      window.clearTimeout(timer);
      // Tras el scroll suave (≈700 ms) y la carga de contenido nuevo.
      timer = window.setTimeout(() => align(id, 0), 900);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href*='#']");
      // El hash lo actualiza el router después del clic: el destino se toma del propio enlace.
      const href = a?.getAttribute("href") ?? "";
      if (href.includes("#")) schedule(href.split("#")[1]);
    };
    document.addEventListener("click", onClick);
    const onHash = () => schedule();
    window.addEventListener("hashchange", onHash);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);
  return null;
}
