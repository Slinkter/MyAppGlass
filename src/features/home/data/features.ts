/**
 * @file features.ts
 * @description Local data source for homepage benefit features.
 * @module home/data
 */

import {
  IoIosCalculator,
  IoIosCalendar,
  IoIosKeypad,
  IoMdConstruct,
  IoMdPricetags,
  IoMdSwap,
  IoIosPaper,
} from "react-icons/io";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { FEATURE_TEXTS } from "@/utils/constants";
import { IconType } from "react-icons";

export interface Feature {
  id: number;
  heading: string;
  iconName: string;
  description: string;
}

/**
 * @constant features - An array of objects, each representing a key feature or service offered.
 */
export const features: Feature[] = [
  {
    id: 1,
    heading: FEATURE_TEXTS.PRESUPUESTO_ONLINE_HEADING,
    iconName: "IoIosCalculator",
    description: FEATURE_TEXTS.PRESUPUESTO_ONLINE_DESCRIPTION,
  },
  {
    id: 2,
    heading: FEATURE_TEXTS.VISITA_TECNICA_HEADING,
    iconName: "IoIosCalendar",
    description: FEATURE_TEXTS.VISITA_TECNICA_DESCRIPTION,
  },
  {
    id: 3,
    heading: FEATURE_TEXTS.MATERIALES_HEADING,
    iconName: "IoIosKeypad",
    description: FEATURE_TEXTS.MATERIALES_DESCRIPTION,
  },
  {
    id: 4,
    heading: FEATURE_TEXTS.TECNICOS_CAPACITADOS_HEADING,
    iconName: "IoMdConstruct",
    description: FEATURE_TEXTS.TECNICOS_CAPACITADOS_DESCRIPTION,
  },
  {
    id: 5,
    heading: FEATURE_TEXTS.GARANTIAS_HEADING,
    iconName: "IoMdSwap",
    description: FEATURE_TEXTS.GARANTIAS_DESCRIPTION,
  },
  {
    id: 6,
    heading: FEATURE_TEXTS.METODO_PAGO_HEADING,
    iconName: "HiOutlineBanknotes",
    description: FEATURE_TEXTS.METODO_PAGO_DESCRIPTION,
  },
  {
    id: 7,
    heading: FEATURE_TEXTS.RECIBOS_HEADING,
    iconName: "IoIosPaper",
    description: FEATURE_TEXTS.RECIBOS_DESCRIPTION,
  },
  {
    id: 8,
    heading: FEATURE_TEXTS.PROMOCIONES_HEADING,
    iconName: "IoMdPricetags",
    description: FEATURE_TEXTS.PROMOCIONES_DESCRIPTION,
  },
];

/**
 * @constant iconMap - A mapping of icon names (strings) to their corresponding React icon components.
 */
export const iconMap: Record<string, IconType> = {
  IoIosCalculator: IoIosCalculator,
  IoIosCalendar: IoIosCalendar,
  IoIosKeypad: IoIosKeypad,
  IoMdConstruct: IoMdConstruct,
  IoMdSwap: IoMdSwap,
  HiOutlineBanknotes: HiOutlineBanknotes,
  IoIosPaper: IoIosPaper,
  IoMdPricetags: IoMdPricetags,
};
