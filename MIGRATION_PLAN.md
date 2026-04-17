# 🚀 Plan de Migración a TypeScript (Arquitectura GYA)

Este documento detalla la hoja de ruta estructurada y por fases para convertir el código actual en JavaScript/JSX a una base de código estrictamente tipada con TypeScript. Migrar en fases nos permitirá mantener la estabilidad del proyecto y el build continuo operativo sin romper la aplicación.

---

## 🗺️ Fases de la Metamorfosis

### Fase 1: Setup e Infraestructura (El Núcleo TS) ✅ COMPLETADO
Configurar el entorno para que soporte ambos lenguajes simultáneamente durante el proceso.
*   **Dependencias:** Instalación de `typescript`, `@types/react`, `@types/react-dom`, `@types/node`.
*   **Configuración:** Creación de `tsconfig.json`, `tsconfig.app.json` y `tsconfig.node.json` (Vite standards).
*   **Vite:** Adaptación y configuración.
*   **Linting:** Configurar ESLint (`eslint.config.js`) y Prettier para manejar la sintaxis de TypeScript y asegurar Cero Advertencias.

### Fase 2: Configuración (Config), Utilidades (Utils) y Hooks ✅ COMPLETADO
*Renombrar de `.js` a `.ts` y crear Tipos/Interfaces base.*
*   `src/utils/constants.js` ➡️ `.ts`
*   `src/utils/liquidGlassStyles.js` ➡️ `.ts`
*   `src/utils/scroll-to-top.js` ➡️ `.ts`
*   `src/utils/webVitals.js` ➡️ `.ts`
*   `src/config/company-data.js` ➡️ `.ts`
*   `src/config/darkModeManager.js` ➡️ `.ts`
*   `src/config/firebase.js` ➡️ `.ts`
*   `src/config/theme.js` ➡️ `.ts`
*   `src/theme/index.js` ➡️ `.ts`
*   `src/shared/config/designTokens.js` ➡️ `.ts`
*   `src/shared/hooks/index.js` ➡️ `.ts`
*   `src/shared/hooks/data/useAsyncData.js` ➡️ `.ts`
*   `src/shared/hooks/observers/useIntersectionObserver.js` ➡️ `.ts`
*   `src/shared/hooks/ui/useGallery.js` ➡️ `.ts`
*   `src/shared/hooks/ui/useIsMobile.js` ➡️ `.ts`

### Fase 3: Data Contracts (Modelos de Dominio y Servicios) ✅ COMPLETADO
*Aquí definiremos la estructura de la base de datos (Interfaces fuertemente tipadas de Proyectos, Servicios, Clientes).*
*   `src/api/reclamoService.js` ➡️ `.ts`
*   `src/data/bank-accounts.js` ➡️ `.ts`
*   `src/data/clients.js` ➡️ `.ts`
*   `src/data/features.js` ➡️ `.ts`
*   `src/data/nav-items.js` ➡️ `.ts`
*   `src/data/proyectos/*.js` (Ej. palmer.js) ➡️ `.ts`
*   `src/data/gallery/*.js` (Todo el directorio) ➡️ `.ts`
*   `src/features/home/data/*.js` ➡️ `.ts`
*   `src/features/home/services/*.js` ➡️ `.ts`
*   `src/features/projects/data/*.js` ➡️ `.ts`
*   `src/features/projects/services/*.js` ➡️ `.ts`
*   `src/features/services/data/*.js` ➡️ `.ts`
*   `src/features/services/services/*.js` ➡️ `.ts`

### Fase 4: Shared Components & Componentes UI (Chakra/Aura) ✅ COMPLETADO
*Renombrar a `.tsx`. Cada componente declarará sus `Props` vía interface en lugar de depender de PropTypes o asumir los valores dinámicos.*
*   `src/components/ui/*.jsx` (Alert, Button, Checkbox, etc...) ➡️ `.tsx`
*   `src/shared/components/aura/*.jsx` (AuraContainer, AuraHeader, AuraSurface, etc.) ➡️ `.tsx`
*   `src/shared/components/common/*.jsx` ➡️ `.tsx`
*   `src/shared/components/common/index.js` ➡️ `.ts`
*   `src/shared/components/DataLoader/*.jsx` ➡️ `.tsx`
*   `src/shared/components/Image/*.jsx` ➡️ `.tsx`
*   `src/shared/components/navigation/*.jsx` ➡️ `.tsx`
*   `src/shared/components/Layout/ItemGridLayout.jsx` ➡️ `.tsx`
*   `src/shared/components/*.jsx` (HelmetWrapper, DevErrorOverlay) ➡️ `.tsx`

