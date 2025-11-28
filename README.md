# GYA Glass & Aluminum - Web Application

Aplicación web moderna y de alto rendimiento para GYA Glass & Aluminum, especializada en vidriería y estructuras de aluminio.

## 🚀 Tecnologías y Arquitectura

Este proyecto utiliza una arquitectura **Clean Code** basada en componentes funcionales de React y Hooks personalizados.

### Stack Tecnológico

- **Core:** React 18 (Vite)
- **UI Framework:** Chakra UI
- **Estilos:** Emotion (vía Chakra) + Glassmorphism personalizado
- **Routing:** React Router DOM v6
- **Hosting:** Firebase Hosting

### �️ Arquitectura del Proyecto

La aplicación sigue una estructura modular para facilitar el mantenimiento y la escalabilidad:

```
src/
├── components/
│   ├── common/           # Componentes reutilizables (Gallery, GlassCard, etc.)
│   ├── services/         # Componentes específicos de páginas de servicios
│   │   └── components/   # Sub-componentes (ServiceSidebar, ServiceSkeleton)
│   └── home/             # Componentes de la página de inicio
├── hooks/                # Custom Hooks (useGlassStyles, etc.)
├── layout/               # Layout principal (Navbar, Footer)
├── pages/                # Páginas principales (vistas)
└── data/                 # Datos estáticos y configuración
```

### ✨ Características Clave

1.  **Diseño Glassmorphism Premium:**

    - Implementado a través del hook `useGlassStyles`.
    - Componentes visuales consistentes con `GlassCard`.

2.  **Optimización de Rendimiento (Performance):**

    - **Lazy Loading:** Las páginas de servicios se cargan bajo demanda usando `React.lazy` y `Suspense`.
    - **Skeletons:** Experiencia de carga fluida con `ServiceSkeleton` que imita el layout real.
    - **Imágenes Optimizadas:** Componente `FadingImage` con carga perezosa (`loading="lazy"`) y placeholders.

3.  **Responsive Design Avanzado:**
    - Layouts adaptativos que cambian drásticamente entre móvil y escritorio para mejor UX.
    - Galería con scroll horizontal nativo en móviles y vertical en escritorio.

## 🛠️ Instalación y Desarrollo

1.  **Instalar dependencias:**

    ```bash
    pnpm install
    ```

2.  **Iniciar servidor de desarrollo:**

    ```bash
    pnpm run dev
    ```

3.  **Construir para producción:**

    ```bash
    pnpm run build
    ```

4.  **Desplegar a Firebase:**
    ```bash
    pnpm run deploy:hosting
    ```

## 📝 Notas de Mantenimiento

- **Agregar nuevos servicios:** Actualizar `src/data/servicePageDataMap.js`.
- **Modificar estilos base:** Editar `src/hooks/useGlassStyles.js`.
- **Cambiar layout de servicios:** Modificar `src/components/services/service-pages/ServicePageLayout.jsx`.

---

Desarrollado con ❤️ y Clean Code.
