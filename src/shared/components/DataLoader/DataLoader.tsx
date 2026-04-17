/**
 * @file DataLoader.tsx
 * @description Declarative data loading wrapper that handles loading, error, and success states.
 * @module shared/components
 */

import React from "react";
import ErrorDisplay from "./ErrorDisplay";

interface DataLoaderProps {
  isLoading: boolean;
  error: unknown;
  children: React.ReactNode;
  loadingComponent: React.ReactNode;
}

/**
 * @component DataLoader
 * @description Componente Contenedor (Wrapper) que utiliza el patrón de composición (Children) para manejar estados de UI.
 * - Si `isLoading` es true -> Muestra el `loadingComponent`.
 * - Si `error` existe -> Muestra el mensaje de error.
 * - Estado base -> Renderiza los `children` (contenido principal).
 */
const DataLoader: React.FC<DataLoaderProps> = ({ isLoading, error, loadingComponent, children }) => {
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    const getErrorMessage = (err: unknown): string => {
      if (typeof err === "string") return err;
      if (err instanceof Error) return err.message;
      try {
        return JSON.stringify(err);
      } catch {
        return "Unknown error";
      }
    };

    return (
      <ErrorDisplay
        message={getErrorMessage(error)}
      />
    );
  }

  return <>{children}</>;
};

export default DataLoader;
