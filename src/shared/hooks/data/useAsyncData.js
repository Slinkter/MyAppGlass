/**
 * @file useAsyncData.js
 * @description State machine hook for managing asynchronous data fetching operations.
 * @module shared/hooks
 */

import { useState, useEffect, useRef } from "react";

/**
 * @hook useAsyncData
 * @description Hook genérico para fetch de datos asíncronos con estados loading/error/success.
 *
 * WHY: Las dependencias del `useEffect` deben ser valores estables para evitar bucles
 * infinitos de re-render. `initialData` (cuando es `[]`) crea una nueva referencia en
 * cada render, y `fetchFunction` puede no ser estable si se define inline.
 * Solución: capturar `initialData` en un `useRef` (estable por identidad) y documentar
 * que `fetchFunction` DEBE ser una función estable (nivel de módulo o memoizada con useCallback).
 *
 * @param {Function} fetchFunction - La función estable que retorna la promesa.
 *   ⚠️ DEBE ser una referencia estable (función de módulo o `useCallback`).
 *   Si se pasa una función inline, usar `useCallback` en el llamador.
 * @param {*} initialData - El valor inicial de data (capturado solo en el primer render).
 * @returns {{ data: *, isLoading: boolean, error: string|null }}
 */
export const useAsyncData = (fetchFunction, initialData = []) => {
  // WHY: Capturamos `initialData` en un ref para que su identidad sea siempre
  // la misma referencia. Esto evita que un literal `[]` en el caller
  // recree la dependencia y dispare un loop infinito en el useEffect.
  const initialDataRef = useRef(initialData);

  const [state, setState] = useState({
    data: initialDataRef.current,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const fallback = initialDataRef.current;

    fetchFunction()
      .then((data) => {
        if (!cancelled) {
          setState({ data: data ?? fallback, isLoading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({
            data: fallback,
            isLoading: false,
            error: error.message || "Error al cargar datos",
          });
        }
      });

    // WHY: Cleanup para evitar actualizaciones de estado en componentes
    // desmontados (memory leaks / React warnings).
    return () => {
      cancelled = true;
    };
    // WHY: Solo `fetchFunction` como dependencia. `initialDataRef` es estable
    // por naturaleza de los refs. Si `fetchFunction` cambia (ej. parámetros
    // de filtro), el fetch se re-ejecuta correctamente.
  }, [fetchFunction]);

  return state;
};
