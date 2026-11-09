# Inventario de componentes

> Generado por `scripts/inventory-components.mjs` (solo lectura). Estilo suelto = hex + rgba + colorPalette + `_hover` a mano + `100vh`. «Showcase» = el nombre aparece en `/design-system` o `/design-system-ubicacion`.

**Resumen:** 110 componentes · 68 sin estilo suelto · 42 a corregir · 81 sin showcase en `/design-system`.

| Grupo | Componentes | Sin estilo suelto | A corregir | Sin showcase |
|---|---|---|---|---|
| Primitivas (components/ui) | 16 | 15 | 1 | 3 |
| Compartidos (shared/components) | 28 | 19 | 9 | 21 |
| Globales (widgets) | 15 | 4 | 11 | 10 |
| Feature · admin | 15 | 5 | 10 | 15 |
| Feature · auth | 2 | 2 | 0 | 2 |
| Feature · blog | 2 | 1 | 1 | 2 |
| Feature · contacto | 3 | 0 | 3 | 3 |
| Feature · home | 6 | 3 | 3 | 5 |
| Feature · local-landings | 1 | 1 | 0 | 1 |
| Feature · projects | 7 | 6 | 1 | 6 |
| Feature · reclamation-book | 8 | 7 | 1 | 8 |
| Feature · services | 7 | 5 | 2 | 5 |

## Primitivas (components/ui)

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| color-mode | `components/ui/color-mode.tsx` | 95 | 0 | 0 | 2 | 0 | 0 | sí | a corregir |
| alert | `components/ui/alert.tsx` | 41 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| button | `components/ui/button.tsx` | 43 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| checkbox | `components/ui/checkbox.tsx` | 24 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| close-button | `components/ui/close-button.tsx` | 14 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| data-list | `components/ui/data-list.tsx` | 30 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| dialog | `components/ui/dialog.tsx` | 63 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| drawer | `components/ui/drawer.tsx` | 60 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| empty-state | `components/ui/empty-state.tsx` | 35 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| field | `components/ui/field.tsx` | 30 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| file-upload | `components/ui/file-upload.tsx` | 163 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| native-select | `components/ui/native-select.tsx` | 50 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| scroll-area | `components/ui/scroll-area.tsx` | 9 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| skeleton | `components/ui/skeleton.tsx` | 42 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| toaster | `components/ui/toaster.tsx` | 39 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| tooltip | `components/ui/tooltip.tsx` | 45 | 0 | 0 | 0 | 0 | 0 | sí | estándar |

## Compartidos (shared/components)

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| ImageWithFallback | `shared/components/Image/ImageWithFallback.tsx` | 175 | 0 | 6 | 0 | 0 | 0 | no | a corregir · sin showcase |
| AuraSurface | `shared/components/aura/AuraSurface.tsx` | 53 | 0 | 5 | 0 | 0 | 0 | no | a corregir · sin showcase |
| GalleryViewer | `shared/components/common/gallery/GalleryViewer.tsx` | 366 | 0 | 0 | 0 | 4 | 0 | no | a corregir · sin showcase |
| BackButton | `shared/components/navigation/BackButton.tsx` | 45 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| ComponentErrorBoundary | `shared/components/ComponentErrorBoundary.tsx` | 93 | 0 | 1 | 0 | 0 | 0 | no | a corregir · sin showcase |
| Gallery | `shared/components/common/Gallery.tsx` | 313 | 0 | 0 | 0 | 1 | 0 | sí | a corregir |
| GalleryThumbnails | `shared/components/common/gallery/GalleryThumbnails.tsx` | 136 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| InfoItem | `shared/components/ui/InfoItem.tsx` | 84 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| MapControls | `shared/components/map/MapControls.tsx` | 39 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| AuraContainer | `shared/components/aura/AuraContainer.tsx` | 39 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| AuraHeader | `shared/components/aura/AuraHeader.tsx` | 102 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ComingSoonDisplay | `shared/components/common/ComingSoonDisplay.tsx` | 30 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| CopyButton | `shared/components/ui/CopyButton.tsx` | 58 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| CustomMarker | `shared/components/map/CustomMarker.tsx` | 103 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| FadingImage | `shared/components/common/FadingImage.tsx` | 71 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| FilterPill | `shared/components/ui/FilterPill.tsx` | 33 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| GoogleMetricsProvider | `shared/components/Analytics/GoogleMetricsProvider.tsx` | 105 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ImageReveal | `shared/components/Image/ImageReveal.tsx` | 92 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| ItemGridLayout | `shared/components/Layout/ItemGridLayout.tsx` | 133 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| MapError | `shared/components/map/MapError.tsx` | 34 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| MapLoader | `shared/components/map/MapLoader.tsx` | 26 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| MathCaptchaField | `shared/components/MathCaptchaField.tsx` | 137 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| MediaCard | `shared/components/Card/MediaCard.tsx` | 173 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| ResponsiveImage | `shared/components/Image/ResponsiveImage.tsx` | 78 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| Reveal | `shared/components/motion/Reveal.tsx` | 82 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| ScrollPatterns | `shared/components/scroll/ScrollPatterns.tsx` | 237 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| SkipLink | `shared/components/navigation/SkipLink.tsx` | 43 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| WhatsAppIcon | `shared/components/icons/WhatsAppIcon.tsx` | 28 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

