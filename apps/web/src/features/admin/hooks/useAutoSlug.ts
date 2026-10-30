import { useCallback, useState } from "react";

/** Convierte un texto en slug URL-amigable (sin tildes, minúsculas, guiones). */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/**
 * Gestiona un slug que se autogenera desde el título hasta que el usuario lo edita manualmente.
 */
export const useAutoSlug = () => {
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);

  /** Llamar cuando cambia el título: regenera el slug solo si sigue en modo automático. */
  const syncFromTitle = useCallback(
    (title: string) => {
      if (autoSlug) setSlug(slugify(title));
    },
    [autoSlug]
  );

  /** Llamar cuando el usuario edita el slug a mano: desactiva el modo automático. */
  const setManualSlug = useCallback((value: string) => {
    setAutoSlug(false);
    setSlug(value);
  }, []);

  /** Reinicia el slug (al abrir el modal en modo crear/editar). */
  const resetSlug = useCallback((value: string, auto: boolean) => {
    setSlug(value);
    setAutoSlug(auto);
  }, []);

  return { slug, syncFromTitle, setManualSlug, resetSlug };
};
