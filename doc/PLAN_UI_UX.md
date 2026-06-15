# 🚀 Plan de Migración UI/UX (Chakra UI v3 & Animaciones CSS Nativas)

Este plan de trabajo ha sido diseñado para la refactorización completa del sistema de espaciado y animaciones de **MyAppGlass**. 

---

## 🎯 Objetivos de la Refactorización

1. **Eliminar la escala de Fibonacci (`phi_`):** Retirar los tokens personalizados (`phi_xs` a `phi_6xl`) y reemplazarlos por las medidas oficiales y estándar de **Chakra UI v3**.
2. **Eliminar Framer Motion:** Desinstalar o desactivar dependencias de Framer Motion y refactorizar todos los componentes para que utilicen **estrictamente animaciones y transiciones CSS nativas** soportadas por Chakra UI v3.
3. **Mantener Soporte de Color Mode:** Asegurar que los componentes y tokens semánticos funcionen perfectamente tanto en modo claro como oscuro (`_light` y `_dark`).

---

## 📐 Equivalencias de Spacing (Chakra UI v3)

Reemplazar todos los tokens Fibonacci por las siguientes medidas estándar de Chakra UI v3:

| Token Fibonacci | Medida en Chakra v3 | Equivalente en Píxeles |
| :--- | :--- | :--- |
| `phi_xs` | `"2"` o `"sm"` | 8px |
| `phi_sm` | `"3"` o `"4"` | 12px - 16px |
| `phi_md` | `"5"` o `"6"` | 20px - 24px |
| `phi_lg` | `"8"` o `"9"` | 32px - 36px |
| `phi_xl` | `"14"` | 56px |
| `phi_2xl` | `"20"` o `"24"` | 80px - 96px |
| `phi_3xl` | `"36"` | 144px |

---

## 🧱 Lista Completa de Archivos a Modificar y Verificar

### ⚙️ Configuración del Tema
- [ ] `src/shared/providers/theme/index.ts` - Eliminar la escala `spacing` y `sizes` Fibonacci. Configurar keyframes CSS y tokens de animación en Chakra. Adaptar recetas (`buttonRecipe`, `inputRecipe`).
- [ ] `src/shared/config/designTokens.ts` - Limpiar variables Fibonacci residuales.

### 📦 Enrutamiento (`src/app/`)
- [ ] `src/app/layout.tsx` - Quitar la envoltura `LazyMotion`.
- [ ] `src/app/contacto/page.tsx`

### 🖥️ Páginas/Pantallas (`src/screens/`)
- [ ] `src/screens/services/ui/ServicesView.tsx`
- [ ] `src/screens/legal/ui/BankAccountsView.tsx`
- [ ] `src/screens/blog/ui/BlogPostView.tsx`
- [ ] `src/screens/blog/ui/BlogView.tsx`
- [ ] `src/screens/home/ui/HomeView.tsx`

### 🛠️ Layouts Estructurales (`src/widgets/`)
- [ ] `src/widgets/FloatingActions/ThemeToggle.tsx`
- [ ] `src/widgets/Navbar/AuraNavbar.tsx`
- [ ] `src/widgets/Navbar/MobileNav.tsx`
- [ ] `src/widgets/Navbar/AuraDesktopNav.tsx` - Quitar indicator layout animations (Framer Motion) por CSS Transitions.
- [ ] `src/widgets/Footer/Footer.tsx`

### 💼 features de Negocio (`src/features/`)

#### Servicios
- [ ] `src/features/services/components/ServiceList.tsx`
- [ ] `src/features/services/components/ServiceSkeleton.tsx`
- [ ] `src/features/services/components/SpecItem.tsx`
- [ ] `src/features/services/components/ServiceBentoGrid.tsx`
- [ ] `src/features/services/components/ServiceListSkeleton.tsx`
- [ ] `src/features/services/components/ServiceCard.tsx`
- [ ] `src/features/services/components/ServiceHeader.tsx`
- [ ] `src/features/services/components/ServicePageLayout.tsx`

