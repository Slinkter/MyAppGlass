/**
 * @file useServiceData.js
 * @description Custom hook for fetching and managing service page data state.
 * @module features/services/hooks
 */

import { useState, useEffect } from "react";
import { getServicePageData } from "../services/serviceService";

/**
 * Hook to fetch service page data asynchronously.
 * @param {string} serviceSlug - The slug of the service to fetch (e.g., 'ventanas', 'mamparas').
 * @returns {Object} State object containing:
 * - `pageData`: The service data object (or null).
 * - `isLoading`: Boolean loading state.
 * - `error`: Error message string (or null).
 * @remarks
 * - Abstraction layer over `getServicePageData`.
 * - Handles loading and error states automatically.
 * - Used by `ServicePageContainer`.
 */
export const useServiceData = (serviceSlug) => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getServicePageData(serviceSlug);
        setPageData(data);
      } catch (err) {
        setError(
          err.message ||
            `No se encontraron datos para el servicio: "${serviceSlug}".`
        );
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
