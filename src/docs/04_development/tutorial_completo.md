# Tutorial Completo: Construyendo una Aplicación Web con React y Chakra UI

**Nivel:** Intermedio a Avanzado  
**Instructor:** Gemini Senior Software Architect

Bienvenido a este tutorial completo donde aprenderás a construir una aplicación web moderna, performante y escalable desde cero, aplicando las mejores prácticas de la industria. Recrearemos la arquitectura y funcionalidades clave del proyecto `MyAppGlass`.

---

## Módulo 1: Configuración del Proyecto con Vite

En este módulo, inicializaremos nuestro proyecto React usando Vite y añadiremos las dependencias esenciales, incluyendo Chakra UI.

### 1.1. Inicializar el Proyecto

Abra su terminal y ejecute los siguientes comandos:

```bash
# 1. Crear el proyecto Vite con la plantilla de React
pnpm create vite my-app-glass --template react

# 2. Navegar al directorio del proyecto
cd my-app-glass

# 3. Inicializar un repositorio de Git (opcional pero recomendado)
git init
```

### 1.2. Instalar Dependencias Clave

Instalaremos Chakra UI y otras librerías fundamentales para nuestro stack.

```bash
pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
pnpm add react-router-dom react-helmet-async react-icons @chakra-ui/icons
```

### 1.3. Configurar Chakra UI

Para que Chakra UI funcione, debemos envolver nuestra aplicación en el `ChakraProvider`.

**Edite `src/main.jsx`:**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
```

¡Felicidades! Ahora tiene un proyecto React con Vite y Chakra UI funcionando.

---

## Módulo 2: Arquitectura de Carpetas y Sistema de Tema

Una buena estructura de proyecto es clave para la mantenibilidad.

### 2.1. Crear la Estructura de Directorios

Dentro de la carpeta `src`, cree las siguientes carpetas:

```
src/
├── components/
│   └── common/
├── config/
├── hooks/
├── layout/
├── pages/
├── services/
├── styles/
└── utils/
```

### 2.2. Crear un Tema Personalizado

Centralizaremos todo nuestro diseño en un archivo de tema.

**Cree `src/config/theme.js`:**

```javascript
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: `"Lora", serif`,
        body: `"Lora", serif`,
    },
    colors: {
        primary: {
            500: "#f44336",
            accent: "#ff5757",
        },
        text: {
            secondary: "#6c757d",
        },
    },
    config: {
        initialColorMode: "system",
        useSystemColorMode: false,
    },
});

export default theme;
```

**Actualice `src/main.jsx` para usar el tema:**

```jsx
// ...
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/theme"; // Importar nuestro tema

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
```

---

## Módulo 3: Creación de un Layout y Enrutamiento

Ahora, crearemos la estructura de navegación principal de nuestra aplicación.

### 3.1. Configurar el Enrutador

Utilizaremos `react-router-dom` para manejar las rutas.

**Cree `src/routes/index.jsx`:**

```jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Por ahora, solo tendremos una página de inicio
const HomePage = () => <div>Página de Inicio</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />, // Se puede añadir más tarde
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
]);
```

**Actualice `src/main.jsx` para usar el enrutador:**

```jsx
// ...
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

// ...
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
```

### 3.2. Crear el Componente de Layout

El `Layout` contendrá elementos persistentes como la barra de navegación y el pie de página. El `App.jsx` original servirá como nuestro punto de entrada al layout.

**Edite `src/App.jsx`:**

```jsx
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

// Asumimos que tenemos un Navbar y Footer
// const Navbar = () => <Box as="header">Barra de Navegación</Box>;
// const Footer = () => <Box as="footer">Pie de Página</Box>;

