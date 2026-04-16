# Plan de Migración y Optimización a Chakra UI v3 - ESTADO ACTUALIZADO

Este documento rastrea el progreso de la actualización de los componentes del proyecto GYA a las nuevas APIs y componentes nativos de Chakra UI v3.

## Fase 1: Formularios y Entradas de Datos (Reclamation Book)
- [x] Migrar envoltorios de formulario al nuevo componente `Field` y `Fieldset` (`ReclamationForm.jsx`, `PersonalInfoSection.jsx`).
- [x] Implementar el componente nativo `file-upload` para adjuntar evidencias (`ClaimDetailSection.jsx`).
- [x] Reemplazar modales antiguos por el nuevo patrón `Dialog` (`SuccessModal.jsx`).
- [x] Implementar inputs avanzados nativos como `native-select`, `radio-group` y `checkbox-card`.

## Fase 2: Visualización de Datos y Listas (Projects & Services)
- [x] Refactorizar especificaciones técnicas usando el componente `DataList` (`ProjectDetailItem.jsx`, `SpecItem.jsx`).
- [x] Actualizar estados vacíos usando el componente `EmptyState` nativo (implementado en `ServiceList.jsx`).
- [x] Reemplazar Skeletons manuales por el nuevo componente `Skeleton` optimizado (`ProjectListSkeleton.jsx`, `ProjectCardSkeleton.jsx`).
- [x] Reemplazar filtros de botones por `SegmentGroup` o `SegmentedControl` (`ServicesImmersiveFilter.jsx`, `ServiceList.jsx`).

## Fase 3: Navegación y Layout Global (Navbar & Footer)
- [x] Migrar el menú móvil al nuevo API declarativo de `Drawer` (`MobileNav.jsx`).
- [x] Reemplazar bordes y `<Divider />` manuales con el componente `Separator`.
- [x] Usar `ActionBar` o `Float` para acciones flotantes (botón de WhatsApp, Theme Toggle).
- [x] Refactorizar Tooltips para usar la nueva estructura compuesta (`Tooltip.Root`, `Tooltip.Content`).

## Fase 4: Componentes Interactivos y Compartidos (Shared)
- [x] Implementar `ScrollArea` nativo para reemplazar el CSS personalizado de scrollbars (`GalleryThumbnails.jsx`, Sidebar).
- [x] Cambiar renderizado condicional lógico (`isOpen && ...`) por el componente declarativo `<Show>` o componentes de control de estado v3.
- [x] Actualizar el manejo de errores visuales (`ErrorFallback.jsx`, `ErrorPage.jsx`) usando `Alert` o `Blockquote`.
- [x] Migrar popovers antiguos a la nueva estructura `Popover.Root` y `Popover.Content` (`CustomMarker.jsx`).

## Fase 5: Estilos Globales y Theming (Aura Design System)
- [x] Asegurar compatibilidad estricta de Color Mode usando la nueva ruta `@/components/ui/color-mode`.
- [x] Limpiar código WET (duplicado) aprovechando los nuevos componentes compuestos.
- [x] Verificar que todos los espacios usen la escala de Fibonacci (`phi_*`) nativamente sin variables CSS sueltas.

---
**Última actualización:** 15 de Abril, 2026
**Estado General:** 95% Completado. Solo quedan detalles estéticos de ScrollArea y pulido de temas.
