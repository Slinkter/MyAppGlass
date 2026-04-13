# GYA Glass & Aluminum - Evolución Next.js 15

Aplicación web corporativa de alto rendimiento para **GYA Glass & Aluminum S.A.C.**, migrada a una arquitectura moderna basada en **Next.js 15**, **TypeScript** y **Chakra UI v3**. Este sistema sirve como portafolio premium, catálogo de servicios interactivo y canal de cumplimiento legal (Libro de Reclamaciones).

## 🚀 Arquitectura "GYA Evolution" (v2026.04)

El proyecto ha sido transformado de una SPA (Vite) a una aplicación robusta con **App Router**, priorizando el renderizado en el servidor (SSR/RSC) y la seguridad de tipos.

### Stack Tecnológico Principal

- **Framework:** [Next.js 15.5+](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript 6.0+](https://www.typescriptlang.org/)
- **UI & Design System:** [Chakra UI v3](https://chakra-ui.com/) (Aura Design System v2.0)
- **Animaciones:** [Framer Motion 12+](https://www.framer.com/motion/)
- **Backend & Auth:** [Firebase v12+](https://firebase.google.com/)
- **Gestión de Paquetes:** [pnpm](https://pnpm.io/)

## 🏗️ Estructura del Proyecto (Feature-Based Architecture)

Mantenemos la filosofía **FBA**, ahora integrada en el estándar de Next.js:

```
myappglass/
├── app/                          # Next.js App Router (Layouts, Pages, Providers)
│   ├── layout.tsx                # Root Layout (Server Component)
│   ├── page.tsx                  # Home Page (RSC/Client Bridge)
│   └── providers.tsx             # Chakra UI & Theme Providers (Client)
├── src/
│   ├── features/                 # Dominios de negocio (Modular & Encapsulado)
│   │   ├── home/                 # LandingPage, Clients, Features Sections
│   │   ├── projects/             # Galería de obras y filtros
│   │   ├── services/             # Catálogo de productos (Ventanas, Mamparas)
│   │   └── reclamation-book/     # Formulario legal TS-Safe
│   ├── shared/                   # Componentes y hooks reutilizables
│   ├── theme/                    # Aura Design System (Tokens de Proporción Áurea)
│   └── lib/                      # Configuraciones core (Firebase TS, etc.)
├── public/                       # Assets estáticos y recursos SEO
└── functions/                    # Firebase Cloud Functions (Node.js)
```

## ⚠️ Estado de Migración (Chakra UI v2 → v3 & Next.js 15)

**Estado actual**: ✅ Build Exitoso

### Cambios completados:
- ✅ **Build & Types**: `pnpm build` compila correctamente (Next.js 15).
- ✅ **App Router**: Migración de `app/` a `src/app/` y separación de `src/old-pages/`.
- ✅ **Environment**: Actualizado de `VITE_` a `NEXT_PUBLIC_` (compatible con Next.js).
- ✅ **Chakra v3 Providers**: Configurado correctamente en `src/app/providers.tsx`.
- ✅ **Linting**: Cero warnings de ESLint (`jsx-a11y/alt-text`, `no-unused-vars`).
- ✅ **TypeScript**: Configuración optimizada para TS 6.0 y Next.js.

### Próximos Pasos:
- ⏳ Migrar rutas legacy de `src/old-pages/` a `src/app/`.
- ⏳ Validar el despliegue en Firebase Hosting.

## 🛠️ Instalación y Desarrollo

1.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```

2.  **Iniciar Servidor de Desarrollo:**
    ```bash
    pnpm dev
    ```
    Accede a `http://localhost:3000`.

3.  **Comandos Principales:**
    - `pnpm build`: Genera el build optimizado de Next.js.
    - `pnpm start`: Inicia el servidor de producción.
    - `pnpm lint`: Ejecuta el análisis estático de código.
    - `pnpm deploy:hosting`: Despliega a Firebase Hosting (Framework-aware).

## 📝 Convenciones de Desarrollo

- **Componentes:** Usar `'use client'` solo cuando sea estrictamente necesario para interactividad o hooks de React.
- **Estilos:** Priorizar el uso de tokens semánticos del tema Aura (`bg.page`, `text.accent`) en lugar de colores hardcoded.
- **Git:** Las ramas de trabajo deben seguir el patrón `migration/feature-name` o `feature/description`.

---
*Última actualización: Abril 2026 - Protocolo GYA Evolution.*