function App() {
  return (
    <Box>
      {/* <Navbar /> */}
      <Box as="main">
        <Outlet /> {/* Aquí se renderizará la página actual */}
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

export default App;
```

---

## Módulo 4: El Patrón de Carga de Datos Asíncrona

Este es el patrón más importante de nuestra arquitectura refactorizada. Lo implementaremos para la lista de "Proyectos".

### 4.1. Crear el Componente de Skeleton

Un skeleton mejora la UX durante la carga de datos.

**Cree `src/components/projects/ProjectListSkeleton.jsx`:**

```jsx
import { SimpleGrid, Skeleton, Box } from "@chakra-ui/react";

const ProjectListSkeleton = () => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
    {[...Array(6)].map((_, i) => (
      <Box key={i} p={5} boxShadow="lg" bg="white" borderRadius="md">
        <Skeleton height="200px" />
        <Skeleton height="20px" mt={4} />
        <Skeleton height="15px" mt={4} width="70%" />
      </Box>
    ))}
  </SimpleGrid>
);

export default ProjectListSkeleton;
```

### 4.2. Crear la Capa de Servicio

Esta capa abstrae el origen de los datos.

**Cree `src/data/projects.js` (nuestra "base de datos"):**

```javascript
export const projects = [
  { id: 1, name: "Proyecto 1", image: "https://via.placeholder.com/300" },
  { id: 2, name: "Proyecto 2", image: "https://via.placeholder.com/300" },
];
```

**Cree `src/services/projectService.js`:**

```javascript
import { projects } from '../data/projects';

export const getProjects = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simular retraso de red
  return Promise.resolve(projects);
};
```

### 4.3. Crear el Componente Contenedor

Este componente obtendrá los datos y manejará los estados de carga.

**Cree un `DataLoader` genérico en `src/components/common/DataLoader.jsx`:**

```jsx
const DataLoader = ({ isLoading, error, children, loadingComponent }) => {
    if (isLoading) return loadingComponent;
    if (error) return <div>Error: {error}</div>;
    return children;
};
export default DataLoader;
```

**Cree `src/pages/ProjectPage.jsx` (que contendrá nuestra lista):**

```jsx
import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Image, Heading } from "@chakra-ui/react";
import { getProjects } from "../services/projectService";
import DataLoader from "../components/common/DataLoader";
import ProjectListSkeleton from "../components/projects/ProjectListSkeleton";

// Componente de presentación simple
const ProjectCard = ({ name, image }) => (
    <Box p={5} boxShadow="lg" borderRadius="md">
        <Image src={image} alt={name} borderRadius="md" />
        <Heading size="md" mt={4}>{name}</Heading>
    </Box>
);

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={5}>Nuestros Proyectos</Heading>
      <DataLoader
        isLoading={isLoading}
        error={error}
        loadingComponent={<ProjectListSkeleton />}
      >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
            ))}
        </SimpleGrid>
      </DataLoader>
    </Box>
  );
};

export default ProjectPage;
```

Ahora puede añadir `ProjectPage` a su enrutador para verlo en acción. Este patrón (Contenedor con `useEffect` + `DataLoader` + `Skeleton`) es la base para todas las vistas que dependen de datos asíncronos.

---

## Módulo 5: Componentes Avanzados y Hooks

### 5.1. Variante de Componente

Como se describe en nuestra [Guía de Estilos](./doc/chakra-ui-style-guidelines.md), las variantes son la forma correcta de reutilizar estilos.

**Añada esto a `src/config/theme.js`:**

```javascript
// ... dentro de extendTheme
components: {
    Card: {
        variants: {
            glass: (props) => ({
                backdropFilter: "blur(20px)",
                bg: props.colorMode === "dark" ? "rgba(20, 20, 20, 0.7)" : "rgba(255, 255, 255, 0.7)",
                // ... más estilos
            }),
        },
    },
},
```

### 5.2. Hook Personalizado

Para componentes complejos con mucha lógica de estado, extraemos esa lógica a un hook.

**Cree `src/hooks/useCounter.js` (ejemplo simple):**

```javascript
import { useState } from "react";

export const useCounter = (initialValue = 0) => {
    const [count, setCount] = useState(initialValue);
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    return { count, increment, decrement };
};
```

**Uso en un componente:**

```jsx
import { useCounter } from "../hooks/useCounter";

const CounterComponent = () => {
    const { count, increment, decrement } = useCounter();
    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
};
```

Este mismo principio se aplicó para crear el hook `useGallery` a partir de la lógica del componente `Gallery`.

---

Este tutorial cubre los conceptos y patrones arquitectónicos clave aplicados durante la refactorización del proyecto. Al seguir estos patrones, asegurará que su aplicación sea robusta, escalable y un placer de mantener.
