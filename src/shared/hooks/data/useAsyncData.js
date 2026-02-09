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
    fetchFunction()
      .then((data) =>
        setState({ data: data ?? initialData, isLoading: false, error: null }),
      )
      .catch((error) =>
        setState({
          data: initialData,
          isLoading: false,
          error: error.message || "Error al cargar datos",
        }),
      );
  }, [fetchFunction, initialData]);

  return state;
};
