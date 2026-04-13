import { useState, useEffect } from "react";
// @ts-ignore
import { getServicePageData } from "../services/serviceService";

export const useServiceData = (serviceSlug: string | undefined) => {
  const [pageData, setPageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getServicePageData(serviceSlug as string);
        setPageData(data);
      } catch (err: any) {
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