#### Libro de Reclamaciones
- [ ] `src/features/reclamation-book/components/SuccessModal.tsx`
- [ ] `src/features/reclamation-book/components/ReclamationForm.tsx`
- [ ] `src/features/reclamation-book/components/ProductSection.tsx`
- [ ] `src/features/reclamation-book/components/DeclarationSection.tsx`
- [ ] `src/features/reclamation-book/components/PersonalInfoSection.tsx`
- [ ] `src/features/reclamation-book/components/ClaimDetailSection.tsx`

#### Inicio/Home
- [ ] `src/features/home/components/FeatureCard.tsx`
- [ ] `src/features/home/components/ClientListSkeleton.tsx`
- [ ] `src/features/home/components/ClientCard.tsx`
- [ ] `src/features/home/components/StoreSection.tsx`
- [ ] `src/features/home/components/FeatureListSkeleton.tsx`
- [ ] `src/features/home/components/LandingPageSection.tsx`

#### Proyectos
- [ ] `src/features/projects/components/ProjectCardSkeleton.tsx`
- [ ] `src/features/projects/components/ProjectDetailModal.tsx`
- [ ] `src/features/projects/components/ProjectListSkeleton.tsx`
- [ ] `src/features/projects/components/ProjectsList.tsx`
- [ ] `src/features/projects/components/ProjectCardContent.tsx`
- [ ] `src/features/projects/components/modal/ProjectPhotoAlbum.tsx`
- [ ] `src/features/projects/components/modal/ProjectInfo.tsx`
- [ ] `src/features/projects/components/modal/VisualViewer.tsx`
- [ ] `src/features/projects/components/ProjectDetailItem.tsx`
- [ ] `src/features/projects/components/modal/ModalSkeleton.tsx`

#### Blog
- [ ] `src/features/blog/components/BlogCard.tsx` - Convertir `MotionBox` a `<Box>` usando transiciones y transformaciones CSS estándar.
- [ ] `src/features/blog/components/BlogList.tsx`

### ⚙️ Componentes Compartidos (`src/shared/`)
- [ ] `src/shared/components/ComponentErrorBoundary.tsx`
- [ ] `src/shared/components/DataLoader/ErrorDisplay.tsx`
- [ ] `src/shared/components/common/ComingSoonDisplay.tsx`
- [ ] `src/shared/components/Image/ImageOverlay.tsx`
- [ ] `src/shared/components/aura/AuraContainer.tsx`
- [ ] `src/shared/components/aura/AuraHeader.tsx`
- [ ] `src/shared/components/common/gallery/GalleryThumbnails.tsx`
- [ ] `src/shared/components/common/gallery/GalleryViewer.tsx`
- [ ] `src/shared/components/aura/AuraSkeleton.tsx`
- [ ] `src/shared/components/Layout/ItemGridLayout.tsx`

---

## 🎬 Guía de Animación con CSS en Chakra UI v3
Para animar elementos como hover scales en tarjetas o entradas de elementos:
1. **Transiciones Directas:** Usar la prop `transition` en componentes estándar de Chakra UI.
   ```tsx
   <Box 
     transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
     _hover={{ transform: "translateY(-8px) scale(1.02)" }}
   />
   ```
2. **Keyframes del Tema:** Para animaciones complejas (como fades de entrada o slides), registrar keyframes en `theme.ts` y llamarlas usando el token correspondiente:
   ```typescript
   // theme.ts
   keyframes: {
     slideUp: {
       "0%": { transform: "translateY(20px)", opacity: 0 },
       "100%": { transform: "translateY(0)", opacity: 1 },
     }
   }
   // Componente:
   <Box animation="slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)" />
   ```

---

## 🔬 Verificación de Calidad

1. **Linting de Tipos:** Ejecutar `pnpm run lint` para verificar errores tipográficos.
2. **Build Estático exitoso:** `pnpm run build` debe generar la carpeta estática final correctamente.
3. **UX & Responsive:** Verificar en navegador la correcta alineación y escalas de tamaños.

---

## ✅ Informe de Migración (Completada)

