import { useState, useEffect } from "react";

/**
 * @hook useAsyncData
 * @description Hook genérico para fetch de datos con estados loading/error
 * Elimina código duplicado en múltiples componentes
 */
export const useAsyncData = (fetchFunction) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchFunction()
      .then(data => setState({ data, isLoading: false, error: null }))
      .catch(error => setState({ 
        data: null, 
        isLoading: false, 
        error: error.message || 'Error al cargar datos' 
      }));
  }, [fetchFunction]);

  return state;
};
