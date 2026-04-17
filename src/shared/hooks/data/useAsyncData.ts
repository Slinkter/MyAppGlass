/**
 * @file useAsyncData.ts
 * @description State machine hook for managing asynchronous data fetching operations.
 * @module shared/hooks
 */

import { useState, useEffect } from "react";

/**
 * Interface representing the state of an asynchronous operation.
 */
export interface State<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook genérico para fetch de datos con estados loading/error.
 * Elimina código duplicado en múltiples componentes.
 * 
 * @param fetchFunction - La función que retorna la promesa.
 * @param initialData - El valor inicial de data.
 * @returns El estado de la operación asíncrona.
 */
export const useAsyncData = <T>(
  fetchFunction: () => Promise<T>,
  initialData: T
): State<T> => {
  const [state, setState] = useState<State<T>>({
    data: initialData,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let ignore = false;

    fetchFunction()
      .then((data) => {
        if (!ignore) {
          setState({ data: data ?? initialData, isLoading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (!ignore) {
          const errorMessage = error instanceof Error ? error.message : "Error al cargar datos";
          setState({
            data: initialData,
            isLoading: false,
            error: errorMessage,
          });
        }
      });

    return () => {
      ignore = true;
    };
  }, [fetchFunction, initialData]);

  return state;
};