### Fase 5: Estructura Perimetral (Layouts & Navigation) ✅ COMPLETADO
*Definir el tipado de los NavItems y la inyección de temas globales.*
*   `src/layout/MainLayout/*.jsx` ➡️ `.tsx`
*   `src/layout/MainLayout/index.js` ➡️ `.ts`
*   `src/layout/Navbar/*.jsx` (AuraNavbar, MobileNav, etc) ➡️ `.tsx`
*   `src/layout/Navbar/index.js` ➡️ `.ts`
*   `src/layout/Footer/*.jsx` ➡️ `.tsx`
*   `src/layout/Footer/variants/*.jsx` ➡️ `.tsx`
*   `src/layout/FloatingActions/*.jsx` ➡️ `.tsx`

### Fase 6: Features Módulos Específicos (Lógica Fuerte de Componentes) ✅ COMPLETADO
*El grueso del desarrollo y renderizado UI con Props y Custom Hooks.*
*   **Feature: Home**
    *   `src/features/home/components/*.jsx` ➡️ `.tsx`
    *   `src/features/home/components/map/*.jsx` ➡️ `.tsx`
    *   `src/features/home/hooks/*.js` ➡️ `.ts`
*   **Feature: Projects**
    *   `src/features/projects/components/*.jsx` ➡️ `.tsx`
    *   `src/features/projects/components/modal/*.jsx` ➡️ `.tsx`
    *   `src/features/projects/hooks/*.js` ➡️ `.ts`
*   **Feature: Services**
    *   `src/features/services/components/*.jsx` ➡️ `.tsx`
    *   `src/features/services/variants/*.jsx` ➡️ `.tsx`
    *   `src/features/services/variants/detail/*.jsx` ➡️ `.tsx`
    *   `src/features/services/hooks/*.js` ➡️ `.ts`
*   **Feature: Reclamation Book**
    *   `src/features/reclamation-book/components/*.jsx` ➡️ `.tsx`
    *   `src/features/reclamation-book/hooks/*.js` ➡️ `.ts`
    *   (Directorios `index.js` de todas las features a `.ts`)

### Fase 7: Páginas & Rutas de Navegación ✅ COMPLETADO
*   `src/pages/*.jsx` (Home, BankAccounts, Proyecto, ErrorPage, TestPages, etc.) ➡️ `.tsx`
*   `src/pages/variants/*/*.jsx` ➡️ `.tsx`
*   `src/routes/index.jsx` ➡️ `.tsx`
*   `src/routes/serviceRoutes.jsx` ➡️ `.tsx`

### Fase 8: Entry Points (El Destino Final) ✅ COMPLETADO
*La activación técnica completa del tipado estructural y la inyección al DOM.*
*   `src/App.jsx` ➡️ `src/App.tsx`
*   `src/main.jsx` ➡️ `src/main.tsx`
*   Aprobación del estado Build final con validación de Types: `tsc --noEmit`.

---

## 🔒 Reglas Anti-Errores (Strict Mode Checklist)
1. **No Any Policy**: Está expresamente prohibido usar genéricos `any`. Si la data se desconoce, usar `unknown` e implementarle Type-Guards.
2. **Supersede JSDoc**: Todas las descripciones hechas con JSDoc actual se trasladarán a comentarios TypeScript, pero los `@param` estructurales se sustituirán por sentencias `interface` que otorgan IntelliSense nativo.
3. **Cero Warns CLI:** Ningún Commit ni Pull Request será aprobado si `eslint --ext .ts,.tsx` lanza error o si hay bloqueos formales en TypeScript.
