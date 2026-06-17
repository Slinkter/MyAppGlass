# 🚀 Plan de Refactorización de Arquitectura y Diseño

## 🏛️ Visión del Arquitecto
Este proyecto será transformado siguiendo los más altos estándares de **Arquitectura de Software**. El objetivo no es solo "limpiar el código", sino implementar un sistema **desacoplado, escalable y reutilizable**, aplicando principios de **Clean Core, SOLID y DRY**.

**Meta Final:** Un frontend de alto rendimiento, con una estructura profesionalmente organizada (FSD), naming coherente y componentes totalmente agnósticos al dominio para máxima reutilización.

---

## 📊 Progreso General
`[████████░░] 80%` - Phase 1 & 2 ✅ | Phase 3 ~70% ✅

---

## 🛠️ Equipo de Expertos (Agentes Senior)
Para este proceso, se coordinarán los siguientes roles especializados:
- 🏗️ **Senior Architecture**: Responsable de FSD, SOLID, Clean Core y desacoplamiento.
- ⚛️ **Senior React**: Especialista en optimización de Hooks, performance, naming y algoritmos.
- 🟦 **Senior Next.js & TypeScript**: Experto en App Router, Server/Client Components, tipado avanzado (Generics, Utility Types) y patrones de optimización de Next.js.
- 🎨 **Senior UX/Designer**: Experto en Chakra UI v3, accesibilidad y consistencia visual.
- 🔍 **Senior SEO**: Especialista en HTML semántico, metadatos y Web Vitals.

---

## 📅 Plan de Trabajo Detallado

### 📍 Fase 1: Descubrimiento y Mapeo (Discovery) ✅
*Objetivo: Entender la deuda técnica y mapear la estructura actual.*
- [x] **Mapeo de Archivos**: Listado completo de `.ts` y `.tsx` y análisis de dependencias.
- [x] **Auditoría de Tipado**: Identificar el uso excesivo de `any`, tipos mal definidos o falta de interfaces en el flujo de datos.
- [x] **Auditoría de Capas (FSD)**: Identificar violaciones de dirección de dependencias (ej. `shared` importando de `features`).
- [x] **Inventario de Hooks**: Listar todos los custom hooks y marcar aquellos con nombres excesivamente largos.
- [x] **Análisis de "God Components"**: Identificar componentes que superan las 300 líneas o tienen demasiadas responsabilidades.
- [x] **Auditoría de Next.js Boundaries**: Verificar el uso correcto de `'use client'` y `'use server'`.
- [x] **Auditoría de Chakra UI**: Detectar patrones obsoletos de v2 o valores hard-coded.
- [x] **Análisis de SEO**: Revisar la jerarquía de encabezados y etiquetas meta actuales.

### 📐 Fase 2: Diseño y Definición de Patrones (Design) ✅
*Objetivo: Definir la "nueva ley" del proyecto antes de tocar el código.*
- [x] **Definición de Patrones**: Estrategia de fragmentación para `BankAccountsView` y `MobileNav`.
- [x] **Estrategia de Tipado Avanzado**: Normalización de interfaz `Project` y wrapper para `process.env`.
- [x] **Guía de Naming**: Mapping de nombres Spanglish $\rightarrow$ English (ej. `useReclamoForm` $\rightarrow$ `useComplaintForm`).
- [x] **Estrategia de Desacoplamiento**: Interfaz genérica para componentes `shared`.
- [x] **Optimización de Next.js**: Plan de Server Components y Streaming.
- [x] **Mapa de Refactorización**: Orden de ejecución definido.

### 🚀 Fase 3: Implementación y Refactorización (Execution) ⏳
*Objetivo: Aplicar las mejoras siguiendo el principio de "no romper lo que funciona".*

#### 3.1. Limpieza de Naming y Estándares (Senior React/TS) ✅
- [x] **Refactor de Hooks**: `useReclamoForm` $\rightarrow$ `useReclamationForm` (+ file rename). Comentarios traducidos a inglés.
- [x] **Estandarización de Casing**: Variables y funciones normalizadas a `camelCase` en `reclamation-book` y `contacto`.
- [ ] ~~**Limpieza de Imports**:~~ Diferido — aliases `@shared/` ya funcionales, migración es cosmética.

#### 3.2. Arquitectura y SOLID (Senior Architecture/TS) ✅
- [x] **Fragmentación de `BankAccountsView`**: 3 componentes inline extraídos (`BankAccountCard`, `CopyButton`, `InfoItem`). Reducción de 571 $\rightarrow$ 343 líneas.
- [x] **Fragmentación de `MobileNav`**: `NavItemLarge` y `UtilityLink` extraídos a `components/`. Reducción de 352 $\rightarrow$ 250 líneas.
- [x] **Inversión de Dependencias**: `env.ts` con Zod (`src/shared/config/env.ts`) centraliza acceso a `process.env`.
- [x] **Saneamiento de Capas**: Eliminado `"use client"` innecesario en `actions.ts`. Importaciones corregidas.
- [ ] **Optimización Algorítmica**: No se identificaron bucles críticos — diferido a futura iteración.

