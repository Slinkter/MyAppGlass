# Chakra UI v2 → v3 Migration Checklist

## ⚠️ IMPORTANTE - Reglas de Migración

### Hooks a reemplazar:
- `useColorModeValue` → Importar desde `@/components/ui/color-mode`
- `useColorMode` → Importar desde `@/components/ui/color-mode`
- `usePrefersReducedMotion` → No existe en v3, usar `framer-motion/useReducedMotion`

### Componentes a reemplazar:
- `Modal`, `ModalOverlay`, `ModalContent`, `ModalBody`, `ModalCloseButton` → `Dialog`, `Dialog.Backdrop`, `Dialog.Positioner`, `Dialog.Content`, `Dialog.Body`, `Dialog.CloseTrigger`
- `Fade`, `ScaleFade` → `framer-motion` (motion.create)
- `Divider` → Usar `Box` con `borderTop` o `Stack.Separator`
- `PopoverCloseButton` → `CloseButton` (v3) o remover
- `useDisclosure` → `useDisclosure` de Chakra v3 (mantiene `isOpen`, pero puede cambiar)

### Recurso MCP:
- Usar Chakra UI MCP para consultas: `get_component_props`, `v2_to_v3_code_review`

---

## AGENTE 1: Navbar & Footer
### Archivos a revisar:
- [ ] `src/layout/Navbar/BottomNav.jsx` - useColorMode, useColorModeValue
- [ ] `src/layout/Navbar/AuraBottomNav.jsx` - useColorMode, useColorModeValue
- [ ] `src/layout/Navbar/AuraNavbar.jsx` - useColorModeValue
- [ ] `src/layout/Navbar/MobileNav.jsx` - Divider
- [ ] `src/layout/Footer/Footer.jsx` - Divider
- [ ] `src/layout/Footer/variants/FooterMonolith.jsx` - Divider
- [ ] `src/layout/FloatingActions/ThemeToggle.jsx` - useColorMode, useColorModeValue

---

## AGENTE 2: Home Components (Core)
### Archivos a revisar:
- [ ] `src/features/home/components/InteractiveMap.jsx` - useColorMode
- [ ] `src/features/home/components/StoreSection.jsx` - usePrefersReducedMotion
- [ ] `src/features/home/components/LandingPageSection.jsx` - usePrefersReducedMotion
- [ ] `src/features/home/components/map/CustomMarker.jsx` - useColorModeValue, PopoverCloseButton
- [ ] `src/features/home/components/map/MapError.jsx` - useColorModeValue
- [ ] `src/features/home/components/map/MapLoader.jsx` - useColorModeValue

---

## AGENTE 3: Projects Components
### Archivos a revisar:
- [ ] `src/features/projects/components/ProjectsList.jsx` - useColorModeValue
- [ ] `src/features/projects/components/ProjectDetailItem.jsx` - useColorModeValue
- [ ] `src/features/projects/components/modal/MapViewer.jsx` - useColorModeValue
- [ ] `src/features/projects/components/modal/ProjectPhotoAlbum.jsx` - useColorModeValue
- [ ] `src/features/projects/components/ProjectCard.jsx` - useDisclosure

---

## AGENTE 4: Services Components
### Archivos a revisar:
- [ ] `src/features/services/components/ServiceList.jsx` - useColorModeValue
- [ ] `src/features/services/components/ServiceSidebar.jsx` - Divider
- [ ] `src/features/services/variants/detail/ServiceDetailTechnical.jsx` - Divider
- [ ] `src/features/services/components/ServiceSkeleton.jsx` - useColorModeValue
- [ ] `src/features/services/components/ServiceListSkeleton.jsx` - useColorModeValue

---

## AGENTE 5: Shared Components
### Archivos a revisar:
- [ ] `src/shared/components/Image/ImageWithFallback.jsx` - useColorModeValue
- [ ] `src/shared/components/Layout/ItemGridLayout.jsx` - useColorModeValue
- [ ] `src/shared/components/common/GlassCard.jsx` - useColorModeValue
- [ ] `src/shared/components/common/Franja.jsx` - useColorModeValue
- [ ] `src/shared/components/common/FormSection.jsx` - useColorModeValue
- [ ] `src/shared/components/common/SidebarItem.jsx` - useColorModeValue
- [ ] `src/shared/components/common/ComingSoonDisplay.jsx` - useColorModeValue

---

## AGENTE 6: Pages
### Archivos a revisar:
- [ ] `src/pages/BankAccountsPage.jsx` - useColorModeValue, useToast
- [ ] `src/pages/BankAccountsTestPage.jsx` - useColorMode, Divider
- [ ] `src/pages/TestPage.jsx` - useColorMode, Divider
- [ ] `src/pages/ServicesTestPage.jsx` - useColorMode, Divider
- [ ] `src/pages/ServiceDetailTestPage.jsx` - useColorMode
- [ ] `src/pages/CompanyPoliciesPage.jsx` - useColorModeValue, UnorderedList
- [ ] `src/pages/ErrorPage.jsx` - useColorModeValue
- [ ] `src/pages/ProductPage.jsx` - useColorModeValue
- [ ] `src/pages/variants/bank-accounts/AccountsMinimalist.jsx` - Divider
- [ ] `src/pages/variants/bank-accounts/AccountsSecureGlass.jsx` - useColorModeValue
- [ ] `src/pages/variants/bank-accounts/AccountsIndustrial.jsx` - useColorModeValue

---

## AGENTE 7: Additional Components
### Archivos a revisar:
- [ ] `src/app/layout.tsx` - ColorModeScript
- [ ] `src/layout/MainLayout/Layout.jsx` - revisar imports
- [ ] `src/layout/Footer/variants/FooterLiquid.jsx` - revisar
- [ ] `src/layout/Footer/variants/FooterGrid.jsx` - revisar
- [ ] `src/features/projects/components/ProjectCardSkeleton.jsx` - revisar
- [ ] `src/features/projects/components/ProjectListSkeleton.jsx` - revisar
- [ ] `src/features/home/components/FeatureListSkeleton.jsx` - revisar
- [ ] `src/features/home/components/ClientListSkeleton.jsx` - revisar

---

## Verificación Final
- [ ] `pnpm build` - debe compilar sin errores
- [ ] `pnpm lint` - debe pasar sin warnings
- [ ] `pnpm dev` - verificar en navegador
