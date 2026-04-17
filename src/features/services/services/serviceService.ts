/**
 * @file serviceService.ts
 * @description Service layer for retrieving service catalog and detail page configurations.
 * @module services/services
 */

import { services } from "../data/services";
import { servicePageDataMap } from "../data/servicePageDataMap";
import React from "react";

export interface Service {
  id: number;
  image: string;
  name: string;
  link: string;
  plink: string;
}

export interface ServicePageSEO {
  title: string;
  description: string;
}

export interface ServicePageSystem {
  label: string;
  icon: React.ElementType;
}

export interface ServicePageFeature {
  label: string;
  icon: React.ElementType;
}

export interface GalleryImage {
  id: string | number;
  image: string;
  name?: string;
}

export interface ServicePageData {
  seo: ServicePageSEO;
  systems: ServicePageSystem[];
  features: ServicePageFeature[];
  imageLists: GalleryImage[][];
}

/**
 * Obtiene la lista de todos los servicios disponibles.
 * Simula una llamada a una API o una operación asíncrona.
 *
 * @returns Una promesa que se resuelve con un array de objetos de servicio.
 */
export const getServices = (): Service[] => {
  return services as Service[];
};

/**
 * Obtiene los datos detallados de una página de servicio específica basándose en su 'slug'.
 * Simula una llamada a una API o una operación asíncrona.
 *
 * @param slug - El identificador único (slug) de la página de servicio a obtener.
 * @returns Una promesa que resuelve con un objeto ServicePageData si la página se encuentra.
 */
export const getServicePageData = async (slug: string): Promise<ServicePageData> => {
  const pageData = servicePageDataMap[slug];
  if (!pageData) {
    return Promise.reject(new Error("Página de servicio no encontrada."));
  }
  return Promise.resolve(pageData as ServicePageData);
};

/**
 * Obtiene un servicio específico por su slug (basado en plink).
 * 
 * @param slug - El slug del servicio (ej. "ventana").
 * @returns El objeto del servicio si existe, o undefined.
 */
export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(s => s.plink === `/servicios/${slug}`);
};

