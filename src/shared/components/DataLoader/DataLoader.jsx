/**
 * @file DataLoader.jsx
 * @description Declarative data loading wrapper that handles loading, error, and success states.
 * @module shared/components
 */

import React from "react";
import ErrorDisplay from "./ErrorDisplay";

/**
 * @component DataLoader
 * @description Componente Contenedor (Wrapper) que utiliza el patrón de composición (Children) para manejar estados de UI.
 * NOTA: Técnicamente NO es un HOC (Higher-Order Component), sino un "Guard Component" o Wrapper que renderiza condicionalmente.
 * - Si `isLoading` es true -> Muestra el `loadingComponent`.
 * - Si `error` existe -> Muestra el mensaje de error.
 * - Estado base -> Renderiza los `children` (contenido principal).
 * @param {{isLoading: boolean, error: any, children: React.ReactNode, loadingComponent: React.ReactNode}} props
 * @param {boolean} props.isLoading - Si es true, se muestra el `loadingComponent`.
 * @param {*} props.error - Si existe, se muestra un mensaje de error.
 * @param {React.ReactNode} props.children - El contenido a renderizar si la carga fue exitosa y no hay error.
 * @param {React.ReactNode} props.loadingComponent - El componente (ej. Skeletons) a mostrar durante la carga.
 * @returns {JSX.Element} El componente de carga, el mensaje de error o el contenido principal.
 */
const DataLoader = ({ isLoading, error, loadingComponent, children }) => {
  if (isLoading) {
    return loadingComponent;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={
          typeof error === "string"
            ? error
            : error.message || JSON.stringify(error)
        }
      />
    );
  }

  return children;
};

export default DataLoader;
