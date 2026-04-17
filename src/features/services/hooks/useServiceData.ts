/**
 * @file useServiceData.ts
 * @description Custom hook for fetching and managing service page data state.
 * @module features/services/hooks
 */

import { useState, useEffect } from "react";
import { getServicePageData, ServicePageData } from "../services/serviceService";

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
  const [pageData, setPageData] = useState<ServicePageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getServicePageData(serviceSlug);
        setPageData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(
            err.message ||
              `No se encontraron datos para el servicio: "${serviceSlug}".`
          );
        } else {
            setError(`No se encontraron datos para el servicio: "${serviceSlug}".`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceSlug) {
      fetchData();
    }
  }, [serviceSlug]);

  return { pageData, isLoading, error };
};
