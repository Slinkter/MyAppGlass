# Services Feature Module

## Overview

Módulo de negocio responsable de presentar el catálogo de servicios corporativos y la vista de detalle interactiva de cada servicio (`/servicios/[serviceSlug]`), incluyendo fichas técnicas, galerías de imágenes y el simulador 3D de ventanas.

---

## 🏛️ Componentes Principales

- **`ServicePageLayout.tsx`**: Layout maestro del detalle de servicio. Orquesta la galería fotográfica (`Gallery`), la ficha técnica unificada (`UnifiedTechnicalCard`) y el visor interactivo 3D.
- **`VentanaConfigurador3DCard.tsx`**: Simulador visual Three.js interactivo para ventanas. Proporción 65% visor / 35% configuración, con selección de los 4 sistemas oficiales (`Nova`, `Serie 25`, `Serie 35`, `Serie 62`), tipos de vidrio (`Crudo`, `Laminado`, `Templado`), acabados de aluminio y controles de cámara/apertura de hojas.
- **`UnifiedTechnicalCard.tsx`**: Ficha técnica con navegación por tabs de características, especificaciones de aislamiento acústico/térmico y llamada a la acción.
- **`components/configurador3d/`**: Mallas paramétricas, materiales PBR físicos (`materials.ts`), helpers geométricos y constantes (`constants.ts`).

---

## 📦 Datos Centralizados

- **`data/ventanas-catalogo.json`**: Definición de los 4 sistemas de ventanas, colores de aluminio, vidrios y accesorios.
- **`data/gallery/`**: Repositorio de imágenes estáticas de alta resolución por servicio (`ventana-data.ts`, `mampara-data.ts`, `ducha-data.ts`, etc.).
