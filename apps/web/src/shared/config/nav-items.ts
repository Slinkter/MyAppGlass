/**
 * @file nav-items.ts
 * @description Configuration for the main application navigation structure.
 * @module data
 */

/**
 * NavItem interface representing a navigation link.
 */
export interface NavItem {
  label: string;
  href: string;
  /** Si es true, el ítem abre el acordeón de servicios en la navbar móvil. */
  isAccordion?: boolean;
}

/**
 * Array of navigation items for the main navigation bar.
 * Defines the primary routes available in the application header.
 */
const NAV_ITEMS: NavItem[] = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Servicios",
    href: "/#servicios",
  },
  {
    label: "Proyectos",
    href: "/#proyectos",
  },
  {
    label: "Ubicación",
    href: "/#ubicacion",
  },
  {
    label: "Mi Cuenta",
    href: "/auth",
  },
];

/**
 * Arquitectura de información de la navbar móvil: 5 enlaces primarios,
 * donde "Servicios" despliega el acordeón.
 */
export const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios", isAccordion: true },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Ubicación", href: "/#ubicacion" },
  { label: "Contacto", href: "/contacto" },
];

export default NAV_ITEMS;