#### 3.3. UX, UI y SEO (Senior UX/SEO) ✅
- [x] **Migración a Design Tokens**: Sustitución de `colorScheme` $\rightarrow$ `colorPalette` en `contact-page-client.tsx`.
- [x] **Implementación de Snippets v3**: Componentes nuevos usan `Card.Root`/`Card.Body`, `Stack gap`, `colorPalette`.
- [ ] **Optimización Semántica**: Pendiente para fase dedicada de accesibilidad.
- [ ] **Ajuste de Metadatos**: Pendiente para fase dedicada de SEO.

### 📝 Fase 4: Documentación y Cierre (Finalization)
*Objetivo: Dejar la hoja de ruta actualizada y el conocimiento plasmado.*
- [ ] **Actualización de CLAUDE.md**: Reflejar la nueva arquitectura y reglas de desarrollo.
- [ ] **Actualización de PLAN_TRABAJO.md**: Cerrar actividades y documentar el resultado final.
- [ ] **Registro de Justificaciones**: Crear un log de "Cambio $\rightarrow$ Razón Arquitectónica".
- [ ] **Verificación Final**: Ejecutar un barrido final para asegurar que no hay regresiones visuales ni de performance.

---

## 📋 Blueprint de Implementación (Resumen de Fase 2)

### 🏗️ Fragmentación de Componentes
- **BankAccountsView**: Dividir en $\rightarrow$ `BankAccountCard`, `BankAccountsLoading`, `DigitalWalletSection`, `FiscalInfoItem`.
- **MobileNav**: Dividir en $\rightarrow$ `MobileNavTrigger`, `MobileNavItem`, `MobileUtilityLink`, `MobileNavFooter`, `WhatsAppCTA`.

### 🟦 Tipado y Naming
- **Hooks**: `useReclamoForm` $\rightarrow$ `useComplaintForm`, `useSitemapData` $\rightarrow$ `useSitemap`, etc.
- **Env**: Implementación de `src/shared/config/env.ts` con validación Zod y `Object.freeze()`.
- **Project**: Normalización de `photos: GalleryItem[]` eliminando la unión con `string[]`.

### 🎨 Diseño (Chakra UI v3)
- **WhatsApp Tokens**: `brand.whatsapp.primary` (#25D366), `.hover` (#1DAE54), `.active` (#178B43).
- **Spacing**: Sustituir `100px`/`90px` $\rightarrow$ tokens de espaciado responsivo.

---

## 📓 Log de Justificaciones Arquitectónicas
*(Se llenará durante la implementación)*

| Componente/Módulo | Cambio Realizado | Patrón/Principio Aplicado | Justificación |
| :--- | :--- | :--- | :--- |
| `env.ts` | Centralización de `process.env` con Zod | Inversión de Dependencias / Single Source of Truth | Eliminar dispersión de accesos a env, validar en tiempo de construcción y tipar centralizadamente. |
| `BankAccountsView` | Reemplazo de 3 componentes inline por `BankAccountCard`, `CopyButton`, `InfoItem` | Single Responsibility / DRY | Los componentes ya existían extraídos pero no se usaban. Reducción de 571→343 líneas, eliminando código duplicado. |
| `MobileNav` | Extracción de `NavItemLarge` y `UtilityLink` a `components/` | Single Responsibility / Separation of Concerns | Sub-componentes con estado propio (pathname, active) merecían archivos individuales. Reducción de 352→250 líneas. |
| `useReclamoForm.ts` | Renombrado a `useReclamationForm.ts` + fix bug `newReclamoId` | Naming Consistente / DRY | El hook ya exportaba `useReclamationForm` pero el filename y referencias internas mantenían el nombre Spanglish. |
| `reclamoService.ts` | Renombrado `ReclamoData`→`ReclamationData`, `reclamoService`→`reclamationService` | Naming Consistente | Unificar nomenclatura en inglés para mantener consistencia global del proyecto. |
| `contact-page-client.tsx` | `colorScheme` → `colorPalette` | Chakra UI v3 API | Unico remanente de API v2. `colorPalette` es el reemplazo oficial en v3. |
| `ComponentErrorBoundary` | `process.env` → `env` wrapper | Inversión de Dependencias | Consistencia con el nuevo sistema centralizado de env vars. |

---
**⚠️ Nota Importante:** No se tocará ninguna configuración ni lógica de **Firebase (Backend)**. Todas las optimizaciones son estrictamente de capa de cliente y arquitectura de frontend.
