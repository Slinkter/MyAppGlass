# Plan de Migración y Optimización a Chakra UI v3

Este documento rastrea el progreso de la actualización de los componentes del proyecto GYA a las nuevas APIs y componentes nativos de Chakra UI v3.

## Fase 1: Formularios y Entradas de Datos (Reclamation Book)
- [ ] Migrar envoltorios de formulario al nuevo componente `Field` y `Fieldset` (`ReclamationForm.jsx`, `PersonalInfoSection.jsx`).
- [ ] Implementar el componente nativo `file-upload` para adjuntar evidencias (`ClaimDetailSection.jsx`).
- [ ] Reemplazar modales antiguos por el nuevo patrón `Dialog` (`SuccessModal.jsx`).
- [ ] Implementar inputs avanzados nativos como `native-select`, `radio-group` y `checkbox-card`.

## Fase 2: Visualización de Datos y Listas (Projects & Services)
- [ ] Refactorizar especificaciones técnicas usando el componente `DataList` (`ProjectDetailItem.jsx`, `SpecItem.jsx`).
- [ ] Actualizar estados vacíos usando el componente `EmptyState` nativo (para filtros de servicios sin resultados).
- [ ] Reemplazar Skeletons manuales por el nuevo componente `Skeleton` optimizado (`ProjectListSkeleton.jsx`, etc.).
- [ ] Reemplazar filtros de botones por `SegmentGroup` o `Toggle` (`ServicesImmersiveFilter.jsx`).

## Fase 3: Navegación y Layout Global (Navbar & Footer)
- [ ] Migrar el menú móvil al nuevo API declarativo de `Drawer` (`MobileNav.jsx`).
- [ ] Reemplazar bordes y `<Divider />` manuales con el componente `Separator`.
- [ ] Usar `ActionBar` o `Float` para acciones flotantes (botón de WhatsApp, Theme Toggle).
- [ ] Refactorizar Tooltips para usar la nueva estructura compuesta (`Tooltip.Root`, `Tooltip.Content`).

## Fase 4: Componentes Interactivos y Compartidos (Shared)
- [ ] Implementar `ScrollArea` nativo para reemplazar el CSS personalizado de scrollbars (`GalleryThumbnails.jsx`, Sidebar).
- [ ] Cambiar renderizado condicional lógico (`isOpen && ...`) por el componente declarativo `<Show>`.
- [ ] Actualizar el manejo de errores visuales (`ErrorFallback.jsx`, `ErrorPage.jsx`) usando `Alert` o `Blockquote`.
- [ ] Migrar popovers antiguos a la nueva estructura `Popover.Root` y `Popover.Content` (ya iniciado en `CustomMarker.jsx`).

## Fase 5: Estilos Globales y Theming (Aura Design System)
- [ ] Asegurar compatibilidad estricta de Color Mode usando la nueva ruta `@/components/ui/color-mode`.
- [ ] Limpiar código WET (duplicado) aprovechando los nuevos componentes compuestos.
- [ ] Verificar que todos los espacios usen la escala de Fibonacci (`phi_*`) nativamente sin variables CSS sueltas.