## Globales (widgets)

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| MenuOverlay | `widgets/Navbar/mobile/MenuOverlay.tsx` | 398 | 1 | 0 | 0 | 3 | 0 | no | a corregir · sin showcase |
| AdminNav | `widgets/AdminNav/AdminNav.tsx` | 163 | 0 | 0 | 0 | 2 | 0 | sí | a corregir |
| MenuLink | `widgets/Navbar/mobile/MenuLink.tsx` | 204 | 0 | 0 | 0 | 2 | 0 | no | a corregir · sin showcase |
| MobileNav | `widgets/Navbar/MobileNav.tsx` | 262 | 0 | 0 | 0 | 2 | 0 | no | a corregir · sin showcase |
| ServicesAccordion | `widgets/Navbar/mobile/ServicesAccordion.tsx` | 210 | 0 | 0 | 0 | 2 | 0 | no | a corregir · sin showcase |
| AuraDesktopNav | `widgets/Navbar/AuraDesktopNav.tsx` | 194 | 0 | 0 | 0 | 1 | 0 | sí | a corregir |
| FloatingWhatsApp | `widgets/FloatingActions/FloatingWhatsApp.tsx` | 115 | 0 | 0 | 0 | 1 | 0 | sí | a corregir |
| MenuToggle | `widgets/Navbar/mobile/MenuToggle.tsx` | 149 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| MobileNavbarV2 | `widgets/Navbar/mobile/MobileNavbarV2.tsx` | 259 | 0 | 0 | 0 | 1 | 0 | sí | a corregir |
| ThemeToggle | `widgets/FloatingActions/ThemeToggle.tsx` | 65 | 0 | 0 | 0 | 1 | 0 | sí | a corregir |
| UtilityLink | `widgets/Navbar/components/UtilityLink.tsx` | 66 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| AuraNavbar | `widgets/Navbar/AuraNavbar.tsx` | 78 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| FloatingWhatsAppWrapper | `widgets/FloatingActions/FloatingWhatsAppWrapper.tsx` | 12 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| Footer | `widgets/Footer/Footer.tsx` | 345 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| NavItemLarge | `widgets/Navbar/components/NavItemLarge.tsx` | 47 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

## Feature · admin

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| ProjectAdminTable | `features/admin/components/ProjectAdminTable.tsx` | 286 | 0 | 0 | 6 | 1 | 0 | no | a corregir · sin showcase |
| AlbumGalleryUploader | `features/admin/components/AlbumGalleryUploader.tsx` | 395 | 0 | 1 | 2 | 3 | 0 | no | a corregir · sin showcase |
| ServiceAdminTable | `features/admin/components/ServiceAdminTable.tsx` | 296 | 0 | 0 | 5 | 1 | 0 | no | a corregir · sin showcase |
| AdminLayout | `features/admin/components/AdminLayout.tsx` | 202 | 0 | 0 | 2 | 2 | 0 | no | a corregir · sin showcase |
| ImageUploadZone | `features/admin/components/ImageUploadZone.tsx` | 317 | 0 | 1 | 1 | 1 | 0 | no | a corregir · sin showcase |
| FeaturesEditor | `features/admin/components/form/FeaturesEditor.tsx` | 89 | 0 | 0 | 1 | 1 | 0 | no | a corregir · sin showcase |
| ProjectFormModal | `features/admin/components/ProjectFormModal.tsx` | 230 | 0 | 1 | 1 | 0 | 0 | no | a corregir · sin showcase |
| AdminRowActions | `features/admin/components/AdminRowActions.tsx` | 30 | 0 | 0 | 1 | 0 | 0 | no | a corregir · sin showcase |
| FormModalShell | `features/admin/components/form/FormModalShell.tsx` | 119 | 0 | 0 | 1 | 0 | 0 | no | a corregir · sin showcase |
| ServiceFormModal | `features/admin/components/ServiceFormModal.tsx` | 229 | 0 | 0 | 1 | 0 | 0 | no | a corregir · sin showcase |
| AdminDialog | `features/admin/components/form/AdminDialog.tsx` | 100 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| MediaFields | `features/admin/components/form/MediaFields.tsx` | 59 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ProjectServiceSelect | `features/admin/components/form/ProjectServiceSelect.tsx` | 49 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| PublishedCheckbox | `features/admin/components/form/PublishedCheckbox.tsx` | 26 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| TitleSlugFields | `features/admin/components/form/TitleSlugFields.tsx` | 64 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

