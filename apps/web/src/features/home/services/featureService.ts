/**
 * @file featureService.ts
 * @description Service layer for retrieving company features and their corresponding icons.
 * @module home/services
 */

import { features, iconMap, type Feature } from "@/features/home/data/features";
import { type LucideIcon } from "lucide-react";

/**
 * @typedef {Object} GetFeaturesReturn
 * @property {Feature[]} features - Un array de objetos, cada uno representando una característica clave.
 * @property {Record<string, LucideIcon>} iconMap - Un mapeo de nombres de iconos a sus componentes React correspondientes.
 */
export interface GetFeaturesReturn {
  features: Feature[];
  iconMap: Record<string, LucideIcon>;
}

/**
 * Obtiene la lista de todas las características y su mapa de iconos.
 *
 * @returns {GetFeaturesReturn} Un objeto que contiene un array de `Feature`s y un `IconMap`.
 */
export const getFeatures = (): GetFeaturesReturn => {
  return { features, iconMap };
};
