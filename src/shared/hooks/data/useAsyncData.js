/**
 * @file useAsyncData.js
 * @description State machine hook for managing asynchronous data fetching operations.
 * @module shared/hooks
 */

import { useState, useEffect } from "react";

/**
 * @hook useAsyncData
 * @description Hook genérico para fetch de datos con estados loading/error
 * Elimina código duplicado en múltiples componentes
 * @param {Function} fetchFunction - La función que retorna la promesa
 * @param {*} initialData - El valor inicial de data (por defecto [])
 */
export const useAsyncData = (fetchFunction, initialData = []) => {
  const [state, setState] = useState({
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
      .catch((error) => {
        if (!ignore) {
          setState({
            data: initialData,
            isLoading: false,
            error: error.message || "Error al cargar datos",
          });
        }
      });

    return () => {
      ignore = true;
    };
  }, [fetchFunction, initialData]);

  return state;
};
