# 🚀 Plan de Optimización de Recursos (High Performance)

Este plan detalla las fases para optimizar el rendimiento y el consumo de memoria de la aplicación MyAppGlass, aplicando principios de ciencias de la computación (Notación Big O) y optimizaciones nativas de React/Next.js.

## Fase 1: Optimización de Renderizado (React Memoization)
*El objetivo es evitar que el navegador malgaste CPU recalculando cosas que no han cambiado.*

*   **Auditoría de Re-renders:** Identificar componentes que se renderizan demasiadas veces usando React Developer Tools (Profiler).
*   **Implementación de `useMemo`:** Envolver cálculos costosos (ej. filtrado de listas de proyectos o servicios) en `useMemo` para que solo se ejecuten cuando sus dependencias cambien.
*   **Implementación de `useCallback`:** Envolver funciones pasadas como *props* a componentes hijos puros, evitando que rompan la memoización del hijo.
*   **Uso de `React.memo`:** Proteger componentes UI de bajo nivel (ej. `ProjectCard`, `ServiceCard`, `GlassCard`) para que solo se repinten si sus *props* cambian.

## Fase 2: Complejidad Algorítmica (Optimización Big O)
*El objetivo es reducir el tiempo que tardan las operaciones en arreglos de datos usando estructuras más eficientes.*

*   **De O(n) a O(1) en Búsquedas:** Refactorizar las búsquedas dentro de arreglos estáticos grandes. Si actualmente se usa `array.find(item => item.id === id)` (que es O(n), lineal), lo cambiaremos a un **Diccionario/HashMap** de JavaScript (`const map = { id: item }`) para que las búsquedas sean O(1) (instantáneas).
*   **Optimización de Iteraciones:** Revisar funciones en la capa `features/` (ej. carga de datos del blog o galería) para asegurar que no haya *loops anidados* innecesarios que causen una complejidad O(n²).

## Fase 3: Code Splitting y Carga Perezosa (Lazy Loading)
*El objetivo es descargar solo el JavaScript que el usuario necesita en ese instante (reduciendo el tamaño del bundle inicial).*

*   **Carga Diferida de Componentes Pesados:** Usar `next/dynamic` para importar dinámicamente componentes debajo del "pliegue" (below the fold) o modales pesados. 
    *   *Ejemplo:* El visualizador de imágenes de la galería o el formulario de contacto no necesitan cargar en la pantalla inicial de inicio.
*   **Optimización de Librerías Externas:** Asegurar que los íconos (`Lucide React`) o componentes de `Framer Motion` se estén importando correctamente (Tree-Shaking) para no arrastrar la librería entera.

## Fase 4: Optimización de Assets y Red
*El objetivo es priorizar lo visual y deferir scripts no esenciales.*

*   **Pre-carga Estratégica (Prefetching):** Asegurar que las imágenes de cabecera de las páginas usen la propiedad `priority={true}` de Next.js Image para reducir el *Largest Contentful Paint (LCP)*.
*   **Lazy Loading en Imágenes y Videos:** Verificar que todos los assets secundarios (como las imágenes de la galería inferior) mantengan `loading="lazy"`.
*   **Terceros (Third-party Scripts):** Si hay scripts externos (Analytics, WhatsApp Float), cargarlos usando la estrategia `strategy="lazyOnload"` del componente `Script` de Next.js para que no bloqueen la carga de la UI principal.

---
**¿Cómo proceder?**
Se recomienda abordar **una fase a la vez**, creando una rama específica (ej. `perf/fase1-memoization`), implementando las mejoras y realizando un `pnpm build` para comparar la reducción de milisegundos y el tamaño del bundle frente a la versión actual.
