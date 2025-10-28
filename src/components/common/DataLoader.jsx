

import React from "react";

/**
 * @component DataLoader
 * @description Un componente de orden superior para manejar de forma genérica los estados de carga, error y éxito de una operación de datos.
 * @param {{isLoading: boolean, error: any, children: React.ReactNode, loadingComponent: React.ReactNode}} props
 * @param {boolean} props.isLoading - Si es true, se muestra el `loadingComponent`.
 * @param {*} props.error - Si existe, se muestra un mensaje de error.
 * @param {React.ReactNode} props.children - El contenido a renderizar si la carga fue exitosa y no hay error.
 * @param {React.ReactNode} props.loadingComponent - El componente (ej. Skeletons) a mostrar durante la carga.
 * @returns {JSX.Element} El componente de carga, el mensaje de error o el contenido principal.
 */
const DataLoader = ({ isLoading, error, children, loadingComponent }) => {
    if (isLoading) {
        return loadingComponent;
    }

    if (error) {
        // Podríamos tener un componente de error más elaborado aquí
        return <div>Error: {typeof error === 'string' ? error : JSON.stringify(error)}</div>;
    }

    return children;
};

export default DataLoader;
