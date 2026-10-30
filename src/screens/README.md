# src/screens

Capa de **páginas** (vistas completas) de la arquitectura FSD del proyecto.

- Orden de capas: `app > screens > widgets > features > shared`. `src/app` solo contiene wrappers ligeros (`page.tsx`, `layout.tsx`) que renderizan una pantalla de esta carpeta.
- Una pantalla compone widgets y features; no debe importar de otra pantalla.
- Convención de nombres: subcarpetas y componentes en PascalCase (`Blog`, `Home`, `Admin`, ...). Las subcarpetas grandes (p. ej. `Admin/inventory`, `Admin/sales`) agrupan subcomponentes propios de una sola pantalla; cada archivo debe mantenerse por debajo de ~250 líneas.
