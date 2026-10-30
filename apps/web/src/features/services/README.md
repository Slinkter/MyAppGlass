# Services Feature Module

## Overview

Módulo de negocio responsable de presentar el catálogo de servicios corporativos y la vista de detalle de cada servicio (`/servicios/[serviceSlug]`), incluyendo fichas técnicas, preguntas frecuentes (FAQ) y galerías de imágenes.

> Nota: los sistemas oficiales de ventanas son 4: Nova, Serie 25, Serie 35 y Serie 62. El simulador vigente es `/simulador-ai` (superposición visual local).

---

## 🏛️ Componentes (`components/`)

- **`ServicePageLayout.tsx`**: Layout maestro del detalle de servicio; orquesta la galería fotográfica (`Gallery`), las secciones descriptivas y las FAQ.
- **`ServiceList.tsx`**: Listado del catálogo (usa `useFilterableList` e `ItemGridLayout`).
- **`ServiceCard.tsx`**: Tarjeta de cada servicio.
- **`ServiceBentoGrid.tsx`**: Tarjetas de la ficha del servicio (`UnifiedTechnicalCard` y `BentoCTA`).
- **`ServiceHeader.tsx`**: Cabecera de la página de detalle.
- **`ServiceFaqSection.tsx`**: Acordeón de preguntas frecuentes.

---

## 📦 Datos y Servicios

- **`data/services.ts`**: Catálogo de los 10 servicios (con `plink`, p. ej. `/servicios/ventana`).
- **`data/servicePageDataMap.ts`**: Datos de cada página de detalle (SEO, descripción, beneficios, sistemas, características y galerías).
- **`data/serviceFaqs.ts`**: Preguntas frecuentes por servicio.
- **`data/gallery/`**: Imágenes por servicio (`ventana-data.ts`, `mampara-data.ts`, `ducha-data.ts`, `techo-data.ts`, `baranda-data.ts`, `parapeto-data.ts`, `balcon-data.ts`, `celosias-data.ts`, `puerta-serie-data.ts`, `puerta-vidrio-data.ts`).
- **`services/serviceService.ts`**: Capa de acceso a los datos de servicios.
