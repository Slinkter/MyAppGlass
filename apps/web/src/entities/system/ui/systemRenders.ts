/**
 * Renders arquitectónicos referenciales por servicio y serie cuando aún no
 * existen fotografías reales de obra en Firestore/Storage.
 */

const normalizeKey = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const WINDOW_RENDERS: Record<string, string> = {
  "serie 20": "/images/renders/ventana/serie-20.webp",
  "serie 28": "/images/renders/ventana/serie-28.webp",
  "serie 29": "/images/renders/ventana/serie-29.webp",
  "serie 3825": "/images/renders/ventana/serie-3825.webp",
  "serie 3831": "/images/renders/ventana/serie-3831.webp",
  "serie 42": "/images/renders/ventana/serie-42.webp",
  "serie 80": "/images/renders/ventana/serie-80.webp",
  "corrediza vco 031": "/images/renders/ventana/vco-031.webp",
  "corrediza vco 036": "/images/renders/ventana/vco-036.webp",
  "corrediza vco 042": "/images/renders/ventana/vco-042.webp",
};

const SERVICE_RENDERS: Record<string, Record<string, string>> = {
  ventana: WINDOW_RENDERS,
  mampara: {
    "serie 80": "/images/lab/mampara-europea-serie80.webp",
  },
  ducha: {
    "kit de ducha de 1 hoja": "/images/lab/box-ducha-kit-frontal.webp",
  },
};

export function resolveSystemRenderUrl(
  serviceSlug: string,
  systemName: string,
): string | undefined {
  const slugKey = normalizeKey(serviceSlug);
  const sysKey = normalizeKey(systemName);
  return SERVICE_RENDERS[slugKey]?.[sysKey];
}