| Qué | Status |
|------|--------|
| Theme: phi_ tokens removidos, keyframes globales inyectados vía `<Global>` en providers, recipes actualizados | ✅ |
| `designTokens.ts`: Fibonacci `spacingTokens` limpiados | ✅ |
| `providers.tsx`: `<LazyMotion>` quitado, `<Global>` agregado para keyframes CSS | ✅ |
| phi_ tokens reemplazados en 54 archivos (~100 ocurrencias) con valores Chakra v3 estándar | ✅ |
| Framer Motion eliminado de 20+ archivos (MotionBox, AnimatePresence, m.div, whileHover, layoutId) | ✅ |
| Framer Motion reemplazado con CSS transitions, `_hover`, `animation` prop, keyframes nativos | ✅ |
| `package.json`: `"framer-motion"` removido de dependencies | ✅ |
| `pnpm run lint`: **0 errores**, 10 warnings pre-existentes (`@typescript-eslint/no-explicit-any`) | ✅ |
| `pnpm run build`: **éxito** — todas las rutas SSG y static compiladas sin errores | ✅ |

### Resumen de Archivos Modificados

- `src/shared/providers/theme/index.ts` — tokens phi eliminados, keyframes movidos a `<Global>`, recipes con spacing estándar
- `src/shared/config/designTokens.ts` — lista `spacingTokens` limpiada
- `src/app/providers.tsx` — LazyMotion → Global keyframes injection
- `src/widgets/Navbar/AuraDesktopNav.tsx` — layoutId → Box con transition
- `src/widgets/Navbar/MobileNav.tsx` — AnimatePresence + m.div → CSS animation por item
- `src/features/services/components/ServicePageLayout.tsx` — MotionBox + LazyMotion → Box + animation prop
- `src/features/services/components/ServiceBentoGrid.tsx` — MotionBox removido
- `src/features/services/components/ServiceCard.tsx` — whileHover → _hover + transition
- `src/features/blog/components/BlogCard.tsx` — MotionBox → Box + CSS animation
- `src/features/projects/components/ProjectDetailModal.tsx` — MotionBox → Box + animation
- `src/features/projects/components/ProjectCardContent.tsx` — MotionBox removido
- `src/features/projects/components/modal/ProjectPhotoAlbum.tsx` — MotionBox → Box
- `src/features/projects/components/modal/ProjectInfo.tsx` — MotionBox → Box
- `src/features/projects/components/modal/VisualViewer.tsx` — MotionBox → Box
- `src/features/projects/components/StoreSection.tsx` — storeMotion → Box
- `src/features/home/components/FeatureCard.tsx` — whileHover → _hover + transition
- `src/features/home/components/ClientCard.tsx` — whileHover → _hover + transition
- `src/features/home/components/LandingPageSection.tsx` — MotionBox → Box
- `src/features/home/components/StoreSection.tsx` — MotionBox → Box
- `src/shared/components/aura/AuraContainer.tsx` — m.div dinámico → Box con animation condicional
- `src/shared/components/Layout/ItemGridLayout.tsx` — delay prop unused → limpiado
- `src/shared/components/common/gallery/GalleryViewer.tsx` — keyframes string literals → template literals con variables
- `src/shared/components/LoadingFallback.tsx` — imports framer removidos
- ~33 archivos adicionales con reemplazos de phi_ tokens vía sed global

### Animaciones Conservadas (ahora nativas)

| Animación | Tipo | Archivos |
|-----------|------|----------|
| `slideUp` | CSS @keyframes | AuraDesktopNav, MobileNav, BlogCard |
| `fadeIn` | CSS @keyframes | ServicePageLayout, AuraContainer |
| `scaleIn` | CSS @keyframes | ServicePageLayout, ProjectDetailModal |
| Hover scale | CSS transition + _hover | FeatureCard, ClientCard, ServiceCard, Gallery nav buttons |
| Pill indicator | CSS transition on left | AuraDesktopNav |
| Gallery zoom | CSS @keyframes | GalleryViewer |
