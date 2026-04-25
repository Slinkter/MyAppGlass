/**
 * @file features.ts
 * @description Configuration for the company's key value propositions and benefits.
 * @module data
 */

import {
  Calculator,
  CalendarDays,
  Box,
  Construction,
  ShieldCheck,
  Banknote,
  ReceiptText,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { FEATURE_TEXTS } from "@shared/utils/constants";

/**
 * Feature interface representing a key feature or service offered.
 */
export interface Feature {
  id: number;
  heading: string;
  iconName: string;
  description: string;
}

/**
 * An array of objects, each representing a key feature or service offered.
 */
export const features: Feature[] = [
  {
    id: 1,
    heading: FEATURE_TEXTS.PRESUPUESTO_ONLINE_HEADING,
    iconName: "Calculator",
    description: FEATURE_TEXTS.PRESUPUESTO_ONLINE_DESCRIPTION,
  },
  {
    id: 2,
    heading: FEATURE_TEXTS.VISITA_TECNICA_HEADING,
    iconName: "CalendarDays",
    description: FEATURE_TEXTS.VISITA_TECNICA_DESCRIPTION,
  },
  {
    id: 3,
    heading: FEATURE_TEXTS.MATERIALES_HEADING,
    iconName: "Box",
    description: FEATURE_TEXTS.MATERIALES_DESCRIPTION,
  },
  {
    id: 4,
    heading: FEATURE_TEXTS.TECNICOS_CAPACITADOS_HEADING,
    iconName: "Construction",
    description: FEATURE_TEXTS.TECNICOS_CAPACITADOS_DESCRIPTION,
  },
  {
    id: 5,
    heading: FEATURE_TEXTS.GARANTIAS_HEADING,
    iconName: "ShieldCheck",
    description: FEATURE_TEXTS.GARANTIAS_DESCRIPTION,
  },
  {
    id: 6,
    heading: FEATURE_TEXTS.METODO_PAGO_HEADING,
    iconName: "Banknote",
    description: FEATURE_TEXTS.METODO_PAGO_DESCRIPTION,
  },
  {
    id: 7,
    heading: FEATURE_TEXTS.RECIBOS_HEADING,
    iconName: "ReceiptText",
    description: FEATURE_TEXTS.RECIBOS_DESCRIPTION,
  },
  {
    id: 8,
    heading: FEATURE_TEXTS.PROMOCIONES_HEADING,
    iconName: "Tag",
    description: FEATURE_TEXTS.PROMOCIONES_DESCRIPTION,
  },
];

/**
 * A mapping of icon names (strings) to their corresponding React icon components.
 */
export const iconMap: Record<string, LucideIcon> = {
  Calculator: Calculator,
  CalendarDays: CalendarDays,
  Box: Box,
  Construction: Construction,
  ShieldCheck: ShieldCheck,
  Banknote: Banknote,
  ReceiptText: ReceiptText,
  Tag: Tag,
};
