Eres un ingeniero de software. Vas a realizar una auditoría profunda del proyecto React y entregar un plan de refactor y mejoras. Sigue este diagnóstico y checklist.

1. Objetivo

-   Auditar imports, uso de datos (listas a renderizar), arquitectura, y prácticas ECMAScript.
-   Detectar Prop Drilling y componentes grandes; proponer refactor en hooks/components/pages/data/etc.
-   Revisar imágenes, rendimiento (React.memo, useCallback, useMemo), y configurar ESLint/JSDoc al final.

2. Pasos de auditoría (inmediatos)

-   Escaneo de dependencias e imports: identificar imports no usados y duplicados.
-   Revisar cada lista renderizada:
    -   Verificar key únicas y estables.
    -   Añadir paginación o virtualización para listas grandes (react-window/react-virtualized).
    -   Extraer fetching a services/hooks (no lógica en UI).
-   Identificar componentes con >300 líneas o con demasiadas responsabilidades:
    -   Separar en componente presentacional + contenedor o hook personalizado.
    -   Reducir Prop Drilling: introducir Context o custom hook (useAppState) o estado global si es necesario.
-   Performance:
    -   Añadir React.memo en componentes puramente presentacionales.
    -   Memoizar handlers con useCallback y valores computados con useMemo.
    -   Cargar componentes pesados con React.lazy + Suspense.
-   Imágenes:
    -   Convertir a formatos modernos (webp/avif) donde sea posible.
    -   Añadir srcSet y sizes para responsive, y loading="lazy" para imágenes no visibles inicialmente.
    -   Auditar assets en carpeta assets/images y eliminar duplicados.
-   Calidad de código:
    -   Añadir/afinar ESLint (extends: eslint:recommended, plugin:react/recommended, plugin:jsx-a11y/recommended; o Airbnb) y Prettier.
    -   Añadir JSDoc básico para funciones exportadas y hooks.
    -   Configurar script: lint, format, test.
-   Tests:
    -   Añadir tests básicos para componentes críticos (React Testing Library) y pruebas de snapshot selectivas.

3. Estructura de carpetas recomendada (ejemplo mínimo)

-   src/
    -   components/ // componentes pequeños, puros (presentational)
    -   containers/ // componentes que gestionan estado y lógica
    -   hooks/ // hooks reutilizables (useFetchTodos, useAuth)
    -   pages/ // páginas/rutas
    -   services/ // llamadas a API / adapters
    -   data/ // fixtures / mocks locales
    -   assets/images // imágenes optimizadas
    -   utils/ // utilidades puras
    -   styles/ // css / scss global y variables

4. Ejemplos rápidos (conceptos)

-   Evitar prop drilling: crear hook o contexto para datos compartidos en muchos niveles.
-   Memoización:
    -   Componentes puros => export default React.memo(Component)
    -   Handlers => const onClick = useCallback(() => {...}, [deps])
    -   Computations => const total = useMemo(() => expensiveCalc(items), [items])

5. Prioridad de trabajo (MVP)

-   Alto: arreglar keys en listas, extraer fetch a hooks, eliminar renders innecesarios.
-   Medio: refactor componentes grandes, imagenes y lazy-loading.
-   Bajo: ESLint/JSDoc cobertura y tests adicionales.

6. Entregables que entregaré (por iteración)

-   PRs pequeños y enfocados: 1) extracción de hook de datos + tests, 2) refactor 1-2 componentes grandes, 3) optimizaciones de imagen y memo, 4) configuración ESLint/Prettier/JSDoc.
-   Lista de archivos modificados con resumen de cambio y ejemplos de código.

7. Consideraciones finales

-   Mantener commits atómicos y descripciones claras.
-   Medir antes/después (bundle size, lighthouse, renders) para validar mejoras.
-   Revisar backend al final para optimizar endpoints y evitar overfetching.

8. Acciones inmediatas (comandos y archivos sugeridos)

-   Comandos rápidos para iniciar auditoría:

    -   npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-jsx-a11y
    -   npx eslint --init
    -   npx depcheck
    -   npx source-map-explorer build/static/js/\*.js (si usas CRA) o analizar bundle con webpack-bundle-analyzer
    -   npm run lint (configurar script en package.json)

-   Archivos sugeridos a crear (iteración 1):

    -   c:\Users\luisj\Documents\MyAppGlass\.eslintrc.js
    -   c:\Users\luisj\Documents\MyAppGlass\.prettierrc
    -   src\hooks\useFetchData.ts (extrae fetch de componentes)
    -   src\components\ItemList\ItemList.tsx (componente presentacional + React.memo)
    -   src\containers\ItemListContainer.tsx (usa hook, pasa datos al presentacional)
    -   scripts\audit-images.js (pequeño script para detectar imágenes grandes/duplicadas)

-   Plantilla mínima .eslintrc.js (ejecutar como referencia):

    -   extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'prettier']
    -   env: { browser: true, es2021: true, node: true }
    -   parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 12, sourceType: 'module' }

-   Ejemplo de pasos para refactor rápido (PR pequeño):
    1. Identificar 1 componente grande con prop drilling.
    2. Extraer fetching a src/hooks/useFetchData.ts.
    3. Crear presentational ItemList (React.memo) y container que use el hook.
    4. Añadir keys estables y usar useCallback para handlers.
    5. Ejecutar lint y tests, medir rendimiento.

9. Entregables inmediatos

-   PR 1: useFetchData + ItemList refactor + tests unitarios básicos.
-   PR 2: Optimización de imágenes (convertir a webp, lazy-loading).
-   PR 3: ESLint/Prettier + configuración básica JSDoc.

"Tu rol es un Ingeniero Arquitecto React. Tu misión es eliminar la duplicación masiva en las páginas de servicio. 1. Crea un componente 'ServicePageContainer.jsx' que cargue los datos estáticos de forma dinámica (basado en un slug de ruta/URL). 2. Este nuevo contenedor debe reemplazar la lógica de todos los archivos \*Page.jsx duplicados. 3. El componente debe ser creado en el directorio de servicio. 4. Devuelve el CÓDIGO COMPLETO de 'ServicePageContainer.jsx' y una lista de los archivos originales que deben ser ELIMINADOS (ej. VentanaPage.jsx, MamparaPage.jsx)." @src no te olvides que el proyecto tiene router bien estructura no lo malogres
