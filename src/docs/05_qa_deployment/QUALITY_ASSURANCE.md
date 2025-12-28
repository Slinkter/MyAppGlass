# ✅ Aseguramiento de Calidad (Quality Assurance)

## 1. Estrategia de Pruebas

Actualmente, el proyecto prioriza pruebas manuales exhaustivas y validación de código estático (Linting).

### Niveles de Prueba
1.  **Análisis Estático (Linting):**
    -   Herramienta: ESLint.
    -   Ejecución: `pnpm lint`.
    -   Objetivo: Detectar errores de síntaxis, variables no usadas y violaciones de Hooks.
2.  **Pruebas Manuales (Exploratorias):**
    -   Verificación de layouts en diferentes tamaños de pantalla (Mobile, Tablet, Desktop).
    -   Validación del flujo completo de "Libro de Reclamaciones" (Envío -> Email -> Confirmación).
    -   Comprobación de enlaces rotos y cargas de imágenes.

## 2. Checklist de Pre-Despliegue

Antes de subir a producción, verificar:

- [ ] `pnpm build` se ejecuta sin errores.
- [ ] No hay errores en la consola del navegador (`F12`).
- [ ] El formulario de contacto envía correos correctamente (ambiente de prueba).
- [ ] Las imágenes principales cargan (LCP aceptable).

## 3. Futuras Mejoras de QA

-   Implementar **Tests Unitarios** con `Vitest` para funciones utilitarias y Hooks complejos (`useReclamoForm`).
-   Implementar **Tests E2E** con `Cypress` o `Playwright` para flujos críticos.
