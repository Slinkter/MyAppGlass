# Services Feature Module

## Overview

Módulo de negocio responsable de presentar el catálogo de servicios corporativos y la vista de detalle de cada servicio (`/servicios/[serviceSlug]`), incluyendo fichas técnicas, preguntas frecuentes (FAQ) y galerías de imágenes.

> Nota: los sistemas oficiales de ventanas son 4: Nova, Serie 25, Serie 35 y Serie 62. El simulador vigente es `/simulador-ai` (superposición visual local).

---

## 🏛️ Componentes (`components/`)

Esta feature conserva solo la **página de detalle**. La tarjeta, el listado y los esqueletos viven en la entidad (`@/entities/service`).

- **`ServicePageLayout.tsx`**: Layout maestro del detalle de servicio; orquesta la galería fotográfica (`Gallery`), las secciones descriptivas y las FAQ.
- **`ServiceBentoGrid.tsx`**: Tarjetas de la ficha del servicio (`UnifiedTechnicalCard` y `BentoCTA`).
- **`ServiceHeader.tsx`**: Cabecera de la página de detalle.
- **`ServiceFaqSection.tsx`**: Acordeón de preguntas frecuentes.

---

## 📦 Datos y Servicios

Firebase (Firestore + Storage) es la única fuente de servicios; ya no hay datos locales. El repositorio, los hooks y los modelos viven en `@/entities/service`.

- **Build (SEO del export estático)**: `shared/api/firebase/publicRest.ts` lee `/services` por la API REST pública y alimenta `generateStaticParams`, metadatos, JSON-LD y `initialData`. Si falla, devuelve `[]` y la ruta usa el slug centinela `_`.
- **Cliente**: `entities/service/api/useServices.ts` renderiza primero con `initialData` y luego refresca desde Firestore (`shared/hooks/data/useAsyncResource.ts`).
- **`entities/service/api/serviceMappers.ts`**: Convierte `Service` de Firestore a `ServiceListItem` y `ServicePageData` (galería agrupada por `system`, FAQ desde `faqs`).
- **`entities/service/model`**: Tipos de vista (`ServicePageData`, `ServiceListItem`, `ServicePageSystem`).
