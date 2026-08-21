"use client";
/**
 * @file useServiceData.ts
 * @description Custom hook for fetching and managing service page data state.
 * @module features/services/hooks
 */

import { useState, useEffect } from "react";
import { getServicePageData, ServicePageData } from "@features/services/services/serviceService";
import { servicePageDataMap } from "@features/services/data/servicePageDataMap";

export interface UseServiceDataReturn {
  pageData: ServicePageData | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch service page data asynchronously.
 * @param serviceSlug - The slug of the service to fetch (e.g., 'ventanas', 'mamparas').
 * @returns State object containing pageData, isLoading, error
 */
export const useServiceData = (serviceSlug: string): UseServiceDataReturn => {
  const initialData = serviceSlug ? (servicePageDataMap[serviceSlug] as ServicePageData) || null : null;
  const [pageData, setPageData] = useState<ServicePageData | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getServicePageData(serviceSlug);
        if (isMounted) {
          setPageData(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : `No se encontraron datos para el servicio: "${serviceSlug}".`;
          setError(errorMessage);
          setPageData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (serviceSlug) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [serviceSlug]);

  return { pageData, isLoading, error };
};