## Feature · auth

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| AccountRouteGuard | `features/auth/components/AccountRouteGuard.tsx` | 34 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| AdminRouteGuard | `features/auth/components/AdminRouteGuard.tsx` | 80 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

## Feature · blog

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| BlogCard | `features/blog/components/BlogCard.tsx` | 172 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| BlogList | `features/blog/components/BlogList.tsx` | 35 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

## Feature · contacto

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| ContactFormSection | `features/contacto/components/ContactFormSection.tsx` | 285 | 0 | 5 | 0 | 5 | 0 | no | a corregir · sin showcase |
| TrackingSection | `features/contacto/components/TrackingSection.tsx` | 154 | 0 | 5 | 1 | 1 | 0 | no | a corregir · sin showcase |
| ContactSuccessModal | `features/contacto/components/ContactSuccessModal.tsx` | 131 | 0 | 1 | 0 | 0 | 0 | no | a corregir · sin showcase |

## Feature · home

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| ClientCard | `features/home/components/clients/ClientCard.tsx` | 112 | 0 | 1 | 0 | 1 | 0 | sí | a corregir |
| FeatureCard | `features/home/components/features/FeatureCard.tsx` | 129 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| LandingPageSection | `features/home/components/hero/LandingPageSection.tsx` | 162 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| ClientsSection | `features/home/components/clients/ClientsSection.tsx` | 51 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| FeaturesSection | `features/home/components/features/FeaturesSection.tsx` | 60 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| StoreSection | `features/home/components/store/StoreSection.tsx` | 41 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

## Feature · local-landings

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| LocalLandingView | `features/local-landings/components/LocalLandingView.tsx` | 99 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

## Feature · projects

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| ProjectDetailItem | `features/projects/components/ProjectDetailItem.tsx` | 58 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| MapViewer | `features/projects/components/modal/MapViewer.tsx` | 101 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ProjectCard | `features/projects/components/ProjectCard.tsx` | 55 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ProjectCardContent | `features/projects/components/ProjectCardContent.tsx` | 72 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| ProjectSkeletons | `features/projects/components/ProjectSkeletons.tsx` | 33 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ProjectsList | `features/projects/components/ProjectsList.tsx` | 111 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| VisualViewer | `features/projects/components/modal/VisualViewer.tsx` | 114 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

## Feature · reclamation-book

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| ReclamationForm | `features/reclamation-book/components/ReclamationForm.tsx` | 144 | 0 | 0 | 2 | 0 | 0 | no | a corregir · sin showcase |
| ClaimDetailSection | `features/reclamation-book/components/ClaimDetailSection.tsx` | 133 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| DeclarationSection | `features/reclamation-book/components/DeclarationSection.tsx` | 137 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| FormCard | `features/reclamation-book/components/FormCard.tsx` | 26 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| PersonalInfoSection | `features/reclamation-book/components/PersonalInfoSection.tsx` | 194 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ProductSection | `features/reclamation-book/components/ProductSection.tsx` | 110 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ReclamationFormContext | `features/reclamation-book/components/ReclamationFormContext.tsx` | 31 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| SuccessModal | `features/reclamation-book/components/SuccessModal.tsx` | 125 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

## Feature · services

| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |
|---|---|---|---|---|---|---|---|---|---|
| ServiceBentoGrid | `features/services/components/ServiceBentoGrid.tsx` | 121 | 2 | 3 | 0 | 2 | 0 | no | a corregir · sin showcase |
| ServiceFaqSection | `features/services/components/ServiceFaqSection.tsx` | 88 | 0 | 0 | 0 | 1 | 0 | no | a corregir · sin showcase |
| ServiceCard | `features/services/components/ServiceCard.tsx` | 47 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| ServiceHeader | `features/services/components/ServiceHeader.tsx` | 98 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ServiceList | `features/services/components/ServiceList.tsx` | 120 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |
| ServicePageLayout | `features/services/components/ServicePageLayout.tsx` | 135 | 0 | 0 | 0 | 0 | 0 | sí | estándar |
| ServiceSkeletons | `features/services/components/ServiceSkeletons.tsx` | 39 | 0 | 0 | 0 | 0 | 0 | no | estándar · sin showcase |

