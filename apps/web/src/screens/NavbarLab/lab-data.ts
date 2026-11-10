/**
 * @file lab-data.ts
 * @description Datos compartidos de las 4 variantes de navbar móvil de prueba (`/navbarmobil-1` a `-4`).
 * Los enlaces salen de `MOBILE_NAV_ITEMS` y los datos de contacto de `companyData`.
 */

import { companyData } from "@/shared/config/company-data";
import { MOBILE_NAV_ITEMS } from "@/shared/config/nav-items";

export type LabVariantId = 1 | 2 | 3 | 4;

export interface LabVariantMeta {
  id: LabVariantId;
  route: string;
  name: string;
  summary: string;
}

export const LAB_VARIANTS: readonly LabVariantMeta[] = [
  {
    id: 1,
    route: "/navbarmobil-1",
    name: "Hoja inferior",
    summary:
      "El menú sube desde abajo, en la zona del pulgar. Los enlaces entran escalonados y el fondo se oscurece.",
  },
  {
    id: 2,
    route: "/navbarmobil-2",
    name: "Barra inferior flotante",
    summary:
      "Cuatro destinos siempre a mano. Una pastilla desliza de un destino a otro y no hay menú que abrir.",
  },
  {
    id: 3,
    route: "/navbarmobil-3",
    name: "Cajón lateral",
    summary:
      "Un panel entra por la derecha sobre el contenido. Los enlaces se deslizan en cascada y el resto de la página se atenúa.",
  },
  {
    id: 4,
    route: "/navbarmobil-4",
    name: "Telón de marca",
    summary:
      "Pantalla completa en negro de marca. Cae como un telón y los enlaces se revelan con máscara, en tipografía grande.",
  },
] as const;

/** Enlaces del menú móvil real (sin el comportamiento de acordeón, que no aplica a la prueba). */
export const LAB_ITEMS = MOBILE_NAV_ITEMS.map(({ label, href }) => ({ label, href }));

export type LabItem = (typeof LAB_ITEMS)[number];

/** Alto de la barra superior (incluye la zona segura en iPhone). */
export const LAB_BAR_HEIGHT = "calc(60px + env(safe-area-inset-top, 0px))" as const;

export const LAB_WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
  companyData.whatsappMessage
)}`;

export const LAB_PHONE_HREF = `tel:+51${companyData.whatsappNumber.replace(/^51/, "")}`;

export const LAB_PHONE_LABEL = companyData.whatsappDisplay;
