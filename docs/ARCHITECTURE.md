# 🏗️ Arquitectura de Software - GYA Glass & Aluminum

Este documento detalla la estructura técnica, flujos de datos y patrones de diseño utilizados en el proyecto.

## 📐 Principios Fundamentales
- **Feature-Based Architecture (FBA):** Organización por dominios de negocio.
- **Atomic Design + Aura System:** Componentes escalables basados en la proporción áurea (`phi`).
- **Clean Architecture:** Desacoplamiento total entre servicios de datos y UI.

## 🔄 Flujo de Datos (Filtrado e Infinite Scroll)

```text
+---------------------+
|    Service/Project  |  <-- Fuentes de Datos (Static/CMS)
|       Data          |
+----------+----------+
           |
           v
+----------+----------+      +--------------------------+
|   Feature Service   | <--- |   projectService.ts      |
|  (Logic Layer)      |      |   serviceService.ts      |
+----------+----------+      +--------------------------+
           |
           v
+----------+----------+      +--------------------------+
|  useFilterableList  | <--- |  useTransition (Concurrent)|
|    (Custom Hook)    |      |  Intersection Observer   |
+----------+----------+      +--------------------------+
           |
           v
+----------+----------+      +--------------------------+
|   ItemGridLayout    | <--- |  Staggered Animations    |
|   (Orchestrator)    |      |  Responsive Grid        |
+----------+----------+      +--------------------------+
           |
           v
+----------+----------+
|    UI Component     |  <-- Rendering (ProjectCard/ServiceCard)
|   (Final Output)    |
+---------------------+
```

## 🧩 Patrones de Composición (Compound Components)

Utilizamos el patrón de componentes compuestos para elementos complejos como la Galería y los Modales, permitiendo una API declarativa y flexible.

```text
<Gallery.Root>
  <Flex>
    <Gallery.Viewer />      <-- Visor Principal
    <Gallery.Thumbnails />  <-- Tira de Miniaturas
  </Flex>
</Gallery.Root>
```

## 📁 Estructura de Directorios

- `src/app/`: Rutas de Next.js (Server Components).
- `src/features/`: Lógica de dominio (Projects, Services, Home).
- `src/shared/`: Componentes, hooks y utilidades reutilizables.
- `src/theme/`: Configuración central del Aura Design System (Chakra v3).
- `public/images/`: Assets WebP optimizados.

---
*Documentación generada con ascii-diagram-boxflow.*
