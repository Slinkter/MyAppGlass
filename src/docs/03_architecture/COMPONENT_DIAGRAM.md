# 🧩 Diagrama de Componentes Interactivos

Este documento mapea los componentes principales y sus relaciones jerárquicas.

## Árbol de Jerarquía Clave

```text
App.jsx (Root & Layout Provider)
├── Navbar.jsx (Sticky Header)
├── ScrollToTop.jsx (Utility)
└── Routes (React Router)
    ├── Home.jsx
    │   ├── HeroSection.jsx
    │   ├── ServicesSection.jsx
    │   ├── ProjectsSection.jsx
    │   ├── FeaturesSection.jsx
    │   └── ClientsSection.jsx
    ├── ServicePageContainer.jsx (Dynamic Route: /servicios/:slug)
    │   └── ServicePageLayout.jsx
    │       ├── ServiceSidebar.jsx
    │       ├── ServiceContent.jsx
    │       └── Gallery.jsx
    ├── ProjectPage.jsx
    │   ├── ProjectList.jsx
    │   └── ProjectDetailModal.jsx
    │       ├── VisualViewer.jsx
    │       └── ProjectInfo.jsx
    └── ReclamationBook.jsx
        ├── ReclamationForm.jsx
        │   └── FormSection.jsx
        └── SuccessModal.jsx
```

## Leyenda de Componentes Comunes

Estos componentes ("Átomos/Moléculas") se usan transversalmente:

-   **`DataLoader.jsx`**: Wrapper que maneja estados de `loading`, `error` y `success`.
-   **`GlassCard.jsx`**: (Planificado) Tarjeta base con efecto de vidrio esmerilado.
-   **`FadingImage.jsx`**: Componente de imagen con transición suave al cargar.
-   **`SectionTitle.jsx`**: Título estandarizado para secciones de página.
