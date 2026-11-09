/**
 * @file index.ts
 * @description Exportaciones públicas del módulo Navbar Móvil v2 (Alternativa A).
 */

export { MobileNavbarV2 } from "./MobileNavbarV2";
export type { MobileNavbarV2Props } from "./MobileNavbarV2";

export { MenuToggle } from "./MenuToggle";
export type { MenuToggleProps } from "./MenuToggle";

export { MenuOverlay } from "./MenuOverlay";
export type { MenuOverlayProps } from "./MenuOverlay";

export { MenuLink } from "./MenuLink";
export type { MenuLinkProps } from "./MenuLink";

export { ServicesAccordion, OFFICIAL_SERVICE_SLUGS } from "./ServicesAccordion";
export type { ServicesAccordionProps, ServiceItemDef } from "./ServicesAccordion";

export { useScrollDirection } from "./hooks/useScrollDirection";
export type {
  UseScrollDirectionOptions,
  UseScrollDirectionResult,
  ScrollDirection,
} from "./hooks/useScrollDirection";

export { useLockBodyScroll } from "./hooks/useLockBodyScroll";
export { useFocusTrap } from "./hooks/useFocusTrap";
